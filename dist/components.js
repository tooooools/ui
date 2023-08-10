import { C as h, h as a, n as l } from "./Component-91875d4d.js";
import { e as i, w as n, d as M } from "./ensure-7ccabe2f.js";
const T = "ui-backdrop-1epgy106", R = {
  backdrop: T,
  "loader-spin": "ui-loader-spin-1epgy1"
};
function A(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
var p = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(d) {
  (function() {
    var e = {}.hasOwnProperty;
    function t() {
      for (var s = [], r = 0; r < arguments.length; r++) {
        var o = arguments[r];
        if (o) {
          var b = typeof o;
          if (b === "string" || b === "number")
            s.push(o);
          else if (Array.isArray(o)) {
            if (o.length) {
              var c = t.apply(null, o);
              c && s.push(c);
            }
          } else if (b === "object") {
            if (o.toString !== Object.prototype.toString && !o.toString.toString().includes("[native code]")) {
              s.push(o.toString());
              continue;
            }
            for (var v in o)
              e.call(o, v) && o[v] && s.push(v);
          }
        }
      }
      return s.join(" ");
    }
    d.exports ? (t.default = t, d.exports = t) : window.classNames = t;
  })();
})(p);
var I = p.exports;
const u = /* @__PURE__ */ A(I);
class z extends h {
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
        class: u(R.backdrop, e.class),
        "event-click": (s) => (e["event-click"] ?? l)(s, this)
      },
      e.children
    );
  }
  afterMount() {
    this.state.lastActiveElement && this.state.lastActiveElement.blur(), window.addEventListener("keyup", this.captureEscapeKey), (this.props["event-open"] ?? l)(null, this);
  }
  captureEscapeKey(e) {
    e.key === "Escape" && this.close();
  }
  close() {
    (this.props["event-close"] || l)(null, this), this.destroy();
  }
  beforeDestroy() {
    if (!this.destroyed && (window.removeEventListener("keyup", this.captureEscapeKey), this.state && this.state.lastActiveElement)) {
      const e = this.state.lastActiveElement;
      window.setTimeout(() => e.focus(), 0);
    }
  }
}
const D = "ui-button-abb5k106", $ = "ui-button__icon-abb5k167", j = "ui-button__label-abb5k199", k = {
  button: D,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "is-active": "is-active",
  "is-waiting": "is-waiting",
  button__icon: $,
  "has-icon": "has-icon",
  "loader-spin": "ui-loader-spin-abb5k1",
  button__label: j
};
class g extends h {
  beforeRender(e) {
    this.handleClick = this.handleClick.bind(this), this.state = {
      label: i(n)(e["store-label"], e.label),
      title: i(n)(e["store-title"], e.title),
      icon: i(n)(e["store-icon"], e.icon),
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
        class: u(k.button, e.class),
        "store-title": t.title,
        "store-class-has-icon": t.icon,
        "store-class-is-active": t.active,
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "store-class-is-waiting": t.waiting,
        "event-click": this.handleClick,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? l)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? l)(s, this)
      },
      /* @__PURE__ */ a(
        "span",
        {
          ref: this.ref("icon"),
          class: k.button__icon,
          "store-innerHTML": t.icon
        }
      ),
      /* @__PURE__ */ a("label", { class: k.button__label, "store-text": t.label })
    );
  }
  async handleClick(e) {
    if (this.base.blur(), this.state.waiting.get())
      return e.preventDefault();
    this.state.waiting.set(!0), await (this.props["event-click"] ?? l)(e, this), this.mounted && (this.state.waiting.set(!1), this && this.refs && this.refs.icon && (this.refs.icon.style.animation = "none", this.refs.icon.offsetHeight, this.refs.icon.style.animation = null));
  }
}
const O = "ui-modal-6zzd4106", S = "ui-modal__header-6zzd4116", H = "ui-modal__title-6zzd4122", B = "ui-modal__content-6zzd4126", f = {
  modal: O,
  modal__header: S,
  modal__title: H,
  modal__content: B,
  "loader-spin": "ui-loader-spin-6zzd41"
}, K = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
class ue extends h {
  beforeRender(e) {
    this.handleClose = this.handleClose.bind(this), this.state = {
      title: i(n)(e["store-title"], e.title),
      tabs: i(n)(e["store-tabs"], e.tabs),
      locked: i(n)(e["store-locked"], e.locked)
    };
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      z,
      {
        ref: this.ref("backdrop"),
        "event-open": e["event-open"],
        "event-close": e["event-close"]
      },
      /* @__PURE__ */ a(
        "div",
        {
          id: e.id,
          class: u(f.modal, e.class),
          "event-mouseenter": (s) => (e["event-mouseenter"] ?? l)(s, this),
          "event-mouseleave": (s) => (e["event-mouseleave"] ?? l)(s, this)
        },
        /* @__PURE__ */ a("header", { class: f.modal__header }, /* @__PURE__ */ a(
          g,
          {
            class: f.modal__title,
            icon: e.icon,
            "store-label": t.title
          }
        ), /* @__PURE__ */ a(
          g,
          {
            class: f.modal__close,
            icon: K,
            "store-hidden": t.locked,
            "event-click": this.handleClose
          }
        )),
        /* @__PURE__ */ a("div", { class: f.modal__content }, e.children)
      )
    );
  }
  handleClose() {
    this.state.locked.get() || this.refs.backdrop.close();
  }
}
const P = "ui-picker-1w9rr106", N = "ui-picker__toolbar-1w9rr127", q = "ui-picker__toggle-1w9rr140", y = {
  picker: P,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  picker__toolbar: N,
  "is-open": "is-open",
  "is-active": "is-active",
  picker__toggle: q,
  "loader-spin": "ui-loader-spin-1w9rr1"
}, F = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`, U = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`, V = "ui-toolbar-1fqit106", G = {
  toolbar: V,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "is-compact": "is-compact",
  "loader-spin": "ui-loader-spin-1fqit1"
};
class J extends h {
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
        class: u(G.toolbar, e.class),
        "store-class-is-compact": t.compact,
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? l)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? l)(s, this)
      },
      e.children
    );
  }
}
class be extends h {
  beforeRender(e) {
    this.handleToggle = this.handleToggle.bind(this);
    const t = e.children.filter((s) => s.type === g);
    for (const s of t)
      s.props.ref = this.refArray("buttons"), s.props["event-click"] = this.handleChange(
        t.indexOf(s),
        s.props["event-click"] || l
      );
    this.state = {
      label: i(n)(e["store-label"], e.label),
      title: i(n)(e["store-title"], e.title),
      open: i(n)(e["store-open"], e.open),
      disabled: i(n)(e["store-disabled"], e.disabled),
      hidden: i(n)(e["store-hidden"], e.hidden)
    }, this.state.toggleIcon = M(this.state.open, () => this.state.open.current ? F : U);
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      "div",
      {
        id: e.id,
        class: u(y.picker, e.class),
        "store-class-is-open": t.open,
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? l)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? l)(s, this)
      },
      /* @__PURE__ */ a(
        J,
        {
          class: y.picker__toolbar,
          compact: !0
        },
        e.children
      ),
      /* @__PURE__ */ a(
        g,
        {
          class: y.picker__toggle,
          "store-icon": t.toggleIcon,
          "store-label": t.label,
          "store-title": t.title,
          "event-click": this.handleToggle
        }
      )
    );
  }
  handleToggle() {
    this.state.open.update((e) => !e);
  }
  handleChange(e, t) {
    return async (s) => {
      for (let r = 0; r < this.refs.buttons.length; r++)
        this.refs.buttons[r].state.active.set(r === e);
      this.state.open.set(!1), (this.props["event-change"] ?? l)(null, this), await t(s, this.refs.buttons[e]);
    };
  }
}
const Q = "ui-range-1eiot106", W = "ui-range__icon-1eiot135", X = "ui-range__label-1eiot152", x = {
  range: Q,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  range__icon: W,
  range__label: X,
  "loader-spin": "ui-loader-spin-1eiot1"
};
function L(d, e, t) {
  var s, r, o, b, c;
  e == null && (e = 100);
  function v() {
    var _ = Date.now() - b;
    _ < e && _ >= 0 ? s = setTimeout(v, e - _) : (s = null, t || (c = d.apply(o, r), o = r = null));
  }
  var w = function() {
    o = this, r = arguments, b = Date.now();
    var _ = t && !s;
    return s || (s = setTimeout(v, e)), _ && (c = d.apply(o, r), o = r = null), c;
  };
  return w.clear = function() {
    s && (clearTimeout(s), s = null);
  }, w.flush = function() {
    s && (c = d.apply(o, r), o = r = null, clearTimeout(s), s = null);
  }, w;
}
L.debounce = L;
var Y = L;
class ve extends h {
  beforeRender(e) {
    this.handleInput = e.debounce ? Y.debounce(this.handleInput.bind(this), e.debounce) : this.handleInput.bind(this), this.state = {
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
        class: u(x.range, e.class),
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? l)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? l)(s, this)
      },
      e.icon && /* @__PURE__ */ a(
        "span",
        {
          ref: this.ref("icon"),
          class: x.range__icon,
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
      /* @__PURE__ */ a("label", { class: x.range__label, "store-text": t.label })
    );
  }
  async handleInput(e) {
    await (this.props["event-input"] ?? l)(e, this), this.state.value.set(+this.refs.input.value);
  }
}
const Z = "ui-select-1p5rg106", ee = "ui-select__icon-1p5rg135", te = "ui-select__arrow-1p5rg170", C = {
  select: Z,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  select__icon: ee,
  select__arrow: te,
  "loader-spin": "ui-loader-spin-1p5rg1"
}, se = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`, E = Symbol("select-placeholder-value");
class _e extends h {
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
        class: u(C.select, e.class),
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? l)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? l)(s, this)
      },
      e.icon && /* @__PURE__ */ a(
        "span",
        {
          ref: this.ref("icon"),
          class: C.select__icon,
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
      /* @__PURE__ */ a("span", { class: C.select__arrow, innerHTML: se })
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
    e && this.render(e.map(({ value: t, label: s, disabled: r } = {}) => /* @__PURE__ */ a(
      "option",
      {
        value: t,
        disabled: r,
        selected: t === this.state.value.current
      },
      s ?? t
    )), this.refs.select);
  }
  handleChange(e) {
    this.state.value.set(e.target.value), (this.props["event-change"] || l)(e, this);
  }
  beforeDestroy() {
    this.state.value.unsubscribe(this.update), this.state.options.unsubscribe(this.update);
  }
}
const ie = "ui-tabs-17euv106", ne = "ui-tabs__toggles-17euv109", ae = "ui-tabs__panels-17euv112", le = "ui-tabs__panel-17euv112", m = {
  tabs: ie,
  tabs__toggles: ne,
  tabs__panels: ae,
  tabs__panel: le,
  "is-hidden": "is-hidden",
  "loader-spin": "ui-loader-spin-17euv1"
}, oe = "ui-toggles-1ibi8106", de = {
  toggles: oe,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "loader-spin": "ui-loader-spin-1ibi81"
};
class re extends h {
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
        class: u(de.toggles, e.class),
        "store-title": t.title,
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? l)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? l)(s, this)
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
    e && this.render(e.map(({ icon: t, value: s, label: r, disabled: o, hidden: b } = {}, c) => /* @__PURE__ */ a(
      g,
      {
        ref: this.refArray("buttons"),
        icon: t,
        "store-label": r ?? s ?? c,
        "store-active": (s ?? c) === this.state.value.current,
        "store-disabled": o,
        "store-hidden": b,
        "event-click": this.handleChange(s ?? c)
      }
    )), this.base);
  }
  handleChange(e) {
    return (t) => {
      this.state.value.set(e), (this.props["event-change"] || l)(t, this);
    };
  }
  beforeDestroy() {
    this.state.value.unsubscribe(this.update), this.state.options.unsubscribe(this.update);
  }
}
class fe extends h {
  static panel(e, t) {
    return /* @__PURE__ */ a("div", { class: m.tabs__panel, ...t }, e);
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
        class: u(m.tabs, e.class)
      },
      /* @__PURE__ */ a(
        re,
        {
          class: m.tabs__toggles,
          "store-value": t.value,
          "store-options": t.tabs,
          "event-change": e["event-change"]
        }
      ),
      /* @__PURE__ */ a(
        "div",
        {
          ref: this.ref("panels"),
          class: m.tabs__panels
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
export {
  z as Backdrop,
  g as Button,
  ue as Modal,
  be as Picker,
  ve as Range,
  _e as Select,
  fe as Tabs,
  re as Toggles,
  J as Toolbar
};
//# sourceMappingURL=components.js.map
