function renderForm(componentKey){
  const {fields, defaults} = COMPONENTS[componentKey];
  return fields.map(f => {
     const val = defaults[f.id] ?? "";
     if(f.type==="color"||f.type==="select"){
       const opts = f.options ?? allColorClasses;
       return `<div>
         <label><strong>${f.label}</strong></label><br/>
         <select data-field="${f.id}">
           ${opts.map(o=>`<option value="${o}" ${o===val?"selected":""}>${niceName(o)}</option>`).join("")}
         </select>
       </div>`;
     }
     if(f.type==="textarea"){
       return `<div>
         <label><strong>${f.label}</strong></label>
         <textarea data-field="${f.id}">${val}</textarea>
       </div>`;
     }
     return `<div>
       <label><strong>${f.label}</strong></label>
       <input type="text" data-field="${f.id}" value="${val}"/>
     </div>`;
   }).join("");
}
