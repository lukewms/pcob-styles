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

      { id: "headingFont", label: "Heading Font", type: "select",
      options: ["pcob-font-gineso", "pcob-font-acherus", "pcob-font-crimson"],
      selector: ".pcob-band-heading" },

    { id: "bodyFont", label: "Body Font", type: "select",
      options: ["pcob-font-gineso", "pcob-font-acherus", "pcob-font-crimson"],
      selector: ".pcob-band-body" },

    { id: "headingCaps", label: "Heading Case", type: "select",
    options: ["pcob-text-regular", "pcob-text-uppercase"],
    selector: ".pcob-band-heading" },

      /* ── Button count selector ───────────────────────────── */
     { id:"buttonCount", label:"Buttons Shown", type:"select",
       options:["two","one","none"],
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
      buttonCount:"two",
      headingFont: "pcob-font-gineso",
      bodyFont: "pcob-font-crimson",
      headingCaps: "pcob-text-regular",

      imageUrl: "/content/dam/cba_pamplin_vt_edu/img/mba/" +
                "20250505_MBA_InnovationCampus_JordiShelton_LWR69528_websize_Slate.jpg",

      altText:  "Students stand and smile at Virginia Tech's Academic Building One in Alexandria, VA.",
      heading:  "Hokies Help Hokies.",
      body:     "Hokie alumni stay connected. Whether leading the charge at global companies or launching startups from scratch, they don’t forget where they came from. Tap into the power of the Hokie network—because we always return your call.",

      btn1Label:"Explore Classes", btn1Url:"https://vt.edu", btn1Color:"pcob-maroon",
      btn2Label:"Alumni Network", btn2Url:"https://vt.edu", btn2Color:"pcob-maroon"
    }
  },

  /* ===== Text Band ============================================= */
