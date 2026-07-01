import{C as Component,P as Props,$,n as noop,h,r as render}from"./index-DqvVFXpX.js";import{B as Button}from"./Button-AGVl-iU-.js";import{T as Toolbar}from"./Toolbar-z3f6fDsD.js";import{I as Icon}from"./circle-B3RGTZTt.js";const picker="ui-picker-80o3v114",picker__toolbar="ui-picker__toolbar-80o3v135",picker__toggle="ui-picker__toggle-80o3v145",style={picker,picker__toolbar,picker__toggle};class Picker extends Component{static props={label:[Props.string,Props.Signal],title:[Props.string,Props.Signal],iconOpen:[Props.string,Props.Signal],iconClose:[Props.string,Props.Signal],open:[Props.boolean,Props.Signal],disabled:[Props.boolean,Props.Signal],hidden:[Props.boolean,Props.Signal],autoClose:Props.boolean,autoOrder:Props.boolean,id:Props.string,class:[Props.string,Props.array,Props.object],style:[Props.string,Props.object]};$label=$(this.props.label);$title=$(this.props.title);$iconOpen=$(this.props.iconOpen);$iconClose=$(this.props.iconClose);$open=$(this.props.open);$disabled=$(this.props.disabled);$hidden=$(this.props.hidden);$toggleIcon=$([this.$open,this.$iconClose,this.$iconOpen],([open,iconClose,iconOpen])=>open?iconClose:iconOpen);handleOpen=()=>{this.$open.value?(this.props["event-open"]??noop)(null,this):(this.props["event-close"]??noop)(null,this)};handleToggle=e=>{e.stopPropagation(),this.$open.value=!this.$open.value};handleClick=(i,callback)=>async e=>{if(!this.$open.value){e.stopPropagation(),this.$open.value=!0;return}for(let index=0;index<this.refs.buttons.length;index++)this.refs.buttons[index].$active.value=index===i;this.props.autoClose&&(this.$open.value=!1),(this.props["event-change"]??noop)(null,this),await callback(e,this.refs.buttons[i])};beforeRender(props){const buttons=props.children.filter(child=>child.type===Button);for(const button of buttons)button.props.ref=this.refArray("buttons"),button.props["event-click"]=this.handleClick(buttons.indexOf(button),button.props["event-click"]||noop)}afterRender(){this.watch(this.$open,this.handleOpen)}template(props){return h("div",{...this.dataProps,...this.eventProps,id:props.id,class:[style.picker,{"has-auto-order":props.autoOrder,"is-open":this.$open,"is-disabled":this.$disabled,"is-hidden":this.$hidden},props.class],style:props.style},h(Button,{class:style.picker__toggle,icon:this.$toggleIcon,label:this.$label,title:this.$title,active:this.$open,"event-click":this.handleToggle}),h(Toolbar,{class:style.picker__toolbar,compact:!0},props.children))}}const IconOpen=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,IconClose=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,Picker_stories={title:"Layout/<Picker>",render:args=>render(h(Picker,args,h(Button,{icon:Icon,label:"Action #1","event-click":()=>console.log("click"),active:!0}),h(Button,{icon:Icon,label:"Action #2"}),h(Button,{icon:Icon,label:"Action #3"}),h(Button,{icon:Icon,label:"Action #4"})),null).nodes[0],argTypes:{iconOpen:{type:"string",description:"`store-`"},iconClose:{type:"string",description:"`store-`"},autoClose:{type:"boolean"},autoOrder:{type:"boolean"},label:{type:"string",description:"`store-`"},title:{type:"string",description:"`store-`"},id:{type:"string"},class:{type:"string"},open:{type:"boolean",description:"`store-`"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-change":{action:"event-change"},"event-open":{action:"event-open"},"event-close":{action:"event-close"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},Primary={args:{label:"pick one",title:"click to pick a new button",autoClose:!1,iconOpen:IconOpen,iconClose:IconClose,id:void 0,class:void 0,open:!1,disabled:!1,hidden:!1}},AutoClose={args:{...Primary.args,autoClose:!0}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:`{
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
}`,...Primary.parameters?.docs?.source}}};AutoClose.parameters={...AutoClose.parameters,docs:{...AutoClose.parameters?.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    autoClose: true
  }
}`,...AutoClose.parameters?.docs?.source}}};const __namedExportsOrder=["Primary","AutoClose"];export{AutoClose,Primary,__namedExportsOrder,Picker_stories as default};
