import{C as g,h as s,c as m,n as o,r as f}from"./index-1cc398c4.js";import{e as i,w as a,I as _}from"./circle-833b027b.js";import"./_commonjsHelpers-de833af9.js";const y="ui-select-1p5rg106",w="ui-select__icon-1p5rg135",S="ui-select__arrow-1p5rg170",d={select:y,"is-hidden":"is-hidden","is-disabled":"is-disabled",select__icon:w,select__arrow:S,"loader-spin":"ui-loader-spin-1p5rg1"},C=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,u=Symbol("select-placeholder-value");class c extends g{static get separator(){return{value:Symbol("separator"),label:"",disabled:!0}}static placeholder(e="select"){return{value:u,label:e,disabled:!0}}beforeRender(e){this.update=this.update.bind(this),this.handleChange=this.handleChange.bind(this),this.state={title:i(a)(e["store-title"],e.title),value:i(a)(e["store-value"],e.value??u),options:i(a)(e["store-options"],e.options),disabled:i(a)(e["store-disabled"],e.disabled),hidden:i(a)(e["store-hidden"],e.hidden)}}template(e,t){return s("div",{id:e.id,class:m(d.select,e.class),"store-class-is-disabled":t.disabled,"store-class-is-hidden":t.hidden,"event-mouseenter":n=>(e["event-mouseenter"]??o)(n,this),"event-mouseleave":n=>(e["event-mouseleave"]??o)(n,this)},e.icon&&s("span",{ref:this.ref("icon"),class:d.select__icon,innerHTML:e.icon}),s("select",{ref:this.ref("select"),"store-title":t.title,"store-disabled":t.disabled,"event-change":this.handleChange}),s("span",{class:d.select__arrow,innerHTML:C}))}afterRender(){this.state.value.subscribe(this.update),this.state.options.subscribe(this.update),this.update()}clear(){this.refs.select.innerHTML=""}update(){this.clear();const e=this.state.options.get();e&&this.render(e.map(({value:t,label:n,disabled:v}={})=>s("option",{value:t,disabled:v,selected:t===this.state.value.current},n??t)),this.refs.select)}handleChange(e){this.state.value.set(e.target.value),(this.props["event-change"]||o)(e,this)}beforeDestroy(){this.state.value.unsubscribe(this.update),this.state.options.unsubscribe(this.update)}}const k={title:"Inputs/<Select>",render:l=>f(s(c,l),null).nodes[0],argTypes:{icon:{type:"string"},title:{type:"string",description:"`store-`"},value:{type:"string",description:"`store-`"},options:{type:"array",description:["`store-`","`[{ value: string, label?: string, disabled?: boolean }, …]`",'Can also contain `Select.placeholder("Your text")` and `Select.separator`'].map(l=>`<p>${l}</p>`).join(`
`)},id:{type:"string"},class:{type:"string"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-change":{action:"event-change"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},r={args:{icon:_,title:"select me",value:void 0,options:[c.placeholder("select an option"),c.separator,{value:"foo"},{value:"bar"},{value:"baz",disabled:!0}],id:void 0,class:void 0,disabled:!1,hidden:!1}};var h,p,b;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    icon: Icon,
    title: 'select me',
    value: undefined,
    options: [Select.placeholder('select an option'), Select.separator, {
      value: 'foo'
    }, {
      value: 'bar'
    }, {
      value: 'baz',
      disabled: true
    }],
    id: undefined,
    class: undefined,
    disabled: false,
    hidden: false
  }
}`,...(b=(p=r.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};const E=["Primary"];export{r as Primary,E as __namedExportsOrder,k as default};
//# sourceMappingURL=Select.stories-541d67ba.js.map
