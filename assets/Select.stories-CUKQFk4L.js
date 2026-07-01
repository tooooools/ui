import{C as Component,P as Props,$,h,n as noop,r as render}from"./index-DqvVFXpX.js";import{I as Icon}from"./circle-B3RGTZTt.js";const select="ui-select-4qr6c114",select__icon="ui-select__icon-4qr6c151",select__label="ui-select__label-4qr6c161",select__arrow="ui-select__arrow-4qr6c205",style={select,select__icon,select__label,select__arrow},groupBy=(array=[],key)=>array.reduce((o,obj)=>{const group=obj[key];return o[group]||(o[group]=[]),o[group].push(obj),o},{}),IconDown=`<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;class Select extends Component{static props={value:Props.Signal,options:[Props.array,Props.Signal],label:[Props.string,Props.Signal],title:[Props.string,Props.Signal],icon:Props.string,dropdown:Props.string,disabled:[Props.boolean,Props.Signal],hidden:[Props.boolean,Props.Signal],placeholder:Props.string,required:Props.boolean,compare:Props.function,name:Props.string,id:Props.string,tabindex:Props.number,class:[Props.string,Props.array,Props.object],style:[Props.string,Props.object]};static get separator(){return{label:"",disabled:!0}}$title=$(this.props.title);$label=$(this.props.label);$value=$(this.props.value);$options=$(this.props.options);$disabled=$(this.props.disabled);$hidden=$(this.props.hidden);$selectedIndex=$([this.$value,this.$options],([value,options])=>{const compare=this.props.compare??((a,b)=>a===b);return options?.findIndex(option=>compare(option.value??option,value))??-1});update=()=>{this.clear();const options=this.$options.value;if(!options)return;const selectedIndex=this.$selectedIndex.value;this.props.placeholder&&this.render(h("option",{value:"",disabled:!0,...this.$value.value===void 0||selectedIndex<0?{selected:!0}:{}},this.props.placeholder),this.refs.select);for(const[label,entries]of Object.entries(groupBy(options,"group"))){const children=entries.map(option=>h("option",{value:options.indexOf(option),...option.disabled?{disabled:!0}:{},...options.indexOf(option)===selectedIndex?{selected:!0}:{}},option.label));label!=="undefined"?this.render(h("optgroup",{label},children),this.refs.select):this.render(children,this.refs.select)}};handleChange=e=>{const index=+e.target.value,selected=(this.$options.value??[])[index];this.refs.select.blur(),this.$value.value=selected?selected.value??selected:null,(this.props["event-change"]||noop)(e,this)};afterRender(){this.watch([this.$value,this.$options],this.update,{immediate:!0})}clear(){this.refs.select.innerHTML=""}template(props){return h("div",{...this.dataProps,...this.eventProps,id:props.id,class:[style.select,{"is-disabled":this.$disabled,"is-hidden":this.$hidden},props.class],style:props.style},props.icon&&h("span",{ref:this.ref("icon"),class:style.select__icon,innerHTML:props.icon}),h("div",{class:style.select__label,innerHTML:this.$label}),h("select",{ref:this.ref("select"),name:props.name,required:props.required,tabIndex:props.tabindex,title:this.$title,disabled:this.$disabled,"event-change":this.handleChange}),h("span",{class:style.select__arrow,innerHTML:props.dropdown??IconDown}))}}const Select_stories={title:"Inputs/<Select>",render:args=>render(h(Select,args),null).nodes[0],argTypes:{icon:{type:"string"},dropdown:{type:"string"},title:{type:"string",description:"`store-`"},value:{type:"string",description:"`store-`"},label:{type:"string",description:"`store-`"},compare:{type:"string",description:"Define a custom comparison function for getting the value index from the option. Default to `a === b`"},options:{type:"array",description:["`store-`","`[{ value: mixed, label: string, disabled?: boolean, group?: string }, …]`","Can also contain `Select.separator`"].map(l=>`<p>${l}</p>`).join(`
`)},id:{type:"string"},class:{type:"string"},disabled:{type:"boolean",description:"`store-`"},hidden:{type:"boolean",description:"`store-`"},"event-change":{action:"event-change"},"event-mouseenter":{action:"event-mouseenter"},"event-mouseleave":{action:"event-mouseleave"}}},Primary={args:{icon:Icon,dropdown:void 0,title:"select me",label:void 0,value:void 0,placeholder:"Select an option",options:[Select.separator,{label:"String",value:"UID_12345"},{label:"Number",value:42},{label:"Symbol",value:Symbol("first")},{label:"Object",value:{color:"#FFF"}},{label:"Disabled",disabled:!0}],"event-change":(e,c)=>console.log(c.state.value.current),id:void 0,class:void 0,disabled:!1,hidden:!1}},Grouped={args:{...Primary.args,options:[{group:"Fruits",label:"Apple",value:"🍎"},{group:"Fruits",label:"Banana",value:"🍌"},{group:"Fruits",label:"Cherry",value:"🍒",disabled:!0},{group:"Vegetables",label:"Eggplant",value:"🍆"},{label:"Tomato",value:"🍅"},{label:"Juice",value:"🥤"}]}},tick=$(1);window.setInterval(()=>{tick.value++},1e3);const CustomLabel={args:{...Primary.args,"store-label":tick}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:`{
  args: {
    icon: Icon,
    dropdown: undefined,
    title: 'select me',
    label: undefined,
    value: undefined,
    placeholder: 'Select an option',
    options: [Select.separator,
    // { label: 'foo', value: -1, disabled: true },
    {
      label: 'String',
      value: 'UID_12345'
    }, {
      label: 'Number',
      value: 42
    }, {
      label: 'Symbol',
      value: Symbol('first')
    }, {
      label: 'Object',
      value: {
        color: '#FFF'
      }
    }, {
      label: 'Disabled',
      disabled: true
    }],
    'event-change': (e, c) => console.log(c.state.value.current),
    id: undefined,
    class: undefined,
    disabled: false,
    hidden: false
  }
}`,...Primary.parameters?.docs?.source}}};Grouped.parameters={...Grouped.parameters,docs:{...Grouped.parameters?.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    options: [{
      group: 'Fruits',
      label: 'Apple',
      value: '🍎'
    }, {
      group: 'Fruits',
      label: 'Banana',
      value: '🍌'
    }, {
      group: 'Fruits',
      label: 'Cherry',
      value: '🍒',
      disabled: true
    }, {
      group: 'Vegetables',
      label: 'Eggplant',
      value: '🍆'
    }, {
      label: 'Tomato',
      value: '🍅'
    }, {
      label: 'Juice',
      value: '🥤'
    }]
  }
}`,...Grouped.parameters?.docs?.source}}};CustomLabel.parameters={...CustomLabel.parameters,docs:{...CustomLabel.parameters?.docs,source:{originalSource:`{
  args: {
    ...Primary.args,
    'store-label': tick
  }
}`,...CustomLabel.parameters?.docs?.source}}};const __namedExportsOrder=["Primary","Grouped","CustomLabel"];export{CustomLabel,Grouped,Primary,__namedExportsOrder,Select_stories as default};
