import{r as render,h}from"./index-DqvVFXpX.js";import{T as Toggles}from"./Toggles-BNJObLB1.js";import{I as Icon}from"./circle-B3RGTZTt.js";import"./Button-AGVl-iU-.js";const Toggles_stories={title:"Inputs/<Toggles>",render:args=>render(h(Toggles,args),null).nodes[0],argTypes:{title:{type:"string",description:"`store-`"},value:{type:"string",description:"`store-`"},options:{type:"array",description:["`store-`","`[{ value?: mixed, icon?: string, label?: string, disabled?: boolean, hidden?: boolean }, …]`"].map(l=>`<p>${l}</p>`).join(`
`)},id:{type:"string"},class:{type:"string"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-change":{action:"event-change"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},Primary={args:{options:[{icon:Icon,label:"first",value:Symbol("first")},{icon:Icon,label:"second",value:{color:"#FFF"}},{icon:Icon,label:"third",disabled:!0},{icon:Icon,label:"top secret",hidden:!0}],disabled:!1,hidden:!1}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:`{
  args: {
    options: [{
      icon: Icon,
      label: 'first',
      value: Symbol('first')
    }, {
      icon: Icon,
      label: 'second',
      value: {
        color: '#FFF'
      }
    }, {
      icon: Icon,
      label: 'third',
      disabled: true
    }, {
      icon: Icon,
      label: 'top secret',
      hidden: true
    }],
    disabled: false,
    hidden: false
  }
}`,...Primary.parameters?.docs?.source}}};const __namedExportsOrder=["Primary"];export{Primary,__namedExportsOrder,Toggles_stories as default};
