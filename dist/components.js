import { C as Component, P as Props, h, r as render } from "./Component-BH7W0g4B.js";
import { $ } from "./state.js";
import { n as noop } from "./noop-JwH-KCvh.js";
const backdrop = "ui-backdrop-136kk114", style$b = {
  backdrop
};
class Backdrop extends Component {
  static props = {
    locked: [Props.boolean, Props.Signal],
    id: Props.string,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
  $locked = $(this.props.locked);
  #lastActiveElement = document.activeElement;
  captureEscapeKey = (e) => {
    e.key === "Escape" && this.close();
  };
  afterMount() {
    this.#lastActiveElement && this.#lastActiveElement.blur(), window.addEventListener("keyup", this.captureEscapeKey), (this.props["event-open"] ?? noop)(null, this);
  }
  beforeDestroy() {
    if (!this.destroyed && (window.removeEventListener("keyup", this.captureEscapeKey), this.#lastActiveElement)) {
      const el = this.#lastActiveElement;
      window.setTimeout(() => el.focus(), 0);
    }
  }
  close() {
    this.$locked.value || ((this.props["event-close"] || noop)(null, this), !this.destroyed && this.destroy());
  }
  template(props) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style$b.backdrop,
          props.class
        ],
        style: props.style,
        "event-click": (e) => (props["event-click"] ?? noop)(e, this)
      },
      props.children
    );
  }
}
const button = "ui-button-d5yhn114", button__label = "ui-button__label-d5yhn168", button__icon = "ui-button__icon-d5yhn179", style$a = {
  button,
  button__label,
  button__icon
};
class Button extends Component {
  static props = {
    label: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    icon: [Props.string, Props.Signal],
    active: [Props.boolean, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    waiting: [Props.boolean, Props.Signal],
    type: Props.string,
    id: Props.string,
    tabindex: Props.number,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
  $label = $(this.props.label);
  $title = $(this.props.title);
  $icon = $(this.props.icon);
  $active = $(this.props.active);
  $disabled = $(this.props.disabled);
  $hidden = $(this.props.hidden);
  $waiting = $(this.props.waiting);
  handleClick = async (e) => {
    if (this.props["event-click"] && !this.$disabled.value) {
      if (this.base.blur(), this.$waiting.value) return e.preventDefault();
      this.$waiting.value = !0;
      try {
        await this.props["event-click"](e, this);
      } finally {
        this.mounted && (this.$waiting.value = !1, this.refs?.icon && (this.refs.icon.style.animation = "none", this.refs.icon.offsetHeight, this.refs.icon.style.animation = null));
      }
    }
  };
  template(props) {
    return /* @__PURE__ */ h(
      "button",
      {
        ...this.dataProps,
        ...this.eventProps,
        type: props.type,
        id: props.id,
        tabIndex: props.tabindex,
        class: [
          style$a.button,
          {
            "has-click": !!props["event-click"],
            "has-icon": this.$icon,
            "is-active": this.$active,
            "is-disabled": this.$disabled,
            "is-hidden": this.$hidden,
            "is-waiting": this.$waiting
          },
          props.class
        ],
        style: props.style,
        title: this.$title,
        disabled: this.$disabled,
        "event-click": this.handleClick
      },
      /* @__PURE__ */ h(
        "span",
        {
          ref: this.ref("icon"),
          class: style$a.button__icon,
          innerHTML: this.$icon
        }
      ),
      /* @__PURE__ */ h("label", { class: style$a.button__label, innerHTML: this.$label }),
      props.children
    );
  }
}
const style$9 = {
  "file-dropper": "ui-file-dropper-180gr114"
};
class FileDropper extends Component {
  static props = {
    label: Props.string,
    icon: Props.string,
    id: Props.string,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
  $draggedOver = $(!1);
  $files = $(null);
  #appliedTo = null;
  handleDragStart = (e) => {
    this.isVisible && e.dataTransfer.types.includes("Files") && (e.preventDefault(), e.stopPropagation(), this.$draggedOver.value = !0);
  };
  handleDrop = (e) => {
    if (this.isVisible) {
      if (!e.dataTransfer.types.includes("Files")) {
        this.$files.value = null;
        return;
      }
      e.preventDefault(), e.stopPropagation(), this.$files.value = e.dataTransfer.files, (this.props["event-drop"] ?? noop)(e, this), this.handleDragEnd(e);
    }
  };
  handleDragEnd = (e) => {
    if (this.isVisible) {
      if (!e.dataTransfer.types.includes("Files")) {
        this.$files.value = null;
        return;
      }
      e.preventDefault(), e.stopPropagation(), this.$draggedOver.value = !1;
    }
  };
  afterMount() {
    this.#appliedTo = this.base.offsetParent ?? document.body, this.#appliedTo.addEventListener("dragover", this.handleDragStart), this.#appliedTo.addEventListener("dragenter", this.handleDragStart), this.#appliedTo.addEventListener("dragleave", this.handleDragEnd), this.#appliedTo.addEventListener("dragend", this.handleDragEnd), this.#appliedTo.addEventListener("drop", this.handleDrop);
  }
  beforeDestroy() {
    this.#appliedTo?.removeEventListener("dragover", this.handleDragStart), this.#appliedTo?.removeEventListener("dragenter", this.handleDragStart), this.#appliedTo?.removeEventListener("dragleave", this.handleDragEnd), this.#appliedTo?.removeEventListener("dragend", this.handleDragEnd), this.#appliedTo?.removeEventListener("drop", this.handleDrop);
  }
  get isVisible() {
    return this.base.offsetParent !== null;
  }
  template(props) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style$9["file-dropper"],
          { "is-dragged-over": this.$draggedOver },
          props.class
        ],
        style: props.style
      },
      props.children.length > 0 ? props.children : props.icon || props.label ? /* @__PURE__ */ h(Button, { icon: props.icon, label: props.label, tabIndex: -1 }) : null
    );
  }
}
const input = "ui-input-r7lw0114", input__icon = "ui-input__icon-r7lw0157", style$8 = {
  input,
  input__icon
};
class Input extends Component {
  static props = {
    value: [Props.string, Props.number, Props.object, Props.Signal],
    placeholder: [Props.string, Props.Signal],
    label: [Props.string, Props.Signal],
    before: [Props.string, Props.Signal],
    after: [Props.string, Props.Signal],
    icon: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    active: [Props.boolean, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    waiting: [Props.boolean, Props.Signal],
    min: [Props.number, Props.Signal],
    max: [Props.number, Props.Signal],
    step: [Props.number, Props.Signal],
    accept: Props.string,
    multiple: Props.boolean,
    size: [Props.number, Props.string],
    autofocus: Props.boolean,
    autocomplete: Props.string,
    autoSelectAll: Props.boolean,
    editOnDblClick: Props.boolean,
    type: Props.string,
    name: Props.string,
    id: Props.string,
    tabindex: Props.number,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
  $value = $(this.props.value);
  $files = $(this.props.files);
  $placeholder = $(this.props.placeholder);
  $title = $(this.props.title);
  $label = $(this.props.label);
  $before = $(this.props.before);
  $after = $(this.props.after);
  $icon = $(this.props.icon);
  $accept = $(this.props.accept ?? "*");
  $multiple = $(this.props.multiple ?? "*");
  $min = $(this.props.min);
  $max = $(this.props.max);
  $step = $(this.props.step);
  $active = $(this.props.active);
  $disabled = $(this.props.disabled);
  $hidden = $(this.props.hidden);
  $waiting = $(this.props.waiting);
  update = () => {
    const value = this.$value.value;
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
      const length = (String(this.refs.input.value) ?? "").length || (this.$placeholder.value ?? "").length || 1;
      this.props.type === "number" ? this.refs.input.style.width = length + 1 + "ch" : this.refs.input.size = Math.max(1, length);
    }
  };
  handleClick = (e) => {
    this.props.type === "file" ? this.refs.input.click() : this.props.editOnDblClick || this.refs.input.focus(), (this.props["event-click"] ?? noop)(e, this);
  };
  handleDblClick = async (e) => {
    this.refs.input.focus(), await (this.props["event-dblclick"] ?? noop)(e, this);
  };
  handleInput = async (e) => {
    if (this.$waiting.value) return e.preventDefault();
    switch (this.$waiting.value = !0, this.props.type) {
      case "number":
        this.$value.value = +this.refs.input.value;
        break;
      case "file":
        this.$value.value = this.refs.input.files;
        break;
      default:
        this.$value.value = this.refs.input.value;
    }
    await (this.props["event-input"] ?? noop)(e, this), this.mounted && (this.$waiting.value = !1);
  };
  handleFocus = (e) => {
    this.props.autoSelectAll && this.refs.input.select(), (this.props["event-focus"] ?? noop)(e, this);
  };
  afterRender() {
    this.watch(this.$value, this.update, { immediate: !0 });
  }
  template(props) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        ...this.eventProps,
        id: props.id,
        tabIndex: props.tabindex,
        class: [
          style$8.input,
          {
            "is-edited-on-dblclick": !!props.editOnDblClick,
            "has-icon": this.$icon,
            "is-active": this.$active,
            "is-disabled": this.$disabled,
            "is-hidden": this.$hidden,
            "is-waiting": this.$waiting
          },
          props.class
        ],
        style: props.style,
        "data-type": props.type,
        title: this.$title,
        "event-click": this.handleClick,
        "event-dblclick": this.handleDblClick
      },
      /* @__PURE__ */ h(
        "span",
        {
          ref: this.ref("icon"),
          class: style$8.input__icon,
          innerHTML: this.$icon
        }
      ),
      /* @__PURE__ */ h("label", { class: style$8.input__label, innerHTML: this.$label }),
      /* @__PURE__ */ h("label", { class: style$8.input__before, innerHTML: this.$before }),
      /* @__PURE__ */ h(
        "input",
        {
          ref: this.ref("input"),
          type: props.type,
          name: props.name,
          autofocus: props.autofocus,
          autocomplete: props.autocomplete ?? "off",
          size: props.type !== "number" ? props.size === "auto" ? "" : props.size : void 0,
          min: props.type === "number" ? this.$min : void 0,
          max: props.type === "number" ? this.$max : void 0,
          step: props.type === "number" ? this.$step : void 0,
          placeholder: this.$placeholder,
          accept: props.type === "file" ? this.$accept : void 0,
          multiple: props.type === "file" ? this.$multiple : void 0,
          disabled: this.$disabled,
          "event-click": (e) => e.stopPropagation(),
          "event-input": this.handleInput,
          "event-focus": this.handleFocus,
          "event-blur": props["event-blur"]
        }
      ),
      /* @__PURE__ */ h("label", { class: style$8.input__after, innerHTML: this.$after })
    );
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
  static props = {
    title: [Props.string, Props.Signal],
    icon: [Props.string, Props.Signal],
    locked: [Props.boolean, Props.Signal],
    id: Props.string,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
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
  $title = $(this.props.title);
  $locked = $(this.props.locked);
  handleClick = (e) => {
    e.target === this.base && this.handleClose();
  };
  handleClose = () => {
    this.$locked.value || this.refs.backdrop.close();
  };
  template(props) {
    return /* @__PURE__ */ h(
      Backdrop,
      {
        ref: this.ref("backdrop"),
        locked: this.$locked,
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
            props.class
          ],
          style: props.style,
          "event-mouseenter": (e) => (props["event-mouseenter"] ?? noop)(e, this),
          "event-mouseleave": (e) => (props["event-mouseleave"] ?? noop)(e, this)
        },
        /* @__PURE__ */ h("header", { class: style$7.modal__header }, /* @__PURE__ */ h(
          Button,
          {
            class: style$7.modal__title,
            icon: props.icon,
            label: this.$title
          }
        ), /* @__PURE__ */ h(
          Button,
          {
            class: style$7.modal__close,
            icon: IconClose,
            hidden: this.$locked,
            "event-click": this.handleClose
          }
        )),
        /* @__PURE__ */ h("div", { class: style$7.modal__content }, props.children)
      )
    );
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
  static props = {
    compact: [Props.boolean, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    id: Props.string,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
  $compact = $(this.props.compact);
  $disabled = $(this.props.disabled);
  $hidden = $(this.props.hidden);
  template(props) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        ...this.eventProps,
        id: props.id,
        class: [
          style$5.toolbar,
          {
            "is-compact": this.$compact,
            "is-disabled": this.$disabled,
            "is-hidden": this.$hidden
          },
          props.class
        ],
        style: props.style
      },
      props.children
    );
  }
}
class Picker extends Component {
  static props = {
    label: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    iconOpen: [Props.string, Props.Signal],
    iconClose: [Props.string, Props.Signal],
    open: [Props.boolean, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    autoClose: Props.boolean,
    autoOrder: Props.boolean,
    id: Props.string,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
  $label = $(this.props.label);
  $title = $(this.props.title);
  $iconOpen = $(this.props.iconOpen);
  $iconClose = $(this.props.iconClose);
  $open = $(this.props.open);
  $disabled = $(this.props.disabled);
  $hidden = $(this.props.hidden);
  $toggleIcon = $(
    [this.$open, this.$iconClose, this.$iconOpen],
    ([open, iconClose, iconOpen]) => open ? iconClose : iconOpen
  );
  handleOpen = () => {
    this.$open.value ? (this.props["event-open"] ?? noop)(null, this) : (this.props["event-close"] ?? noop)(null, this);
  };
  handleToggle = (e) => {
    e.stopPropagation(), this.$open.value = !this.$open.value;
  };
  handleClick = (i, callback) => async (e) => {
    if (!this.$open.value) {
      e.stopPropagation(), this.$open.value = !0;
      return;
    }
    for (let index = 0; index < this.refs.buttons.length; index++)
      this.refs.buttons[index].$active.value = index === i;
    this.props.autoClose && (this.$open.value = !1), (this.props["event-change"] ?? noop)(null, this), await callback(e, this.refs.buttons[i]);
  };
  beforeRender(props) {
    const buttons = props.children.filter((child) => child.type === Button);
    for (const button2 of buttons)
      button2.props.ref = this.refArray("buttons"), button2.props["event-click"] = this.handleClick(
        buttons.indexOf(button2),
        button2.props["event-click"] || noop
      );
  }
  afterRender() {
    this.watch(this.$open, this.handleOpen);
  }
  template(props) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        ...this.eventProps,
        id: props.id,
        class: [
          style$6.picker,
          {
            "has-auto-order": props.autoOrder,
            "is-open": this.$open,
            "is-disabled": this.$disabled,
            "is-hidden": this.$hidden
          },
          props.class
        ],
        style: props.style
      },
      /* @__PURE__ */ h(
        Button,
        {
          class: style$6.picker__toggle,
          icon: this.$toggleIcon,
          label: this.$label,
          title: this.$title,
          active: this.$open,
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
  static props = {
    value: [Props.number, Props.array, Props.Signal],
    min: [Props.number, Props.Signal],
    max: [Props.number, Props.Signal],
    step: [Props.number, Props.Signal],
    label: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    icon: Props.string,
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    dual: Props.boolean,
    debounce: Props.number,
    id: Props.string,
    tabindex: Props.number,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
  $label = $(this.props.label);
  $title = $(this.props.title);
  $value = $(this.props.value);
  $min = $(this.props.min);
  $max = $(this.props.max);
  $step = $(this.props.step);
  $disabled = $(this.props.disabled);
  $hidden = $(this.props.hidden);
  #onInput = async (e) => {
    this.props.dual ? this.$value.value = [+this.refs.inputs[0].value, +this.refs.inputs[1].value] : this.$value.value = +this.refs.inputs[0].value, await (this.props["event-input"] ?? noop)(e, this);
  };
  handleInput = this.props.debounce ? debounceExports.debounce(this.#onInput.bind(this), this.props.debounce) : this.#onInput;
  template(props) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        ...this.eventProps,
        id: props.id,
        class: [
          style$4.range,
          {
            "is-dual": props.dual,
            "is-disabled": this.$disabled,
            "is-hidden": this.$hidden
          },
          props.class
        ],
        style: props.style
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
          min: this.$min,
          max: this.$max,
          step: this.$step,
          title: this.$title,
          value: $(this.$value, (value) => props.dual ? (value ?? [])[0] : value),
          disabled: this.$disabled,
          "event-input": this.handleInput
        }
      ), props.dual && /* @__PURE__ */ h(
        "input",
        {
          ref: this.refArray("inputs"),
          tabIndex: props.tabindex,
          type: "range",
          min: this.$min,
          max: this.$max,
          step: this.$step,
          title: this.$title,
          value: $(this.$value, (value) => props.dual ? (value ?? [])[1] : value),
          disabled: this.$disabled,
          "event-input": this.handleInput
        }
      )),
      /* @__PURE__ */ h("label", { class: style$4.range__label, innerHTML: this.$label })
    );
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
  static props = {
    value: Props.Signal,
    options: [Props.array, Props.Signal],
    label: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    icon: Props.string,
    dropdown: Props.string,
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    placeholder: Props.string,
    required: Props.boolean,
    compare: Props.function,
    name: Props.string,
    id: Props.string,
    tabindex: Props.number,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
  static get separator() {
    return { label: "", disabled: !0 };
  }
  $title = $(this.props.title);
  $label = $(this.props.label);
  $value = $(this.props.value);
  $options = $(this.props.options);
  $disabled = $(this.props.disabled);
  $hidden = $(this.props.hidden);
  $selectedIndex = $(
    [this.$value, this.$options],
    ([value, options]) => {
      const compare = this.props.compare ?? ((a, b) => a === b);
      return options?.findIndex((option) => compare(option.value ?? option, value)) ?? -1;
    }
  );
  update = () => {
    this.clear();
    const options = this.$options.value;
    if (!options) return;
    const selectedIndex = this.$selectedIndex.value;
    this.props.placeholder && this.render(
      /* @__PURE__ */ h(
        "option",
        {
          value: "",
          disabled: !0,
          ...this.$value.value === void 0 || selectedIndex < 0 ? { selected: !0 } : {}
        },
        this.props.placeholder
      ),
      this.refs.select
    );
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
  };
  handleChange = (e) => {
    const index = +e.target.value, selected = (this.$options.value ?? [])[index];
    this.refs.select.blur(), this.$value.value = selected ? selected.value ?? selected : null, (this.props["event-change"] || noop)(e, this);
  };
  afterRender() {
    this.watch([this.$value, this.$options], this.update, { immediate: !0 });
  }
  clear() {
    this.refs.select.innerHTML = "";
  }
  template(props) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        ...this.eventProps,
        id: props.id,
        class: [
          style$3.select,
          {
            "is-disabled": this.$disabled,
            "is-hidden": this.$hidden
          },
          props.class
        ],
        style: props.style
      },
      props.icon && /* @__PURE__ */ h(
        "span",
        {
          ref: this.ref("icon"),
          class: style$3.select__icon,
          innerHTML: props.icon
        }
      ),
      /* @__PURE__ */ h("div", { class: style$3.select__label, innerHTML: this.$label }),
      /* @__PURE__ */ h(
        "select",
        {
          ref: this.ref("select"),
          name: props.name,
          required: props.required,
          tabIndex: props.tabindex,
          title: this.$title,
          disabled: this.$disabled,
          "event-change": this.handleChange
        }
      ),
      /* @__PURE__ */ h("span", { class: style$3.select__arrow, innerHTML: props.dropdown ?? IconDown })
    );
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
  static props = {
    value: [Props.string, Props.number, Props.Signal],
    options: [Props.array, Props.Signal],
    title: [Props.string, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    id: Props.string,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
  $title = $(this.props.title);
  $value = $(this.props.value);
  $options = $(this.props.options ?? []);
  $disabled = $(this.props.disabled);
  $hidden = $(this.props.hidden);
  update = () => {
    this.clear();
    const options = this.$options.value;
    options && this.render(
      options.map(({ icon, value, label, disabled, hidden } = {}, index) => /* @__PURE__ */ h(
        Button,
        {
          ref: this.refArray("buttons"),
          icon,
          label: label ?? value ?? index,
          active: (value ?? index) === this.$value.value,
          disabled,
          hidden,
          "event-click": this.handleChange(value ?? index)
        }
      )),
      this.base
    );
  };
  handleChange = (value) => (e) => {
    this.$value.value = value, (this.props["event-change"] || noop)(e, this);
  };
  afterRender() {
    this.watch([this.$value, this.$options], this.update, { immediate: !0 });
  }
  clear() {
    this.refs.buttons && (this.refs.buttons.forEach((button2) => button2?.destroy()), delete this.refs.buttons);
  }
  template(props) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        ...this.eventProps,
        id: props.id,
        class: [
          style$1.toggles,
          {
            "is-disabled": this.$disabled,
            "is-hidden": this.$hidden
          },
          props.class
        ],
        style: props.style,
        title: this.$title
      }
    );
  }
}
class Tabs extends Component {
  static props = {
    value: [Props.number, Props.Signal],
    tabs: [Props.array, Props.Signal],
    id: Props.string,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
  static panel(children, props = {}) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...props,
        class: [
          style$2.tabs__panel,
          props.class
        ]
      },
      children
    );
  }
  $value = $(this.props.value ?? 0);
  $tabs = $(this.props.tabs);
  update = () => {
    const value = this.$value.value;
    for (let index = 0; index < this.refs.panels.children.length; index++) {
      const panel = this.refs.panels.children[index];
      panel && panel.classList.toggle("is-hidden", index !== value);
    }
  };
  afterRender() {
    this.watch([this.$value, this.$tabs], this.update, { immediate: !0 });
  }
  template(props) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        id: props.id,
        class: [
          style$2.tabs,
          props.class
        ],
        style: props.style
      },
      /* @__PURE__ */ h(
        Toggles,
        {
          class: style$2.tabs__toggles,
          value: this.$value,
          options: this.$tabs,
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
}
const toast = "ui-toast-1kys1123", toast__icon = "ui-toast__icon-1kys1196", toast__content = "ui-toast__content-1kys1221", style = {
  "toast-container": "ui-toast-container-1kys1123",
  toast,
  toast__icon,
  toast__content
};
class Toast extends Component {
  static props = {
    label: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    icon: [Props.string, Props.Signal],
    tone: [Props.string, Props.Signal],
    count: [Props.number, Props.Signal],
    duration: Props.number,
    id: Props.string,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  };
  static display(message, { parent = Toast.container, ...props } = {}) {
    render(/* @__PURE__ */ h(Toast, { ...props }, message), parent);
  }
  static get container() {
    return document.querySelector("." + style["toast-container"]) ?? render(/* @__PURE__ */ h("div", { class: style["toast-container"] }), document.body).nodes[0];
  }
  $label = $(this.props.label);
  $title = $(this.props.title);
  $icon = $(this.props.icon);
  $tone = $(this.props.tone);
  $count = $(this.props.count);
  handleClose = (e) => {
    e.stopPropagation(), this.destroy();
  };
  afterMount() {
    this.props.duration && (this.refs.timer = window.setTimeout(() => this.destroy(), this.props.duration));
  }
  beforeDestroy() {
    (this.props["event-close"] || noop)(), this.refs.timer && window.clearTimeout(this.refs.timer);
  }
  template(props) {
    return /* @__PURE__ */ h(
      "div",
      {
        ...this.dataProps,
        ...this.eventProps,
        id: props.id,
        class: [
          style.toast,
          {
            "has-icon": this.$icon,
            "has-duration": props.duration
          },
          props.class
        ],
        "data-count": this.$count,
        "data-tone": this.$tone,
        style: { "--toast-duration": (props.duration ?? -1) + "ms", ...props.style }
      },
      /* @__PURE__ */ h(
        "span",
        {
          ref: this.ref("icon"),
          class: style.toast__icon,
          "data-count": this.$count,
          innerHTML: this.$icon
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
