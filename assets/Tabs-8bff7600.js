import{C as b,h as e,e as l,w as n}from"./ensure-4e62e800.js";import{T as r}from"./Toggles-e008bd02.js";const u="ui-tabs-4t0pe107",c="ui-tabs__toggles-4t0pe110",d="ui-tabs__panels-4t0pe113",h="ui-tabs__panel-4t0pe113",a={tabs:u,tabs__toggles:c,tabs__panels:d,tabs__panel:h,"is-hidden":"is-hidden","loader-spin":"ui-loader-spin-4t0pe1"};class v extends b{static panel(s,t={}){return e("div",{...t,class:[a.tabs__panel,...Array.isArray(t.class)?t.class:[t.class]]},s)}beforeRender(s){this.update=this.update.bind(this),this.state={value:l(n)(s["store-value"],s.value??0),tabs:l(n)(s["store-tabs"],s.tabs)}}template(s,t){return e("div",{...this.dataProps,id:s.id,class:[a.tabs,...Array.isArray(s.class)?s.class:[s.class]]},e(r,{class:a.tabs__toggles,"store-value":t.value,"store-options":t.tabs,"event-change":s["event-change"]}),e("div",{ref:this.ref("panels"),class:a.tabs__panels},s.children))}afterRender(){this.state.value.subscribe(this.update),this.state.tabs.subscribe(this.update),this.update()}update(){const s=this.state.value.get();for(let t=0;t<this.refs.panels.children.length;t++){const i=this.refs.panels.children[t];i&&i.classList.toggle("is-hidden",t!==s)}}beforeDestroy(){this.state.value.unsubscribe(this.update),this.state.tabs.unsubscribe(this.update)}}export{v as T};
//# sourceMappingURL=Tabs-8bff7600.js.map
