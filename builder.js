/*  builder.js  ──────────────────────────────────────────────────────
 *  Generic UI + live-preview + copy-HTML tool.
 *  Needs:
 *    • registry.js (defines window.COMPONENTS)
 *    • <div id="builder-shell"></div> in the markup
 *
 *  This version
 *    • defers until both prerequisites exist,
 *    • initialises exactly once (even if AEM/Ensemble adds the file twice),
 *    • wipes any half-rendered UI before building,
 *    • keeps button-style selections from clobbering color selections.
 */

(function initBuilder () {

  /* ── 1.  De-dup & defer guard ─────────────────────────────────── */
  if (window._pcobBuilderBooted) return;           // already built

  const shell      = document.getElementById('builder-shell');
  const components = window.COMPONENTS;

  if (!shell || !components) {                     // not ready yet
    document.addEventListener('DOMContentLoaded', initBuilder, { once: true });
    return;
  }

  window._pcobBuilderBooted = true;
  console.log('[PCOB Builder] initialised');

  /* ── 2.  Start fresh: nuke any stale children ─────────────────── */
  shell.innerHTML = '';                            // wipe ghost UI

  /* ── 3.  Constants ────────────────────────────────────────────── */
  const allColorClasses = [
    'pcob-default','pcob-black','pcob-white',
    'pcob-grey','pcob-light-grey','pcob-dark-grey',
    'pcob-stone','pcob-light-stone','pcob-dark-stone',
    'pcob-maroon','pcob-light-maroon','pcob-dark-maroon',
    'pcob-orange','pcob-light-orange','pcob-dark-orange',
    'pcob-burnt','pcob-light-burnt','pcob-dark-burnt',
    'pcob-teal','pcob-light-teal','pcob-dark-teal',
    'pcob-turquoise','pcob-light-turquoise','pcob-dark-turquoise',
    'pcob-purple','pcob-light-purple','pcob-dark-purple',
    'pcob-pink','pcob-light-pink','pcob-dark-pink',
    'pcob-yellow','pcob-light-yellow','pcob-dark-yellow'
  ];
  const buttonModifierClasses = ['pcob-button-flip','pcob-button-swipe'];

  /* ↓ NEW: class buckets for the two dropdowns  */
  const layoutClasses = [
    'pcob-band-layout-3-1','pcob-band-layout-1-3',
    'pcob-band-layout-2-1','pcob-band-layout-1-2'
  ];

  const behaviorClasses = [
    'pcob-band-behavior-stacking','pcob-band-behavior-hiding'
  ];

  /* ── 4.  UI scaffolding  ──────────────────────────────────────── */
  const pickerEl    = dom('select',  { id:'component-picker' });
  const controlsDiv = dom('div',     { id:'builder-controls' });
  const previewDiv  = dom('div',     { id:'builder-preview'  });
  const codeDiv     = dom('div',     { id:'builder-code'     });
  shell.append(pickerEl, controlsDiv, previewDiv, codeDiv);

  /* helper */
  function dom(tag, attrs){
    const el=document.createElement(tag);
    Object.entries(attrs||{}).forEach(([k,v])=>el.setAttribute(k,v));
    return el;
  }

  /* ── 5.  Populate component picker ────────────────────────────── */
  Object.entries(components).forEach(([key,obj])=>{
    pickerEl.append(new Option(obj.label||key, key));
  });
  pickerEl.addEventListener('change',()=>renderUI(pickerEl.value));
  renderUI(pickerEl.value);                        // initial render

  /* ── 6.  Render selected component ────────────────────────────── */
  function renderUI(key){
    const def = components[key];
    if(!def){
      previewDiv.textContent   = 'Component not found.';
      controlsDiv.textContent  = '';
      codeDiv.textContent      = '';
      return;
    }

    /* ----- mirror state ----- */
    const state = structuredClone(def.defaults);

    /* ----- build controls ----- */
    const form = dom('div',{ class:'pcob-test-container' });
    form.innerHTML = def.fields.map(buildFieldHTML).join('');

    /* ----- build preview ----- */
    const preview = dom('div',{ 'data-preview':'' });
    preview.innerHTML = tpl(def.template,state);

    /* ----- build code output ----- */
    const output = dom('div',{ class:'pcob-code-output' });
    output.innerHTML = `
      <button class="copy-html-btn">📋 Copy HTML</button><br/>
      <textarea class="component-html" rows="10"
                style="width:100%;font-family:monospace;" readonly></textarea>`;

    /* ----- inject ----- */
    controlsDiv.replaceChildren(form);
    previewDiv.replaceChildren(preview);
    codeDiv.replaceChildren(output);

    updateCode();                                   // initial dump

    /* ----- event plumbing ----- */
    form.addEventListener('input',  e=>onField(e.target));
    form.addEventListener('change', e=>onField(e.target));

    output.querySelector('.copy-html-btn')
      .addEventListener('click',()=>copyToClipboard(output));

    /* ===== inner helpers ===== */
    function buildFieldHTML(f){
  const val = state[f.id] ?? '';

  /* colour pickers & explicit selects */
  if (f.type === 'color' || (f.type === 'select' && f.options)){
    const opts = (f.options || allColorClasses)
      .map(o => `<option value="${o}" ${o===val?'selected':''}>${pretty(o)}</option>`)
      .join('');
    return `<div><label><strong>${f.label}</strong></label>
      <select data-field="${f.id}">${opts}</select></div>`;
  }

  /* multiline text */
  if (f.type === 'textarea'){
    return `<div><label><strong>${f.label}</strong></label>
      <textarea data-field="${f.id}" rows="3">${val}</textarea></div>`;
  }

  /* single-line inputs (heading, URLs, button labels, etc.)  */
  /* --- corrected: value now goes in the attribute, not inside the tag  */
  return `<div><label><strong>${f.label}</strong></label>
    <input type="text" data-field="${f.id}" value="${val}" /></div>`;
  }


    function tag(el,f,val,extra=''){
      return `<div><label><strong>${f.label}</strong></label>
        <${el} data-field="${f.id}"${extra||''}>${val}</${el === 'input' ? '' : el}></div>`;
    }
    function pretty(cls){
      return cls.replace(/^pcob-/,'').replace(/-/g,' ')
                .replace(/\b\w/g,c=>c.toUpperCase());
    }

    function onField(input){
      const id = input.dataset.field;
      if(!id) return;
      state[id] = input.value;
      applyField(def.fields.find(f=>f.id===id), input.value);
      updateCode();
    }

    function applyField(f,value){
      const targets = preview.querySelectorAll(f.selector);
      if(!targets.length) return;

      /* ---- COLOR PICKERS ---- */
      if(f.type==='color'){
        targets.forEach(el=>{
          el.classList.remove(...allColorClasses);
          if(value) el.classList.add(value);
        });
        return;
      }

       /* ---- LAYOUT PICKER ---- */
      if (f.id === 'layout'){
        targets.forEach(el=>{
          el.classList.remove(...layoutClasses);
          if(value) el.classList.add(value);
        });
        return;
      }

      /* ---- IMAGE-BEHAVIOR PICKER ---- */
      if (f.id === 'behavior'){
        targets.forEach(el=>{
          el.classList.remove(...behaviorClasses);
          if(value) el.classList.add(value);
        });
        return;
      }

            /* ---- BUTTON COUNT PICKER ---- */
      if (f.id === 'buttonCount'){
        /* first button = nth-of-type(1) ; second = nth-of-type(2) */
        const btn1 = preview.querySelector('.pcob-button:nth-of-type(1)');
        const btn2 = preview.querySelector('.pcob-button:nth-of-type(2)');

        if (value === 'none'){
          btn1?.classList.add('pcob-hidden');
          btn2?.classList.add('pcob-hidden');
        } else if (value === 'one'){
          btn1?.classList.remove('pcob-hidden');
          btn2?.classList.add('pcob-hidden');
        } else {                         // 'two' (default)
          btn1?.classList.remove('pcob-hidden');
          btn2?.classList.remove('pcob-hidden');
        }
        return;
      }

      /* ---- BUTTON-STYLE PICKER ---- */
      if(f.id==='buttonStyle'){
        targets.forEach(el=>{
          el.classList.remove(...buttonModifierClasses);
          if(!el.classList.contains('pcob-button')){
            el.classList.add('pcob-button');
          }
          if(value && value!=='pcob-button'){
            el.classList.add(value);
          }
        });
        return;
      }

      /* ---- SELECTORS WITH COLOR OPTIONS (non-button) ---- */
      if(f.type==='select' && f.options && f.options.every(o=>allColorClasses.includes(o))){
        targets.forEach(el=>{
          el.classList.remove(...allColorClasses);
          if(value) el.classList.add(value);
        });
        return;
      }

      /* ---- backgroundImage ---- */
      if(f.prop==='backgroundImage'){
        targets.forEach(el=>el.style.backgroundImage=`url('${value}')`);
        return;
      }

      /* ---- attribute updates ---- */
      if(f.attr){
        targets.forEach(el=>el.setAttribute(f.attr,value));
        return;
      }

      /* ---- textContent ---- */
      targets.forEach(el=>el.textContent=value);
    }

    function updateCode(){
      const ta    = output.querySelector('textarea');
      const clone = preview.cloneNode(true);
      clone.querySelectorAll('[data-preview]')
           .forEach(el=>el.removeAttribute('data-preview'));
      clone.querySelectorAll('.pcob-hidden').forEach(el => el.remove());
      ta.value = formatHTML(clone.innerHTML.trim());d
    }

    function formatHTML(html){
      const pad = n=>'  '.repeat(n);
      const lines = html.replace(/></g,'>\n<').split('\n');
      let depth=0,out='';
      lines.forEach(l=>{
        if(/^<\/\w/.test(l)) depth--;
        out+=pad(depth)+l+'\n';
        if(/^<[^/!].*[^/]>$/.test(l)) depth++;
      });
      return out.trim();
    }

    function tpl(tpl,obj){
      return tpl.replace(/{{(.*?)}}/g,(_,k)=>obj[k]??'');
    }

    function copyToClipboard(wrap){
      const ta   = wrap.querySelector('textarea');
      const text = ta.value;
      if(!text){ flash('❌ Nothing to copy'); return; }
      navigator.clipboard.writeText(text)
        .then(()=>flash('✅ Copied!'),()=>flash('❌ Failed'));
      function flash(msg){
        const btn=wrap.querySelector('.copy-html-btn');
        const old=btn.textContent; btn.textContent=msg;
        setTimeout(()=>btn.textContent=old,1500);
      }
    }
  }

})();   /* ← runs immediately, but only when ready */
