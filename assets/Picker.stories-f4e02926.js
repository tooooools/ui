import{C,n as r,e as o,w as i,h as n,c as y,r as w}from"./index-00a34cd8.js";import{d as O}from"./derived-f1a18ac5.js";import{B as a}from"./Button-d7856eae.js";import{T as _}from"./Toolbar-3aeb27fd.js";import{I as d}from"./circle-8871eb28.js";import"./_commonjsHelpers-de833af9.js";const x="ui-picker-1psed107",P="ui-picker__toolbar-1psed128",I="ui-picker__toggle-1psed138",h={picker:x,"is-hidden":"is-hidden","is-disabled":"is-disabled",picker__toolbar:P,"is-open":"is-open","is-active":"is-active","has-auto-order":"has-auto-order",picker__toggle:I,"loader-spin":"ui-loader-spin-1psed1"};class A extends C{beforeRender(e){this.handleClick=this.handleClick.bind(this),this.handleOpen=this.handleOpen.bind(this),this.handleToggle=this.handleToggle.bind(this);const t=e.children.filter(s=>s.type===a);for(const s of t)s.props.ref=this.refArray("buttons"),s.props["event-click"]=this.handleClick(t.indexOf(s),s.props["event-click"]||r);this.state={iconOpen:o(i)(e["store-iconOpen"],e.iconOpen),iconClose:o(i)(e["store-iconClose"],e.iconClose),label:o(i)(e["store-label"],e.label),title:o(i)(e["store-title"],e.title),open:o(i)(e["store-open"],e.open),disabled:o(i)(e["store-disabled"],e.disabled),hidden:o(i)(e["store-hidden"],e.hidden)},this.state.toggleIcon=O([this.state.open,this.state.iconClose,this.state.iconOpen],()=>this.state.open.current?this.state.iconClose.current:this.state.iconOpen.current)}template(e,t){return n("div",{...this.dataProps,id:e.id,class:y(h.picker,e.class,{"has-auto-order":e.autoOrder}),"store-class-is-open":t.open,"store-class-is-disabled":t.disabled,"store-class-is-hidden":t.hidden,"event-mouseenter":s=>(e["event-mouseenter"]??r)(s,this),"event-mouseleave":s=>(e["event-mouseleave"]??r)(s,this)},n(a,{class:h.picker__toggle,"store-icon":t.toggleIcon,"store-label":t.label,"store-title":t.title,"store-active":t.open,"event-click":this.handleToggle}),n(_,{class:h.picker__toolbar,compact:!0},e.children))}afterRender(){this.state.open.subscribe(this.handleOpen)}handleOpen(){this.state.open.get()?(this.props["event-open"]??r)(null,this):(this.props["event-close"]??r)(null,this)}handleToggle(e){e.stopPropagation(),this.state.open.update(t=>!t)}handleClick(e,t){return async s=>{if(!this.state.open.get()){s.stopPropagation(),this.state.open.set(!0);return}for(let c=0;c<this.refs.buttons.length;c++)this.refs.buttons[c].state.active.set(c===e);this.props.autoClose&&this.state.open.set(!1),(this.props["event-change"]??r)(null,this),await t(s,this.refs.buttons[e])}}beforeDestroy(){this.state.open.unsubscribe(this.handleOpen)}}const T=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,L=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,E={title:"Layout/<Picker>",render:u=>w(n(A,u,n(a,{icon:d,label:"Action #1","event-click":()=>console.log("click"),active:!0}),n(a,{icon:d,label:"Action #2"}),n(a,{icon:d,label:"Action #3"}),n(a,{icon:d,label:"Action #4"})),null).nodes[0],argTypes:{iconOpen:{type:"string",description:"`store-`"},iconClose:{type:"string",description:"`store-`"},autoClose:{type:"boolean"},autoOrder:{type:"boolean"},label:{type:"string",description:"`store-`"},title:{type:"string",description:"`store-`"},id:{type:"string"},class:{type:"string"},open:{type:"boolean",description:"`store-`"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-change":{action:"event-change"},"event-open":{action:"event-open"},"event-close":{action:"event-close"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},l={args:{label:"pick one",title:"click to pick a new button",autoClose:!1,iconOpen:T,iconClose:L,id:void 0,class:void 0,open:!1,disabled:!1,hidden:!1}},p={args:{...l.args,autoClose:!0}};var g,b,v;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(v=(b=l.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var k,f,m;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    autoClose: true
  }
}`,...(m=(f=p.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const q=["Primary","AutoClose"];export{p as AutoClose,l as Primary,q as __namedExportsOrder,E as default};
//# sourceMappingURL=Picker.stories-f4e02926.js.map
