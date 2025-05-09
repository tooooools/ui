import{C as D,e as a,w as i,h as r,n as v,r as P}from"./ensure-4e62e800.js";import{d as y}from"./derived-036d570f.js";import{I as R}from"./circle-8871eb28.js";const C="ui-range-7bow4108",H="ui-range__icon-7bow4141",L="ui-range__inputs-7bow4151",M="ui-range__label-7bow4211",m={range:C,"is-hidden":"is-hidden","is-disabled":"is-disabled",range__icon:H,range__inputs:L,"is-dual":"is-dual",range__label:M,"loader-spin":"ui-loader-spin-7bow41"};function g(d,e,t){var n,s,l,f,c;e==null&&(e=100);function p(){var u=Date.now()-f;u<e&&u>=0?n=setTimeout(p,e-u):(n=null,t||(c=d.apply(l,s),l=s=null))}var h=function(){l=this,s=arguments,f=Date.now();var u=t&&!n;return n||(n=setTimeout(p,e)),u&&(c=d.apply(l,s),l=s=null),c};return h.clear=function(){n&&(clearTimeout(n),n=null)},h.flush=function(){n&&(c=d.apply(l,s),l=s=null,clearTimeout(n),n=null)},h}g.debounce=g;var S=g;class E extends D{beforeRender(e){this.handleInput=e.debounce?S.debounce(this.handleInput.bind(this),e.debounce):this.handleInput.bind(this),this.state={label:a(i)(e["store-label"],e.label),title:a(i)(e["store-title"],e.title),value:a(i)(e["store-value"],e.value),min:a(i)(e["store-min"],e.min),max:a(i)(e["store-max"],e.max),step:a(i)(e["store-step"],e.step),disabled:a(i)(e["store-disabled"],e.disabled),hidden:a(i)(e["store-hidden"],e.hidden)}}template(e,t){return r("div",{...this.dataProps,id:e.id,class:[m.range,{"is-dual":e.dual,"is-disabled":t.disabled,"is-hidden":t.hidden},...Array.isArray(e.class)?e.class:[e.class]],"event-mouseenter":n=>(e["event-mouseenter"]??v)(n,this),"event-mouseleave":n=>(e["event-mouseleave"]??v)(n,this)},e.icon&&r("span",{ref:this.ref("icon"),class:m.range__icon,innerHTML:e.icon}),r("div",{class:m.range__inputs},r("input",{ref:this.refArray("inputs"),tabIndex:e.tabindex,type:"range","store-min":t.min,"store-max":t.max,"store-step":t.step,"store-title":t.title,"store-value":y(t.value,n=>e.dual?(n??[])[0]:n),"store-disabled":t.disabled,"event-input":this.handleInput}),e.dual&&r("input",{ref:this.refArray("inputs"),tabIndex:e.tabindex,type:"range","store-min":t.min,"store-max":t.max,"store-step":t.step,"store-title":t.title,"store-value":y(t.value,n=>e.dual?(n??[])[1]:n),"store-disabled":t.disabled,"event-input":this.handleInput})),r("label",{class:m.range__label,"store-innerHTML":t.label}))}async handleInput(e){this.props.dual?this.state.value.set([+this.refs.inputs[0].value,+this.refs.inputs[1].value]):this.state.value.set(+this.refs.inputs[0].value),await(this.props["event-input"]??v)(e,this)}}const k={title:"Inputs/<Range>",render:d=>P(r(E,d),null).nodes[0],argTypes:{icon:{type:"string"},label:{type:"string",description:"`store-`"},title:{type:"string",description:"`store-`"},value:{type:"number|array",description:"`store-`"},min:{type:"number",description:"`store-`"},max:{type:"number",description:"`store-`"},step:{type:"number",description:"`store-`"},debounce:{type:"number",description:"debounce `event-input` in ms"},id:{type:"string"},class:{type:"string"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-input":{action:"event-input"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},o={args:{icon:R,label:"range",title:"slide me",value:50,min:0,max:100,step:1,dual:!1,class:void 0,disabled:!1,hidden:!1}},b={args:{...o.args,dual:!0,value:[33,66]}};var _,x,I;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    icon: Icon,
    label: 'range',
    title: 'slide me',
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    dual: false,
    class: undefined,
    disabled: false,
    hidden: false
  }
}`,...(I=(x=o.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var w,T,A;b.parameters={...b.parameters,docs:{...(w=b.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    dual: true,
    value: [33, 66]
  }
}`,...(A=(T=b.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};const q=["Primary","Dual"];export{b as Dual,o as Primary,q as __namedExportsOrder,k as default};
//# sourceMappingURL=Range.stories-d2148a34.js.map
