import{C as S,e as r,w as i,h as l,n as h,r as I}from"./ensure-4e62e800.js";import{d as L}from"./derived-036d570f.js";import{I as q}from"./circle-8871eb28.js";const T="ui-select-8lvqv108",k="ui-select__icon-8lvqv144",O="ui-select__label-8lvqv154",E="ui-select__arrow-8lvqv196",u={select:T,"is-hidden":"is-hidden","is-disabled":"is-disabled",select__icon:k,select__label:O,select__arrow:E,"loader-spin":"ui-loader-spin-8lvqv1"},M=(a=[],e)=>a.reduce((t,s)=>{const n=s[e];return t[n]||(t[n]=[]),t[n].push(s),t},{}),P=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;class F extends S{static get separator(){return{label:"",disabled:!0}}beforeRender(e){this.update=this.update.bind(this),this.handleChange=this.handleChange.bind(this),this.state={title:r(i)(e["store-title"],e.title),label:r(i)(e["store-label"],e.label),value:r(i)(e["store-value"],e.value),options:r(i)(e["store-options"],e.options),disabled:r(i)(e["store-disabled"],e.disabled),hidden:r(i)(e["store-hidden"],e.hidden)};const t=e.compare??((s,n)=>s===n);this.state.selectedIndex=L([this.state.value,this.state.options],()=>this.state.options.get().findIndex(n=>t(n.value??n,this.state.value.current)))}template(e,t){return l("div",{...this.dataProps,id:e.id,class:[u.select,{"is-disabled":t.disabled,"is-hidden":t.hidden},...Array.isArray(e.class)?e.class:[e.class]],"event-mouseenter":s=>(e["event-mouseenter"]??h)(s,this),"event-mouseleave":s=>(e["event-mouseleave"]??h)(s,this)},e.icon&&l("span",{ref:this.ref("icon"),class:u.select__icon,innerHTML:e.icon}),l("div",{class:u.select__label,"store-innerHTML":t.label}),l("select",{ref:this.ref("select"),name:e.name,required:e.required,tabIndex:e.tabindex,"store-title":t.title,"store-disabled":t.disabled,"event-change":this.handleChange}),l("span",{class:u.select__arrow,innerHTML:e.dropdown??P}))}afterRender(){this.state.value.subscribe(this.update),this.state.options.subscribe(this.update),this.update()}clear(){this.refs.select.innerHTML=""}update(){this.clear();const e=this.state.options.get();if(!e)return;const t=this.state.selectedIndex.get();this.props.placeholder&&this.render(l("option",{value:"",disabled:!0,...this.state.value.current===void 0||t<0?{selected:!0}:{}},this.props.placeholder),this.refs.select);for(const[s,n]of Object.entries(M(e,"group"))){const v=n.map(d=>l("option",{value:e.indexOf(d),...d.disabled?{disabled:!0}:{},...e.indexOf(d)===t?{selected:!0}:{}},d.label));s!=="undefined"?this.render(l("optgroup",{label:s},v),this.refs.select):this.render(v,this.refs.select)}}handleChange(e){const t=+e.target.value,s=(this.state.options.get()??[])[t];this.refs.select.blur(),this.state.value.set(s?s.value??s:null),(this.props["event-change"]||h)(e,this)}beforeDestroy(){this.state.value.unsubscribe(this.update),this.state.options.unsubscribe(this.update)}}const H={title:"Inputs/<Select>",render:a=>I(l(F,a),null).nodes[0],argTypes:{icon:{type:"string"},dropdown:{type:"string"},title:{type:"string",description:"`store-`"},value:{type:"string",description:"`store-`"},label:{type:"string",description:"`store-`"},compare:{type:"string",description:"Define a custom comparison function for getting the value index from the option. Default to `a === b`"},options:{type:"array",description:["`store-`","`[{ value: mixed, label: string, disabled?: boolean, group?: string }, …]`","Can also contain `Select.separator`"].map(a=>`<p>${a}</p>`).join(`
`)},id:{type:"string"},class:{type:"string"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-change":{action:"event-change"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},o={args:{icon:q,dropdown:void 0,title:"select me",label:void 0,value:void 0,placeholder:"Select an option",options:[F.separator,{label:"String",value:"UID_12345"},{label:"Number",value:42},{label:"Symbol",value:Symbol("first")},{label:"Object",value:{color:"#FFF"}},{label:"Disabled",disabled:!0}],"event-change":(a,e)=>console.log(e.state.value.current),id:void 0,class:void 0,disabled:!1,hidden:!1}},c={args:{...o.args,options:[{group:"Fruits",label:"Apple",value:"🍎"},{group:"Fruits",label:"Banana",value:"🍌"},{group:"Fruits",label:"Cherry",value:"🍒",disabled:!0},{group:"Vegetables",label:"Eggplant",value:"🍆"},{label:"Tomato",value:"🍅"},{label:"Juice",value:"🥤"}]}},x=i(1);window.setInterval(()=>x.update(a=>++a),1e3);const b={args:{...o.args,"store-label":x}};var p,g,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    icon: Icon,
    dropdown: undefined,
    title: 'select me',
    label: undefined,
    value: undefined,
    placeholder: 'Select an option',
    options: [Select.separator,
    // { label: 'foo', value: -1, disabled: true },
    {
      label: 'String',
      value: 'UID_12345'
    }, {
      label: 'Number',
      value: 42
    }, {
      label: 'Symbol',
      value: Symbol('first')
    }, {
      label: 'Object',
      value: {
        color: '#FFF'
      }
    }, {
      label: 'Disabled',
      disabled: true
    }],
    'event-change': (e, c) => console.log(c.state.value.current),
    id: undefined,
    class: undefined,
    disabled: false,
    hidden: false
  }
}`,...(m=(g=o.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var f,_,y;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    options: [{
      group: 'Fruits',
      label: 'Apple',
      value: '🍎'
    }, {
      group: 'Fruits',
      label: 'Banana',
      value: '🍌'
    }, {
      group: 'Fruits',
      label: 'Cherry',
      value: '🍒',
      disabled: true
    }, {
      group: 'Vegetables',
      label: 'Eggplant',
      value: '🍆'
    }, {
      label: 'Tomato',
      value: '🍅'
    }, {
      label: 'Juice',
      value: '🥤'
    }]
  }
}`,...(y=(_=c.parameters)==null?void 0:_.docs)==null?void 0:y.source}}};var D,w,C;b.parameters={...b.parameters,docs:{...(D=b.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    'store-label': tick
  }
}`,...(C=(w=b.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};const G=["Primary","Grouped","CustomLabel"];export{b as CustomLabel,c as Grouped,o as Primary,G as __namedExportsOrder,H as default};
//# sourceMappingURL=Select.stories-5021994e.js.map
