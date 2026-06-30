import { n as noop, i as isSignal } from "./signal-DpLAi1GD.js";
function h(type, props) {
  if (type === void 0)
    throw new TypeError("h() called with undefined type: cannot render <undefined /> component");
  const vn = {};
  return vn.vnode = !0, vn.type = type, vn.props = props || {}, vn.children = [].concat.apply([], [].slice.call(arguments, 2)), vn.isInstance = type && type.template && typeof type.template == "function", vn.isComponent = typeof type == "function" && type.prototype && typeof type.prototype.render == "function", vn.isStateless = typeof type == "function" && !vn.isComponent, vn.isDom = typeof type == "string", vn;
}
h.f = (p) => p.children;
function extend(obj, nObj) {
  for (const i in nObj) obj[i] = nObj[i];
  return obj;
}
function logger(prefix, color, background, mute) {
  if (mute) return { log: noop, warn: noop, error: noop };
  const pre = [];
  prefix = prefix.toUpperCase(), pre.push(`%c ${prefix} `);
  let style = "font-weight:bold;";
  return style += `color:${color};`, style += `background-color:${background}`, pre.push(style), {
    log: console.log.bind(console, ...pre),
    warn: console.warn.bind(console, ...pre),
    error: console.error.bind(console, ...pre)
  };
}
const TYPES = ["nodes", "components", "refs", "domEvents", "storeEvents"];
class Collector {
  constructor() {
    this.data = {};
    for (let i = 0; i < TYPES.length; i++)
      this.data[TYPES[i]] = [];
  }
  append(obj) {
    for (const k in obj) {
      const val2 = obj[k];
      Array.isArray(val2) ? this.data[k].push(...val2) : this.data[k].push(val2);
    }
  }
  set(obj) {
    for (const k in obj)
      this.data[k] = obj[k];
  }
  get() {
    return this.data;
  }
}
const namespaces = [
  "xlink",
  "xmlns",
  "xml"
], doubleAttr = /* @__PURE__ */ new Set([
  "placeholder",
  "autoplay",
  "muted",
  "for",
  "webkit-playsinline",
  "playsinline",
  "selected"
]);
let val;
const startsWith = (str, w) => str.substr(0, w.length) === w, updateClass = (n, el) => (v) => el.classList.toggle(n, v || !1), updateAttrib = (name = "textContent", isSvg, el) => (v) => {
  if (isSvg && name !== (name = name.replace(/^xlink:?/, ""))) el.setAttributeNS("http://www.w3.org/1999/xlink", name.toLowerCase(), v);
  else {
    if (v === void 0) {
      el.removeAttribute(name);
      return;
    }
    val = v ?? "", isSvg || (el[name] = val), (isSvg || doubleAttr.has(name) || startsWith(name, "data-")) && el.setAttribute(name, val);
  }
};
function setDomAttrib(el, name, value, collector, isSvg) {
  if (value !== void 0 && !(name === "__self" || name === "__source")) {
    name === "className" && (name = "class");
    for (let i = 0; i < namespaces.length; i++)
      if (startsWith(name, namespaces[i])) {
        const len = namespaces[i].length;
        name[len] && name[len] !== ":" && (name = namespaces[i] + ":" + name[len].toLowerCase() + name.substr(len + 1, name.length));
        break;
      }
    if (name !== "ref") if (startsWith(name, "event-")) {
      const eventName = name.toLowerCase().substring(6);
      collector.append({ domEvents: [{ el, evt: eventName, fn: value }] });
    } else if (isSignal(value)) {
      let attrib = name;
      attrib === "text" && (attrib = "textContent");
      const fn = updateAttrib(attrib, isSvg, el);
      collector.append({ storeEvents: [{ store: value, init: !0, fn }] });
    } else if (typeof value == "function" && startsWith(name, "on")) {
      const eventType = name.toLowerCase();
      el[eventType] = value;
    } else if (name === "class") {
      if (typeof value == "string" && (isSvg ? el.setAttribute("class", value || "") : el.className = value || ""), typeof value == "object") {
        const entries = Array.isArray(value) ? value.flat().filter(Boolean) : value;
        for (const key in entries) {
          const v = entries[key];
          if (typeof v == "string" && el.classList.add(...v.split(" ")), typeof v == "object") {
            for (const k in v)
              if (typeof v[k] == "boolean" && el.classList.toggle(k, v[k]), isSignal(v[k])) {
                const fn = updateClass(k, el);
                collector.append({ storeEvents: [{ store: v[k], init: !0, fn }] });
              }
          }
        }
      }
    } else if (name === "style")
      if (typeof value == "object")
        for (const key in value) {
          const updateProp = (v) => {
            key.startsWith("--") ? el.style.setProperty(key, v) : el.style[key] = v;
          };
          isSignal((value ?? [])[key]) ? collector.append({ storeEvents: [{ store: value[key], init: !0, fn: updateProp }] }) : updateProp(value[key]);
        }
      else typeof value == "string" && (el.style.cssText = value);
    else if (name !== "list" && name !== "type" && !isSvg && name in el)
      try {
        updateAttrib(name, isSvg, el)(value);
      } catch {
      }
    else typeof value != "object" && typeof value != "function" && updateAttrib(name, isSvg, el)(value);
  }
}
function arr(e) {
  return Array.isArray(e) ? e : [e];
}
function rawRender(vdom, isSvg) {
  if (Array.isArray(vdom)) return renderArray(vdom, isSvg);
  if (vdom instanceof window.Element) return renderDirectDom(vdom);
  if (vdom === null || typeof vdom != "object" || !vdom.vnode) return renderPrimitive(vdom);
  const props = extend(
    extend({}, vdom.props),
    { children: [].concat.apply([], vdom.children || []) }
  );
  if (vdom.isDom) return renderDom(vdom, props, isSvg);
  if (vdom.isInstance) return renderClass(vdom, props, isSvg, !0);
  if (vdom.isStateless) return renderStateless(vdom, props, isSvg);
  if (vdom.isComponent) return renderClass(vdom, props, isSvg);
}
function renderArray(vdoms, isSvg) {
  vdoms = arr(vdoms);
  const collector = new Collector();
  for (let i = 0; i < vdoms.length; i++)
    collector.append(rawRender(vdoms[i], isSvg));
  return collector.get();
}
function renderPrimitive(vdom) {
  const collector = new Collector();
  return vdom == null || vdom === !1 || collector.append({ nodes: document.createTextNode(vdom + "") }), collector.get();
}
function renderDom(vdom, props, isSvg) {
  const collector = new Collector();
  let domChildren = [];
  vdom.type === "svg" && (isSvg = !0);
  for (let i = 0; i < props.children.length; i++) {
    const result = rawRender(props.children[i], isSvg);
    result.nodes && (domChildren = domChildren.concat(result.nodes), collector.append({
      components: result.components,
      refs: result.refs,
      domEvents: result.domEvents,
      storeEvents: result.storeEvents
    }));
  }
  const el = isSvg ? document.createElementNS("http://www.w3.org/2000/svg", vdom.type) : document.createElement(vdom.type);
  for (const k in vdom.props)
    setDomAttrib(el, k, vdom.props[k], collector, isSvg);
  for (let i = 0; i < domChildren.length; i++)
    el.appendChild(domChildren[i]);
  return props.ref && collector.append({ refs: { ref: el, fn: props.ref } }), collector.append({ nodes: el }), collector.get();
}
function renderDirectDom(vdom) {
  const collector = new Collector();
  return collector.append({ nodes: vdom }), collector.get();
}
function renderStateless(_vdom, props, isSvg) {
  const collector = new Collector(), vdom = _vdom.type(props);
  return collector.append(rawRender(vdom, isSvg)), collector.get();
}
function renderClass(_vdom, props, isSvg, isInstance = !1) {
  const collector = new Collector(), instance = isInstance ? _vdom.type : new _vdom.type(props);
  isInstance && (props = instance.props), instance.beforeRender(props);
  const vdom = instance.template(props, instance.state || {}) || props.children;
  props.ref && collector.append({ refs: { ref: instance, fn: props.ref } }), collector.append(rawRender(vdom, isSvg));
  const nodes = collector.data.nodes;
  instance.base = nodes.length > 1 ? nodes : nodes[0];
  for (const k in collector.data)
    k !== "nodes" && (instance._collector[k] || (instance._collector[k] = []), instance._collector[k] = instance._collector[k].concat(collector.data[k]));
  collector.set({
    components: [instance],
    refs: [],
    domEvents: [],
    storeEvents: []
  });
  for (let i = 0; i < instance._collector.components.length; i++)
    instance._collector.components[i]._parent = instance;
  return collector.get();
}
function dispatch(component, cb, topDown) {
  const subs = component._collector && component._collector.components;
  if (subs)
    for (let i = 0; i < subs.length; i++) dispatch(subs[i], cb);
  cb(component);
}
function callRefs(component) {
  for (let i = 0; i < component._collector.refs.length; i++)
    component._collector.refs[i].fn(component._collector.refs[i].ref), component._collector.refs[i].ref = null;
}
function callStoreListeners(component) {
  for (let i = 0; i < component._collector.storeEvents.length; i++) {
    const event = component._collector.storeEvents[i];
    event.store.subscribe(event.fn), event.init && event.fn(event.store.value);
  }
}
function callDomListeners(component) {
  component.test && console.log("call dom listeners", component._collector.domEvents);
  for (let i = 0; i < component._collector.domEvents.length; i++) {
    const event = component._collector.domEvents[i];
    event.el.addEventListener(event.evt, event.fn);
  }
}
function dispatchRefs(component) {
  dispatch(component, callRefs);
}
function dispatchListeners(component) {
  dispatch(component, callDomListeners), dispatch(component, callStoreListeners);
}
const SvgTagNames = /* @__PURE__ */ new Set([
  "svg",
  "g",
  "defs",
  "mask",
  "path",
  "rect",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "text",
  "tspan",
  "textPath",
  "use",
  "symbol",
  "image",
  "linearGradient",
  "radialGradient",
  "stop",
  "clipPath",
  "pattern",
  "filter",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "animate",
  "animateMotion",
  "animateTransform",
  "mpath",
  "set",
  "marker",
  "switch",
  "foreignObject",
  "desc",
  "title",
  "metadata",
  "view"
]);
function render(vnode, parent = document.body, context) {
  let i = 0;
  const rendered = rawRender(vnode, parent && SvgTagNames.has(parent.tagName));
  let mockComponent = { _collector: rendered };
  if (dispatchRefs(mockComponent), dispatch(mockComponent, function(c) {
    c.afterRender && c.afterRender(c.props);
  }), typeof parent == "function") {
    const nodes = rendered.nodes.length < 2 ? rendered.nodes[0] : rendered.nodes;
    parent(nodes);
  } else if (parent instanceof window.Element)
    for (i = 0; i < rendered.nodes.length; i++)
      parent.appendChild(rendered.nodes[i]);
  else if (typeof parent == "object" && parent !== null && parent.insertBefore)
    for (i = 0; i < rendered.nodes.length; i++)
      parent.insertBefore.parentNode.insertBefore(rendered.nodes[i], parent.insertBefore);
  if ((!context || context.mounted) && (dispatchListeners(mockComponent), dispatch(mockComponent, function(c) {
    c.mounted = !0, c.afterMount && c.afterMount(c.props);
  })), context && context._collector) {
    const c = context._collector;
    for (i = 0; i < rendered.components.length; i++)
      rendered.components[i]._parent = context;
    c.refs && (c.refs = c.refs.concat(rendered.refs)), c.components && (c.components = c.components.concat(rendered.components)), c.domEvents && (c.domEvents = c.domEvents.concat(rendered.domEvents)), c.storeEvents && (c.storeEvents = c.storeEvents.concat(rendered.storeEvents));
  }
  return mockComponent = void 0, rendered;
}
const Props = new Proxy({
  required: (test) => new Required(test),
  // Instances
  SVGElement: (value) => value instanceof SVGElement,
  Element: (value) => value instanceof Element,
  Component: (value) => value instanceof Component,
  Signal: (value) => isSignal(value),
  // Primitives
  number: (value) => typeof value == "number",
  string: (value) => typeof value == "string",
  boolean: (value) => typeof value == "boolean",
  function: (value) => typeof value == "function",
  array: (value) => Array.isArray(value),
  object: (value) => typeof value == "object" && !Array.isArray(value),
  // Special types
  enum: (...values) => {
    const fn = (value) => values.includes(value);
    return Object.defineProperty(fn, "name", { value: `enum(${values.map((v) => JSON.stringify(v)).join("|")})` }), fn;
  }
}, {
  get(target, key) {
    if (key in target) return target[key];
    throw new TypeError(`Props.${key} is not a valid prop type`);
  }
});
function typeOf(value) {
  const [type] = Object.entries(Props).find(([k, t]) => k !== "required" && k !== "enum" && t(value)) ?? [];
  return type;
}
function validate(props, schema, name = "") {
  for (const prop in schema) {
    const value = props[prop], spec = schema[prop];
    if (spec instanceof Required) {
      const tests2 = Array.isArray(spec.test) ? spec.test : [spec.test], label = tests2.map((t) => t.name).join("|");
      if (value === void 0)
        throw new TypeError(`<${name} ${prop}={${label}} /> is required`);
      if (!tests2.some((t) => t(value)))
        throw new TypeError(`<${name} ${prop}={${typeOf(value)}} /> must be {${label}}`);
      continue;
    }
    if (value === void 0) continue;
    const tests = Array.isArray(spec) ? spec : [spec];
    tests.some((t) => t(value)) || console.warn(`<${name} ${prop}={${tests.map((t) => t.name).join("|")}} /> is {${typeOf(value)}}`);
  }
}
class Required {
  test;
  constructor(test) {
    this.test = test;
  }
}
class Component {
  // Props schema for validation, see ./Props
  static props = {};
  refs = {};
  state = {};
  store = {};
  props = {};
  base = null;
  mounted = !1;
  destroyed = !1;
  constructor(props = {}) {
    const label = props.name || this.constructor.name || "Component";
    validate(props, this.constructor.props, label), this._parent = null, this._collector = { refs: [], components: [], domEvents: [], storeEvents: [] }, this.props = props;
    const { log, warn, error } = logger(label, "white", "#000", props.disableLog);
    this.log = log, this.warn = warn, this.error = error;
  }
  get dataProps() {
    return Object.entries(this.props).filter(([attr]) => attr.startsWith("data-")).reduce((acc, [attr, value]) => ({ ...acc, [attr]: value }), {});
  }
  get eventProps() {
    return Object.entries(this.props).filter(([attr]) => attr.startsWith("event-")).reduce((acc, [attr, value]) => ({ ...acc, [attr]: value }), {});
  }
  template() {
  }
  beforeRender() {
  }
  afterRender() {
  }
  afterMount() {
  }
  beforeDestroy() {
  }
  // Quickly add ref to component
  ref(k) {
    const self = this;
    return function(el) {
      self.refs[k] = el;
    };
  }
  // Quickly add ref to an array of component refs
  refArray(k, poolable = !1) {
    const arr2 = this.refs[k] || (this.refs[k] = []);
    let index = arr2.length, pools, pool;
    return poolable && (pools = this.refs.__pools || (this.refs.__pools = {}), pool = pools[k] || (pools[k] = []), pool.length && (index = pool.pop())), arr2[index] = null, function(el) {
      arr2[index] = el, poolable && pool.push(index);
    };
  }
  // Quickly add ref to a hashmap of component refs
  refMap(id, k) {
    const map = this.refs[k] || (this.refs[k] = /* @__PURE__ */ new Map());
    return function(el) {
      el ? map.set(id, el) : map.delete(id);
    };
  }
  watch(signals, fn, { immediate = !1 } = {}) {
    const arr2 = Array.isArray(signals) ? signals : [signals];
    for (const signal of arr2)
      this.mounted && signal.subscribe(fn), this._collector.storeEvents.push({ store: signal, fn, init: !1 });
    immediate && fn(arr2.length === 1 ? arr2[0].value : arr2.map((s) => s.value));
  }
  // Render a vnode or array of vnodes and register the rendered content as "child" of this component.
  // Use this method when you want to add content to the component
  // after the initial rendering. This ensures new items will be
  // correctly unmount when the component is destroyed.
  render(vdom, parent) {
    return render(vdom, parent, this);
  }
  // Destroy the component and its children components.
  // - This also removes component props and de-reference it from its parent.
  // - Callback refs inside the component tree will be re-called with `null`
  // - Set component.mounted to false
  destroy() {
    let i = 0;
    for (this.beforeDestroy(this.props), i = this._collector.domEvents.length - 1; i >= 0; i--) {
      const event = this._collector.domEvents[i];
      event.el.removeEventListener(event.evt, event.fn);
    }
    for (i = this._collector.storeEvents.length - 1; i >= 0; i--) {
      const event = this._collector.storeEvents[i];
      event.store.unsubscribe(event.fn);
    }
    for (i = this._collector.components.length - 1; i >= 0; i--)
      this._collector.components[i].destroy();
    if (this.mounted = !1, this.destroyed = !0, this._parent) {
      const index = this._parent._collector.components.indexOf(this);
      ~index && this._parent._collector.components.splice(index, 1), this._parent = null;
    }
    for (i = this._collector.refs.length - 1; i >= 0; i--)
      this._collector.refs[i].fn(null), this._collector.refs.splice(i, 1);
    let base = Array.isArray(this.base) ? this.base : [this.base];
    for (i = 0; i < base.length; i++)
      base[i] && base[i].parentNode && base[i].parentNode.removeChild(base[i]);
    this.base = base = null, this.props = null, this.state = null, this.store = null, this.refs = null;
  }
}
export {
  Component as C,
  Props as P,
  extend as e,
  h,
  render as r
};
//# sourceMappingURL=Component-bHEkOV3l.js.map
