import { C as u, h as a, n as o } from "./Component-91875d4d.js";
import { e as i, w as n, d as E } from "./ensure-b6793424.js";
const j = "ui-backdrop-1epgy106", T = {
  backdrop: j,
  "loader-spin": "ui-loader-spin-1epgy1"
};
function I(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
var O = { exports: {} };
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
              var h = t.apply(null, l);
              h && s.push(h);
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
})(O);
var L = O.exports;
const r = /* @__PURE__ */ I(L);
class R extends u {
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
        class: r(T.backdrop, e.class),
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
const M = "ui-button-1ogpj106", D = "ui-button__icon-1ogpj167", A = "ui-button__label-1ogpj197", y = {
  button: M,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "is-active": "is-active",
  "is-waiting": "is-waiting",
  button__icon: D,
  "has-icon": "has-icon",
  "loader-spin": "ui-loader-spin-1ogpj1",
  button__label: A
};
class g extends u {
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
        class: r(y.button, e.class),
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
          class: y.button__icon,
          "store-innerHTML": t.icon
        }
      ),
      /* @__PURE__ */ a("label", { class: y.button__label, "store-text": t.label })
    );
  }
  async handleClick(e) {
    if (this.base.blur(), this.state.waiting.get())
      return e.preventDefault();
    this.state.waiting.set(!0), await (this.props["event-click"] ?? o)(e, this), this.mounted && (this.state.waiting.set(!1), this && this.refs && this.refs.icon && (this.refs.icon.style.animation = "none", this.refs.icon.offsetHeight, this.refs.icon.style.animation = null));
  }
}
const $ = "ui-modal-sn8mh106", H = "ui-modal__header-sn8mh116", S = "ui-modal__title-sn8mh122", K = "ui-modal__content-sn8mh126", _ = {
  modal: $,
  modal__header: H,
  modal__title: S,
  modal__content: K,
  "loader-spin": "ui-loader-spin-sn8mh1"
}, z = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
class ce extends u {
  beforeRender(e) {
    this.handleClose = this.handleClose.bind(this), this.state = {
      title: i(n)(e["store-title"], e.title),
      tabs: i(n)(e["store-tabs"], e.tabs),
      locked: i(n)(e["store-locked"], e.locked)
    };
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      R,
      {
        ref: this.ref("backdrop"),
        "event-open": e["event-open"],
        "event-close": e["event-close"]
      },
      /* @__PURE__ */ a(
        "div",
        {
          id: e.id,
          class: r(_.modal, e.class),
          "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
          "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
        },
        /* @__PURE__ */ a("header", { class: _.modal__header }, /* @__PURE__ */ a(
          g,
          {
            class: _.modal__title,
            icon: e.icon,
            "store-label": t.title
          }
        ), /* @__PURE__ */ a(
          g,
          {
            class: _.modal__close,
            icon: z,
            "store-hidden": t.locked,
            "event-click": this.handleClose
          }
        )),
        /* @__PURE__ */ a("div", { class: _.modal__content }, e.children)
      )
    );
  }
  handleClose() {
    this.state.locked.get() || this.refs.backdrop.close();
  }
}
const B = "ui-picker-1jv6h106", N = "ui-picker__toolbar-1jv6h127", P = "ui-picker__toggle-1jv6h138", w = {
  picker: B,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  picker__toolbar: N,
  "is-open": "is-open",
  "is-active": "is-active",
  picker__toggle: P,
  "loader-spin": "ui-loader-spin-1jv6h1"
}, q = "ui-toolbar-1fqit106", F = {
  toolbar: q,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "is-compact": "is-compact",
  "loader-spin": "ui-loader-spin-1fqit1"
};
class G extends u {
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
        class: r(F.toolbar, e.class),
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
class he extends u {
  beforeRender(e) {
    this.handleToggle = this.handleToggle.bind(this), this.handleOpen = this.handleOpen.bind(this);
    const t = e.children.filter((s) => s.type === g);
    for (const s of t)
      s.props.ref = this.refArray("buttons"), s.props["event-click"] = this.handleChange(
        t.indexOf(s),
        s.props["event-click"] || o
      );
    this.state = {
      iconOpen: i(n)(e["store-iconOpen"], e.iconOpen),
      iconClose: i(n)(e["store-iconClose"], e.iconClose),
      label: i(n)(e["store-label"], e.label),
      title: i(n)(e["store-title"], e.title),
      open: i(n)(e["store-open"], e.open),
      disabled: i(n)(e["store-disabled"], e.disabled),
      hidden: i(n)(e["store-hidden"], e.hidden)
    }, this.state.toggleIcon = E(
      [
        this.state.open,
        this.state.iconClose,
        this.state.iconOpen
      ],
      () => this.state.open.current ? this.state.iconClose.current : this.state.iconOpen.current
    );
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      "div",
      {
        id: e.id,
        class: r(w.picker, e.class),
        "store-class-is-open": t.open,
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
      },
      /* @__PURE__ */ a(
        G,
        {
          class: w.picker__toolbar,
          compact: !0
        },
        e.children
      ),
      /* @__PURE__ */ a(
        g,
        {
          class: w.picker__toggle,
          "store-icon": t.toggleIcon,
          "store-label": t.label,
          "store-title": t.title,
          "event-click": this.handleToggle
        }
      )
    );
  }
  afterRender() {
    this.state.open.subscribe(this.handleOpen);
  }
  handleOpen() {
    this.state.open.get() ? (this.props["event-open"] ?? o)(null, this) : (this.props["event-close"] ?? o)(null, this);
  }
  handleToggle() {
    this.state.open.update((e) => !e);
  }
  handleChange(e, t) {
    return async (s) => {
      for (let c = 0; c < this.refs.buttons.length; c++)
        this.refs.buttons[c].state.active.set(c === e);
      this.props.autoClose && this.state.open.set(!1), (this.props["event-change"] ?? o)(null, this), await t(s, this.refs.buttons[e]);
    };
  }
  beforeDestroy() {
    this.state.open.unsubscribe(this.handleOpen);
  }
}
const J = "ui-range-fcos5106", Q = "ui-range__icon-fcos5138", U = "ui-range__label-fcos5182", p = {
  range: J,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  range__icon: Q,
  range__label: U,
  "loader-spin": "ui-loader-spin-fcos51"
};
function C(d, e, t) {
  var s, c, l, b, h;
  e == null && (e = 100);
  function v() {
    var f = Date.now() - b;
    f < e && f >= 0 ? s = setTimeout(v, e - f) : (s = null, t || (h = d.apply(l, c), l = c = null));
  }
  var k = function() {
    l = this, c = arguments, b = Date.now();
    var f = t && !s;
    return s || (s = setTimeout(v, e)), f && (h = d.apply(l, c), l = c = null), h;
  };
  return k.clear = function() {
    s && (clearTimeout(s), s = null);
  }, k.flush = function() {
    s && (h = d.apply(l, c), l = c = null, clearTimeout(s), s = null);
  }, k;
}
C.debounce = C;
var V = C;
class re extends u {
  beforeRender(e) {
    this.handleInput = e.debounce ? V.debounce(this.handleInput.bind(this), e.debounce) : this.handleInput.bind(this), this.state = {
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
        class: r(p.range, e.class),
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
      },
      e.icon && /* @__PURE__ */ a(
        "span",
        {
          ref: this.ref("icon"),
          class: p.range__icon,
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
      /* @__PURE__ */ a("label", { class: p.range__label, "store-text": t.label })
    );
  }
  async handleInput(e) {
    await (this.props["event-input"] ?? o)(e, this), this.state.value.set(+this.refs.input.value);
  }
}
const W = "ui-select-1g0pz106", X = "ui-select__icon-1g0pz138", Y = "ui-select__arrow-1g0pz171", x = {
  select: W,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  select__icon: X,
  select__arrow: Y,
  "loader-spin": "ui-loader-spin-1g0pz1"
}, Z = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
class ue extends u {
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
    }, this.state.selectedIndex = E([this.state.value, this.state.options], () => this.state.options.get().findIndex(({ value: s }) => s === this.state.value.current));
  }
  template(e, t) {
    return /* @__PURE__ */ a(
      "div",
      {
        id: e.id,
        class: r(x.select, e.class),
        "store-class-is-disabled": t.disabled,
        "store-class-is-hidden": t.hidden,
        "event-mouseenter": (s) => (e["event-mouseenter"] ?? o)(s, this),
        "event-mouseleave": (s) => (e["event-mouseleave"] ?? o)(s, this)
      },
      e.icon && /* @__PURE__ */ a(
        "span",
        {
          ref: this.ref("icon"),
          class: x.select__icon,
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
      /* @__PURE__ */ a("span", { class: x.select__arrow, innerHTML: Z })
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
    this.state.selectedIndex.set(t), this.refs.select.blur(), this.state.value.set((s = (this.state.options.get() || [])[t]) == null ? void 0 : s.value), (this.props["event-change"] || o)(e, this);
  }
  beforeDestroy() {
    this.state.value.unsubscribe(this.update), this.state.options.unsubscribe(this.update);
  }
}
const ee = "ui-tabs-17euv106", te = "ui-tabs__toggles-17euv109", se = "ui-tabs__panels-17euv112", ie = "ui-tabs__panel-17euv112", m = {
  tabs: ee,
  tabs__toggles: te,
  tabs__panels: se,
  tabs__panel: ie,
  "is-hidden": "is-hidden",
  "loader-spin": "ui-loader-spin-17euv1"
}, ne = "ui-toggles-1ibi8106", ae = {
  toggles: ne,
  "is-hidden": "is-hidden",
  "is-disabled": "is-disabled",
  "loader-spin": "ui-loader-spin-1ibi81"
};
class le extends u {
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
        class: r(ae.toggles, e.class),
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
    e && this.render(e.map(({ icon: t, value: s, label: c, disabled: l, hidden: b } = {}, h) => /* @__PURE__ */ a(
      g,
      {
        ref: this.refArray("buttons"),
        icon: t,
        "store-label": c ?? s ?? h,
        "store-active": (s ?? h) === this.state.value.current,
        "store-disabled": l,
        "store-hidden": b,
        "event-click": this.handleChange(s ?? h)
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
class be extends u {
  static panel(e, t = {}) {
    return /* @__PURE__ */ a("div", { ...t, class: r(m.tabs__panel, t.class) }, e);
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
        class: r(m.tabs, e.class)
      },
      /* @__PURE__ */ a(
        le,
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
  R as Backdrop,
  g as Button,
  ce as Modal,
  he as Picker,
  re as Range,
  ue as Select,
  be as Tabs,
  le as Toggles,
  G as Toolbar
};
//# sourceMappingURL=components.js.map
