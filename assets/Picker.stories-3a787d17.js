import{C,n as r,e as s,w as i,h as o,r as y}from"./ensure-4e62e800.js";import{d as w}from"./derived-036d570f.js";import{B as a}from"./Button-01764f60.js";import{T as O}from"./Toolbar-9f3dbad2.js";import{I as d}from"./circle-8871eb28.js";const _="ui-picker-fzhde114",x="ui-picker__toolbar-fzhde135",A="ui-picker__toggle-fzhde145",p={picker:_,"is-hidden":"is-hidden","is-disabled":"is-disabled",picker__toolbar:x,"is-open":"is-open","is-active":"is-active","has-auto-order":"has-auto-order",picker__toggle:A,"loader-spin":"ui-loader-spin-fzhde1"};class P extends C{beforeRender(e){this.handleClick=this.handleClick.bind(this),this.handleOpen=this.handleOpen.bind(this),this.handleToggle=this.handleToggle.bind(this);const t=e.children.filter(n=>n.type===a);for(const n of t)n.props.ref=this.refArray("buttons"),n.props["event-click"]=this.handleClick(t.indexOf(n),n.props["event-click"]||r);this.state={iconOpen:s(i)(e["store-iconOpen"],e.iconOpen),iconClose:s(i)(e["store-iconClose"],e.iconClose),label:s(i)(e["store-label"],e.label),title:s(i)(e["store-title"],e.title),open:s(i)(e["store-open"],e.open),disabled:s(i)(e["store-disabled"],e.disabled),hidden:s(i)(e["store-hidden"],e.hidden)},this.state.toggleIcon=w([this.state.open,this.state.iconClose,this.state.iconOpen],()=>this.state.open.current?this.state.iconClose.current:this.state.iconOpen.current)}template(e,t){return o("div",{...this.dataProps,id:e.id,class:[p.picker,{"has-auto-order":e.autoOrder,"is-open":t.open,"is-disabled":t.disabled,"is-hidden":t.hidden},...Array.isArray(e.class)?e.class:[e.class]],"event-mouseenter":n=>(e["event-mouseenter"]??r)(n,this),"event-mouseleave":n=>(e["event-mouseleave"]??r)(n,this)},o(a,{class:p.picker__toggle,"store-icon":t.toggleIcon,"store-label":t.label,"store-title":t.title,"store-active":t.open,"event-click":this.handleToggle}),o(O,{class:p.picker__toolbar,compact:!0},e.children))}afterRender(){this.state.open.subscribe(this.handleOpen)}handleOpen(){this.state.open.get()?(this.props["event-open"]??r)(null,this):(this.props["event-close"]??r)(null,this)}handleToggle(e){e.stopPropagation(),this.state.open.update(t=>!t)}handleClick(e,t){return async n=>{if(!this.state.open.get()){n.stopPropagation(),this.state.open.set(!0);return}for(let c=0;c<this.refs.buttons.length;c++)this.refs.buttons[c].state.active.set(c===e);this.props.autoClose&&this.state.open.set(!1),(this.props["event-change"]??r)(null,this),await t(n,this.refs.buttons[e])}}beforeDestroy(){this.state.open.unsubscribe(this.handleOpen)}}const I=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,T=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,R={title:"Layout/<Picker>",render:u=>y(o(P,u,o(a,{icon:d,label:"Action #1","event-click":()=>console.log("click"),active:!0}),o(a,{icon:d,label:"Action #2"}),o(a,{icon:d,label:"Action #3"}),o(a,{icon:d,label:"Action #4"})),null).nodes[0],argTypes:{iconOpen:{type:"string",description:"`store-`"},iconClose:{type:"string",description:"`store-`"},autoClose:{type:"boolean"},autoOrder:{type:"boolean"},label:{type:"string",description:"`store-`"},title:{type:"string",description:"`store-`"},id:{type:"string"},class:{type:"string"},open:{type:"boolean",description:"`store-`"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-change":{action:"event-change"},"event-open":{action:"event-open"},"event-close":{action:"event-close"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},l={args:{label:"pick one",title:"click to pick a new button",autoClose:!1,iconOpen:I,iconClose:T,id:void 0,class:void 0,open:!1,disabled:!1,hidden:!1}},h={args:{...l.args,autoClose:!0}};var g,b,f;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'pick one',
    title: 'click to pick a new button',
    autoClose: false,
    iconOpen: IconOpen,
    iconClose: IconClose,
    id: undefined,
    class: undefined,
    open: false,
    disabled: false,
    hidden: false
  }
}`,...(f=(b=l.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var v,k,m;h.parameters={...h.parameters,docs:{...(v=h.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    autoClose: true
  }
}`,...(m=(k=h.parameters)==null?void 0:k.docs)==null?void 0:m.source}}};const S=["Primary","AutoClose"];export{h as AutoClose,l as Primary,S as __namedExportsOrder,R as default};
//# sourceMappingURL=Picker.stories-3a787d17.js.map
