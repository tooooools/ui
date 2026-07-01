import{C as Component,P as Props,$,n as noop,h,r as render}from"./index-DqvVFXpX.js";import{I as Icon}from"./circle-B3RGTZTt.js";const input="ui-input-r7lw0114",input__icon="ui-input__icon-r7lw0157",style={input,input__icon};class Input extends Component{static props={value:[Props.string,Props.number,Props.object,Props.Signal],placeholder:[Props.string,Props.Signal],label:[Props.string,Props.Signal],before:[Props.string,Props.Signal],after:[Props.string,Props.Signal],icon:[Props.string,Props.Signal],title:[Props.string,Props.Signal],active:[Props.boolean,Props.Signal],disabled:[Props.boolean,Props.Signal],hidden:[Props.boolean,Props.Signal],waiting:[Props.boolean,Props.Signal],min:[Props.number,Props.Signal],max:[Props.number,Props.Signal],step:[Props.number,Props.Signal],accept:Props.string,multiple:Props.boolean,size:[Props.number,Props.string],autofocus:Props.boolean,autocomplete:Props.string,autoSelectAll:Props.boolean,editOnDblClick:Props.boolean,type:Props.string,name:Props.string,id:Props.string,tabindex:Props.number,class:[Props.string,Props.array,Props.object],style:[Props.string,Props.object]};$value=$(this.props.value);$files=$(this.props.files);$placeholder=$(this.props.placeholder);$title=$(this.props.title);$label=$(this.props.label);$before=$(this.props.before);$after=$(this.props.after);$icon=$(this.props.icon);$accept=$(this.props.accept??"*");$multiple=$(this.props.multiple??"*");$min=$(this.props.min);$max=$(this.props.max);$step=$(this.props.step);$active=$(this.props.active);$disabled=$(this.props.disabled);$hidden=$(this.props.hidden);$waiting=$(this.props.waiting);update=()=>{const value=this.$value.value;switch(this.props.type){case"number":{this.refs.input.value=+value;break}case"file":{this.refs.input.files=value;break}default:this.refs.input.value=value}if(this.props.size==="auto"){const length=(String(this.refs.input.value)??"").length||(this.$placeholder.value??"").length||1;this.props.type==="number"?this.refs.input.style.width=length+1+"ch":this.refs.input.size=Math.max(1,length)}};handleClick=e=>{this.props.type==="file"?this.refs.input.click():this.props.editOnDblClick||this.refs.input.focus(),(this.props["event-click"]??noop)(e,this)};handleDblClick=async e=>{this.refs.input.focus(),await(this.props["event-dblclick"]??noop)(e,this)};handleInput=async e=>{if(this.$waiting.value)return e.preventDefault();switch(this.$waiting.value=!0,this.props.type){case"number":this.$value.value=+this.refs.input.value;break;case"file":this.$value.value=this.refs.input.files;break;default:this.$value.value=this.refs.input.value}await(this.props["event-input"]??noop)(e,this),this.mounted&&(this.$waiting.value=!1)};handleFocus=e=>{this.props.autoSelectAll&&this.refs.input.select(),(this.props["event-focus"]??noop)(e,this)};afterRender(){this.watch(this.$value,this.update,{immediate:!0})}template(props){return h("div",{...this.dataProps,...this.eventProps,id:props.id,tabIndex:props.tabindex,class:[style.input,{"is-edited-on-dblclick":!!props.editOnDblClick,"has-icon":this.$icon,"is-active":this.$active,"is-disabled":this.$disabled,"is-hidden":this.$hidden,"is-waiting":this.$waiting},props.class],style:props.style,"data-type":props.type,title:this.$title,"event-click":this.handleClick,"event-dblclick":this.handleDblClick},h("span",{ref:this.ref("icon"),class:style.input__icon,innerHTML:this.$icon}),h("label",{class:style.input__label,innerHTML:this.$label}),h("label",{class:style.input__before,innerHTML:this.$before}),h("input",{ref:this.ref("input"),type:props.type,name:props.name,autofocus:props.autofocus,autocomplete:props.autocomplete??"off",size:props.type!=="number"?props.size==="auto"?"":props.size:void 0,min:props.type==="number"?this.$min:void 0,max:props.type==="number"?this.$max:void 0,step:props.type==="number"?this.$step:void 0,placeholder:this.$placeholder,accept:props.type==="file"?this.$accept:void 0,multiple:props.type==="file"?this.$multiple:void 0,disabled:this.$disabled,"event-click":e=>e.stopPropagation(),"event-input":this.handleInput,"event-focus":this.handleFocus,"event-blur":props["event-blur"]}),h("label",{class:style.input__after,innerHTML:this.$after}))}}const Input_stories={title:"Inputs/<Input>",render:args=>render(h(Input,args),null).nodes[0],argTypes:{icon:{type:"string",description:"`store-`"},label:{type:"string",description:"`store-`"},title:{type:"string",description:"`store-`"},before:{type:"string",description:"`store-`"},after:{type:"string",description:"`store-`"},placeholder:{type:"string",description:"`store-`"},accept:{type:"string",description:"`store-`"},multiple:{type:"boolean",description:"`store-`"},size:{type:"string",description:"As defined in HTML, but with `auto` handled as well"},autoSelectAll:{type:"boolean"},type:{type:"string"},id:{type:"string"},class:{type:"string"},editOnDblClick:{type:"boolean",description:"Focus input only on dblClick"},active:{type:"boolean",description:"`store-`"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-input":{action:"event-input"},"event-click":{action:"event-click"},"event-dblclick":{action:"event-dblclick"},"event-focus":{action:"event-focus"},"event-blur":{action:"event-blur"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},Primary={args:{icon:Icon,title:"click me",placeholder:"type something…",type:"text",class:void 0,autoSelectAll:!1,active:!1,disabled:!1,hidden:!1,waiting:!1}},Number={args:{...Primary.args,type:"number",before:"font-size: ",after:"px",placeholder:10}},File={args:{...Primary.args,label:"choose file",type:"file",accept:"image/png",multiple:!0}},SizeAuto={args:{...Primary.args,size:"auto"}},Async={args:{...Primary.args,waiting:!0}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:`{
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
}`,...Primary.parameters?.docs?.source}}};Number.parameters={...Number.parameters,docs:{...Number.parameters?.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    type: 'number',
    before: 'font-size: ',
    after: 'px',
    placeholder: 10
  }
}`,...Number.parameters?.docs?.source}}};File.parameters={...File.parameters,docs:{...File.parameters?.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    label: 'choose file',
    type: 'file',
    accept: 'image/png',
    multiple: true
  }
}`,...File.parameters?.docs?.source}}};SizeAuto.parameters={...SizeAuto.parameters,docs:{...SizeAuto.parameters?.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    size: 'auto'
  }
}`,...SizeAuto.parameters?.docs?.source}}};Async.parameters={...Async.parameters,docs:{...Async.parameters?.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    waiting: true
  }
}`,...Async.parameters?.docs?.source}}};const __namedExportsOrder=["Primary","Number","File","SizeAuto","Async"];export{Async,File,Number,Primary,SizeAuto,__namedExportsOrder,Input_stories as default};
