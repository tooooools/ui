import{d as s}from"./index-a63ea13e.js";import"./_commonjsHelpers-de833af9.js";var n="storybook/highlight",r="storybookHighlight",_=`${n}/add`,g=`${n}/reset`;const{addons:E}=__STORYBOOK_MODULE_PREVIEW_API__,{STORY_CHANGED:H}=__STORYBOOK_MODULE_CORE_EVENTS__;var{document:l}=s.global,O=(e="#FF4785",t="dashed")=>`
  outline: 2px ${t} ${e};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`,T=e=>({outline:`2px dashed ${e}`,outlineOffset:2,boxShadow:"0 0 0 6px rgba(255,255,255,0.6)"}),i=E.getChannel(),m=e=>{let t=r;d();let o=Array.from(new Set(e.elements)),h=l.createElement("style");h.setAttribute("id",t),h.innerHTML=o.map(a=>`${a}{
          ${O(e.color,e.style)}
         }`).join(" "),l.head.appendChild(h)},d=()=>{var o;let e=r,t=l.getElementById(e);t&&((o=t.parentNode)==null||o.removeChild(t))};i.on(H,d);i.on(g,d);i.on(_,m);export{T as highlightObject,O as highlightStyle};
//# sourceMappingURL=preview-af2210fa.js.map
