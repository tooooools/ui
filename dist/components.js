import { C as Component, h, r as render } from "./Component-BRxFgiW-.js";
import { e as ensure, w as writable, d as derived } from "./ensure-Bi956klU.js";
import { n as noop } from "./noop-JwH-KCvh.js";
const backdrop = "ui-backdrop-136kk114", style$b = {
  backdrop
};
class Backdrop extends Component {
  beforeRender(props) {
    this.close = this.close.bind(this), this.captureEscapeKey = this.captureEscapeKey.bind(this), this.state = {
      lastActiveElement: document.activeElement,
      locked: ensure(writable)(props["store-locked"], props.locked)
    };
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style$b.backdrop,
          ...Array.isArray(props.class) ? props.class : [props.class]
        ],
        "event-click": (e) => (props["event-click"] ?? noop)(e, this)
      },
      props.children
    );
  }
  afterMount() {
    this.state.lastActiveElement && this.state.lastActiveElement.blur(), window.addEventListener("keyup", this.captureEscapeKey), (this.props["event-open"] ?? noop)(null, this);
  }
  captureEscapeKey(e) {
    e.key === "Escape" && this.close();
  }
  close() {
    this.state.locked.get() || ((this.props["event-close"] || noop)(null, this), !this.destroyed && this.destroy());
  }
  beforeDestroy() {
    if (!this.destroyed && (window.removeEventListener("keyup", this.captureEscapeKey), this.state && this.state.lastActiveElement)) {
      const el = this.state.lastActiveElement;
      window.setTimeout(() => el.focus(), 0);
    }
  }
}
const button = "ui-button-d5yhn114", button__label = "ui-button__label-d5yhn168", button__icon = "ui-button__icon-d5yhn179", style$a = {
  button,
  button__label,
  button__icon
};
class Button extends Component {
  beforeRender(props) {
    this.handleClick = this.handleClick.bind(this), this.state = {
      label: ensure(writable)(props["store-label"], props.label),
      title: ensure(writable)(props["store-title"], props.title),
      icon: ensure(writable)(props["store-icon"], props.icon),
      active: ensure(writable)(props["store-active"], props.active),
      disabled: ensure(writable)(props["store-disabled"], props.disabled),
      hidden: ensure(writable)(props["store-hidden"], props.hidden),
      waiting: ensure(writable)(props["store-waiting"], props.waiting)
    };
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      "button",
      {
        ...this.dataProps,
        type: props.type,
        id: props.id,
        tabIndex: props.tabindex,
        class: [
          style$a.button,
          {
            "has-click": !!this.props["event-click"],
            "has-icon": state.icon,
            "is-active": state.active,
            "is-disabled": state.disabled,
            "is-hidden": state.hidden,
            "is-waiting": state.waiting
          },
          ...Array.isArray(props.class) ? props.class : [props.class]
        ],
        "store-title": state.title,
        "store-disabled": state.disabled,
        "event-click": this.handleClick,
        "event-mouseenter": (e) => (props["event-mouseenter"] ?? noop)(e, this),
        "event-mouseleave": (e) => (props["event-mouseleave"] ?? noop)(e, this)
      },
      /* @__PURE__ */ h(
        "span",
        {
          ref: this.ref("icon"),
          class: style$a.button__icon,
          "store-innerHTML": state.icon
        }
      ),
      /* @__PURE__ */ h("label", { class: style$a.button__label, "store-innerHTML": state.label }),
      props.children
    );
  }
  async handleClick(e) {
    if (this.props["event-click"] && !this.state.disabled.get()) {
      if (this.base.blur(), this.state.waiting.get()) return e.preventDefault();
      this.state.waiting.set(!0);
      try {
        await this.props["event-click"](e, this);
      } finally {
        this.mounted && (this.state.waiting.set(!1), this && this.refs && this.refs.icon && (this.refs.icon.style.animation = "none", this.refs.icon.offsetHeight, this.refs.icon.style.animation = null));
      }
    }
  }
}
const style$9 = {
  "file-dropper": "ui-file-dropper-180gr114"
};
class FileDropper extends Component {
  beforeRender(props) {
    this.handleDragStart = this.handleDragStart.bind(this), this.handleDragEnd = this.handleDragEnd.bind(this), this.handleDrop = this.handleDrop.bind(this), this.state = {
      appliedTo: writable(void 0),
      draggedOver: writable(!1),
      files: writable(null)
    };
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style$9["file-dropper"],
          {
            "is-dragged-over": state.draggedOver
          },
          ...Array.isArray(props.class) ? props.class : [props.class]
        ]
      },
      props.children.length > 0 ? props.children : props.icon || props.label ? /* @__PURE__ */ h(Button, { icon: props.icon, label: props.label, tabIndex: -1 }) : null
    );
  }
  afterMount(props) {
    this.state.appliedTo = this.base.offsetParent ?? document.body, this.state.appliedTo.addEventListener("dragover", this.handleDragStart), this.state.appliedTo.addEventListener("dragenter", this.handleDragStart), this.state.appliedTo.addEventListener("dragleave", this.handleDragEnd), this.state.appliedTo.addEventListener("dragend", this.handleDragEnd), this.state.appliedTo.addEventListener("drop", this.handleDrop);
  }
  get isVisible() {
    return this.base.offsetParent !== null;
  }
  handleDragStart(e) {
    this.isVisible && e.dataTransfer.types.includes("Files") && (e.preventDefault(), e.stopPropagation(), this.state.draggedOver.set(!0));
  }
  handleDrop(e) {
    if (this.isVisible) {
      if (!e.dataTransfer.types.includes("Files")) {
        this.state.files.set(null);
        return;
      }
      e.preventDefault(), e.stopPropagation(), this.state.files.set(e.dataTransfer.files), (this.props["event-drop"] ?? noop)(e, this), this.handleDragEnd(e);
    }
  }
  handleDragEnd(e) {
    if (this.isVisible) {
      if (!e.dataTransfer.types.includes("Files")) {
        this.state.files.set(null);
        return;
      }
      e.preventDefault(), e.stopPropagation(), this.state.draggedOver.set(!1);
    }
  }
  beforeDestroy() {
    this.state.appliedTo?.removeEventListener("dragover", this.handleDragStart), this.state.appliedTo?.removeEventListener("dragenter", this.handleDragStart), this.state.appliedTo?.removeEventListener("dragleave", this.handleDragEnd), this.state.appliedTo?.removeEventListener("dragend", this.handleDragEnd), this.state.appliedTo?.removeEventListener("drop", this.drop);
  }
}
const input = "ui-input-r7lw0114", input__icon = "ui-input__icon-r7lw0157", style$8 = {
  input,
  input__icon
};
class Input extends Component {
  beforeRender(props) {
    this.update = this.update.bind(this), this.handleClick = this.handleClick.bind(this), this.handleDblClick = this.handleDblClick.bind(this), this.handleInput = this.handleInput.bind(this), this.handleFocus = this.handleFocus.bind(this), this.state = {
      value: ensure(writable)(props["store-value"], props.value),
      files: ensure(writable)(props["store-files"], props.files),
      placeholder: ensure(writable)(props["store-placeholder"], props.placeholder),
      title: ensure(writable)(props["store-title"], props.title),
      label: ensure(writable)(props["store-label"], props.label),
      before: ensure(writable)(props["store-before"], props.before),
      after: ensure(writable)(props["store-after"], props.after),
      icon: ensure(writable)(props["store-icon"], props.icon),
      accept: ensure(writable)(props["store-accept"], props.accept ?? "*"),
      multiple: ensure(writable)(props["store-multiple"], props.multiple ?? "*"),
      min: ensure(writable)(props["store-min"], props.min),
      max: ensure(writable)(props["store-max"], props.max),
      step: ensure(writable)(props["store-step"], props.step),
      active: ensure(writable)(props["store-active"], props.active),
      disabled: ensure(writable)(props["store-disabled"], props.disabled),
      hidden: ensure(writable)(props["store-hidden"], props.hidden),
      waiting: ensure(writable)(props["store-waiting"], props.waiting)
    };
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        tabIndex: props.tabindex,
        class: [
          style$8.input,
          {
            "is-edited-on-dblclick": !!props.editOnDblClick,
            "has-icon": state.icon,
            "is-active": state.active,
            "is-disabled": state.disabled,
            "is-hidden": state.hidden,
            "is-waiting": state.waiting
          },
          ...Array.isArray(props.class) ? props.class : [props.class]
        ],
        "data-type": props.type,
        "store-title": state.title,
        "event-click": this.handleClick,
        "event-dblclick": this.handleDblClick,
        "event-mouseenter": (e) => (props["event-mouseenter"] ?? noop)(e, this),
        "event-mouseleave": (e) => (props["event-mouseleave"] ?? noop)(e, this)
      },
      /* @__PURE__ */ h(
        "span",
        {
          ref: this.ref("icon"),
          class: style$8.input__icon,
          "store-innerHTML": state.icon
        }
      ),
      /* @__PURE__ */ h("label", { class: style$8.input__label, "store-innerHTML": state.label }),
      /* @__PURE__ */ h("label", { class: style$8.input__before, "store-innerHTML": state.before }),
      /* @__PURE__ */ h(
        "input",
        {
          ref: this.ref("input"),
          type: props.type,
          name: props.name,
          autofocus: props.autofocus,
          autocomplete: props.autocomplete ?? "off",
          size: props.type !== "number" ? props.size === "auto" ? "" : props.size : void 0,
          "store-min": props.type === "number" ? state.min : void 0,
          "store-max": props.type === "number" ? state.max : void 0,
          "store-step": props.type === "number" ? state.step : void 0,
          "store-placeholder": state.placeholder,
          "store-accept": props.type === "file" ? state.accept : void 0,
          "store-multiple": props.type === "file" ? state.multiple : void 0,
          "store-disabled": state.disabled,
          "event-click": (e) => e.stopPropagation(),
          "event-input": this.handleInput,
          "event-focus": this.handleFocus,
          "event-blur": (e) => (props["event-blur"] ?? noop)(e, this)
        }
      ),
      /* @__PURE__ */ h("label", { class: style$8.input__after, "store-innerHTML": state.after })
    );
  }
  afterRender() {
    this.state.value.subscribe(this.update), this.update();
  }
  update() {
    const value = this.state.value.get();
    switch (this.props.type) {
      case "number": {
        this.refs.input.value = +value;
        break;
      }
      case "file": {
        this.refs.input.files = value;
        break;
      }
      default:
        this.refs.input.value = value;
    }
    if (this.props.size === "auto") {
      const length = (String(this.refs.input.value) ?? "").length || (this.state.placeholder.current ?? "").length || 1;
      this.props.type === "number" ? this.refs.input.style.width = length + 1 + "ch" : this.refs.input.size = Math.max(1, length);
    }
  }
  handleClick(e) {
    this.props.type === "file" ? this.refs.input.click() : this.props.editOnDblClick || this.refs.input.focus(), (this.props["event-click"] ?? noop)(e, this);
  }
  async handleDblClick(e) {
    this.refs.input.focus(), await (this.props["event-dblclick"] ?? noop)(e, this);
  }
  async handleInput(e) {
    if (this.state.waiting.get()) return e.preventDefault();
    switch (this.state.waiting.set(!0), this.props.type) {
      case "number":
        this.state.value.set(+this.refs.input.value);
        break;
      case "file":
        this.state.value.set(this.refs.input.files);
        break;
      default:
        this.state.value.set(this.refs.input.value);
    }
    await (this.props["event-input"] ?? noop)(e, this), this.mounted && this.state.waiting.set(!1);
  }
  handleFocus(e) {
    this.props.autoSelectAll && this.refs.input.select(), (this.props["event-focus"] ?? noop)(e, this);
  }
  beforeDestroy() {
    this.state.value.unsubscribe(this.update);
  }
}
const modal = "ui-modal-f1wbu114", modal__header = "ui-modal__header-f1wbu126", modal__title = "ui-modal__title-f1wbu132", modal__content = "ui-modal__content-f1wbu136", style$7 = {
  modal,
  modal__header,
  modal__title,
  modal__content
}, IconClose = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
class Modal extends Component {
  /**
   * Display a Modal in a functional way
   * @param  {Object} props - Modal jsx props
   * @param  {Element} [parent=document.body] - Element to render the Modal
   * @return {Promise} resolve when the Modal is closed
   */
  static async display(props, parent = document.body) {
    return new Promise((resolve) => {
      render(/* @__PURE__ */ h(Modal, { "event-close": (...args) => {
        (props["event-close"] ?? noop)(...args), resolve(...args);
      }, ...props }), parent);
    });
  }
  /**
   * WIP
   * @param  {Function} callback [description]
   * @param  {[type]}   message  [description]
   * @param  {[type]}   props    [description]
   * @param  {[type]}   parent   [description]
   * @return {[type]}            [description]
   */
  static async confirm(callback, message, props, parent = document.body) {
    return new Promise((resolve) => {
      const onClose = (...args) => {
        (props["event-close"] ?? noop)(...args), resolve(...args);
      };
      this.display({
        ...props,
        "event-close": onClose,
        children: [
          typeof props.message == "string" ? /* @__PURE__ */ h("div", { innerHTML: props.message }) : props.message,
          ...props.children ?? []
        ]
      }, parent);
    });
  }
  beforeRender(props) {
    this.handleClick = this.handleClick.bind(this), this.handleClose = this.handleClose.bind(this), this.state = {
      title: ensure(writable)(props["store-title"], props.title),
      tabs: ensure(writable)(props["store-tabs"], props.tabs),
      locked: ensure(writable)(props["store-locked"], props.locked)
    };
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      Backdrop,
      {
        ref: this.ref("backdrop"),
        "store-locked": state.locked,
        "event-open": props["event-open"],
        "event-close": props["event-close"],
        "event-click": this.handleClick
      },
      /* @__PURE__ */ h(
        "div",
        {
          ...this.dataProps,
          id: props.id,
          class: [
            style$7.modal,
            ...Array.isArray(props.class) ? props.class : [props.class]
          ],
          "event-mouseenter": (e) => (props["event-mouseenter"] ?? noop)(e, this),
          "event-mouseleave": (e) => (props["event-mouseleave"] ?? noop)(e, this)
        },
        /* @__PURE__ */ h("header", { class: style$7.modal__header }, /* @__PURE__ */ h(
          Button,
          {
            class: style$7.modal__title,
            icon: props.icon,
            "store-label": state.title
          }
        ), /* @__PURE__ */ h(
          Button,
          {
            class: style$7.modal__close,
            icon: IconClose,
            "store-hidden": state.locked,
            "event-click": this.handleClose
          }
        )),
        /* @__PURE__ */ h("div", { class: style$7.modal__content }, props.children)
      )
    );
  }
  handleClick(e) {
    e.target === this.base && this.handleClose();
  }
  handleClose() {
    this.state.locked.get() || this.refs.backdrop.close();
  }
}
const picker = "ui-picker-80o3v114", picker__toolbar = "ui-picker__toolbar-80o3v135", picker__toggle = "ui-picker__toggle-80o3v145", style$6 = {
  picker,
  picker__toolbar,
  picker__toggle
}, toolbar = "ui-toolbar-1457y114", style$5 = {
  toolbar
};
class Toolbar extends Component {
  beforeRender(props) {
    this.state = {
      compact: ensure(writable)(props["store-compact"], props.compact),
      disabled: ensure(writable)(props["store-disabled"], props.disabled),
      hidden: ensure(writable)(props["store-hidden"], props.hidden)
    };
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style$5.toolbar,
          {
            "is-compact": state.compact,
            "is-disabled": state.disabled,
            "is-hidden": state.hidden
          },
          ...Array.isArray(props.class) ? props.class : [props.class]
        ],
        "event-mouseenter": (e) => (props["event-mouseenter"] ?? noop)(e, this),
        "event-mouseleave": (e) => (props["event-mouseleave"] ?? noop)(e, this)
      },
      props.children
    );
  }
}
class Picker extends Component {
  beforeRender(props) {
    this.handleClick = this.handleClick.bind(this), this.handleOpen = this.handleOpen.bind(this), this.handleToggle = this.handleToggle.bind(this);
    const buttons = props.children.filter((child) => child.type === Button);
    for (const button2 of buttons)
      button2.props.ref = this.refArray("buttons"), button2.props["event-click"] = this.handleClick(
        buttons.indexOf(button2),
        button2.props["event-click"] || noop
      );
    this.state = {
      iconOpen: ensure(writable)(props["store-iconOpen"], props.iconOpen),
      iconClose: ensure(writable)(props["store-iconClose"], props.iconClose),
      label: ensure(writable)(props["store-label"], props.label),
      title: ensure(writable)(props["store-title"], props.title),
      open: ensure(writable)(props["store-open"], props.open),
      disabled: ensure(writable)(props["store-disabled"], props.disabled),
      hidden: ensure(writable)(props["store-hidden"], props.hidden)
    }, this.state.toggleIcon = derived(
      [
        this.state.open,
        this.state.iconClose,
        this.state.iconOpen
      ],
      () => this.state.open.current ? this.state.iconClose.current : this.state.iconOpen.current
    );
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style$6.picker,
          {
            "has-auto-order": props.autoOrder,
            "is-open": state.open,
            "is-disabled": state.disabled,
            "is-hidden": state.hidden
          },
          ...Array.isArray(props.class) ? props.class : [props.class]
        ],
        "event-mouseenter": (e) => (props["event-mouseenter"] ?? noop)(e, this),
        "event-mouseleave": (e) => (props["event-mouseleave"] ?? noop)(e, this)
      },
      /* @__PURE__ */ h(
        Button,
        {
          class: style$6.picker__toggle,
          "store-icon": state.toggleIcon,
          "store-label": state.label,
          "store-title": state.title,
          "store-active": state.open,
          "event-click": this.handleToggle
        }
      ),
      /* @__PURE__ */ h(
        Toolbar,
        {
          class: style$6.picker__toolbar,
          compact: !0
        },
        props.children
      )
    );
  }
  afterRender() {
    this.state.open.subscribe(this.handleOpen);
  }
  handleOpen() {
    this.state.open.get() ? (this.props["event-open"] ?? noop)(null, this) : (this.props["event-close"] ?? noop)(null, this);
  }
  handleToggle(e) {
    e.stopPropagation(), this.state.open.update((s) => !s);
  }
  handleClick(i, callback) {
    return async (e) => {
      if (!this.state.open.get()) {
        e.stopPropagation(), this.state.open.set(!0);
        return;
      }
      for (let index = 0; index < this.refs.buttons.length; index++)
        this.refs.buttons[index].state.active.set(index === i);
      this.props.autoClose && this.state.open.set(!1), (this.props["event-change"] ?? noop)(null, this), await callback(e, this.refs.buttons[i]);
    };
  }
  beforeDestroy() {
    this.state.open.unsubscribe(this.handleOpen);
  }
}
const range = "ui-range-vx8yl114", range__icon = "ui-range__icon-vx8yl147", range__inputs = "ui-range__inputs-vx8yl157", range__label = "ui-range__label-vx8yl217", style$4 = {
  range,
  range__icon,
  range__inputs,
  range__label
};
var debounce_1, hasRequiredDebounce;
function requireDebounce() {
  if (hasRequiredDebounce) return debounce_1;
  hasRequiredDebounce = 1;
  function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    wait == null && (wait = 100);
    function later() {
      var last = Date.now() - timestamp;
      last < wait && last >= 0 ? timeout = setTimeout(later, wait - last) : (timeout = null, immediate || (result = func.apply(context, args), context = args = null));
    }
    var debounced = function() {
      context = this, args = arguments, timestamp = Date.now();
      var callNow = immediate && !timeout;
      return timeout || (timeout = setTimeout(later, wait)), callNow && (result = func.apply(context, args), context = args = null), result;
    };
    return debounced.clear = function() {
      timeout && (clearTimeout(timeout), timeout = null);
    }, debounced.flush = function() {
      timeout && (result = func.apply(context, args), context = args = null, clearTimeout(timeout), timeout = null);
    }, debounced;
  }
  return debounce.debounce = debounce, debounce_1 = debounce, debounce_1;
}
var debounceExports = requireDebounce();
class Range extends Component {
  beforeRender(props) {
    this.handleInput = props.debounce ? debounceExports.debounce(this.handleInput.bind(this), props.debounce) : this.handleInput.bind(this), this.state = {
      label: ensure(writable)(props["store-label"], props.label),
      title: ensure(writable)(props["store-title"], props.title),
      value: ensure(writable)(props["store-value"], props.value),
      min: ensure(writable)(props["store-min"], props.min),
      max: ensure(writable)(props["store-max"], props.max),
      step: ensure(writable)(props["store-step"], props.step),
      disabled: ensure(writable)(props["store-disabled"], props.disabled),
      hidden: ensure(writable)(props["store-hidden"], props.hidden)
    };
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style$4.range,
          {
            "is-dual": props.dual,
            "is-disabled": state.disabled,
            "is-hidden": state.hidden
          },
          ...Array.isArray(props.class) ? props.class : [props.class]
        ],
        "event-mouseenter": (e) => (props["event-mouseenter"] ?? noop)(e, this),
        "event-mouseleave": (e) => (props["event-mouseleave"] ?? noop)(e, this)
      },
      props.icon && /* @__PURE__ */ h(
        "span",
        {
          ref: this.ref("icon"),
          class: style$4.range__icon,
          innerHTML: props.icon
        }
      ),
      /* @__PURE__ */ h("div", { class: style$4.range__inputs }, /* @__PURE__ */ h(
        "input",
        {
          ref: this.refArray("inputs"),
          tabIndex: props.tabindex,
          type: "range",
          "store-min": state.min,
          "store-max": state.max,
          "store-step": state.step,
          "store-title": state.title,
          "store-value": derived(state.value, (value) => props.dual ? (value ?? [])[0] : value),
          "store-disabled": state.disabled,
          "event-input": this.handleInput
        }
      ), props.dual && /* @__PURE__ */ h(
        "input",
        {
          ref: this.refArray("inputs"),
          tabIndex: props.tabindex,
          type: "range",
          "store-min": state.min,
          "store-max": state.max,
          "store-step": state.step,
          "store-title": state.title,
          "store-value": derived(state.value, (value) => props.dual ? (value ?? [])[1] : value),
          "store-disabled": state.disabled,
          "event-input": this.handleInput
        }
      )),
      /* @__PURE__ */ h("label", { class: style$4.range__label, "store-innerHTML": state.label })
    );
  }
  async handleInput(e) {
    this.props.dual ? this.state.value.set([+this.refs.inputs[0].value, +this.refs.inputs[1].value]) : this.state.value.set(+this.refs.inputs[0].value), await (this.props["event-input"] ?? noop)(e, this);
  }
}
const select = "ui-select-4qr6c114", select__icon = "ui-select__icon-4qr6c151", select__label = "ui-select__label-4qr6c161", select__arrow = "ui-select__arrow-4qr6c205", style$3 = {
  select,
  select__icon,
  select__label,
  select__arrow
}, groupBy = (array = [], key) => array.reduce((o, obj) => {
  const group = obj[key];
  return o[group] || (o[group] = []), o[group].push(obj), o;
}, {}), IconDown = `<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
class Select extends Component {
  static get separator() {
    return { label: "", disabled: !0 };
  }
  beforeRender(props) {
    this.update = this.update.bind(this), this.handleChange = this.handleChange.bind(this), this.state = {
      title: ensure(writable)(props["store-title"], props.title),
      label: ensure(writable)(props["store-label"], props.label),
      value: ensure(writable)(props["store-value"], props.value),
      options: ensure(writable)(props["store-options"], props.options),
      disabled: ensure(writable)(props["store-disabled"], props.disabled),
      hidden: ensure(writable)(props["store-hidden"], props.hidden)
    };
    const compare = props.compare ?? ((a, b) => a === b);
    this.state.selectedIndex = derived([this.state.value, this.state.options], () => this.state.options.get().findIndex((option) => compare(option.value ?? option, this.state.value.current)));
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style$3.select,
          {
            "is-disabled": state.disabled,
            "is-hidden": state.hidden
          },
          ...Array.isArray(props.class) ? props.class : [props.class]
        ],
        "event-mouseenter": (e) => (props["event-mouseenter"] ?? noop)(e, this),
        "event-mouseleave": (e) => (props["event-mouseleave"] ?? noop)(e, this)
      },
      props.icon && /* @__PURE__ */ h(
        "span",
        {
          ref: this.ref("icon"),
          class: style$3.select__icon,
          innerHTML: props.icon
        }
      ),
      /* @__PURE__ */ h("div", { class: style$3.select__label, "store-innerHTML": state.label }),
      /* @__PURE__ */ h(
        "select",
        {
          ref: this.ref("select"),
          name: props.name,
          required: props.required,
          tabIndex: props.tabindex,
          "store-title": state.title,
          "store-disabled": state.disabled,
          "event-change": this.handleChange
        }
      ),
      /* @__PURE__ */ h("span", { class: style$3.select__arrow, innerHTML: props.dropdown ?? IconDown })
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
    const options = this.state.options.get();
    if (!options) return;
    const selectedIndex = this.state.selectedIndex.get();
    this.props.placeholder && this.render(/* @__PURE__ */ h(
      "option",
      {
        value: "",
        disabled: !0,
        ...this.state.value.current === void 0 || selectedIndex < 0 ? { selected: !0 } : {}
      },
      this.props.placeholder
    ), this.refs.select);
    for (const [label, entries] of Object.entries(groupBy(options, "group"))) {
      const children = entries.map((option) => /* @__PURE__ */ h(
        "option",
        {
          value: options.indexOf(option),
          ...option.disabled ? { disabled: !0 } : {},
          ...options.indexOf(option) === selectedIndex ? { selected: !0 } : {}
        },
        option.label
      ));
      label !== "undefined" ? this.render(/* @__PURE__ */ h("optgroup", { label }, children), this.refs.select) : this.render(children, this.refs.select);
    }
  }
  handleChange(e) {
    const index = +e.target.value, selected = (this.state.options.get() ?? [])[index];
    this.refs.select.blur(), this.state.value.set(selected ? selected.value ?? selected : null), (this.props["event-change"] || noop)(e, this);
  }
  beforeDestroy() {
    this.state.value.unsubscribe(this.update), this.state.options.unsubscribe(this.update);
  }
}
const tabs = "ui-tabs-6zoue114", tabs__toggles = "ui-tabs__toggles-6zoue117", tabs__panels = "ui-tabs__panels-6zoue120", tabs__panel = "ui-tabs__panel-6zoue120", style$2 = {
  tabs,
  tabs__toggles,
  tabs__panels,
  tabs__panel
}, toggles = "ui-toggles-pn5fr114", style$1 = {
  toggles
};
class Toggles extends Component {
  beforeRender(props) {
    this.update = this.update.bind(this), this.handleChange = this.handleChange.bind(this), this.state = {
      title: ensure(writable)(props["store-title"], props.title),
      value: ensure(writable)(props["store-value"], props.value),
      options: ensure(writable)(props["store-options"], props.options ?? []),
      disabled: ensure(writable)(props["store-disabled"], props.disabled),
      hidden: ensure(writable)(props["store-hidden"], props.hidden)
    };
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style$1.toggles,
          {
            "is-disabled": state.disabled,
            "is-hidden": state.hidden
          },
          ...Array.isArray(props.class) ? props.class : [props.class]
        ],
        "store-title": state.title,
        "event-mouseenter": (e) => (props["event-mouseenter"] ?? noop)(e, this),
        "event-mouseleave": (e) => (props["event-mouseleave"] ?? noop)(e, this)
      }
    );
  }
  afterRender() {
    this.state.value.subscribe(this.update), this.state.options.subscribe(this.update), this.update();
  }
  clear() {
    this.refs.buttons && (this.refs.buttons.forEach((button2) => button2?.destroy()), delete this.refs.buttons);
  }
  update() {
    this.clear();
    const options = this.state.options.get();
    options && this.render(options.map(({ icon, value, label, disabled, hidden } = {}, index) => /* @__PURE__ */ h(
      Button,
      {
        ref: this.refArray("buttons"),
        icon,
        "store-label": label ?? value ?? index,
        "store-active": (value ?? index) === this.state.value.current,
        "store-disabled": disabled,
        "store-hidden": hidden,
        "event-click": this.handleChange(value ?? index)
      }
    )), this.base);
  }
  handleChange(value) {
    return (e) => {
      this.state.value.set(value), (this.props["event-change"] || noop)(e, this);
    };
  }
  beforeDestroy() {
    this.state.value.unsubscribe(this.update), this.state.options.unsubscribe(this.update);
  }
}
class Tabs extends Component {
  static panel(children, props = {}) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...props,
        class: [
          style$2.tabs__panel,
          ...Array.isArray(props.class) ? props.class : [props.class]
        ]
      },
      children
    );
  }
  beforeRender(props) {
    this.update = this.update.bind(this), this.state = {
      value: ensure(writable)(props["store-value"], props.value ?? 0),
      tabs: ensure(writable)(props["store-tabs"], props.tabs)
    };
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style$2.tabs,
          ...Array.isArray(props.class) ? props.class : [props.class]
        ]
      },
      /* @__PURE__ */ h(
        Toggles,
        {
          class: style$2.tabs__toggles,
          "store-value": state.value,
          "store-options": state.tabs,
          "event-change": props["event-change"]
        }
      ),
      /* @__PURE__ */ h(
        "div",
        {
          ref: this.ref("panels"),
          class: style$2.tabs__panels
        },
        props.children
      )
    );
  }
  afterRender() {
    this.state.value.subscribe(this.update), this.state.tabs.subscribe(this.update), this.update();
  }
  update() {
    const value = this.state.value.get();
    for (let index = 0; index < this.refs.panels.children.length; index++) {
      const panel = this.refs.panels.children[index];
      panel && panel.classList.toggle("is-hidden", index !== value);
    }
  }
  beforeDestroy() {
    this.state.value.unsubscribe(this.update), this.state.tabs.unsubscribe(this.update);
  }
}
const toast = "ui-toast-1kys1123", toast__icon = "ui-toast__icon-1kys1196", toast__content = "ui-toast__content-1kys1221", style = {
  "toast-container": "ui-toast-container-1kys1123",
  toast,
  toast__icon,
  toast__content
};
class Toast extends Component {
  static display(message, { parent = Toast.container, ...props } = {}) {
    render(/* @__PURE__ */ h(Toast, { ...props }, message), parent);
  }
  static get container() {
    return document.querySelector("." + style["toast-container"]) ?? render(/* @__PURE__ */ h("div", { class: style["toast-container"] }), document.body).nodes[0];
  }
  beforeRender(props) {
    this.handleClose = this.handleClose.bind(this), this.state = {
      label: ensure(writable)(props["store-label"], props.label),
      title: ensure(writable)(props["store-title"], props.title),
      icon: ensure(writable)(props["store-icon"], props.icon),
      tone: ensure(writable)(props["store-tone"], props.tone),
      count: ensure(writable)(props["store-count"], props.count)
    };
  }
  template(props, state) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style.toast,
          {
            "has-icon": state.icon,
            "has-duration": props.duration
          },
          ...Array.isArray(props.class) ? props.class : [props.class]
        ],
        "event-mouseenter": (e) => (props["event-mouseenter"] ?? noop)(e, this),
        "event-mouseleave": (e) => (props["event-mouseleave"] ?? noop)(e, this),
        "store-data-count": state.count,
        "data-tone": state.tone,
        style: {
          "--toast-duration": (props.duration ?? -1) + "ms"
        }
      },
      /* @__PURE__ */ h(
        "span",
        {
          ref: this.ref("icon"),
          class: style.toast__icon,
          "store-data-count": state.count,
          "store-innerHTML": state.icon
        }
      ),
      /* @__PURE__ */ h("div", { class: style.toast__content }, props.children),
      /* @__PURE__ */ h(
        Button,
        {
          icon: IconClose,
          class: "toast__btn--close",
          title: "Effacer la notification",
          "event-click": this.handleClose
        }
      )
    );
  }
  afterMount() {
    this.props.duration && (this.refs.timer = window.setTimeout(() => this.destroy(), this.props.duration));
  }
  handleClose(e) {
    e.stopPropagation(), this.destroy();
  }
  beforeDestroy() {
    (this.props["event-close"] || noop)(), this.refs.timer && window.clearTimeout(this.refs.timer);
  }
}
export {
  Backdrop,
  Button,
  FileDropper,
  Input,
  Modal,
  Picker,
  Range,
  Select,
  Tabs,
  Toast,
  Toggles,
  Toolbar
};
//# sourceMappingURL=components.js.map
