import{r as render,h}from"./index-DqvVFXpX.js";import{T as Toolbar}from"./Toolbar-z3f6fDsD.js";import{I as Icon}from"./circle-B3RGTZTt.js";import{B as Button}from"./Button-AGVl-iU-.js";const Toolbar_stories={title:"Layout/<Toolbar>",render:args=>render(h(Toolbar,args,h(Button,{icon:Icon,label:"button"}),h("hr"),h(Button,{icon:Icon}),h(Button,{icon:Icon}),h(Button,{icon:Icon})),null).nodes[0],argTypes:{compact:{type:"boolean",description:"`store-`"},id:{type:"string"},class:{type:"string"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}},args:{compact:!1}},Primary={args:{compact:!1,disabled:!1,hidden:!1}},Nested={render:args=>render(h(Toolbar,args,h(Button,{icon:Icon,label:"button"}),h(Toolbar,{compact:!0},h(Button,{icon:Icon,label:"button"}),h("hr"),h(Button,{icon:Icon}),h(Button,{icon:Icon})),h(Button,{icon:Icon})),null).nodes[0]};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:`{
  args: {
    compact: false,
    disabled: false,
    hidden: false
  }
}`,...Primary.parameters?.docs?.source}}};Nested.parameters={...Nested.parameters,docs:{...Nested.parameters?.docs,source:{originalSource:`{
  render: args => render(h(Toolbar, args, ...[h(Button, {
    icon: Icon,
    label: 'button'
  }), h(Toolbar, {
    compact: true
  }, ...[h(Button, {
    icon: Icon,
    label: 'button'
  }), h('hr'), h(Button, {
    icon: Icon
  }), h(Button, {
    icon: Icon
  })]), h(Button, {
    icon: Icon
  })]), null).nodes[0]
}`,...Nested.parameters?.docs?.source}}};const __namedExportsOrder=["Primary","Nested"];export{Nested,Primary,__namedExportsOrder,Toolbar_stories as default};
