"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("./Component-5ef97f35.cjs"),t=require("./ensure-1c6e4abe.cjs"),L="ui-backdrop-1epgy106",E={backdrop:L,"loader-spin":"ui-loader-spin-1epgy1"};function M(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var y={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(a){(function(){var e={}.hasOwnProperty;function s(){for(var i=[],o=0;o<arguments.length;o++){var l=arguments[o];if(l){var c=typeof l;if(c==="string"||c==="number")i.push(l);else if(Array.isArray(l)){if(l.length){var d=s.apply(null,l);d&&i.push(d)}}else if(c==="object"){if(l.toString!==Object.prototype.toString&&!l.toString.toString().includes("[native code]")){i.push(l.toString());continue}for(var h in l)e.call(l,h)&&l[h]&&i.push(h)}}}return i.join(" ")}a.exports?(s.default=s,a.exports=s):window.classNames=s})()})(y);var I=y.exports;const r=M(I);class C extends n.Component{beforeRender(e){this.close=this.close.bind(this),this.captureEscapeKey=this.captureEscapeKey.bind(this),this.state={lastActiveElement:document.activeElement}}template(e,s){return n.h("div",{id:e.id,class:r(E.backdrop,e.class),"event-click":i=>(e["event-click"]??n.noop)(i,this)},e.children)}afterMount(){this.state.lastActiveElement&&this.state.lastActiveElement.blur(),window.addEventListener("keyup",this.captureEscapeKey),(this.props["event-open"]??n.noop)(null,this)}captureEscapeKey(e){e.key==="Escape"&&this.close()}close(){(this.props["event-close"]||n.noop)(null,this),this.destroy()}beforeDestroy(){if(!this.destroyed&&(window.removeEventListener("keyup",this.captureEscapeKey),this.state&&this.state.lastActiveElement)){const e=this.state.lastActiveElement;window.setTimeout(()=>e.focus(),0)}}}const R="ui-button-abb5k106",j="ui-button__icon-abb5k167",z="ui-button__label-abb5k199",_={button:R,"is-hidden":"is-hidden","is-disabled":"is-disabled","is-active":"is-active","is-waiting":"is-waiting",button__icon:j,"has-icon":"has-icon","loader-spin":"ui-loader-spin-abb5k1",button__label:z};class u extends n.Component{beforeRender(e){this.handleClick=this.handleClick.bind(this),this.state={label:t.ensure(t.writable)(e["store-label"],e.label),title:t.ensure(t.writable)(e["store-title"],e.title),icon:t.ensure(t.writable)(e["store-icon"],e.icon),active:t.ensure(t.writable)(e["store-active"],e.active),disabled:t.ensure(t.writable)(e["store-disabled"],e.disabled),hidden:t.ensure(t.writable)(e["store-hidden"],e.hidden),waiting:t.ensure(t.writable)(e["store-waiting"],e.waiting)}}template(e,s){return n.h("button",{type:e.type,id:e.id,class:r(_.button,e.class),"store-title":s.title,"store-class-has-icon":s.icon,"store-class-is-active":s.active,"store-class-is-disabled":s.disabled,"store-class-is-hidden":s.hidden,"store-class-is-waiting":s.waiting,"event-click":this.handleClick,"event-mouseenter":i=>(e["event-mouseenter"]??n.noop)(i,this),"event-mouseleave":i=>(e["event-mouseleave"]??n.noop)(i,this)},n.h("span",{ref:this.ref("icon"),class:_.button__icon,"store-innerHTML":s.icon}),n.h("label",{class:_.button__label,"store-text":s.label}))}async handleClick(e){if(this.base.blur(),this.state.waiting.get())return e.preventDefault();this.state.waiting.set(!0),await(this.props["event-click"]??n.noop)(e,this),this.mounted&&(this.state.waiting.set(!1),this&&this.refs&&this.refs.icon&&(this.refs.icon.style.animation="none",this.refs.icon.offsetHeight,this.refs.icon.style.animation=null))}}const $="ui-modal-6zzd4106",A="ui-modal__header-6zzd4116",D="ui-modal__title-6zzd4122",S="ui-modal__content-6zzd4126",v={modal:$,modal__header:A,modal__title:D,modal__content:S,"loader-spin":"ui-loader-spin-6zzd41"},B=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;class O extends n.Component{beforeRender(e){this.handleClose=this.handleClose.bind(this),this.state={title:t.ensure(t.writable)(e["store-title"],e.title),tabs:t.ensure(t.writable)(e["store-tabs"],e.tabs),locked:t.ensure(t.writable)(e["store-locked"],e.locked)}}template(e,s){return n.h(C,{ref:this.ref("backdrop"),"event-open":e["event-open"],"event-close":e["event-close"]},n.h("div",{id:e.id,class:r(v.modal,e.class),"event-mouseenter":i=>(e["event-mouseenter"]??n.noop)(i,this),"event-mouseleave":i=>(e["event-mouseleave"]??n.noop)(i,this)},n.h("header",{class:v.modal__header},n.h(u,{class:v.modal__title,icon:e.icon,"store-label":s.title}),n.h(u,{class:v.modal__close,icon:B,"store-hidden":s.locked,"event-click":this.handleClose})),n.h("div",{class:v.modal__content},e.children)))}handleClose(){this.state.locked.get()||this.refs.backdrop.close()}}const H="ui-picker-1w9rr106",K="ui-picker__toolbar-1w9rr127",P="ui-picker__toggle-1w9rr140",m={picker:H,"is-hidden":"is-hidden","is-disabled":"is-disabled",picker__toolbar:K,"is-open":"is-open","is-active":"is-active",picker__toggle:P,"loader-spin":"ui-loader-spin-1w9rr1"},q=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,N=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,F="ui-toolbar-1fqit106",G={toolbar:F,"is-hidden":"is-hidden","is-disabled":"is-disabled","is-compact":"is-compact","loader-spin":"ui-loader-spin-1fqit1"};class x extends n.Component{beforeRender(e){this.state={compact:t.ensure(t.writable)(e["store-compact"],e.compact),disabled:t.ensure(t.writable)(e["store-disabled"],e.disabled),hidden:t.ensure(t.writable)(e["store-hidden"],e.hidden)}}template(e,s){return n.h("div",{id:e.id,class:r(G.toolbar,e.class),"store-class-is-compact":s.compact,"store-class-is-disabled":s.disabled,"store-class-is-hidden":s.hidden,"event-mouseenter":i=>(e["event-mouseenter"]??n.noop)(i,this),"event-mouseleave":i=>(e["event-mouseleave"]??n.noop)(i,this)},e.children)}}class J extends n.Component{beforeRender(e){this.handleToggle=this.handleToggle.bind(this);const s=e.children.filter(i=>i.type===u);for(const i of s)i.props.ref=this.refArray("buttons"),i.props["event-click"]=this.handleChange(s.indexOf(i),i.props["event-click"]||n.noop);this.state={label:t.ensure(t.writable)(e["store-label"],e.label),title:t.ensure(t.writable)(e["store-title"],e.title),open:t.ensure(t.writable)(e["store-open"],e.open),disabled:t.ensure(t.writable)(e["store-disabled"],e.disabled),hidden:t.ensure(t.writable)(e["store-hidden"],e.hidden)},this.state.toggleIcon=t.derived(this.state.open,()=>this.state.open.current?q:N)}template(e,s){return n.h("div",{id:e.id,class:r(m.picker,e.class),"store-class-is-open":s.open,"store-class-is-disabled":s.disabled,"store-class-is-hidden":s.hidden,"event-mouseenter":i=>(e["event-mouseenter"]??n.noop)(i,this),"event-mouseleave":i=>(e["event-mouseleave"]??n.noop)(i,this)},n.h(x,{class:m.picker__toolbar,compact:!0},e.children),n.h(u,{class:m.picker__toggle,"store-icon":s.toggleIcon,"store-label":s.label,"store-title":s.title,"event-click":this.handleToggle}))}handleToggle(){this.state.open.update(e=>!e)}handleChange(e,s){return async i=>{for(let o=0;o<this.refs.buttons.length;o++)this.refs.buttons[o].state.active.set(o===e);this.state.open.set(!1),(this.props["event-change"]??n.noop)(null,this),await s(i,this.refs.buttons[e])}}}const Q="ui-range-1eiot106",U="ui-range__icon-1eiot135",V="ui-range__label-1eiot152",w={range:Q,"is-hidden":"is-hidden","is-disabled":"is-disabled",range__icon:U,range__label:V,"loader-spin":"ui-loader-spin-1eiot1"};function p(a,e,s){var i,o,l,c,d;e==null&&(e=100);function h(){var b=Date.now()-c;b<e&&b>=0?i=setTimeout(h,e-b):(i=null,s||(d=a.apply(l,o),l=o=null))}var f=function(){l=this,o=arguments,c=Date.now();var b=s&&!i;return i||(i=setTimeout(h,e)),b&&(d=a.apply(l,o),l=o=null),d};return f.clear=function(){i&&(clearTimeout(i),i=null)},f.flush=function(){i&&(d=a.apply(l,o),l=o=null,clearTimeout(i),i=null)},f}p.debounce=p;var W=p;class X extends n.Component{beforeRender(e){this.handleInput=e.debounce?W.debounce(this.handleInput.bind(this),e.debounce):this.handleInput.bind(this),this.state={label:t.ensure(t.writable)(e["store-label"],e.label),title:t.ensure(t.writable)(e["store-title"],e.title),value:t.ensure(t.writable)(e["store-value"],e.value),min:t.ensure(t.writable)(e["store-min"],e.min),max:t.ensure(t.writable)(e["store-max"],e.max),step:t.ensure(t.writable)(e["store-step"],e.step),disabled:t.ensure(t.writable)(e["store-disabled"],e.disabled),hidden:t.ensure(t.writable)(e["store-hidden"],e.hidden)}}template(e,s){return n.h("div",{id:e.id,class:r(w.range,e.class),"store-class-is-disabled":s.disabled,"store-class-is-hidden":s.hidden,"event-mouseenter":i=>(e["event-mouseenter"]??n.noop)(i,this),"event-mouseleave":i=>(e["event-mouseleave"]??n.noop)(i,this)},e.icon&&n.h("span",{ref:this.ref("icon"),class:w.range__icon,innerHTML:e.icon}),n.h("input",{ref:this.ref("input"),type:"range","store-min":s.min,"store-max":s.max,"store-step":s.step,"store-title":s.title,"store-value":s.value,"store-disabled":s.disabled,"event-input":this.handleInput}),n.h("label",{class:w.range__label,"store-text":s.label}))}async handleInput(e){await(this.props["event-input"]??n.noop)(e,this),this.state.value.set(+this.refs.input.value)}}const Y="ui-select-1p5rg106",Z="ui-select__icon-1p5rg135",ee="ui-select__arrow-1p5rg170",k={select:Y,"is-hidden":"is-hidden","is-disabled":"is-disabled",select__icon:Z,select__arrow:ee,"loader-spin":"ui-loader-spin-1p5rg1"},te=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;class se extends n.Component{static get separator(){return{label:"",disabled:!0}}beforeRender(e){this.update=this.update.bind(this),this.handleChange=this.handleChange.bind(this),this.state={title:t.ensure(t.writable)(e["store-title"],e.title),value:t.ensure(t.writable)(e["store-value"],e.value),options:t.ensure(t.writable)(e["store-options"],e.options),disabled:t.ensure(t.writable)(e["store-disabled"],e.disabled),hidden:t.ensure(t.writable)(e["store-hidden"],e.hidden)},this.state.selectedIndex=t.derived([this.state.value,this.state.options],()=>this.state.options.get().findIndex(({value:i})=>i===this.state.value.current))}template(e,s){return n.h("div",{id:e.id,class:r(k.select,e.class),"store-class-is-disabled":s.disabled,"store-class-is-hidden":s.hidden,"event-mouseenter":i=>(e["event-mouseenter"]??n.noop)(i,this),"event-mouseleave":i=>(e["event-mouseleave"]??n.noop)(i,this)},e.icon&&n.h("span",{ref:this.ref("icon"),class:k.select__icon,innerHTML:e.icon}),n.h("select",{ref:this.ref("select"),"store-title":s.title,"store-disabled":s.disabled,"event-change":this.handleChange}),n.h("span",{class:k.select__arrow,innerHTML:te}))}afterRender(){this.state.value.subscribe(this.update),this.state.options.subscribe(this.update),this.update()}clear(){this.refs.select.innerHTML=""}update(){this.clear();const e=this.state.options.get();if(!e)return;const s=this.state.selectedIndex.get();this.props.placeholder&&this.render(n.h("option",{disabled:!0,selected:this.state.value.current===void 0||s<0},this.props.placeholder),this.refs.select),this.render(e.map(({label:i,disabled:o}={},l)=>n.h("option",{value:l,disabled:o,selected:l===s},i)),this.refs.select)}handleChange(e){var i;const s=+e.target.value;this.state.selectedIndex.set(s),this.state.value.set((i=(this.state.options.get()||[])[s])==null?void 0:i.value),(this.props["event-change"]||n.noop)(e,this)}beforeDestroy(){this.state.value.unsubscribe(this.update),this.state.options.unsubscribe(this.update)}}const ie="ui-tabs-17euv106",ne="ui-tabs__toggles-17euv109",le="ui-tabs__panels-17euv112",ae="ui-tabs__panel-17euv112",g={tabs:ie,tabs__toggles:ne,tabs__panels:le,tabs__panel:ae,"is-hidden":"is-hidden","loader-spin":"ui-loader-spin-17euv1"},oe="ui-toggles-1ibi8106",de={toggles:oe,"is-hidden":"is-hidden","is-disabled":"is-disabled","loader-spin":"ui-loader-spin-1ibi81"};class T extends n.Component{beforeRender(e){this.update=this.update.bind(this),this.handleChange=this.handleChange.bind(this),this.state={title:t.ensure(t.writable)(e["store-title"],e.title),value:t.ensure(t.writable)(e["store-value"],e.value),options:t.ensure(t.writable)(e["store-options"],e.options??[]),disabled:t.ensure(t.writable)(e["store-disabled"],e.disabled),hidden:t.ensure(t.writable)(e["store-hidden"],e.hidden)}}template(e,s){return n.h("div",{id:e.id,class:r(de.toggles,e.class),"store-title":s.title,"store-class-is-disabled":s.disabled,"store-class-is-hidden":s.hidden,"event-mouseenter":i=>(e["event-mouseenter"]??n.noop)(i,this),"event-mouseleave":i=>(e["event-mouseleave"]??n.noop)(i,this)})}afterRender(){this.state.value.subscribe(this.update),this.state.options.subscribe(this.update),this.update()}clear(){this.refs.buttons&&(this.refs.buttons.forEach(e=>e==null?void 0:e.destroy()),delete this.refs.buttons)}update(){this.clear();const e=this.state.options.get();e&&this.render(e.map(({icon:s,value:i,label:o,disabled:l,hidden:c}={},d)=>n.h(u,{ref:this.refArray("buttons"),icon:s,"store-label":o??i??d,"store-active":(i??d)===this.state.value.current,"store-disabled":l,"store-hidden":c,"event-click":this.handleChange(i??d)})),this.base)}handleChange(e){return s=>{this.state.value.set(e),(this.props["event-change"]||n.noop)(s,this)}}beforeDestroy(){this.state.value.unsubscribe(this.update),this.state.options.unsubscribe(this.update)}}class re extends n.Component{static panel(e,s){return n.h("div",{class:g.tabs__panel,...s},e)}beforeRender(e){this.update=this.update.bind(this),this.state={value:t.ensure(t.writable)(e["store-value"],e.value??0),tabs:t.ensure(t.writable)(e["store-tabs"],e.tabs)}}template(e,s){return n.h("div",{id:e.id,class:r(g.tabs,e.class)},n.h(T,{class:g.tabs__toggles,"store-value":s.value,"store-options":s.tabs,"event-change":e["event-change"]}),n.h("div",{ref:this.ref("panels"),class:g.tabs__panels},e.children))}afterRender(){this.state.value.subscribe(this.update),this.state.tabs.subscribe(this.update),this.update()}update(){const e=this.state.value.get();for(let s=0;s<this.refs.panels.children.length;s++){const i=this.refs.panels.children[s];i&&i.classList.toggle("is-hidden",s!==e)}}beforeDestroy(){this.state.value.unsubscribe(this.update),this.state.tabs.unsubscribe(this.update)}}exports.Backdrop=C;exports.Button=u;exports.Modal=O;exports.Picker=J;exports.Range=X;exports.Select=se;exports.Tabs=re;exports.Toggles=T;exports.Toolbar=x;
//# sourceMappingURL=components.cjs.map
