import { C as u, h as a, n as o } from "./Component-91875d4d.js";
import { e as i, w as n } from "./ensure-1677847a.js";
const M = "ui-backdrop-1sbax106", R = {
  backdrop: M,
  "loader-spin": "ui-loader-spin-1sbax1"
};
function T(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
var L = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(d) {
  (function() {
    var e = {}.hasOwnProperty;
    function t() {
      for (var s = [], c = 0; c < arguments.length; c++) {
        var l = arguments[c];
        if (l) {
          var h = typeof l;
          if (h === "string" || h === "number")
            s.push(l);
          else if (Array.isArray(l)) {
            if (l.length) {
              var r = t.apply(null, l);
              r && s.push(r);
            }
          } else if (h === "object") {
            if (l.toString !== Object.prototype.toString && !l.toString.toString().includes("[native code]")) {
              s.push(l.toString());
              continue;
            }
            for (var v in l)
              e.call(l, v) && l[v] && s.push(v);
          }
        }
      }
      return s.join(" ");
    }
    d.exports ? (t.default = t, d.exports = t) : window.classNames = t;
  })();
})(L);
var A = L.exports;
const b = /* @__PURE__ */ T(A);
class D extends u {
  beforeRender(e) {
    this.close = this.close.bind(this), this.captureEscapeKey = this.captureEscapeKey.bind(this), this.state = {
      lastActiveElement: document.activeElement
    };
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      "div",
      {
        id: e.id,
        class: b(R.backdrop, e.class),
        "event-click": (s) => (e["event-click"] ?? o)(s, this)
      },
      e.children
    );
  }
  afterMount() {
    this.state.lastActiveElement && this.state.lastActiveElement.blur(), window.addEventListener("keyup", this.captureEscapeKey), (this.props["event-open"] ?? o)(null, this);
  }
  captureEscapeKey(e) {
    e.key === "Escape" && this.close();
  }
  close() {
    (this.props["event-close"] || o)(null, this), this.destroy();
  }
  beforeDestroy() {
    if (!this.destroyed && (window.removeEventListener("keyup", this.captureEscapeKey), this.state && this.state.lastActiveElement)) {
      const e = this.state.lastActiveElement;
      window.setTimeout(() => e.focus(), 0);
    }
  }
}
const z = "ui-button-1vie0106", S = "ui-button__icon-1vie0168", $ = "ui-button__label-1vie0197", w = {
  button: z,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "is-active": "is-active",
  "is-waiting": "is-waiting",
  button__icon: S,
  "loader-spin": "ui-loader-spin-1vie01",
  button__label: $
};
class x extends u {
  beforeRender(e) {
    this.handleClick = this.handleClick.bind(this), this.state = {
      label: i(n)(e["store-label"], e.label),
      title: i(n)(e["store-title"], e.title),
      active: i(n)(e["store-active"], e.active),
      disabled: i(n)(e["store-disabled"], e.disabled),
      hidden: i(n)(e["store-hidden"], e.hidden),
      waiting: i(n)(e["store-waiting"], e.waiting)
    };
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      "button",
      {
        type: e.type,
        id: e.id,
        class: b(w.button, e.class),
        "store-title": t.title,
        "store-class-is-active": t.active,
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "store-class-is-waiting": t.waiting,
        "event-click": this.handleClick,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
      },
      e.icon && /* @__PURE__ */ a(
        "span",
        {
          ref: this.ref("icon"),
          class: w.button__icon,
          innerHTML: e.icon
        }
      ),
      /* @__PURE__ */ a("label", { class: w.button__label, "store-text": t.label })
    );
  }
  async handleClick(e) {
    if (this.base.blur(), this.state.waiting.get())
      return e.preventDefault();
    this.state.waiting.set(!0), await (this.props["event-click"] ?? o)(e, this), this.mounted && (this.state.waiting.set(!1), this && this.refs && this.refs.icon && (this.refs.icon.style.animation = "none", this.refs.icon.offsetHeight, this.refs.icon.style.animation = null));
  }
}
const j = "ui-modal-sg4zr106", H = "ui-modal__header-sg4zr116", I = "ui-modal__title-sg4zr122", O = "ui-modal__content-sg4zr126", m = {
  modal: j,
  modal__header: H,
  modal__title: I,
  modal__content: O,
  "loader-spin": "ui-loader-spin-sg4zr1"
}, K = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
class ne extends u {
  beforeRender(e) {
    this.handleClose = this.handleClose.bind(this), this.state = {
      title: i(n)(e["store-title"], e.title),
      tabs: i(n)(e["store-tabs"], e.tabs),
      locked: i(n)(e["store-locked"], e.locked)
    };
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      D,
      {
        ref: this.ref("backdrop"),
        "event-open": e["event-open"],
        "event-close": e["event-close"]
      },
      /* @__PURE__ */ a(
        "div",
        {
          id: e.id,
          class: b(m.modal, e.class),
          "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
          "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
        },
        /* @__PURE__ */ a("header", { class: m.modal__header }, /* @__PURE__ */ a(
          x,
          {
            class: m.modal__title,
            icon: e.icon,
            "store-label": t.title
          }
        ), /* @__PURE__ */ a(
          x,
          {
            class: m.modal__close,
            icon: K,
            "store-hidden": t.locked,
            "event-click": this.handleClose
          }
        )),
        /* @__PURE__ */ a("div", { class: m.modal__content }, e.children)
      )
    );
  }
  handleClose() {
    this.state.locked.get() || this.refs.backdrop.close();
  }
}
const q = "ui-range-wp74p106", B = "ui-range__icon-wp74p136", p = "ui-range__label-wp74p153", y = {
  range: q,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  range__icon: B,
  range__label: p,
  "loader-spin": "ui-loader-spin-wp74p1"
};
function C(d, e, t) {
  var s, c, l, h, r;
  e == null && (e = 100);
  function v() {
    var f = Date.now() - h;
    f < e && f >= 0 ? s = setTimeout(v, e - f) : (s = null, t || (r = d.apply(l, c), l = c = null));
  }
  var g = function() {
    l = this, c = arguments, h = Date.now();
    var f = t && !s;
    return s || (s = setTimeout(v, e)), f && (r = d.apply(l, c), l = c = null), r;
  };
  return g.clear = function() {
    s && (clearTimeout(s), s = null);
  }, g.flush = function() {
    s && (r = d.apply(l, c), l = c = null, clearTimeout(s), s = null);
  }, g;
}
C.debounce = C;
var N = C;
class ae extends u {
  beforeRender(e) {
    this.handleInput = e.debounce ? N.debounce(this.handleInput.bind(this), e.debounce) : this.handleInput.bind(this), this.state = {
      label: i(n)(e["store-label"], e.label),
      title: i(n)(e["store-title"], e.title),
      value: i(n)(e["store-value"], e.value),
      min: i(n)(e["store-min"], e.min),
      max: i(n)(e["store-max"], e.max),
      step: i(n)(e["store-step"], e.step),
      disabled: i(n)(e["store-disabled"], e.disabled),
      hidden: i(n)(e["store-hidden"], e.hidden)
    };
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      "div",
      {
        id: e.id,
        class: b(y.range, e.class),
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
      },
      e.icon && /* @__PURE__ */ a(
        "span",
        {
          ref: this.ref("icon"),
          class: y.range__icon,
          innerHTML: e.icon
        }
      ),
      /* @__PURE__ */ a(
        "input",
        {
          ref: this.ref("input"),
          type: "range",
          "store-min": t.min,
          "store-max": t.max,
          "store-step": t.step,
          "store-title": t.title,
          "store-value": t.value,
          "store-disabled": t.disabled,
          "event-input": this.handleInput
        }
      ),
      /* @__PURE__ */ a("label", { class: y.range__label, "store-text": t.label })
    );
  }
  async handleInput(e) {
    await (this.props["event-input"] ?? o)(e, this), this.state.value.set(+this.refs.input.value);
  }
}
const P = "ui-select-1fz7g106", F = "ui-select__icon-1fz7g136", U = "ui-select__arrow-1fz7g173", k = {
  select: P,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  select__icon: F,
  select__arrow: U,
  "loader-spin": "ui-loader-spin-1fz7g1"
}, V = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`, E = Symbol("select-placeholder-value");
class le extends u {
  static get separator() {
    return { value: Symbol("separator"), label: "", disabled: !0 };
  }
  static placeholder(e = "select") {
    return { value: E, label: e, disabled: !0 };
  }
  beforeRender(e) {
    this.update = this.update.bind(this), this.handleChange = this.handleChange.bind(this), this.state = {
      title: i(n)(e["store-title"], e.title),
      value: i(n)(e["store-value"], e.value ?? E),
      options: i(n)(e["store-options"], e.options),
      disabled: i(n)(e["store-disabled"], e.disabled),
      hidden: i(n)(e["store-hidden"], e.hidden)
    };
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      "div",
      {
        id: e.id,
        class: b(k.select, e.class),
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
      },
      e.icon && /* @__PURE__ */ a(
        "span",
        {
          ref: this.ref("icon"),
          class: k.select__icon,
          innerHTML: e.icon
        }
      ),
      /* @__PURE__ */ a(
        "select",
        {
          ref: this.ref("select"),
          "store-title": t.title,
          "store-disabled": t.disabled,
          "event-change": this.handleChange
        }
      ),
      /* @__PURE__ */ a("span", { class: k.select__arrow, innerHTML: V })
    );
  }
  afterRender() {
    this.state.value.subscribe(this.update), this.state.options.subscribe(this.update), this.update();
  }
  clear() {
    this.refs.select.innerHTML = "";
  }
  update() {
    this.clear();
    const e = this.state.options.get();
    e && this.render(e.map(({ value: t, label: s, disabled: c } = {}) => /* @__PURE__ */ a(
      "option",
      {
        value: t,
        disabled: c,
        selected: t === this.state.value.current
      },
      s ?? t
    )), this.refs.select);
  }
  handleChange(e) {
    this.state.value.set(e.target.value), (this.props["event-change"] || o)(e, this);
  }
  beforeDestroy() {
    this.state.value.unsubscribe(this.update), this.state.options.unsubscribe(this.update);
  }
}
const G = "ui-tabs-2dao0106", J = "ui-tabs__toggles-2dao0109", Q = "ui-tabs__panels-2dao0112", W = "ui-tabs__panel-2dao0112", _ = {
  tabs: G,
  tabs__toggles: J,
  tabs__panels: Q,
  tabs__panel: W,
  "is-hidden": "is-hidden",
  "loader-spin": "ui-loader-spin-2dao01"
}, X = "ui-toggles-hhqqt106", Y = {
  toggles: X,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "loader-spin": "ui-loader-spin-hhqqt1"
};
class Z extends u {
  beforeRender(e) {
    this.update = this.update.bind(this), this.handleChange = this.handleChange.bind(this), this.state = {
      title: i(n)(e["store-title"], e.title),
      value: i(n)(e["store-value"], e.value),
      options: i(n)(e["store-options"], e.options ?? []),
      disabled: i(n)(e["store-disabled"], e.disabled),
      hidden: i(n)(e["store-hidden"], e.hidden)
    };
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      "div",
      {
        id: e.id,
        class: b(Y.toggles, e.class),
        "store-title": t.title,
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
      }
    );
  }
  afterRender() {
    this.state.value.subscribe(this.update), this.state.options.subscribe(this.update), this.update();
  }
  clear() {
    this.refs.buttons && (this.refs.buttons.forEach((e) => e == null ? void 0 : e.destroy()), delete this.refs.buttons);
  }
  update() {
    this.clear();
    const e = this.state.options.get();
    e && this.render(e.map(({ icon: t, value: s, label: c, disabled: l, hidden: h } = {}, r) => /* @__PURE__ */ a(
      x,
      {
        ref: this.refArray("buttons"),
        icon: t,
        "store-label": c ?? s ?? r,
        "store-active": (s ?? r) === this.state.value.current,
        "store-disabled": l,
        "store-hidden": h,
        "event-click": this.handleChange(s ?? r)
      }
    )), this.base);
  }
  handleChange(e) {
    return (t) => {
      this.state.value.set(e), (this.props["event-change"] || o)(t, this);
    };
  }
  beforeDestroy() {
    this.state.value.unsubscribe(this.update), this.state.options.unsubscribe(this.update);
  }
}
class de extends u {
  static panel(e, t) {
    return /* @__PURE__ */ a("div", { class: _.tabs__panel, ...t }, e);
  }
  beforeRender(e) {
    this.update = this.update.bind(this), this.state = {
      value: i(n)(e["store-value"], e.value ?? 0),
      tabs: i(n)(e["store-tabs"], e.tabs)
    };
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      "div",
      {
        id: e.id,
        class: b(_.tabs, e.class)
      },
      /* @__PURE__ */ a(
        Z,
        {
          class: _.tabs__toggles,
          "store-value": t.value,
          "store-options": t.tabs,
          "event-change": e["event-change"]
        }
      ),
      /* @__PURE__ */ a(
        "div",
        {
          ref: this.ref("panels"),
          class: _.tabs__panels
        },
        e.children
      )
    );
  }
  afterRender() {
    this.state.value.subscribe(this.update), this.state.tabs.subscribe(this.update), this.update();
  }
  update() {
    const e = this.state.value.get();
    for (let t = 0; t < this.refs.panels.children.length; t++) {
      const s = this.refs.panels.children[t];
      s && s.classList.toggle("is-hidden", t !== e);
    }
  }
  beforeDestroy() {
    this.state.value.unsubscribe(this.update), this.state.tabs.unsubscribe(this.update);
  }
}
const ee = "ui-toolbar-rfw86106", te = {
  toolbar: ee,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "is-compact": "is-compact",
  "loader-spin": "ui-loader-spin-rfw861"
};
class oe extends u {
  beforeRender(e) {
    this.state = {
      compact: i(n)(e["store-compact"], e.compact),
      disabled: i(n)(e["store-disabled"], e.disabled),
      hidden: i(n)(e["store-hidden"], e.hidden)
    };
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      "div",
      {
        id: e.id,
        class: b(te.toolbar, e.class),
        "store-class-is-compact": t.compact,
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
      },
      e.children
    );
  }
}
export {
  D as Backdrop,
  x as Button,
  ne as Modal,
  ae as Range,
  le as Select,
  de as Tabs,
  Z as Toggles,
  oe as Toolbar
};
