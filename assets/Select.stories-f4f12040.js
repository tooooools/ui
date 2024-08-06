import{C as S,e as r,w as i,h as l,c as I,n as h,r as L}from"./index-c1fb2549.js";import{d as T}from"./derived-2d39fb04.js";import{I as k}from"./circle-8871eb28.js";import"./_commonjsHelpers-de833af9.js";const O="ui-select-iov4x107",E="ui-select__icon-iov4x143",M="ui-select__label-iov4x153",P="ui-select__arrow-iov4x195",u={select:O,"is-hidden":"is-hidden","is-disabled":"is-disabled",select__icon:E,select__label:M,select__arrow:P,"loader-spin":"ui-loader-spin-iov4x1"},j=(n=[],e)=>n.reduce((t,s)=>{const a=s[e];return t[a]||(t[a]=[]),t[a].push(s),t},{}),B=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;class C extends S{static get separator(){return{label:"",disabled:!0}}beforeRender(e){this.update=this.update.bind(this),this.handleChange=this.handleChange.bind(this),this.state={title:r(i)(e["store-title"],e.title),label:r(i)(e["store-label"],e.label),value:r(i)(e["store-value"],e.value),options:r(i)(e["store-options"],e.options),disabled:r(i)(e["store-disabled"],e.disabled),hidden:r(i)(e["store-hidden"],e.hidden)};const t=e.compare??((s,a)=>s===a);this.state.selectedIndex=T([this.state.value,this.state.options],()=>this.state.options.get().findIndex(({value:a})=>t(a,this.state.value.current)))}template(e,t){return l("div",{...this.dataProps,id:e.id,class:I(u.select,e.class),"store-class-is-disabled":t.disabled,"store-class-is-hidden":t.hidden,"event-mouseenter":s=>(e["event-mouseenter"]??h)(s,this),"event-mouseleave":s=>(e["event-mouseleave"]??h)(s,this)},e.icon&&l("span",{ref:this.ref("icon"),class:u.select__icon,innerHTML:e.icon}),l("div",{class:u.select__label,"store-innerHTML":t.label}),l("select",{ref:this.ref("select"),name:e.name,required:e.required,tabIndex:e.tabindex,"store-title":t.title,"store-disabled":t.disabled,"event-change":this.handleChange}),l("span",{class:u.select__arrow,innerHTML:e.dropdown??B}))}afterRender(){this.state.value.subscribe(this.update),this.state.options.subscribe(this.update),this.update()}clear(){this.refs.select.innerHTML=""}update(){this.clear();const e=this.state.options.get();if(!e)return;const t=this.state.selectedIndex.get();this.props.placeholder&&this.render(l("option",{value:"",disabled:!0,...this.state.value.current===void 0||t<0?{selected:!0}:{}},this.props.placeholder),this.refs.select);for(const[s,a]of Object.entries(j(e,"group"))){const p=a.map(d=>l("option",{value:e.indexOf(d),...d.disabled?{disabled:!0}:{},...e.indexOf(d)===t?{selected:!0}:{}},d.label));s!=="undefined"?this.render(l("optgroup",{label:s},p),this.refs.select):this.render(p,this.refs.select)}}handleChange(e){var s;const t=+e.target.value;this.state.selectedIndex.set(t),this.refs.select.blur(),this.state.value.set((s=(this.state.options.get()||[])[t])==null?void 0:s.value),(this.props["event-change"]||h)(e,this)}beforeDestroy(){this.state.value.unsubscribe(this.update),this.state.options.unsubscribe(this.update)}}const J={title:"Inputs/<Select>",render:n=>L(l(C,n),null).nodes[0],argTypes:{icon:{type:"string"},dropdown:{type:"string"},title:{type:"string",description:"`store-`"},value:{type:"string",description:"`store-`"},label:{type:"string",description:"`store-`"},compare:{type:"string",description:"Define a custom comparison function for getting the value index from the option. Default to `a === b`"},options:{type:"array",description:["`store-`","`[{ value: mixed, label: string, disabled?: boolean, group?: string }, …]`","Can also contain `Select.separator`"].map(n=>`<p>${n}</p>`).join(`
`)},id:{type:"string"},class:{type:"string"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-change":{action:"event-change"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},o={args:{icon:k,dropdown:void 0,title:"select me",label:void 0,value:void 0,placeholder:"Select an option",options:[C.separator,{label:"String",value:"UID_12345"},{label:"Number",value:42},{label:"Symbol",value:Symbol("first")},{label:"Object",value:{color:"#FFF"}},{label:"Disabled",disabled:!0}],"event-change":(n,e)=>console.log(e.state.value.current),id:void 0,class:void 0,disabled:!1,hidden:!1}},c={args:{...o.args,options:[{group:"Fruits",label:"Apple",value:"🍎"},{group:"Fruits",label:"Banana",value:"🍌"},{group:"Fruits",label:"Cherry",value:"🍒",disabled:!0},{group:"Vegetables",label:"Eggplant",value:"🍆"},{label:"Tomato",value:"🍅"},{label:"Juice",value:"🥤"}]}},F=i(1);window.setInterval(()=>F.update(n=>++n),1e3);const b={args:{...o.args,"store-label":F}};var v,g,m;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(y=(_=c.parameters)==null?void 0:_.docs)==null?void 0:y.source}}};var x,D,w;b.parameters={...b.parameters,docs:{...(x=b.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    'store-label': tick
  }
}`,...(w=(D=b.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};const N=["Primary","Grouped","CustomLabel"];export{b as CustomLabel,c as Grouped,o as Primary,N as __namedExportsOrder,J as default};
//# sourceMappingURL=Select.stories-f4f12040.js.map
