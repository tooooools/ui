import{C as i,e as a,w as c,h as n,n as t}from"./ensure-daa42f41.js";const l="ui-backdrop-1l3kn107",r={backdrop:l,"loader-spin":"ui-loader-spin-1l3kn1"};class u extends i{beforeRender(e){this.close=this.close.bind(this),this.captureEscapeKey=this.captureEscapeKey.bind(this),this.state={lastActiveElement:document.activeElement,locked:a(c)(e["store-locked"],e.locked)}}template(e,d){return n("div",{...this.dataProps,id:e.id,class:[r.backdrop,...Array.isArray(e.class)?e.class:[e.class]],"event-click":s=>(e["event-click"]??t)(s,this)},e.children)}afterMount(){this.state.lastActiveElement&&this.state.lastActiveElement.blur(),window.addEventListener("keyup",this.captureEscapeKey),(this.props["event-open"]??t)(null,this)}captureEscapeKey(e){e.key==="Escape"&&this.close()}close(){this.state.locked.get()||((this.props["event-close"]||t)(null,this),this.destroy())}beforeDestroy(){if(!this.destroyed&&(window.removeEventListener("keyup",this.captureEscapeKey),this.state&&this.state.lastActiveElement)){const e=this.state.lastActiveElement;window.setTimeout(()=>e.focus(),0)}}}export{u as B};
//# sourceMappingURL=Backdrop-286ce58e.js.map