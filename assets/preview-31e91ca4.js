import{d as s}from"./index-72f598f6.js";var n="storybook/highlight",a="storybookHighlight",_=`${n}/add`,g=`${n}/reset`;const{addons:E}=__STORYBOOK_MODULE_PREVIEW_API__,{STORY_CHANGED:H}=__STORYBOOK_MODULE_CORE_EVENTS__;var{document:l}=s.global,O=(e="#FF4785",t="dashed")=>`
  outline: 2px ${t} ${e};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`,I=e=>({outline:`2px dashed ${e}`,outlineOffset:2,boxShadow:"0 0 0 6px rgba(255,255,255,0.6)"}),i=E.getChannel(),m=e=>{let t=a;d();let o=Array.from(new Set(e.elements)),h=l.createElement("style");h.setAttribute("id",t),h.innerHTML=o.map(r=>`${r}{
          ${O(e.color,e.style)}
         }`).join(" "),l.head.appendChild(h)},d=()=>{var o;let e=a,t=l.getElementById(e);t&&((o=t.parentNode)==null||o.removeChild(t))};i.on(H,d);i.on(g,d);i.on(_,m);export{I as highlightObject,O as highlightStyle};
//# sourceMappingURL=preview-31e91ca4.js.map
