import{C as y,n as u,h as s,c as _,r as A}from"./index-1cc398c4.js";import{W as I,e as a,w as d,I as h}from"./circle-833b027b.js";import{B as l}from"./Button-859f2b74.js";import{T as x}from"./Toolbar-fa79f302.js";import"./_commonjsHelpers-de833af9.js";function B(o,e){const n=new I,t=n.set.bind(n);delete n.set;const r=Array.isArray(o);let c=r?new Array(o.length):null;if(r)for(let i=0,m=o.length;i<m;i++)c[i]=o[i].current,o[i].subscribe(function(w){c[i]=w,p()});else c=o.current,o.subscribe(function(i){c=i,p()});p();function p(){const i=e(c);i&&i.then?i.then(t):t(i)}return n}const C="ui-picker-1w9rr106",T="ui-picker__toolbar-1w9rr127",P="ui-picker__toggle-1w9rr140",b={picker:C,"is-hidden":"is-hidden","is-disabled":"is-disabled",picker__toolbar:T,"is-open":"is-open","is-active":"is-active",picker__toggle:P,"loader-spin":"ui-loader-spin-1w9rr1"},L=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,O=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;class j extends y{beforeRender(e){this.handleToggle=this.handleToggle.bind(this);const n=e.children.filter(t=>t.type===l);for(const t of n)t.props.ref=this.refArray("buttons"),t.props["event-click"]=this.handleChange(n.indexOf(t),t.props["event-click"]||u);this.state={label:a(d)(e["store-label"],e.label),title:a(d)(e["store-title"],e.title),open:a(d)(e["store-open"],e.open),disabled:a(d)(e["store-disabled"],e.disabled),hidden:a(d)(e["store-hidden"],e.hidden)},this.state.toggleIcon=B(this.state.open,()=>this.state.open.current?L:O)}template(e,n){return s("div",{id:e.id,class:_(b.picker,e.class),"store-class-is-open":n.open,"store-class-is-disabled":n.disabled,"store-class-is-hidden":n.hidden,"event-mouseenter":t=>(e["event-mouseenter"]??u)(t,this),"event-mouseleave":t=>(e["event-mouseleave"]??u)(t,this)},s(x,{class:b.picker__toolbar,compact:!0},e.children),s(l,{class:b.picker__toggle,"store-icon":n.toggleIcon,"store-label":n.label,"store-title":n.title,"event-click":this.handleToggle}))}handleToggle(){this.state.open.update(e=>!e)}handleChange(e,n){return async t=>{for(let r=0;r<this.refs.buttons.length;r++)this.refs.buttons[r].state.active.set(r===e);this.state.open.set(!1),(this.props["event-change"]??u)(null,this),await n(t,this.refs.buttons[e])}}}const V={title:"Layout/<Picker>",argTypes:{label:{type:"string",description:"`store-`"},title:{type:"string",description:"`store-`"},id:{type:"string"},class:{type:"string"},open:{type:"boolean",description:"`store-`"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-change":{action:"event-change"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},g={render:o=>A(s(j,o,s(l,{icon:h,label:"Action #1","event-click":()=>console.log("click"),active:!0}),s(l,{icon:h,label:"Action #2"}),s(l,{icon:h,label:"Action #3"}),s(l,{icon:h,label:"Action #4"})),null).nodes[0],args:{label:"pick one",title:"click to pick a new button",id:void 0,class:void 0,open:!1,disabled:!1,hidden:!1}};var k,f,v;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => render(h(Picker, args, ...[h(Button, {
    icon: Icon,
    label: 'Action #1',
    'event-click': () => console.log('click'),
    active: true
  }), h(Button, {
    icon: Icon,
    label: 'Action #2'
  }), h(Button, {
    icon: Icon,
    label: 'Action #3'
  }), h(Button, {
    icon: Icon,
    label: 'Action #4'
  })]), null).nodes[0],
  args: {
    label: 'pick one',
    title: 'click to pick a new button',
    id: undefined,
    class: undefined,
    open: false,
    disabled: false,
    hidden: false
  }
}`,...(v=(f=g.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};const q=["Primary"];export{g as Primary,q as __namedExportsOrder,V as default};
//# sourceMappingURL=Picker.stories-8cf6e1d7.js.map
