import{r as render,h}from"./index-DqvVFXpX.js";import{B as Button}from"./Button-AGVl-iU-.js";import{I as Icon}from"./circle-B3RGTZTt.js";const Button_stories={title:"Inputs/<Button>",render:args=>render(h(Button,args),null).nodes[0],argTypes:{icon:{type:"string",description:"`store-`"},label:{type:"string",description:"`store-`"},title:{type:"string",description:"`store-`"},type:{type:"string"},id:{type:"string"},class:{type:"string"},active:{type:"boolean",description:"`store-`"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},waiting:{type:"boolean",description:"`store-`"},"event-click":{action:"event-click"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},Primary={args:{icon:Icon,label:"button",title:"click me",type:void 0,class:void 0,active:!1,disabled:!1,hidden:!1,waiting:!1}},Async={args:{...Primary.args,waiting:!0}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:`{
  args: {
    icon: Icon,
    label: 'button',
    title: 'click me',
    type: undefined,
    class: undefined,
    active: false,
    disabled: false,
    hidden: false,
    waiting: false
  }
}`,...Primary.parameters?.docs?.source}}};Async.parameters={...Async.parameters,docs:{...Async.parameters?.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    waiting: true
  }
}`,...Async.parameters?.docs?.source}}};const __namedExportsOrder=["Primary","Async"];export{Async,Primary,__namedExportsOrder,Button_stories as default};
