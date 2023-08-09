import{g as N}from"./_commonjsHelpers-de833af9.js";function x(e,t){const s={};return s.vnode=!0,s.type=e,s.props=t||{},s.children=[].concat.apply([],[].slice.call(arguments,2)),s.isInstance=e&&e.template&&typeof e.template=="function",s.isComponent=typeof e=="function"&&e.prototype&&typeof e.prototype.render=="function",s.isStateless=typeof e=="function"&&!s.isComponent,s.isDom=typeof e=="string",s}x.f=e=>e.children;function b(e,t){for(const s in t)e[s]=t[s];return e}function _(){}function R(e,t,s,n){if(n)return{log:_,warn:_,error:_};const r=[];e=e.toUpperCase(),r.push(`%c ${e} `);let o="font-weight:bold;";return t&&(o+=`color:${t};`),s&&(o+=`background-color:${s}`),r.push(o),{log:console.log.bind(console,...r),warn:console.warn.bind(console,...r),error:console.error.bind(console,...r)}}const w=["nodes","components","refs","domEvents","storeEvents"];class u{constructor(){this.data={};for(let t=0;t<w.length;t++)this.data[w[t]]=[]}append(t){for(const s in t)this.data[s]=this.data[s].concat(t[s])}set(t){for(const s in t)this.data[s]=t[s]}get(){return this.data}}const d=["xlink","xmlns","xml"],v=new Set(["placeholder","autoplay","muted","for","webkit-playsinline","playsinline","selected"]);let g;const f=(e,t)=>e.substr(0,t.length)===t,D=e=>(t,s)=>s.classList.toggle(e,t||!1),y=(e="textContent",t)=>(s,n)=>{if(t&&e!==(e=e.replace(/^xlink:?/,"")))n.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),s);else{if(s===void 0){n.removeAttribute(e);return}g=s??"",t||(n[e]=g),(t||v.has(e)||f(e,"data-"))&&n.setAttribute(e,g)}};function M(e,t,s,n,r){if(s!==void 0&&!(t==="__self"||t==="__source")){t==="className"&&(t="class");for(let o=0;o<d.length;o++)if(f(t,d[o])){const i=d[o].length;t[i]&&t[i]!==":"&&(t=d[o]+":"+t[i].toLowerCase()+t.substr(i+1,t.length));break}if(t!=="ref"){if(f(t,"event-")){const o=t.toLowerCase().substring(6);n.append({domEvents:[{el:e,evt:o,fn:s}]})}else if(t==="store"){const o=Array.isArray(s)?s:[s],i=[];for(let c=0,l=o.length;c<l;c++){const h=Array.isArray(o[c])?o[c]:[o[c]],E=h[0],m=h[1],L=h[2]!==void 0?h[2]:!0;E&&i.push({store:E,fn:m,init:L,el:e})}n.append({storeEvents:i})}else if(f(t,"store-class-")){const o=t.substring(12),i=D(o);n.append({storeEvents:[{store:s,init:!0,fn:i,el:e}]})}else if(f(t,"store-")){let o=t.substring(6);o==="text"&&(o="textContent");const i=y(o,r);n.append({storeEvents:[{store:s,init:!0,fn:i,el:e}]})}else if(!(typeof s=="function"&&f(t,"on")))if(t==="class"&&!r)e.className=s||"";else if(t==="style")typeof s=="object"?b(e.style,s):typeof s=="string"&&(e.style.cssText=s);else if(t!=="list"&&t!=="type"&&!r&&t in e)try{y(t,r)(s,e)}catch{}else typeof s!="object"&&typeof s!="function"&&y(t,r)(s,e)}}}function k(e){return Array.isArray(e)?e:[e]}function p(e,t){if(Array.isArray(e))return $(e,t);if(e instanceof window.Element)return P(e);if(e===null||typeof e!="object"||!e.vnode)return j(e);const s=b(b({},e.props),{children:[].concat.apply([],e.children||[])});if(e.isDom)return O(e,s,t);if(e.isInstance)return A(e,s,t,!0);if(e.isStateless)return S(e,s,t);if(e.isComponent)return A(e,s,t)}function $(e,t){e=k(e);const s=new u;for(let n=0;n<e.length;n++)s.append(p(e[n],t));return s.get()}function j(e){const t=new u;return e==null||e===!1||t.append({nodes:document.createTextNode(e+"")}),t.get()}function O(e,t,s){const n=new u;let r=[];e.type==="svg"&&(s=!0);for(let i=0;i<t.children.length;i++){const c=p(t.children[i],s);c.nodes&&(r=r.concat(c.nodes),n.append({components:c.components,refs:c.refs,domEvents:c.domEvents,storeEvents:c.storeEvents}))}const o=s?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type);for(const i in e.props)M(o,i,e.props[i],n,s);for(let i=0;i<r.length;i++)o.appendChild(r[i]);return t.ref&&n.append({refs:{ref:o,fn:t.ref}}),n.append({nodes:o}),n.get()}function P(e){const t=new u;return t.append({nodes:e}),t.get()}function S(e,t,s){const n=new u,r=e.type(t);return n.append(p(r,s)),n.get()}function A(e,t,s,n=!1){const r=new u,o=n?e.type:new e.type(t);n&&(t=o.props),o.beforeRender(t);const i=o.template(t,o.state||{});t.ref&&r.append({refs:{ref:o,fn:t.ref}}),r.append(p(i,s));const c=r.data.nodes;o.base=c.length>1?c:c[0];for(const l in r.data)l!=="nodes"&&(o._collector[l]||(o._collector[l]=[]),o._collector[l]=o._collector[l].concat(r.data[l]));r.set({components:[o],refs:[],domEvents:[],storeEvents:[]});for(let l=0;l<o._collector.components.length;l++)o._collector.components[l]._parent=o;return r.get()}function a(e,t,s){const n=e._collector&&e._collector.components;if(s&&t(e),n)for(let r=0;r<n.length;r++)a(n[r],t);s||t(e)}function T(e){for(let t=0;t<e._collector.refs.length;t++)e._collector.refs[t].fn(e._collector.refs[t].ref),e._collector.refs[t].ref=null}function F(e){for(let t=0;t<e._collector.storeEvents.length;t++){const s=e._collector.storeEvents[t],n=s.fn;s.fn=function(r){n(r,s.el)},s.store.subscribe(s.fn),s.init&&s.fn(s.store.current)}}function H(e){e.test&&console.log("call dom listeners",e._collector.domEvents);for(let t=0;t<e._collector.domEvents.length;t++){const s=e._collector.domEvents[t];s.el.addEventListener(s.evt,s.fn)}}function I(e){a(e,T)}function U(e){a(e,H),a(e,F)}const W=new Set(["g","svg","defs"]);function Y(e,t=document.body,s){let n=0;const r=p(e,t&&W.has(t.tagName));let o={_collector:r};if(I(o),a(o,function(i){i.afterRender&&i.afterRender(i.props)}),typeof t=="function"){const i=r.nodes.length<2?r.nodes[0]:r.nodes;t(i)}else if(t)for(n=0;n<r.nodes.length;n++)t.appendChild(r.nodes[n]);if((!s||s.mounted)&&(U(o),a(o,function(i){i.mounted=!0,i.afterMount&&i.afterMount(i.props)})),s&&s._collector){const i=s._collector;for(n=0;n<r.components.length;n++)r.components[n]._parent=s;i.refs&&(i.refs=i.refs.concat(r.refs)),i.components&&(i.components=i.components.concat(r.components)),i.domEvents&&(i.domEvents=i.domEvents.concat(r.domEvents)),i.storeEvents&&(i.storeEvents=i.storeEvents.concat(r.storeEvents))}return o=void 0,r}class B{constructor(t={}){this._parent=null,this._collector={refs:[],components:[],domEvents:[],storeEvents:[]},this._storeListeners=[],this.refs={},this.state={},this.store={},this.props=t||{},this.base=null,this.mounted=!1,this.destroyed=!1;const s=t.name||this.constructor.name||"Component",{log:n,warn:r,error:o}=R(s,"white","#000",t.disableLog);this.log=n,this.warn=r,this.error=o}storeSubscribe(t,s,n,r=!0){t.subscribe(s,n),this._storeListeners.push([t,s,n]),r&&s.call(n,t.current)}template(){}beforeRender(){}afterRender(){}afterMount(){}beforeDestroy(){}ref(t){const s=this;return function(r){s.refs[t]=r}}refArray(t,s=!1){const n=this.refs[t]||(this.refs[t]=[]);let r=n.length,o,i;return s&&(o=this.refs.__pools||(this.refs.__pools={}),i=o[t]||(o[t]=[]),i.length&&(r=i.pop())),n[r]=null,function(l){n[r]=l,s&&i.push(r)}}refMap(t,s){const n=this.refs[s]||(this.refs[s]=new Map);return function(o){o?n.set(t,o):n.delete(t)}}render(t,s){return Y(t,s,this)}destroy(){let t=0;for(this.beforeDestroy(this.props),t=this._collector.domEvents.length-1;t>=0;t--){const n=this._collector.domEvents[t];n.el.removeEventListener(n.evt,n.fn)}for(t=this._collector.storeEvents.length-1;t>=0;t--){const n=this._collector.storeEvents[t];n.store.unsubscribe(n.fn)}for(t=this._storeListeners.length-1;t>=0;t--){const n=this._storeListeners[t];n[0].unsubscribe(n[1],n[2])}for(t=this._collector.components.length-1;t>=0;t--)this._collector.components[t].destroy();if(this.mounted=!1,this.destroyed=!0,this._parent){const n=this._parent._collector.components.indexOf(this);~n&&this._parent._collector.components.splice(n,1),this._parent=null}for(t=this._collector.refs.length-1;t>=0;t--)this._collector.refs[t].fn(null),this._collector.refs.splice(t,1);let s=Array.isArray(this.base)?this.base:[this.base];for(t=0;t<s.length;t++)s[t]&&s[t].parentNode&&s[t].parentNode.removeChild(s[t]);this.base=s=null,this.props=null,this.state=null,this.store=null,this.refs=null,this._storeListeners=null}}var C={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var t={}.hasOwnProperty;function s(){for(var n=[],r=0;r<arguments.length;r++){var o=arguments[r];if(o){var i=typeof o;if(i==="string"||i==="number")n.push(o);else if(Array.isArray(o)){if(o.length){var c=s.apply(null,o);c&&n.push(c)}}else if(i==="object"){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){n.push(o.toString());continue}for(var l in o)t.call(o,l)&&o[l]&&n.push(l)}}}return n.join(" ")}e.exports?(s.default=s,e.exports=s):window.classNames=s})()})(C);var q=C.exports;const G=N(q);export{B as C,G as c,x as h,_ as n,Y as r};
//# sourceMappingURL=index-1cc398c4.js.map
