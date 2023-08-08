import { C as o, h as n, n as l } from "./Component-22d3b949.js";
const s = "_button_mezy8_74", c = "_button__content_mezy8_77", e = {
  button: s,
  button__content: c
};
class b extends o {
  beforeRender() {
    this.handleClick = this.handleClick.bind(this);
  }
  template(t) {
    return /* @__PURE__ */ n(
      "button",
      {
        class: e.button,
        "event-click": this.handleClick
      },
      /* @__PURE__ */ n("div", { class: e.button__content }, t.label)
    );
  }
  handleClick(t) {
    this.log("Hello !"), (this.props["event-click"] || l)(t);
  }
}
export {
  b as Button
};
