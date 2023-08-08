import { C as b, h as c, n as r } from "./Component-22d3b949.js";
import { w as u } from "./writable-e21d6212.js";
const m = "_button_1up78_93", _ = "_button__icon_1up78_148", d = {
  button: m,
  "is-disabled": "is-disabled",
  "is-hidden": "is-hidden",
  "is-waiting": "is-waiting",
  button__icon: _,
  "loader-spin": "_loader-spin_1up78_1"
};
function v(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var h = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(i) {
  (function() {
    var t = {}.hasOwnProperty;
    function s() {
      for (var n = [], a = 0; a < arguments.length; a++) {
        var e = arguments[a];
        if (e) {
          var o = typeof e;
          if (o === "string" || o === "number")
            n.push(e);
          else if (Array.isArray(e)) {
            if (e.length) {
              var f = s.apply(null, e);
              f && n.push(f);
            }
          } else if (o === "object") {
            if (e.toString !== Object.prototype.toString && !e.toString.toString().includes("[native code]")) {
              n.push(e.toString());
              continue;
            }
            for (var l in e)
              t.call(e, l) && e[l] && n.push(l);
          }
        }
      }
      return n.join(" ");
    }
    i.exports ? (s.default = s, i.exports = s) : window.classNames = s;
  })();
})(h);
var w = h.exports;
const g = /* @__PURE__ */ v(w);
class C extends b {
  beforeRender(t) {
    this.handleClick = this.handleClick.bind(this), this.state = {
      isWaiting: t["store-waiting"] || u(t.waiting),
      isDisabled: t["store-disabled"] || u(t.disabled),
      isHidden: t["store-hidden"] || u(t.hidden)
    };
  }
  template(t, s) {
    return /* @__PURE__ */ c(
      "button",
      {
        title: t.title,
        type: t.type,
        class: g(d.button, t.class),
        "store-class-is-waiting": s.isWaiting,
        "store-class-is-disabled": s.isDisabled,
        "store-class-is-hidden": s.isHidden,
        "event-click": this.handleClick,
        "event-mouseenter": t["event-mouseenter"] ?? r,
        "event-mouseleave": t["event-mouseleave"] ?? r
      },
      t.icon && /* @__PURE__ */ c(
        "span",
        {
          ref: this.ref("icon"),
          class: d.button__icon,
          innerHTML: t.icon
        }
      ),
      t.label && /* @__PURE__ */ c("span", { class: d.button__text }, t.label)
    );
  }
  async handleClick(t) {
    if (this.state.isWaiting.get())
      return t.preventDefault();
    this.state.isWaiting.set(!0), await (this.props["event-click"] ?? r)(t), this.mounted && (this.state.isWaiting.set(!1), this && this.refs && this.refs.icon && (this.refs.icon.style.animation = "none", this.refs.icon.offsetHeight, this.refs.icon.style.animation = null));
  }
}
export {
  C as Button
};
