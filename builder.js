/* builder.js
 * Generic UI + live-preview + copy-HTML logic.
 * Assumes registry.js loaded first.
 */

if (window._pcobBuilderInit) {
  // Already initialised once in this page → skip the second run
  console.warn('[PCOB Builder] duplicate script call ignored');
  return;
}

window._pcobBuilderInit = true;

(() => {
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
  const shell = document.getElementById('builder-shell');
  if (!shell) return console.error('Builder shell not found.');

  /* ---------- TOP component picker (big maroon dropdown) ---------- */
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

  /* ---------- Helper: prettify class names for <option> text ---------- */
  const niceName = cls =>
    cls.replace(/^pcob-/,'')
       .replace(/-/g,' ')
       .replace(/\b\w/g,c=>c.toUpperCase());

  /* ---------- Populate the component picker ---------- */
  Object.entries(window.COMPONENTS).forEach(([key,obj]) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = obj.label || key;
    pickerEl.appendChild(opt);
  });

  /* ---------- Render UI when picker changes ---------- */
  pickerEl.addEventListener('change', () => renderUI(pickerEl.value));
  renderUI(pickerEl.value);          // initial render

  /* === Render selected component ===================================== */
  function renderUI(key){
    const def = window.COMPONENTS[key];
    if(!def){ pane.innerHTML = '<p>Component not found.</p>'; return; }

    /* ----- State object that mirrors form fields ----- */
    const state = structuredClone(def.defaults);

    /* ----- Build form HTML from field definitions ----- */
    const form = document.createElement('div');
    form.className = 'pcob-test-container';      // reuse your old CSS
    form.innerHTML = def.fields.map(buildFieldHTML).join('');

    /* ----- Preview element ----- */
    const preview = document.createElement('div');
    preview.dataset.preview = '';
    preview.innerHTML = populateTemplate(def.template, state);

    /* ----- Code output area ----- */
    const outputWrap = document.createElement('div');
    outputWrap.className = 'pcob-code-output';
    outputWrap.innerHTML = `
      <button class="copy-html-btn">📋 Copy HTML</button><br/>
      <textarea class="component-html" rows="10" style="width:100%;font-family:monospace;" readonly></textarea>
    `;

    controlsPane.innerHTML = '';
    controlsPane.append(form);

    previewPane.innerHTML  = '';
    previewPane.append(preview);

    codePane.innerHTML = '';
    codePane.append(outputWrap);

    updateCodeOutput();        // initial code dump

    /* ==== Event delegation for all inputs/selects inside the form ==== */
    form.addEventListener('input', onFieldChange);
    form.addEventListener('change', onFieldChange);

    /* Copy-to-clipboard */
    outputWrap.querySelector('.copy-html-btn')
      .addEventListener('click', () => {
        navigator.clipboard.writeText(outputWrap.querySelector('textarea').value)
          .then(() => showTempLabel('✅ Copied!'), () => showTempLabel('❌ Failed'));

        function showTempLabel(txt){
          const btn = outputWrap.querySelector('.copy-html-btn');
          const old = btn.textContent;
          btn.textContent = txt;
          setTimeout(()=>btn.textContent = old, 1500);
        }
      });

    /* ---------- Field builders ---------- */
    function buildFieldHTML(f){
      const val = state[f.id] ?? '';
      if(f.type === 'color' || (f.type === 'select' && f.options)){
        const opts = (f.options || allColorClasses)
          .map(o => `<option value="${o}" ${o===val?'selected':''}>${niceName(o)}</option>`)
          .join('');
        return `<div><label><strong>${f.label}</strong></label><br/>
          <select data-field="${f.id}">${opts}</select></div>`;
      }
      if(f.type === 'textarea'){
        return `<div><label><strong>${f.label}</strong></label>
          <textarea data-field="${f.id}" rows="3">${val}</textarea></div>`;
      }
      return `<div><label><strong>${f.label}</strong></label>
        <input type="text" data-field="${f.id}" value="${val}" /></div>`;
    }

    /* ---------- Input / select handler ---------- */
    function onFieldChange(e){
      const fieldId = e.target.dataset.field;
      if(!fieldId) return;
      state[fieldId] = e.target.value;
      applyField(def.fields.find(f=>f.id===fieldId), e.target.value);
      updateCodeOutput();
    }

    /* ---------- Apply one field’s value to the preview ---------- */
    function applyField(f, value){
      const targets = preview.querySelectorAll(f.selector);
      if(!targets.length) return;

      /* color / select = class manipulation */
      if(f.type === 'color' || (f.type === 'select' && f.options)){
        targets.forEach(el=>{
          el.classList.remove(...allColorClasses, ...buttonModifierClasses);
          if(value) el.classList.add(value);
        });
        return;
      }

      /* backgroundImage style */
      if(f.prop === 'backgroundImage'){
        targets.forEach(el => el.style.backgroundImage = `url('${value}')`);
        return;
      }

      /* attribute change */
      if(f.attr){
        targets.forEach(el => el.setAttribute(f.attr, value));
        return;
      }

      /* otherwise textContent */
      targets.forEach(el => el.textContent = value);
    }

    /* ---------- Dump pretty HTML for copy-paste ---------- */
    function updateCodeOutput(){
      const ta = outputWrap.querySelector('textarea');
      const clone = preview.cloneNode(true);
      clone.querySelectorAll('[data-preview]').forEach(el=>el.removeAttribute('data-preview'));
      ta.value = formatHTML(clone.innerHTML.trim());
    }

    function formatHTML(html){
      const indent = (pad, str) => str.split('\n').map(l=>pad+l).join('\n');
      const lines = html.replace(/></g,'>\n<').split('\n');
      let depth = 0, pretty = '';
      lines.forEach(line=>{
        if(line.match(/^<\/\w/)) depth--;
        pretty += indent('  '.repeat(depth), line) + '\n';
        if(line.match(/^<[^/!].*[^/]>$/)) depth++;
      });
      return pretty.trim();
    }

    /* ---------- Replace {{tokens}} helper ---------- */
    function populateTemplate(tpl, obj){
      return tpl.replace(/{{(.*?)}}/g, (_,k)=>obj[k] ?? '');
    }
  }
})();
