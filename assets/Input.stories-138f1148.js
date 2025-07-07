import{C as D,e as i,w as s,h as r,n as l,r as P}from"./ensure-4e62e800.js";import{I as F}from"./circle-8871eb28.js";const M="ui-input-w0axn114",T="ui-input__icon-w0axn157",c={input:M,"is-hidden":"is-hidden","is-disabled":"is-disabled","is-active":"is-active","is-waiting":"is-waiting","is-edited-on-dblclick":"is-edited-on-dblclick",input__icon:T,"has-icon":"has-icon","loader-spin":"ui-loader-spin-w0axn1"};class H extends D{beforeRender(e){this.update=this.update.bind(this),this.handleClick=this.handleClick.bind(this),this.handleDblClick=this.handleDblClick.bind(this),this.handleInput=this.handleInput.bind(this),this.handleFocus=this.handleFocus.bind(this),this.state={value:i(s)(e["store-value"],e.value),files:i(s)(e["store-files"],e.files),placeholder:i(s)(e["store-placeholder"],e.placeholder),title:i(s)(e["store-title"],e.title),label:i(s)(e["store-label"],e.label),before:i(s)(e["store-before"],e.before),after:i(s)(e["store-after"],e.after),icon:i(s)(e["store-icon"],e.icon),accept:i(s)(e["store-accept"],e.accept??"*"),multiple:i(s)(e["store-multiple"],e.multiple??"*"),min:i(s)(e["store-min"],e.min),max:i(s)(e["store-max"],e.max),step:i(s)(e["store-step"],e.step),active:i(s)(e["store-active"],e.active),disabled:i(s)(e["store-disabled"],e.disabled),hidden:i(s)(e["store-hidden"],e.hidden),waiting:i(s)(e["store-waiting"],e.waiting)}}template(e,t){return r("div",{...this.dataProps,id:e.id,tabIndex:e.tabindex,class:[c.input,{"is-edited-on-dblclick":!!e.editOnDblClick,"has-icon":t.icon,"is-active":t.active,"is-disabled":t.disabled,"is-hidden":t.hidden,"is-waiting":t.waiting},...Array.isArray(e.class)?e.class:[e.class]],"data-type":e.type,"store-title":t.title,"event-click":this.handleClick,"event-dblclick":this.handleDblClick,"event-mouseenter":a=>(e["event-mouseenter"]??l)(a,this),"event-mouseleave":a=>(e["event-mouseleave"]??l)(a,this)},r("span",{ref:this.ref("icon"),class:c.input__icon,"store-innerHTML":t.icon}),r("label",{class:c.input__label,"store-innerHTML":t.label}),r("label",{class:c.input__before,"store-innerHTML":t.before}),r("input",{ref:this.ref("input"),type:e.type,name:e.name,autofocus:e.autofocus,autocomplete:e.autocomplete??"off",size:e.type!=="number"?e.size==="auto"?"":e.size:void 0,"store-min":e.type==="number"?t.min:void 0,"store-max":e.type==="number"?t.max:void 0,"store-step":e.type==="number"?t.step:void 0,"store-placeholder":t.placeholder,"store-accept":e.type==="file"?t.accept:void 0,"store-multiple":e.type==="file"?t.multiple:void 0,"store-disabled":t.disabled,"event-click":a=>a.stopPropagation(),"event-input":this.handleInput,"event-focus":this.handleFocus,"event-blur":a=>(e["event-blur"]??l)(a,this)}),r("label",{class:c.input__after,"store-innerHTML":t.after}))}afterRender(){this.state.value.subscribe(this.update),this.update()}update(){const e=this.state.value.get();switch(this.props.type){case"number":{this.refs.input.value=+e;break}case"file":{this.refs.input.files=e;break}default:this.refs.input.value=e}if(this.props.size==="auto"){const t=(String(this.refs.input.value)??"").length||(this.state.placeholder.current??"").length||1;this.props.type==="number"?this.refs.input.style.width=t+1+"ch":this.refs.input.size=Math.max(1,t)}}handleClick(e){this.props.type==="file"?this.refs.input.click():this.props.editOnDblClick||this.refs.input.focus(),(this.props["event-click"]??l)(e,this)}async handleDblClick(e){this.refs.input.focus(),await(this.props["event-dblclick"]??l)(e,this)}async handleInput(e){if(this.state.waiting.get())return e.preventDefault();switch(this.state.waiting.set(!0),this.props.type){case"number":this.state.value.set(+this.refs.input.value);break;case"file":this.state.value.set(this.refs.input.files);break;default:this.state.value.set(this.refs.input.value)}await(this.props["event-input"]??l)(e,this),this.mounted&&this.state.waiting.set(!1)}handleFocus(e){this.props.autoSelectAll&&this.refs.input.select(),(this.props["event-focus"]??l)(e,this)}beforeDestroy(){this.state.value.unsubscribe(this.update)}}const N={title:"Inputs/<Input>",render:f=>P(r(H,f),null).nodes[0],argTypes:{icon:{type:"string",description:"`store-`"},label:{type:"string",description:"`store-`"},title:{type:"string",description:"`store-`"},before:{type:"string",description:"`store-`"},after:{type:"string",description:"`store-`"},placeholder:{type:"string",description:"`store-`"},accept:{type:"string",description:"`store-`"},multiple:{type:"boolean",description:"`store-`"},size:{type:"string",description:"As defined in HTML, but with `auto` handled as well"},autoSelectAll:{type:"boolean"},type:{type:"string"},id:{type:"string"},class:{type:"string"},editOnDblClick:{type:"boolean",description:"Focus input only on dblClick"},active:{type:"boolean",description:"`store-`"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-input":{action:"event-input"},"event-click":{action:"event-click"},"event-dblclick":{action:"event-dblclick"},"event-focus":{action:"event-focus"},"event-blur":{action:"event-blur"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},n={args:{icon:F,title:"click me",placeholder:"type something…",type:"text",class:void 0,autoSelectAll:!1,active:!1,disabled:!1,hidden:!1,waiting:!1}},o={args:{...n.args,type:"number",before:"font-size: ",after:"px",placeholder:10}},d={args:{...n.args,label:"choose file",type:"file",accept:"image/png",multiple:!0}},u={args:{...n.args,size:"auto"}},h={args:{...n.args,waiting:!0}};var b,p,m;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    icon: Icon,
    title: 'click me',
    placeholder: 'type something…',
    type: 'text',
    class: undefined,
    autoSelectAll: false,
    active: false,
    disabled: false,
    hidden: false,
    waiting: false
  }
}`,...(m=(p=n.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var v,g,y;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    type: 'number',
    before: 'font-size: ',
    after: 'px',
    placeholder: 10
  }
}`,...(y=(g=o.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var k,w,x;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    label: 'choose file',
    type: 'file',
    accept: 'image/png',
    multiple: true
  }
}`,...(x=(w=d.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var _,C,z;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    size: 'auto'
  }
}`,...(z=(C=u.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};var I,S,A;h.parameters={...h.parameters,docs:{...(I=h.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    waiting: true
  }
}`,...(A=(S=h.parameters)==null?void 0:S.docs)==null?void 0:A.source}}};const R=["Primary","Number","File","SizeAuto","Async"];export{h as Async,d as File,o as Number,n as Primary,u as SizeAuto,R as __namedExportsOrder,N as default};
//# sourceMappingURL=Input.stories-138f1148.js.map
