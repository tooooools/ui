import{d as u}from"./index-72f598f6.js";import{d as a}from"./index-633d3215.js";import{S as p,e as l,a as y}from"./index-85971d2f.js";import"./_baseToString-91e72383.js";const{simulatePageLoad:m,simulateDOMContentLoaded:g}=__STORYBOOK_MODULE_PREVIEW_API__;var{Node:_}=u.global,A=(r,e)=>{let{id:i,component:o}=e;if(typeof o=="string"){let t=o;return Object.keys(r).forEach(n=>{t=t.replace(`{{${n}}}`,r[n])}),t}if(o instanceof HTMLElement){let t=o.cloneNode(!0);return Object.keys(r).forEach(n=>{t.setAttribute(n,typeof r[n]=="string"?r[n]:JSON.stringify(r[n]))}),t}if(typeof o=="function")return o(r,e);throw console.warn(a`
    Storybook's HTML renderer only supports rendering DOM elements and strings.
    Received: ${o}
  `),new Error(`Unable to render story ${i}`)};function C({storyFn:r,kind:e,name:i,showMain:o,showError:t,forceRemount:n},s){let d=r();if(o(),typeof d=="string")s.innerHTML=d,m(s);else if(d instanceof _){if(s.firstChild===d&&n===!1)return;s.innerHTML="",s.appendChild(d),g()}else t({title:`Expecting an HTML snippet or DOM node from the story: "${i}" of "${e}".`,description:a`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}const{useEffect:h,addons:E}=__STORYBOOK_MODULE_PREVIEW_API__;function O(r){var o;let e=(o=r==null?void 0:r.parameters.docs)==null?void 0:o.source,i=r==null?void 0:r.parameters.__isArgsStory;return(e==null?void 0:e.type)===p.DYNAMIC?!1:!i||(e==null?void 0:e.code)||(e==null?void 0:e.type)===p.CODE}function c(r,e){var n,s;let i=r(),o=(s=(n=e==null?void 0:e.parameters.docs)==null?void 0:n.source)!=null&&s.excludeDecorators?e.originalStoryFn(e.args,e):i,t;return O(e)||(typeof o=="string"?t=o:o instanceof Element&&(t=o.outerHTML)),h(()=>{let{id:d,unmappedArgs:f}=e;t&&E.getChannel().emit(y,{id:d,args:f,source:t})}),i}var R=[c],D={docs:{story:{inline:!0},source:{type:p.DYNAMIC,language:"html",code:void 0,excludeDecorators:void 0}}},H=[l],I={renderer:"html",...D};export{H as argTypesEnhancers,R as decorators,I as parameters,A as render,C as renderToCanvas};
//# sourceMappingURL=config-bb24bdcc.js.map