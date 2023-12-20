import{C,e as i,w as s,h as l,n as a,c as I,r as D}from"./index-33f79a1f.js";import{I as z}from"./circle-8871eb28.js";import"./_commonjsHelpers-de833af9.js";const F="ui-input-1gd02107",P="ui-input__icon-1gd02150",c={input:F,"is-hidden":"is-hidden","is-disabled":"is-disabled","is-active":"is-active","is-waiting":"is-waiting","is-edited-on-dblclick":"is-edited-on-dblclick",input__icon:P,"has-icon":"has-icon","loader-spin":"ui-loader-spin-1gd021"};class A extends C{beforeRender(e){this.update=this.update.bind(this),this.handleClick=this.handleClick.bind(this),this.handleDblClick=this.handleDblClick.bind(this),this.handleInput=this.handleInput.bind(this),this.handleFocus=this.handleFocus.bind(this),this.state={value:i(s)(e["store-value"],e.value),files:i(s)(e["store-files"],e.files),placeholder:i(s)(e["store-placeholder"],e.placeholder),title:i(s)(e["store-title"],e.title),label:i(s)(e["store-label"],e.label),before:i(s)(e["store-before"],e.before),after:i(s)(e["store-after"],e.after),icon:i(s)(e["store-icon"],e.icon),accept:i(s)(e["store-accept"],e.accept??"*"),multiple:i(s)(e["store-multiple"],e.multiple??"*"),min:i(s)(e["store-min"],e.min),max:i(s)(e["store-max"],e.max),step:i(s)(e["store-step"],e.step),active:i(s)(e["store-active"],e.active),disabled:i(s)(e["store-disabled"],e.disabled),hidden:i(s)(e["store-hidden"],e.hidden),waiting:i(s)(e["store-waiting"],e.waiting)}}template(e,t){return l("div",{...this.dataProps,id:e.id,tabIndex:e.tabindex,class:I(c.input,e.class,{"is-edited-on-dblclick":e.editOnDblClick}),"data-type":e.type,"store-title":t.title,"store-class-has-icon":t.icon,"store-class-is-active":t.active,"store-class-is-disabled":t.disabled,"store-class-is-hidden":t.hidden,"store-class-is-waiting":t.waiting,"event-click":this.handleClick,"event-dblclick":this.handleDblClick,"event-mouseenter":n=>(e["event-mouseenter"]??a)(n,this),"event-mouseleave":n=>(e["event-mouseleave"]??a)(n,this)},l("span",{ref:this.ref("icon"),class:c.input__icon,"store-innerHTML":t.icon}),l("label",{class:c.input__label,"store-innerHTML":t.label}),l("label",{class:c.input__before,"store-innerHTML":t.before}),l("input",{ref:this.ref("input"),type:e.type,name:e.name,autofocus:e.autofocus,autocomplete:e.autocomplete??"off","store-min":e.type==="number"?t.min:void 0,"store-max":e.type==="number"?t.max:void 0,"store-step":e.type==="number"?t.step:void 0,"store-placeholder":t.placeholder,"store-accept":e.type==="file"?t.accept:void 0,"store-multiple":e.type==="file"?t.multiple:void 0,"store-disabled":t.disabled,"event-click":n=>n.stopPropagation(),"event-input":this.handleInput,"event-focus":this.handleFocus,"event-blur":n=>(e["event-blur"]??a)(n,this)}),l("label",{class:c.input__after,"store-innerHTML":t.after}))}afterRender(){this.state.value.subscribe(this.update),this.update()}update(){const e=this.state.value.get();switch(this.props.type){case"number":{this.refs.input.value=+e;break}case"file":{this.refs.input.files=e;break}default:this.refs.input.value=e}if(this.props.autoSize){const t=(String(this.refs.input.value)??"").length||(this.state.placeholder.current??"").length||1;this.refs.input.style.width=t+1+"ch"}}handleClick(e){this.props.type==="file"?this.refs.input.click():this.props.editOnDblClick||this.refs.input.focus(),(this.props["event-click"]??a)(e,this)}async handleDblClick(e){this.refs.input.focus(),await(this.props["event-dblclick"]??a)(e,this)}async handleInput(e){if(this.state.waiting.get())return e.preventDefault();switch(this.state.waiting.set(!0),this.props.type){case"number":this.state.value.set(+this.refs.input.value);break;case"file":this.state.value.set(this.refs.input.files);break;default:this.state.value.set(this.refs.input.value)}await(this.props["event-input"]??a)(e,this),this.mounted&&this.state.waiting.set(!1)}handleFocus(e){this.props.autoSelectAll&&this.refs.input.select(),(this.props["event-focus"]??a)(e,this)}beforeDestroy(){this.state.value.unsubscribe(this.update)}}const M={title:"Inputs/<Input>",render:h=>D(l(A,h),null).nodes[0],argTypes:{icon:{type:"string",description:"`store-`"},label:{type:"string",description:"`store-`"},title:{type:"string",description:"`store-`"},before:{type:"string",description:"`store-`"},after:{type:"string",description:"`store-`"},placeholder:{type:"string",description:"`store-`"},accept:{type:"string",description:"`store-`"},multiple:{type:"boolean",description:"`store-`"},autoSize:{type:"boolean"},autoSelectAll:{type:"boolean"},type:{type:"string"},id:{type:"string"},class:{type:"string"},editOnDblClick:{type:"boolean",description:"Focus input only on dblClick"},active:{type:"boolean",description:"`store-`"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-input":{action:"event-input"},"event-click":{action:"event-click"},"event-dblclick":{action:"event-dblclick"},"event-focus":{action:"event-focus"},"event-blur":{action:"event-blur"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},r={args:{icon:z,title:"click me",placeholder:"type something…",type:"text",class:void 0,autoSize:!1,autoSelectAll:!1,active:!1,disabled:!1,hidden:!1,waiting:!1}},o={args:{...r.args,type:"number",before:"font-size: ",after:"px",placeholder:10,autoSize:!0}},d={args:{...r.args,label:"choose file",type:"file",accept:"image/png",multiple:!0}},u={args:{...r.args,waiting:!0}};var f,p,b;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    icon: Icon,
    title: 'click me',
    placeholder: 'type something…',
    type: 'text',
    class: undefined,
    autoSize: false,
    autoSelectAll: false,
    active: false,
    disabled: false,
    hidden: false,
    waiting: false
  }
}`,...(b=(p=r.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var m,v,g;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    type: 'number',
    before: 'font-size: ',
    after: 'px',
    placeholder: 10,
    autoSize: true
  }
}`,...(g=(v=o.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var y,k,w;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    label: 'choose file',
    type: 'file',
    accept: 'image/png',
    multiple: true
  }
}`,...(w=(k=d.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var _,S,x;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    waiting: true
  }
}`,...(x=(S=u.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};const O=["Primary","Number","File","Async"];export{u as Async,d as File,o as Number,r as Primary,O as __namedExportsOrder,M as default};
//# sourceMappingURL=Input.stories-661b9ce1.js.map
