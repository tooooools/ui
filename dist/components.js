import { C as h, h as a, n as o } from "./Component-91875d4d.js";
import { e as i, w as n, d as L } from "./ensure-7ccabe2f.js";
const I = "ui-backdrop-1epgy106", M = {
  backdrop: I,
  "loader-spin": "ui-loader-spin-1epgy1"
};
function T(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
var E = { exports: {} };
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
          var b = typeof l;
          if (b === "string" || b === "number")
            s.push(l);
          else if (Array.isArray(l)) {
            if (l.length) {
              var r = t.apply(null, l);
              r && s.push(r);
            }
          } else if (b === "object") {
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
})(E);
var R = E.exports;
const u = /* @__PURE__ */ T(R);
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
        class: u(M.backdrop, e.class),
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
const $ = "ui-button-abb5k106", j = "ui-button__icon-abb5k167", A = "ui-button__label-abb5k199", k = {
  button: $,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "is-active": "is-active",
  "is-waiting": "is-waiting",
  button__icon: j,
  "has-icon": "has-icon",
  "loader-spin": "ui-loader-spin-abb5k1",
  button__label: A
};
class _ extends h {
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
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
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
    this.state.waiting.set(!0), await (this.props["event-click"] ?? o)(e, this), this.mounted && (this.state.waiting.set(!1), this && this.refs && this.refs.icon && (this.refs.icon.style.animation = "none", this.refs.icon.offsetHeight, this.refs.icon.style.animation = null));
  }
}
const D = "ui-modal-6zzd4106", O = "ui-modal__header-6zzd4116", B = "ui-modal__title-6zzd4122", H = "ui-modal__content-6zzd4126", g = {
  modal: D,
  modal__header: O,
  modal__title: B,
  modal__content: H,
  "loader-spin": "ui-loader-spin-6zzd41"
}, S = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
class he extends h {
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
          class: u(g.modal, e.class),
          "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
          "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
        },
        /* @__PURE__ */ a("header", { class: g.modal__header }, /* @__PURE__ */ a(
          _,
          {
            class: g.modal__title,
            icon: e.icon,
            "store-label": t.title
          }
        ), /* @__PURE__ */ a(
          _,
          {
            class: g.modal__close,
            icon: S,
            "store-hidden": t.locked,
            "event-click": this.handleClose
          }
        )),
        /* @__PURE__ */ a("div", { class: g.modal__content }, e.children)
      )
    );
  }
  handleClose() {
    this.state.locked.get() || this.refs.backdrop.close();
  }
}
const K = "ui-picker-1w9rr106", N = "ui-picker__toolbar-1w9rr127", P = "ui-picker__toggle-1w9rr140", y = {
  picker: K,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  picker__toolbar: N,
  "is-open": "is-open",
  "is-active": "is-active",
  picker__toggle: P,
  "loader-spin": "ui-loader-spin-1w9rr1"
}, q = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`, F = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6L9 12L15 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`, G = "ui-toolbar-1fqit106", J = {
  toolbar: G,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "is-compact": "is-compact",
  "loader-spin": "ui-loader-spin-1fqit1"
};
class Q extends h {
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
        class: u(J.toolbar, e.class),
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
class ue extends h {
  beforeRender(e) {
    this.handleToggle = this.handleToggle.bind(this);
    const t = e.children.filter((s) => s.type === _);
    for (const s of t)
      s.props.ref = this.refArray("buttons"), s.props["event-click"] = this.handleChange(
        t.indexOf(s),
        s.props["event-click"] || o
      );
    this.state = {
      label: i(n)(e["store-label"], e.label),
      title: i(n)(e["store-title"], e.title),
      open: i(n)(e["store-open"], e.open),
      disabled: i(n)(e["store-disabled"], e.disabled),
      hidden: i(n)(e["store-hidden"], e.hidden)
    }, this.state.toggleIcon = L(this.state.open, () => this.state.open.current ? q : F);
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
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
      },
      /* @__PURE__ */ a(
        Q,
        {
          class: y.picker__toolbar,
          compact: !0
        },
        e.children
      ),
      /* @__PURE__ */ a(
        _,
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
      for (let c = 0; c < this.refs.buttons.length; c++)
        this.refs.buttons[c].state.active.set(c === e);
      this.state.open.set(!1), (this.props["event-change"] ?? o)(null, this), await t(s, this.refs.buttons[e]);
    };
  }
}
const U = "ui-range-1eiot106", V = "ui-range__icon-1eiot135", W = "ui-range__label-1eiot152", x = {
  range: U,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  range__icon: V,
  range__label: W,
  "loader-spin": "ui-loader-spin-1eiot1"
};
function p(d, e, t) {
  var s, c, l, b, r;
  e == null && (e = 100);
  function v() {
    var f = Date.now() - b;
    f < e && f >= 0 ? s = setTimeout(v, e - f) : (s = null, t || (r = d.apply(l, c), l = c = null));
  }
  var w = function() {
    l = this, c = arguments, b = Date.now();
    var f = t && !s;
    return s || (s = setTimeout(v, e)), f && (r = d.apply(l, c), l = c = null), r;
  };
  return w.clear = function() {
    s && (clearTimeout(s), s = null);
  }, w.flush = function() {
    s && (r = d.apply(l, c), l = c = null, clearTimeout(s), s = null);
  }, w;
}
p.debounce = p;
var X = p;
class be extends h {
  beforeRender(e) {
    this.handleInput = e.debounce ? X.debounce(this.handleInput.bind(this), e.debounce) : this.handleInput.bind(this), this.state = {
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
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
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
    await (this.props["event-input"] ?? o)(e, this), this.state.value.set(+this.refs.input.value);
  }
}
const Y = "ui-select-1p5rg106", Z = "ui-select__icon-1p5rg135", ee = "ui-select__arrow-1p5rg170", C = {
  select: Y,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  select__icon: Z,
  select__arrow: ee,
  "loader-spin": "ui-loader-spin-1p5rg1"
}, te = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
class ve extends h {
  static get separator() {
    return { label: "", disabled: !0 };
  }
  beforeRender(e) {
    this.update = this.update.bind(this), this.handleChange = this.handleChange.bind(this), this.state = {
      title: i(n)(e["store-title"], e.title),
      value: i(n)(e["store-value"], e.value),
      options: i(n)(e["store-options"], e.options),
      disabled: i(n)(e["store-disabled"], e.disabled),
      hidden: i(n)(e["store-hidden"], e.hidden)
    }, this.state.selectedIndex = L([this.state.value, this.state.options], () => this.state.options.get().findIndex(({ value: s }) => s === this.state.value.current));
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      "div",
      {
        id: e.id,
        class: u(C.select, e.class),
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
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
      /* @__PURE__ */ a("span", { class: C.select__arrow, innerHTML: te })
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
    if (!e)
      return;
    const t = this.state.selectedIndex.get();
    this.props.placeholder && this.render(/* @__PURE__ */ a(
      "option",
      {
        disabled: !0,
        selected: this.state.value.current === void 0 || t < 0
      },
      this.props.placeholder
    ), this.refs.select), this.render(e.map(({ label: s, disabled: c } = {}, l) => /* @__PURE__ */ a(
      "option",
      {
        value: l,
        disabled: c,
        selected: l === t
      },
      s
    )), this.refs.select);
  }
  handleChange(e) {
    var s;
    const t = +e.target.value;
    this.state.selectedIndex.set(t), this.state.value.set((s = (this.state.options.get() || [])[t]) == null ? void 0 : s.value), (this.props["event-change"] || o)(e, this);
  }
  beforeDestroy() {
    this.state.value.unsubscribe(this.update), this.state.options.unsubscribe(this.update);
  }
}
const se = "ui-tabs-17euv106", ie = "ui-tabs__toggles-17euv109", ne = "ui-tabs__panels-17euv112", ae = "ui-tabs__panel-17euv112", m = {
  tabs: se,
  tabs__toggles: ie,
  tabs__panels: ne,
  tabs__panel: ae,
  "is-hidden": "is-hidden",
  "loader-spin": "ui-loader-spin-17euv1"
}, le = "ui-toggles-1ibi8106", oe = {
  toggles: le,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "loader-spin": "ui-loader-spin-1ibi81"
};
class de extends h {
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
        class: u(oe.toggles, e.class),
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
    e && this.render(e.map(({ icon: t, value: s, label: c, disabled: l, hidden: b } = {}, r) => /* @__PURE__ */ a(
      _,
      {
        ref: this.refArray("buttons"),
        icon: t,
        "store-label": c ?? s ?? r,
        "store-active": (s ?? r) === this.state.value.current,
        "store-disabled": l,
        "store-hidden": b,
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
        de,
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
  _ as Button,
  he as Modal,
  ue as Picker,
  be as Range,
  ve as Select,
  fe as Tabs,
  de as Toggles,
  Q as Toolbar
};
//# sourceMappingURL=components.js.map
