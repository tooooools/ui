import{d}from"./index-72f598f6.js";import{i as A}from"./tiny-invariant-622d8941.js";var j="measureEnabled";const{useEffect:T}=__STORYBOOK_MODULE_PREVIEW_API__;function C(){let o=d.global.document.documentElement,t=Math.max(o.scrollHeight,o.offsetHeight);return{width:Math.max(o.scrollWidth,o.offsetWidth),height:t}}function K(){let o=d.global.document.createElement("canvas");o.id="storybook-addon-measure";let t=o.getContext("2d");A(t!=null);let{width:e,height:i}=C();return P(o,t,{width:e,height:i}),o.style.position="absolute",o.style.left="0",o.style.top="0",o.style.zIndex="2147483647",o.style.pointerEvents="none",d.global.document.body.appendChild(o),{canvas:o,context:t,width:e,height:i}}function P(o,t,{width:e,height:i}){o.style.width=`${e}px`,o.style.height=`${i}px`;let l=d.global.window.devicePixelRatio;o.width=Math.floor(e*l),o.height=Math.floor(i*l),t.scale(l,l)}var h={};function V(){h.canvas||(h=K())}function X(){h.context&&h.context.clearRect(0,0,h.width??0,h.height??0)}function Z(o){X(),o(h.context)}function U(){A(h.canvas,"Canvas should exist in the state."),A(h.context,"Context should exist in the state."),P(h.canvas,h.context,{width:0,height:0});let{width:o,height:t}=C();P(h.canvas,h.context,{width:o,height:t}),h.width=o,h.height=t}function G(){var o;h.canvas&&(X(),(o=h.canvas.parentNode)==null||o.removeChild(h.canvas),h={})}var b={margin:"#f6b26b",border:"#ffe599",padding:"#93c47d",content:"#6fa8dc",text:"#232020"},c=6;function R(o,{x:t,y:e,w:i,h:l,r:n}){t=t-i/2,e=e-l/2,i<2*n&&(n=i/2),l<2*n&&(n=l/2),o.beginPath(),o.moveTo(t+n,e),o.arcTo(t+i,e,t+i,e+l,n),o.arcTo(t+i,e+l,t,e+l,n),o.arcTo(t,e+l,t,e,n),o.arcTo(t,e,t+i,e,n),o.closePath()}function J(o,{padding:t,border:e,width:i,height:l,top:n,left:f}){let a=i-e.left-e.right-t.left-t.right,r=l-t.top-t.bottom-e.top-e.bottom,s=f+e.left+t.left,g=n+e.top+t.top;return o==="top"?s+=a/2:o==="right"?(s+=a,g+=r/2):o==="bottom"?(s+=a/2,g+=r):o==="left"?g+=r/2:o==="center"&&(s+=a/2,g+=r/2),{x:s,y:g}}function Q(o,t,{margin:e,border:i,padding:l},n,f){let a=m=>0,r=0,s=0,g=f?1:.5,u=f?n*2:0;return o==="padding"?a=m=>l[m]*g+u:o==="border"?a=m=>l[m]+i[m]*g+u:o==="margin"&&(a=m=>l[m]+i[m]+e[m]*g+u),t==="top"?s=-a("top"):t==="right"?r=a("right"):t==="bottom"?s=a("bottom"):t==="left"&&(r=-a("left")),{offsetX:r,offsetY:s}}function x(o,t){return Math.abs(o.x-t.x)<Math.abs(o.w+t.w)/2&&Math.abs(o.y-t.y)<Math.abs(o.h+t.h)/2}function tt(o,t,e){return o==="top"?t.y=e.y-e.h-c:o==="right"?t.x=e.x+e.w/2+c+t.w/2:o==="bottom"?t.y=e.y+e.h+c:o==="left"&&(t.x=e.x-e.w/2-c-t.w/2),{x:t.x,y:t.y}}function _(o,t,{x:e,y:i,w:l,h:n},f){return R(o,{x:e,y:i,w:l,h:n,r:3}),o.fillStyle=`${b[t]}dd`,o.fill(),o.strokeStyle=b[t],o.stroke(),o.fillStyle=b.text,o.fillText(f,e,i),R(o,{x:e,y:i,w:l,h:n,r:3}),o.fillStyle=`${b[t]}dd`,o.fill(),o.strokeStyle=b[t],o.stroke(),o.fillStyle=b.text,o.fillText(f,e,i),{x:e,y:i,w:l,h:n}}function O(o,t){o.font="600 12px monospace",o.textBaseline="middle",o.textAlign="center";let e=o.measureText(t),i=e.actualBoundingBoxAscent+e.actualBoundingBoxDescent,l=e.width+c*2,n=i+c*2;return{w:l,h:n}}function ot(o,t,{type:e,position:i="center",text:l},n,f=!1){let{x:a,y:r}=J(i,t),{offsetX:s,offsetY:g}=Q(e,i,t,c+1,f);a+=s,r+=g;let{w:u,h:m}=O(o,l);if(n&&x({x:a,y:r,w:u,h:m},n)){let v=tt(i,{x:a,y:r,w:u,h:m},n);a=v.x,r=v.y}return _(o,e,{x:a,y:r,w:u,h:m},l)}function et(o,{w:t,h:e}){let i=t*.5+c,l=e*.5+c;return{offsetX:(o.x==="left"?-1:1)*i,offsetY:(o.y==="top"?-1:1)*l}}function lt(o,t,{type:e,text:i}){let{floatingAlignment:l,extremities:n}=t,f=n[l.x],a=n[l.y],{w:r,h:s}=O(o,i),{offsetX:g,offsetY:u}=et(l,{w:r,h:s});return f+=g,a+=u,_(o,e,{x:f,y:a,w:r,h:s},i)}function E(o,t,e,i){let l=[];e.forEach((n,f)=>{let a=i&&n.position==="center"?lt(o,t,n):ot(o,t,n,l[f-1],i);l[f]=a})}function it(o,t,e,i){let l=e.reduce((n,f)=>{var a;return Object.prototype.hasOwnProperty.call(n,f.position)||(n[f.position]=[]),(a=n[f.position])==null||a.push(f),n},{});l.top&&E(o,t,l.top,i),l.right&&E(o,t,l.right,i),l.bottom&&E(o,t,l.bottom,i),l.left&&E(o,t,l.left,i),l.center&&E(o,t,l.center,i)}var S={margin:"#f6b26ba8",border:"#ffe599a8",padding:"#93c47d8c",content:"#6fa8dca8"},B=30;function p(o){return parseInt(o.replace("px",""),10)}function w(o){return Number.isInteger(o)?o:o.toFixed(2)}function L(o){return o.filter(t=>t.text!==0&&t.text!=="0")}function nt(o){let t={top:d.global.window.scrollY,bottom:d.global.window.scrollY+d.global.window.innerHeight,left:d.global.window.scrollX,right:d.global.window.scrollX+d.global.window.innerWidth},e={top:Math.abs(t.top-o.top),bottom:Math.abs(t.bottom-o.bottom),left:Math.abs(t.left-o.left),right:Math.abs(t.right-o.right)};return{x:e.left>e.right?"left":"right",y:e.top>e.bottom?"top":"bottom"}}function at(o){let t=d.global.getComputedStyle(o),{top:e,left:i,right:l,bottom:n,width:f,height:a}=o.getBoundingClientRect(),{marginTop:r,marginBottom:s,marginLeft:g,marginRight:u,paddingTop:m,paddingBottom:v,paddingLeft:k,paddingRight:F,borderBottomWidth:I,borderTopWidth:$,borderLeftWidth:D,borderRightWidth:N}=t;e=e+d.global.window.scrollY,i=i+d.global.window.scrollX,n=n+d.global.window.scrollY,l=l+d.global.window.scrollX;let y={top:p(r),bottom:p(s),left:p(g),right:p(u)},q={top:p(m),bottom:p(v),left:p(k),right:p(F)},z={top:p($),bottom:p(I),left:p(D),right:p(N)},W={top:e-y.top,bottom:n+y.bottom,left:i-y.left,right:l+y.right};return{margin:y,padding:q,border:z,top:e,left:i,bottom:n,right:l,width:f,height:a,extremities:W,floatingAlignment:nt(W)}}function ft(o,{margin:t,width:e,height:i,top:l,left:n,bottom:f,right:a}){let r=i+t.bottom+t.top;o.fillStyle=S.margin,o.fillRect(n,l-t.top,e,t.top),o.fillRect(a,l-t.top,t.right,r),o.fillRect(n,f,e,t.bottom),o.fillRect(n-t.left,l-t.top,t.left,r);let s=[{type:"margin",text:w(t.top),position:"top"},{type:"margin",text:w(t.right),position:"right"},{type:"margin",text:w(t.bottom),position:"bottom"},{type:"margin",text:w(t.left),position:"left"}];return L(s)}function rt(o,{padding:t,border:e,width:i,height:l,top:n,left:f,bottom:a,right:r}){let s=i-e.left-e.right,g=l-t.top-t.bottom-e.top-e.bottom;o.fillStyle=S.padding,o.fillRect(f+e.left,n+e.top,s,t.top),o.fillRect(r-t.right-e.right,n+t.top+e.top,t.right,g),o.fillRect(f+e.left,a-t.bottom-e.bottom,s,t.bottom),o.fillRect(f+e.left,n+t.top+e.top,t.left,g);let u=[{type:"padding",text:t.top,position:"top"},{type:"padding",text:t.right,position:"right"},{type:"padding",text:t.bottom,position:"bottom"},{type:"padding",text:t.left,position:"left"}];return L(u)}function st(o,{border:t,width:e,height:i,top:l,left:n,bottom:f,right:a}){let r=i-t.top-t.bottom;o.fillStyle=S.border,o.fillRect(n,l,e,t.top),o.fillRect(n,f-t.bottom,e,t.bottom),o.fillRect(n,l+t.top,t.left,r),o.fillRect(a-t.right,l+t.top,t.right,r);let s=[{type:"border",text:t.top,position:"top"},{type:"border",text:t.right,position:"right"},{type:"border",text:t.bottom,position:"bottom"},{type:"border",text:t.left,position:"left"}];return L(s)}function ht(o,{padding:t,border:e,width:i,height:l,top:n,left:f}){let a=i-e.left-e.right-t.left-t.right,r=l-t.top-t.bottom-e.top-e.bottom;return o.fillStyle=S.content,o.fillRect(f+e.left+t.left,n+e.top+t.top,a,r),[{type:"content",position:"center",text:`${w(a)} x ${w(r)}`}]}function gt(o){return t=>{if(o&&t){let e=at(o),i=ft(t,e),l=rt(t,e),n=st(t,e),f=ht(t,e),a=e.width<=B*3||e.height<=B;it(t,e,[...f,...l,...n,...i],a)}}}function dt(o){Z(gt(o))}var mt=(o,t)=>{let e=d.global.document.elementFromPoint(o,t),i=l=>{if(l&&l.shadowRoot){let n=l.shadowRoot.elementFromPoint(o,t);return l.isEqualNode(n)?l:n.shadowRoot?i(n):n}return l};return i(e)||e},H,M={x:0,y:0};function Y(o,t){H=mt(o,t),dt(H)}var ut=(o,t)=>{let{measureEnabled:e}=t.globals;return T(()=>{let i=l=>{window.requestAnimationFrame(()=>{l.stopPropagation(),M.x=l.clientX,M.y=l.clientY})};return document.addEventListener("pointermove",i),()=>{document.removeEventListener("pointermove",i)}},[]),T(()=>{let i=n=>{window.requestAnimationFrame(()=>{n.stopPropagation(),Y(n.clientX,n.clientY)})},l=()=>{window.requestAnimationFrame(()=>{U()})};return t.viewMode==="story"&&e&&(document.addEventListener("pointerover",i),V(),window.addEventListener("resize",l),Y(M.x,M.y)),()=>{window.removeEventListener("resize",l),G()}},[e,t.viewMode]),o()},bt=[ut],wt={[j]:!1};export{bt as decorators,wt as globals};
//# sourceMappingURL=preview-99dbe8be.js.map