"text-band": {
  label: "Text Band",

  template: /*html*/`
    <div class="pcob-text-band-left {{background}} {{align}}">
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
    </div>`,

  fields:[
    /* ----- band-level ----- */
    { id:"background", label:"Background Color", type:"color",
   selector:".pcob-text-band-left, .pcob-text-band-center, .pcob-text-band-right" },

    { id:"align", label:"Text Alignment", type:"select",
   options:["pcob-text-band-left","pcob-text-band-center","pcob-text-band-right"],
   selector:".pcob-text-band-left, .pcob-text-band-center, .pcob-text-band-right" },

    /* ----- button behaviour ----- */
    { id:"buttonCount", label:"Buttons Shown", type:"select",
   options:["two","one","none"],
   selector:".pcob-text-band-left, .pcob-text-band-center, .pcob-text-band-right" },

    { id:"buttonStyle", label:"Button Style", type:"select",
   options:["pcob-button","pcob-button-flip","pcob-button-swipe"],
   selector:".pcob-text-band-left .pcob-button, .pcob-text-band-center .pcob-button, .pcob-text-band-right .pcob-button" },

    /* ----- content ----- */
    { id:"heading", label:"Heading", type:"text",
      selector:".pcob-band-heading" },

    { id:"body", label:"Body Text", type:"textarea",
      selector:".pcob-band-body" },

    /* ----- button 1 ----- */
    { id:"btn1Label", label:"Button 1 Label", type:"text",
      selector:".pcob-button:nth-of-type(1)" },
    { id:"btn1Url",   label:"Button 1 URL",   type:"text",
      selector:".pcob-button:nth-of-type(1)", attr:"href" },
    { id:"btn1Color", label:"Button 1 Color", type:"color",
      selector:".pcob-button:nth-of-type(1)" },

    /* ----- button 2 ----- */
    { id:"btn2Label", label:"Button 2 Label", type:"text",
      selector:".pcob-button:nth-of-type(2)" },
    { id:"btn2Url",   label:"Button 2 URL",   type:"text",
      selector:".pcob-button:nth-of-type(2)", attr:"href" },
    { id:"btn2Color", label:"Button 2 Color", type:"color",
      selector:".pcob-button:nth-of-type(2)" }
  ],

  defaults:{
    background:"pcob-maroon",
    align:"pcob-text-band-left",
    buttonCount:"two",
    buttonStyle:"pcob-button-flip",

    heading:"TEXT BAND LEFT",
    body:"Hokie alumni stay connected. Whether leading the charge at global companies or launching startups from scratch, they don’t forget where they came from. Tap into the power of the Hokie network—because we always return your call.",

    btn1Label:"Explore Classes", btn1Url:"#", btn1Color:"pcob-light-maroon",
    btn2Label:"Alumni Network", btn2Url:"#", btn2Color:"pcob-light-maroon"
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
},

  /* ===== Buttons ===== */

  "button": {
  label: "Button",

  template: /*html*/`
    <a href="{{url}}" class="pcob-button {{color}} {{buttonStyle}} {{size}}">
      {{label}}
    </a>`,

  fields: [
    { id: "label", label: "Button Text", type: "text",
      selector: ".pcob-button" },

    { id: "url", label: "Button URL", type: "text",
      selector: ".pcob-button", attr: "href" },

    { id: "color", label: "Button Color", type: "color",
      selector: ".pcob-button" },

    { id: "buttonStyle", label: "Button Animation", type: "select",
      options: ["pcob-button", "pcob-button-flip", "pcob-button-swipe"],
      selector: ".pcob-button" },

    { id: "size", label: "Button Size", type: "select",
      options: ["pcob-button--sm", "pcob-button--md", "pcob-button--lg"],
      selector: ".pcob-button" }
  ],

  defaults: {
    label: "Click Me",
    url: "https://vt.edu",
    color: "pcob-maroon",
    style: "pcob-button-flip",
    size: "pcob-button--md"
  }
},

"card": {
  label: "Card",

  template: /*html*/`
  <div class="pcob-card-wrapper">
  <a href="{{btnUrl}}" class="pcob-card-link">
    <div class="pcob-card {{background}}">
      <img class="pcob-card-image" src="{{imageUrl}}" alt="{{altText}}" />
      <div class="pcob-card-text">
        <h3 class="pcob-card-heading {{headingFont}} {{headingCaps}}">{{heading}}</h3>
        <p class="pcob-card-body {{bodyFont}}">{{body}}</p>
      </div>
    </div>
  </a>
  </div>`,

  fields: [
    { id: "background", label: "Card Background", type: "color",
      selector: ".pcob-card" },

    { id: "imageUrl", label: "Image URL", type: "text",
      selector: ".pcob-card-image", attr: "src" },

    { id: "altText", label: "Image Alt Text", type: "text",
      selector: ".pcob-card-image", attr: "alt" },

    { id: "heading", label: "Heading", type: "text",
      selector: ".pcob-card-heading" },

    { id: "headingFont", label: "Heading Font", type: "select",
      options: ["pcob-font-gineso", "pcob-font-acherus", "pcob-font-crimson"],
      selector: ".pcob-card-heading" },

    { id: "headingCaps", label: "Heading Case", type: "select",
      options: ["pcob-text-regular-case", "pcob-text-uppercase"],
      selector: ".pcob-card-heading" },

    { id: "body", label: "Body Text", type: "textarea",
      selector: ".pcob-card-body" },

    { id: "bodyFont", label: "Body Font", type: "select",
      options: ["pcob-font-gineso", "pcob-font-acherus", "pcob-font-crimson"],
      selector: ".pcob-card-body" },

    { id: "btnLabel", label: "Button Label", type: "text",
      selector: ".pcob-button" },

    { id: "btnUrl", label: "Button URL", type: "text",
      selector: ".pcob-button", attr: "href" },

    { id: "btnColor", label: "Button Color", type: "color",
      selector: ".pcob-button" },

    { id: "buttonStyle", label: "Button Style", type: "select",
      options: ["pcob-button", "pcob-button-flip", "pcob-button-swipe"],
      selector: ".pcob-button" }
  ],

  defaults: {
    background: "pcob-white",
    imageUrl: "/content/dam/cba_pamplin_vt_edu/img/20250505_student_card.jpg",
    altText: "Student smiling at Virginia Tech campus",
    heading: "Meet Our Students",
    headingFont: "pcob-font-gineso",
    headingCaps: "pcob-text-regular-case",
    body: "Our students lead with purpose. They build data-driven solutions, connect across disciplines, and turn ideas into action.",
    bodyFont: "pcob-font-crimson",
    btnLabel: "Explore Programs",
    btnUrl: "#",
    btnColor: "pcob-maroon",
    buttonStyle: "pcob-button-flip"
  }
},

"stat-block": {
  label: "Stat Block",

  template: /*html*/`
    <div class="pcob-stat-block {{background}}">
      <div class="pcob-stat">
        <div class="pcob-stat-number {{numberFont}} {{numberCaps}}">
          {{stat1}}
        </div>
        <div class="pcob-stat-label {{labelFont}}">
          {{label1}}
        </div>
      </div>
      <div class="pcob-stat">
        <div class="pcob-stat-number {{numberFont}} {{numberCaps}}">
          {{stat2}}
        </div>
        <div class="pcob-stat-label {{labelFont}}">
          {{label2}}
        </div>
      </div>
      <div class="pcob-stat">
        <div class="pcob-stat-number {{numberFont}} {{numberCaps}}">
          {{stat3}}
        </div>
        <div class="pcob-stat-label {{labelFont}}">
          {{label3}}
        </div>
      </div>
    </div>`,

  fields: [
    { id: "background", label: "Background Color", type: "color",
      selector: ".pcob-stat-block" },

    { id: "stat1", label: "Stat 1", type: "text",
      selector: ".pcob-stat:nth-of-type(1) .pcob-stat-number" },
    { id: "label1", label: "Label 1", type: "text",
      selector: ".pcob-stat:nth-of-type(1) .pcob-stat-label" },

    { id: "stat2", label: "Stat 2", type: "text",
      selector: ".pcob-stat:nth-of-type(2) .pcob-stat-number" },
    { id: "label2", label: "Label 2", type: "text",
      selector: ".pcob-stat:nth-of-type(2) .pcob-stat-label" },

    { id: "stat3", label: "Stat 3", type: "text",
      selector: ".pcob-stat:nth-of-type(3) .pcob-stat-number" },
    { id: "label3", label: "Label 3", type: "text",
      selector: ".pcob-stat:nth-of-type(3) .pcob-stat-label" },

    { id: "numberFont", label: "Number Font", type: "select",
      options: ["pcob-font-gineso", "pcob-font-acherus", "pcob-font-crimson"],
      selector: ".pcob-stat-number" },

    { id: "numberCaps", label: "Number Case", type: "select",
      options: ["pcob-text-regular-case", "pcob-text-uppercase"],
      selector: ".pcob-stat-number" },

    { id: "labelFont", label: "Label Font", type: "select",
      options: ["pcob-font-gineso", "pcob-font-acherus", "pcob-font-crimson"],
      selector: ".pcob-stat-label" }
  ],

  defaults: {
    background: "pcob-light-maroon",
    stat1: "98%",
    label1: "Job Placement",
    stat2: "$105K",
    label2: "Average Starting Salary",
    stat3: "3:1",
    label3: "Student-to-Faculty Ratio",
    numberFont: "pcob-font-gineso",
    numberCaps: "pcob-text-regular-case",
    labelFont: "pcob-font-crimson"
  }
},

"alumni-stories": {
  label: "Alumni Stories (4-Up)",

  template: /*html*/`
    <div class="pcob-alumni-stories {{background}}">
      {{#each cards}}
      <div class="pcob-alumni-story" style="background-image: url('{{image}}')">
        <div class="pcob-alumni-overlay">
          <h3 class="{{headingFont}} {{headingCaps}}">{{heading}}</h3>
          <p class="{{bodyFont}}">{{subheading}}</p>
          <a href="{{url}}" class="pcob-button pcob-button--sm {{buttonColor}} {{buttonStyle}}">
            {{buttonLabel}}
          </a>
        </div>
      </div>
      {{/each}}
    </div>`,

  // We’ll flatten cards into individual fields for builder simplicity
  fields: [
    { id: "background", label: "Grid Background", type: "color",
      selector: ".pcob-alumni-stories" },

    { id: "headingFont", label: "Heading Font", type: "select",
      options: ["pcob-font-gineso", "pcob-font-acherus", "pcob-font-crimson"],
      selector: ".pcob-alumni-overlay h3" },

    { id: "headingCaps", label: "Heading Case", type: "select",
      options: ["pcob-text-regular-case", "pcob-text-uppercase"],
      selector: ".pcob-alumni-overlay h3" },

    { id: "bodyFont", label: "Body Font", type: "select",
      options: ["pcob-font-gineso", "pcob-font-acherus", "pcob-font-crimson"],
      selector: ".pcob-alumni-overlay p" },

    { id: "buttonStyle", label: "Button Style", type: "select",
      options: ["pcob-button", "pcob-button-flip", "pcob-button-swipe"],
      selector: ".pcob-alumni-overlay .pcob-button" },

    // Repeated card fields
    ...[1, 2, 3, 4].flatMap(i => ([
      { id: `image${i}`, label: `Image ${i}`, type: "text",
        selector: `.pcob-alumni-story:nth-of-type(${i})`, prop: "backgroundImage" },

      { id: `heading${i}`, label: `Title ${i}`, type: "text",
        selector: `.pcob-alumni-story:nth-of-type(${i}) h3` },

      { id: `subheading${i}`, label: `Subheading ${i}`, type: "text",
        selector: `.pcob-alumni-story:nth-of-type(${i}) p` },

      { id: `buttonLabel${i}`, label: `Button ${i} Label`, type: "text",
        selector: `.pcob-alumni-story:nth-of-type(${i}) .pcob-button` },

      { id: `url${i}`, label: `Button ${i} URL`, type: "text",
        selector: `.pcob-alumni-story:nth-of-type(${i}) .pcob-button`, attr: "href" },

      { id: `buttonColor${i}`, label: `Button ${i} Color`, type: "color",
        selector: `.pcob-alumni-story:nth-of-type(${i}) .pcob-button` }
    ]))
  ],

  defaults: {
    background: "pcob-light-grey",
    headingFont: "pcob-font-gineso",
    headingCaps: "pcob-text-regular-case",
    bodyFont: "pcob-font-crimson",
    buttonStyle: "pcob-button",

    image1: "/content/dam/cba_pamplin_vt_edu/img/alumni/alum1.jpg",
    heading1: "Alex Johnson",
    subheading1: "MSBA Class of 2022",
    buttonLabel1: "Read More",
    url1: "#",
    buttonColor1: "pcob-maroon",

    image2: "/content/dam/cba_pamplin_vt_edu/img/alumni/alum2.jpg",
    heading2: "Priya Menon",
    subheading2: "Deloitte, Analytics Consultant",
    buttonLabel2: "Read More",
    url2: "#",
    buttonColor2: "pcob-maroon",

    image3: "/content/dam/cba_pamplin_vt_edu/img/alumni/alum3.jpg",
    heading3: "James Rivera",
    subheading3: "Entrepreneur, Atlanta",
    buttonLabel3: "Read More",
    url3: "#",
    buttonColor3: "pcob-maroon",

    image4: "/content/dam/cba_pamplin_vt_edu/img/alumni/alum4.jpg",
    heading4: "Lin Zheng",
    subheading4: "AI Researcher, Google",
    buttonLabel4: "Read More",
    url4: "#",
    buttonColor4: "pcob-maroon"
  }
},

/* ===== Image Card Grid ==================================== */
"image-card": {
  label: "Image Cards (3-up)",

  template: /*html*/`
    <div class="pcob-image-card-grid">
      <!-- Card 1 -->
      <div class="pcob-image-card">
        <div class="pcob-image-card__img"
             style="background-image:url('{{img1}}')"></div>
        <div class="pcob-image-card__body">
          <h3 class="pcob-image-card__title">{{title1}}</h3>
          <p  class="pcob-image-card__text">{{text1}}</p>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="pcob-image-card">
        <div class="pcob-image-card__img"
             style="background-image:url('{{img2}}')"></div>
        <div class="pcob-image-card__body">
          <h3 class="pcob-image-card__title">{{title2}}</h3>
          <p  class="pcob-image-card__text">{{text2}}</p>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="pcob-image-card">
        <div class="pcob-image-card__img"
             style="background-image:url('{{img3}}')"></div>
        <div class="pcob-image-card__body">
          <h3 class="pcob-image-card__title">{{title3}}</h3>
          <p  class="pcob-image-card__text">{{text3}}</p>
        </div>
      </div>
    </div>`,

  /* === field set (unchanged) === */
  fields:[
    { id:"img1",  label:"Card 1 Image URL", type:"text",
      selector:".pcob-image-card:nth-of-type(1) .pcob-image-card__img",
      prop:"backgroundImage" },

    { id:"title1",label:"Card 1 Title",     type:"text",
      selector:".pcob-image-card:nth-of-type(1) .pcob-image-card__title" },

    { id:"text1", label:"Card 1 Body",      type:"textarea",
      selector:".pcob-image-card:nth-of-type(1) .pcob-image-card__text" },

    { id:"img2",  label:"Card 2 Image URL", type:"text",
      selector:".pcob-image-card:nth-of-type(2) .pcob-image-card__img",
      prop:"backgroundImage" },

    { id:"title2",label:"Card 2 Title",     type:"text",
      selector:".pcob-image-card:nth-of-type(2) .pcob-image-card__title" },

    { id:"text2", label:"Card 2 Body",      type:"textarea",
      selector:".pcob-image-card:nth-of-type(2) .pcob-image-card__text" },

    { id:"img3",  label:"Card 3 Image URL", type:"text",
      selector:".pcob-image-card:nth-of-type(3) .pcob-image-card__img",
      prop:"backgroundImage" },

    { id:"title3",label:"Card 3 Title",     type:"text",
      selector:".pcob-image-card:nth-of-type(3) .pcob-image-card__title" },

    { id:"text3", label:"Card 3 Body",      type:"textarea",
      selector:".pcob-image-card:nth-of-type(3) .pcob-image-card__text" }
  ],

  defaults:{
    img1:"/example/cville.jpg",
    title1:"Unparalleled Lifestyle",
    text1:"Opportunity abounds in the heart of Virginia …",

    img2:"/example/team.jpg",
    title2:"Top Hiring Companies",
    text2:"Amazon, American Express, Goldman Sachs …",

    img3:"/example/network.jpg",
    title3:"Darden Is Everywhere",
    text3:"Tapping into a global network of 19,000 alums …"
  }
},

};
