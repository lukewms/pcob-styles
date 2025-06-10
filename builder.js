/* builder.js
 * Generic UI + live-preview + copy-HTML logic.
 * Requires registry.js to define window.COMPONENTS
 * and an element <div id="builder-shell"></div> in the page.
 *
 * This version:
 *   • defers until both prerequisites exist,
 *   • guarantees the Builder runs exactly once,
 *   • removes any stale duplicate children left by a half-run.
 */

(function initBuilder () {

  /* ── 1. Singleton / defer guard ───────────────────────────────── */
  if (window._pcobBuilderBooted) return;              // already built once

  const shell      = document.getElementById('builder-shell');
  const components = window.COMPONENTS;

  if (!shell || !components) {                        // not ready yet
    document.addEventListener('DOMContentLoaded', initBuilder, { once: true });
    return;                                           // try again later
  }

  window._pcobBuilderBooted = true;
  console.log('[PCOB Builder] initialised');

  /* ── 2. Original Builder code (runs exactly once) ─────────────── */

  /* ---------- Constants ---------- */
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

  /* ---------- Root shell ---------- */
  /* Clean up any stale duplicate children from an interrupted run */
  ['#component-picker','#builder-controls','#builder-preview','#builder-code']
    .forEach(sel=>{
      const dups=shell.querySelectorAll(sel);
      if(dups.length>1) dups.forEach((el,i)=>{ if(i<dups.length-1) el.remove(); });
    });

  /* ---------- Component picker ---------- */
  const pickerEl = document.createElement('select');
  pickerEl.id = 'component-picker';
  shell.appendChild(pickerEl);

  /* ---------- Controls grid ---------- */
  const controlsPane = document.createElement('div');
  controlsPane.id = 'builder-controls';
  shell.appendChild(controlsPane);

  /* ---------- Live preview ---------- */
  const previewPane = document.createElement('div');
  previewPane.id = 'builder-preview';
  shell.appendChild(previewPane);

  /* ---------- Copy-HTML area ---------- */
  const codePane = document.createElement('div');
  codePane.id = 'builder-code';
  shell.appendChild(codePane);

  /* ---------- Helper: prettify class names ---------- */
  const niceName = cls =>
    cls.replace(/^pcob-/,'')
       .replace(/-/g,' ')
       .replace(/\b\w/g,c=>c.toUpperCase());

  /* ---------- Populate picker ---------- */
  Object.entries(window.COMPONENTS).forEach(([key,obj])=>{
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = obj.label || key;
    pickerEl.appendChild(opt);
  });

  /* ---------- Render on change ---------- */
  pickerEl.addEventListener('change',()=>renderUI(pickerEl.value));
  renderUI(pickerEl.value);                     // initial render

  /* === Render selected component ================================= */
  function renderUI(key){
    const def = window.COMPONENTS[key];
    if(!def){
      previewPane.innerHTML='<p>Component not found.</p>';
      controlsPane.innerHTML='';
      codePane.innerHTML='';
      return;
    }

    /* ----- State mirror ----- */
    const state = structuredClone(def.defaults);

    /* ----- Build controls ----- */
    const form = document.createElement('div');
    form.className = 'pcob-test-container';
    form.innerHTML = def.fields.map(buildFieldHTML).join('');

    /* ----- Build preview ----- */
    const preview = document.createElement('div');
    preview.dataset.preview='';
    preview.innerHTML = populateTemplate(def.template,state);

    /* ----- Code output wrapper ----- */
    const outputWrap = document.createElement('div');
    outputWrap.className = 'pcob-code-output';
    outputWrap.innerHTML = `
      <button class="copy-html-btn">📋 Copy HTML</button><br/>
      <textarea class="component-html" rows="10"
                style="width:100%;font-family:monospace;" readonly></textarea>
    `;

    /* ----- Inject into panes ----- */
    controlsPane.innerHTML='';
    controlsPane.append(form);

    previewPane.innerHTML='';
    previewPane.append(preview);

    codePane.innerHTML='';
    codePane.append(outputWrap);

    updateCodeOutput();                       // initial dump

    /* ========== Listeners ========== */
    form.addEventListener('input', onFieldChange);
    form.addEventListener('change', onFieldChange);

    /* Copy-to-clipboard */
    outputWrap.querySelector('.copy-html-btn')
      .addEventListener('click',()=>{
        navigator.clipboard.writeText(outputWrap.querySelector('textarea').value)
          .then(()=>flash('✅ Copied!'),()=>flash('❌ Failed'));
        function flash(txt){
          const btn=outputWrap.querySelector('.copy-html-btn');
          const old=btn.textContent;
          btn.textContent=txt;
          setTimeout(()=>btn.textContent=old,1500);
        }
      });

    /* ---------- Helpers ---------- */
    function buildFieldHTML(f){
      const val = state[f.id] ?? '';
      if(f.type==='color'||(f.type==='select'&&f.options)){
        const opts=(f.options||allColorClasses)
          .map(o=>`<option value="${o}" ${o===val?'selected':''}>${niceName(o)}</option>`)
          .join('');
        return `<div><label><strong>${f.label}</strong></label><br/>
          <select data-field="${f.id}">${opts}</select></div>`;
      }
      if(f.type==='textarea'){
        return `<div><label><strong>${f.label}</strong></label>
          <textarea data-field="${f.id}" rows="3">${val}</textarea></div>`;
      }
      return `<div><label><strong>${f.label}</strong></label>
        <input type="text" data-field="${f.id}" value="${val}" /></div>`;
    }

    function onFieldChange(e){
      const fieldId = e.target.dataset.field;
      if(!fieldId) return;
      state[fieldId] = e.target.value;
      applyField(def.fields.find(f=>f.id===fieldId), e.target.value);
      updateCodeOutput();
    }

    function applyField(f,value){
      const targets = preview.querySelectorAll(f.selector);
      if(!targets.length) return;

      /* color / select */
      if(f.type==='color'||(f.type==='select'&&f.options)){
        targets.forEach(el=>{
          el.classList.remove(...allColorClasses,...buttonModifierClasses);
          if(value) el.classList.add(value);
        });
        return;
      }

      if(f.prop==='backgroundImage'){
        targets.forEach(el=>el.style.backgroundImage=`url('${value}')`);
        return;
      }

      if(f.attr){
        targets.forEach(el=>el.setAttribute(f.attr,value));
        return;
      }

      targets.forEach(el=>el.textContent=value);
    }

    function updateCodeOutput(){
      const ta = outputWrap.querySelector('textarea');
      const clone = preview.cloneNode(true);
      clone.querySelectorAll('[data-preview]')
           .forEach(el=>el.removeAttribute('data-preview'));
      ta.value = formatHTML(clone.innerHTML.trim());
    }

    function formatHTML(html){
      const pad  = n=>'  '.repeat(n);
      const lines=html.replace(/></g,'>\n<').split('\n');
      let depth=0,out='';
      lines.forEach(line=>{
        if(line.match(/^<\/\w/)) depth--;
        out+=pad(depth)+line+'\n';
        if(line.match(/^<[^/!].*[^/]>$/)) depth++;
      });
      return out.trim();
    }

    function populateTemplate(tpl,obj){
      return tpl.replace(/{{(.*?)}}/g,(_,k)=>obj[k]??'');
    }
  }

})();   /* ← runs immediately, but only after prerequisites exist */
