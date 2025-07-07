import{C as I,r as a,h as t,e as i,w as c,n as p}from"./ensure-4e62e800.js";import{B as q}from"./Button-01764f60.js";import{I as k}from"./cancel-cdf39661.js";import{I as h}from"./circle-8871eb28.js";const C="ui-toast-1b1p0123",x="ui-toast__icon-1b1p0197",D="ui-toast__content-1b1p0222",l={"toast-container":"ui-toast-container-1b1p0123",toast:C,"toast-appears":"ui-toast-appears-1b1p01","is-hidden":"is-hidden","is-disabled":"is-disabled",toast__icon:x,"has-icon":"has-icon",toast__content:D,"loader-spin":"ui-loader-spin-1b1p01"};class n extends I{static display(e,{parent:s=n.container,...r}={}){a(t(n,{...r},e),s)}static get container(){return document.querySelector("."+l["toast-container"])??a(t("div",{class:l["toast-container"]}),document.body).nodes[0]}beforeRender(e){this.handleClose=this.handleClose.bind(this),this.state={label:i(c)(e["store-label"],e.label),title:i(c)(e["store-title"],e.title),icon:i(c)(e["store-icon"],e.icon),tone:i(c)(e["store-tone"],e.tone),count:i(c)(e["store-count"],e.count)}}template(e,s){return t("div",{...this.dataProps,id:e.id,class:[l.toast,{"has-icon":s.icon,"has-duration":e.duration},...Array.isArray(e.class)?e.class:[e.class]],"event-mouseenter":r=>(e["event-mouseenter"]??p)(r,this),"event-mouseleave":r=>(e["event-mouseleave"]??p)(r,this),"store-data-count":s.count,"data-tone":s.tone,style:{"--toast-duration":(e.duration??-1)+"ms"}},t("span",{ref:this.ref("icon"),class:l.toast__icon,"store-data-count":s.count,"store-innerHTML":s.icon}),t("div",{class:l.toast__content},e.children),t(q,{icon:k,class:"toast__btn--close",title:"Effacer la notification","event-click":this.handleClose}))}afterMount(){this.props.duration&&(this.refs.timer=window.setTimeout(()=>this.destroy(),this.props.duration))}handleClose(e){e.stopPropagation(),this.destroy()}beforeDestroy(){(this.props["event-close"]||p)(),this.refs.timer&&window.clearTimeout(this.refs.timer)}}const E={title:"Inputs/<Toast>",render:o=>a(t(n,o),null).nodes[0],argTypes:{icon:{type:"string",description:"`store-`"},tone:{type:"string",description:"`store-`"},count:{type:"string",description:"`store-`"},id:{type:"string"},class:{type:"string"},"event-click":{action:"event-click"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},u={render:o=>a(t(n,o,"Hello world"),null).nodes[0],args:{icon:h}},d={render:o=>a(t(n,o,[t("p",{},"A problem occured"),t("pre",{},`Sapien eros platea nostra praesent neque
Fringilla ligula nam iaculis duis sed conubia mus cubilia, ultricies
vivamus class pretium porttitor maximus maecenas ad mi molestie imperdiet sodales.
Sagittis elit litora netus mollis vel proin fames interdum parturient donec, tempor aliquam curabitur dignissim elementum porttitor posuere libero viverra. Diam mattis neque curae gravida tincidunt curabitur massa ornare sodales aenean, tortor eu parturient at ridiculus finibus a sociosqu.`)]),null).nodes[0],args:{icon:h,tone:"error",count:2}},m={render:o=>a(t(q,{label:"say hello","event-click":e=>n.display("hello world",{icon:h})})).nodes[0]};var b,v,g;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => render(h(Toast, args, 'Hello world'), null).nodes[0],
  args: {
    icon: Icon
  }
}`,...(g=(v=u.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var y,f,_;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => render(h(Toast, args, [h('p', {}, 'A problem occured'), h('pre', {}, 'Sapien eros platea nostra praesent neque\\nFringilla ligula nam iaculis duis sed conubia mus cubilia, ultricies\\nvivamus class pretium porttitor maximus maecenas ad mi molestie imperdiet sodales.\\nSagittis elit litora netus mollis vel proin fames interdum parturient donec, tempor aliquam curabitur dignissim elementum porttitor posuere libero viverra. Diam mattis neque curae gravida tincidunt curabitur massa ornare sodales aenean, tortor eu parturient at ridiculus finibus a sociosqu.')]), null).nodes[0],
  args: {
    icon: Icon,
    tone: 'error',
    count: 2
  }
}`,...(_=(f=d.parameters)==null?void 0:f.docs)==null?void 0:_.source}}};var w,S,T;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => render(h(Button, {
    label: 'say hello',
    'event-click': e => Toast.display('hello world', {
      icon: Icon
    })
  })).nodes[0]
}`,...(T=(S=m.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};const F=["Primary","StackTrace","Display"];export{m as Display,u as Primary,d as StackTrace,F as __namedExportsOrder,E as default};
//# sourceMappingURL=Toast.stories-e3a29e3d.js.map
