import{r as i,h as a}from"./ensure-4e62e800.js";import{T as l}from"./Toggles-e008bd02.js";import{I as e}from"./circle-8871eb28.js";import"./Button-77e9d2fe.js";const b={title:"Inputs/<Toggles>",render:o=>i(a(l,o),null).nodes[0],argTypes:{title:{type:"string",description:"`store-`"},value:{type:"string",description:"`store-`"},options:{type:"array",description:["`store-`","`[{ value?: mixed, icon?: string, label?: string, disabled?: boolean, hidden?: boolean }, …]`"].map(o=>`<p>${o}</p>`).join(`
`)},id:{type:"string"},class:{type:"string"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-change":{action:"event-change"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},n={args:{options:[{icon:e,label:"first",value:Symbol("first")},{icon:e,label:"second",value:{color:"#FFF"}},{icon:e,label:"third",disabled:!0},{icon:e,label:"top secret",hidden:!0}],disabled:!1,hidden:!1}};var t,r,s;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(s=(r=n.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const u=["Primary"];export{n as Primary,u as __namedExportsOrder,b as default};
//# sourceMappingURL=Toggles.stories-a3f6b4cf.js.map
