import{d as E}from"./index-a63ea13e.js";import{d as M}from"./index-633d3215.js";import"./_commonjsHelpers-de833af9.js";const{logger:x}=__STORYBOOK_MODULE_CLIENT_LOGGER__;var p="backgrounds",{document:s,window:B}=E.global,S=()=>B.matchMedia("(prefers-reduced-motion: reduce)").matches,_=(r,e=[],d)=>{if(r==="transparent")return"transparent";if(e.find(a=>a.value===r))return r;let t=e.find(a=>a.name===d);if(t)return t.value;if(d){let a=e.map(i=>i.name).join(", ");x.warn(M`
        Backgrounds Addon: could not find the default color "${d}".
        These are the available colors for your story based on your configuration:
        ${a}.
      `)}return"transparent"},v=r=>{(Array.isArray(r)?r:[r]).forEach(w)},w=r=>{let e=s.getElementById(r);e&&e.parentElement.removeChild(e)},A=(r,e)=>{let d=s.getElementById(r);if(d)d.innerHTML!==e&&(d.innerHTML=e);else{let t=s.createElement("style");t.setAttribute("id",r),t.innerHTML=e,s.head.appendChild(t)}},L=(r,e,d)=>{let t=s.getElementById(r);if(t)t.innerHTML!==e&&(t.innerHTML=e);else{let a=s.createElement("style");a.setAttribute("id",r),a.innerHTML=e;let i=`addon-backgrounds-grid${d?`-docs-${d}`:""}`,n=s.getElementById(i);n?n.parentElement.insertBefore(a,n):s.head.appendChild(a)}};const{useMemo:f,useEffect:k}=__STORYBOOK_MODULE_PREVIEW_API__;var O=(r,e)=>{var c;let{globals:d,parameters:t}=e,a=(c=d[p])==null?void 0:c.value,i=t[p],n=f(()=>i.disable?"transparent":_(a,i.values,i.default),[i,a]),o=f(()=>n&&n!=="transparent",[n]),g=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",u=f(()=>{let l="transition: background-color 0.3s;";return`
      ${g} {
        background: ${n} !important;
        ${S()?"":l}
      }
    `},[n,g]);return k(()=>{let l=e.viewMode==="docs"?`addon-backgrounds-docs-${e.id}`:"addon-backgrounds-color";if(!o){v(l);return}L(l,u,e.viewMode==="docs"?e.id:null)},[o,u,e]),r()},T=(r,e)=>{var y;let{globals:d,parameters:t}=e,a=t[p].grid,i=((y=d[p])==null?void 0:y.grid)===!0&&a.disable!==!0,{cellAmount:n,cellSize:o,opacity:g}=a,u=e.viewMode==="docs",c=t.layout===void 0||t.layout==="padded"?16:0,l=a.offsetX??(u?20:c),m=a.offsetY??(u?20:c),$=f(()=>{let b=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",h=[`${o*n}px ${o*n}px`,`${o*n}px ${o*n}px`,`${o}px ${o}px`,`${o}px ${o}px`].join(", ");return`
      ${b} {
        background-size: ${h} !important;
        background-position: ${l}px ${m}px, ${l}px ${m}px, ${l}px ${m}px, ${l}px ${m}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${g}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${g}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${g/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${g/2}) 1px, transparent 1px) !important;
      }
    `},[o]);return k(()=>{let b=e.viewMode==="docs"?`addon-backgrounds-grid-docs-${e.id}`:"addon-backgrounds-grid";if(!i){v(b);return}A(b,$)},[i,$,e]),r()},R=[T,O],G={[p]:{grid:{cellSize:20,opacity:.5,cellAmount:5},values:[{name:"light",value:"#F8F8F8"},{name:"dark",value:"#333333"}]}},Y={[p]:null};export{R as decorators,Y as globals,G as parameters};
//# sourceMappingURL=preview-c7a3414f.js.map
