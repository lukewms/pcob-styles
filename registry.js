/* registry.js
 * Declare all your components here.
 * builder.js expects a global `window.COMPONENTS`.
 */

window.COMPONENTS = {
  /* ===== Image Bands ====================================== */
  "image-band": {
    label: "Image Bands",

    /* Handlebars-style {{tokens}} get replaced at render time */
    template: /*html*/`
      <div class="pcob-image-band {{layout}} {{behavior}} {{background}}">
        <div class="pcob-band-text">
          <h2 class="pcob-band-heading">{{heading}}</h2>
          <p  class="pcob-band-body">{{body}}</p>
          <div>
            <a href="{{btn1Url}}"
               class="pcob-button pcob-button--md {{btn1Color}} {{buttonStyle}}">
               {{btn1Label}}
            </a>
            <a href="{{btn2Url}}"
               class="pcob-button pcob-button--md {{btn2Color}} {{buttonStyle}}">
               {{btn2Label}}
            </a>
          </div>
        </div>

        <div class="pcob-band-image-bg"
             style="background-image:url('{{imageUrl}}')"
             role="img"
             aria-label="{{altText}}">
        </div>
      </div>`,

    /* Form-field definitions */
    fields: [
      { id:"background", label:"Background Color", type:"color",
       selector:".pcob-image-band" },

      { id:"layout",   label:"Band Layout",  type:"select",
      options:["pcob-band-layout-3-1","pcob-band-layout-1-3","pcob-band-layout-2-1","pcob-band-layout-1-2"],
      selector:".pcob-image-band" },

      { id:"behavior", label:"Image Behavior", type:"select",
      options:["pcob-band-behavior-stacking","pcob-band-behavior-hiding"],
      selector:".pcob-image-band" },

      { id:"buttonStyle", label:"Button Style", type:"select",
      options:["pcob-button","pcob-button-flip","pcob-button-swipe"],
      selector:".pcob-image-band .pcob-button" },

      {id:"imageUrl",    label:"Image URL",        type:"text",
       selector:".pcob-band-image-bg", prop:"backgroundImage"},

      {id:"altText",     label:"Alt Text",         type:"text",
       selector:".pcob-band-image-bg", attr:"aria-label"},

      {id:"heading",     label:"Heading",          type:"text",
       selector:".pcob-band-heading"},

      {id:"body",        label:"Body Text",        type:"textarea",
       selector:".pcob-band-body"},

      {id:"btn1Label",   label:"Button 1 Label",   type:"text",
       selector:".pcob-button:nth-of-type(1)"},

      {id:"btn1Url",     label:"Button 1 URL",     type:"text",
       selector:".pcob-button:nth-of-type(1)", attr:"href"},

      {id:"btn1Color",   label:"Button 1 Color",   type:"color",
       selector:".pcob-button:nth-of-type(1)"},

      {id:"btn2Label",   label:"Button 2 Label",   type:"text",
       selector:".pcob-button:nth-of-type(2)"},

      {id:"btn2Url",     label:"Button 2 URL",     type:"text",
       selector:".pcob-button:nth-of-type(2)", attr:"href"},

      {id:"btn2Color",   label:"Button 2 Color",   type:"color",
       selector:".pcob-button:nth-of-type(2)"}
    ],

    /* Default values that appear on first load */
    defaults: {
      layout:   "pcob-band-layout-3-1",
      behavior: "pcob-band-behavior-stacking",
      background:  "pcob-black",
      buttonStyle: "pcob-button-flip",

      imageUrl: "/content/dam/cba_pamplin_vt_edu/img/mba/" +
                "20250505_MBA_InnovationCampus_JordiShelton_LWR69528_websize_Slate.jpg",

      altText:  "Students stand and smile at Virginia Tech's Academic Building One in Alexandria, VA.",
      heading:  "Hokies Help Hokies.",
      body:     "Hokie alumni stay connected. Whether leading the charge at global companies or launching startups from scratch, they don’t forget where they came from. Tap into the power of the Hokie network—because we always return your call.",

      btn1Label:"Explore Classes", btn1Url:"https://vt.edu", btn1Color:"pcob-maroon",
      btn2Label:"Alumni Network", btn2Url:"https://vt.edu", btn2Color:"pcob-maroon"
    }
  },

/* ===== Feature Bar =========================================== */
"feature-bar": {
  label: "Feature Bar",

  /* no divider <div>s — CSS ::after handles them */
  template: /*html*/`
    <div class="pcob-feature-bar {{background}}">
      <div class="pcob-feature">
        <div class="pcob-feature-title">{{title1}}</div>
        <div class="pcob-feature-subtitle">{{subtitle1}}</div>
      </div>
      <div class="pcob-feature">
        <div class="pcob-feature-title">{{title2}}</div>
        <div class="pcob-feature-subtitle">{{subtitle2}}</div>
      </div>
      <div class="pcob-feature">
        <div class="pcob-feature-title">{{title3}}</div>
        <div class="pcob-feature-subtitle">{{subtitle3}}</div>
      </div>
    </div>`,

  /* selectors now hit the real columns directly */
  fields: [
    { id: "background", label: "Background Color", type: "color",
      selector: ".pcob-feature-bar" },

    { id: "title1",    label: "Column 1 Title",    type: "text",
      selector: ".pcob-feature:nth-of-type(1) .pcob-feature-title" },
    { id: "subtitle1", label: "Column 1 Subtitle", type: "text",
      selector: ".pcob-feature:nth-of-type(1) .pcob-feature-subtitle" },

    { id: "title2",    label: "Column 2 Title",    type: "text",
      selector: ".pcob-feature:nth-of-type(2) .pcob-feature-title" },
    { id: "subtitle2", label: "Column 2 Subtitle", type: "text",
      selector: ".pcob-feature:nth-of-type(2) .pcob-feature-subtitle" },

    { id: "title3",    label: "Column 3 Title",    type: "text",
      selector: ".pcob-feature:nth-of-type(3) .pcob-feature-title" },
    { id: "subtitle3", label: "Column 3 Subtitle", type: "text",
      selector: ".pcob-feature:nth-of-type(3) .pcob-feature-subtitle" }
  ],

  /* unchanged defaults */
  defaults: {
    background: "pcob-maroon",
    title1:     "Smart Scheduling",
    subtitle1:  "Built for Working Pros",
    title2:     "Real-World Impact",
    subtitle2:  "Projects with Purpose",
    title3:     "Hokie Network",
    subtitle3:  "Alumni Across Industries"
  }
}

  /* ===== Add more components below using the same structure ===== */
};
