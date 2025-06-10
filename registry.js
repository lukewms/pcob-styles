export const COMPONENTS = {
  "3-1-image-band": {
    label: "3-1 Image Band",
    template: /* html */`
      <div class="pcob-3-1-image-band-stacking {{background}}">
        <div class="pcob-band-text">
          <h2 class="pcob-band-heading">{{heading}}</h2>
          <p class="pcob-band-body">{{body}}</p>
          <div>
            <a href="{{btn1Url}}" class="pcob-button pcob-button--md {{btn1Color}} {{buttonStyle}}">{{btn1Label}}</a>
            <a href="{{btn2Url}}" class="pcob-button pcob-button--md {{btn2Color}} {{buttonStyle}}">{{btn2Label}}</a>
          </div>
        </div>
        <div class="pcob-band-image-bg"
             style="background-image:url('{{imageUrl}}')"
             role="img"
             aria-label="{{altText}}">
        </div>
      </div>`,

    fields: [
      { id:"background",   label:"Background Color", type:"color",   selector:".pcob-3-1-image-band-stacking" },
      { id:"buttonStyle",  label:"Button Style",     type:"select",  options:["pcob-button","pcob-button-flip","pcob-button-swipe"], selector:".pcob-3-1-image-band-stacking .pcob-button" },
      { id:"imageUrl",     label:"Image URL",        type:"text",    selector:".pcob-band-image-bg",  prop:"backgroundImage" },
      { id:"altText",      label:"Alt Text",         type:"text",    selector:".pcob-band-image-bg",  attr:"aria-label" },
      { id:"heading",      label:"Heading",          type:"text",    selector:".pcob-band-heading" },
      { id:"body",         label:"Body Text",        type:"textarea",selector:".pcob-band-body" },
      { id:"btn1Label",    label:"Button 1 Label",   type:"text",    selector:".pcob-button:nth-of-type(1)" },
      { id:"btn1Url",      label:"Button 1 URL",     type:"text",    selector:".pcob-button:nth-of-type(1)", attr:"href" },
      { id:"btn1Color",    label:"Button 1 Color",   type:"color",   selector:".pcob-button:nth-of-type(1)" },
      { id:"btn2Label",    label:"Button 2 Label",   type:"text",    selector:".pcob-button:nth-of-type(2)" },
      { id:"btn2Url",      label:"Button 2 URL",     type:"text",    selector:".pcob-button:nth-of-type(2)", attr:"href" },
      { id:"btn2Color",    label:"Button 2 Color",   type:"color",   selector:".pcob-button:nth-of-type(2)" }
    ],

    defaults: {
      background:"pcob-black",
      buttonStyle:"pcob-button-flip",
      imageUrl:"/content/dam/…LWR69528_websize_Slate.jpg",
      altText:"Students stand and smile at Virginia Tech's Academic Building One in Alexandria, VA.",
      heading:"Hokies Help Hokies.",
      body:`Hokie alumni stay connected…`,
      btn1Label:"Explore Classes", btn1Url:"https://vt.edu", btn1Color:"pcob-maroon",
      btn2Label:"Alumni Network", btn2Url:"https://vt.edu", btn2Color:"pcob-maroon"
    }
  },

  "feature-bar": { /* same pattern */ }
};
