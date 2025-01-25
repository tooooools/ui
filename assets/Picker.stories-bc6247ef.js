import{C,n as r,e as o,w as i,h as s,r as y}from"./ensure-4e62e800.js";import{d as w}from"./derived-036d570f.js";import{B as a}from"./Button-77e9d2fe.js";import{T as O}from"./Toolbar-0629a05e.js";import{I as d}from"./circle-8871eb28.js";const _="ui-picker-1psed107",x="ui-picker__toolbar-1psed128",A="ui-picker__toggle-1psed138",p={picker:_,"is-hidden":"is-hidden","is-disabled":"is-disabled",picker__toolbar:x,"is-open":"is-open","is-active":"is-active","has-auto-order":"has-auto-order",picker__toggle:A,"loader-spin":"ui-loader-spin-1psed1"};class P extends C{beforeRender(e){this.handleClick=this.handleClick.bind(this),this.handleOpen=this.handleOpen.bind(this),this.handleToggle=this.handleToggle.bind(this);const t=e.children.filter(n=>n.type===a);for(const n of t)n.props.ref=this.refArray("buttons"),n.props["event-click"]=this.handleClick(t.indexOf(n),n.props["event-click"]||r);this.state={iconOpen:o(i)(e["store-iconOpen"],e.iconOpen),iconClose:o(i)(e["store-iconClose"],e.iconClose),label:o(i)(e["store-label"],e.label),title:o(i)(e["store-title"],e.title),open:o(i)(e["store-open"],e.open),disabled:o(i)(e["store-disabled"],e.disabled),hidden:o(i)(e["store-hidden"],e.hidden)},this.state.toggleIcon=w([this.state.open,this.state.iconClose,this.state.iconOpen],()=>this.state.open.current?this.state.iconClose.current:this.state.iconOpen.current)}template(e,t){return s("div",{...this.dataProps,id:e.id,class:[p.picker,{"has-auto-order":e.autoOrder,"is-open":t.open,"is-disabled":t.disabled,"is-hidden":t.hidden},...Array.isArray(e.class)?e.class:[e.class]],"event-mouseenter":n=>(e["event-mouseenter"]??r)(n,this),"event-mouseleave":n=>(e["event-mouseleave"]??r)(n,this)},s(a,{class:p.picker__toggle,"store-icon":t.toggleIcon,"store-label":t.label,"store-title":t.title,"store-active":t.open,"event-click":this.handleToggle}),s(O,{class:p.picker__toolbar,compact:!0},e.children))}afterRender(){this.state.open.subscribe(this.handleOpen)}handleOpen(){this.state.open.get()?(this.props["event-open"]??r)(null,this):(this.props["event-close"]??r)(null,this)}handleToggle(e){e.stopPropagation(),this.state.open.update(t=>!t)}handleClick(e,t){return async n=>{if(!this.state.open.get()){n.stopPropagation(),this.state.open.set(!0);return}for(let c=0;c<this.refs.buttons.length;c++)this.refs.buttons[c].state.active.set(c===e);this.props.autoClose&&this.state.open.set(!1),(this.props["event-change"]??r)(null,this),await t(n,this.refs.buttons[e])}}beforeDestroy(){this.state.open.unsubscribe(this.handleOpen)}}const I=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,T=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,S={title:"Layout/<Picker>",render:u=>y(s(P,u,s(a,{icon:d,label:"Action #1","event-click":()=>console.log("click"),active:!0}),s(a,{icon:d,label:"Action #2"}),s(a,{icon:d,label:"Action #3"}),s(a,{icon:d,label:"Action #4"})),null).nodes[0],argTypes:{iconOpen:{type:"string",description:"`store-`"},iconClose:{type:"string",description:"`store-`"},autoClose:{type:"boolean"},autoOrder:{type:"boolean"},label:{type:"string",description:"`store-`"},title:{type:"string",description:"`store-`"},id:{type:"string"},class:{type:"string"},open:{type:"boolean",description:"`store-`"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-change":{action:"event-change"},"event-open":{action:"event-open"},"event-close":{action:"event-close"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},l={args:{label:"pick one",title:"click to pick a new button",autoClose:!1,iconOpen:I,iconClose:T,id:void 0,class:void 0,open:!1,disabled:!1,hidden:!1}},h={args:{...l.args,autoClose:!0}};var g,b,v;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(v=(b=l.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var k,f,m;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    autoClose: true
  }
}`,...(m=(f=h.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const D=["Primary","AutoClose"];export{h as AutoClose,l as Primary,D as __namedExportsOrder,S as default};
//# sourceMappingURL=Picker.stories-bc6247ef.js.map
