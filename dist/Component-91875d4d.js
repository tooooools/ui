function N(e, t) {
  const n = {};
  return n.vnode = !0, n.type = e, n.props = t || {}, n.children = [].concat.apply([], [].slice.call(arguments, 2)), n.isInstance = e && e.template && typeof e.template == "function", n.isComponent = typeof e == "function" && e.prototype && typeof e.prototype.render == "function", n.isStateless = typeof e == "function" && !n.isComponent, n.isDom = typeof e == "string", n;
}
N.f = (e) => e.children;
function b(e, t) {
  for (const n in t)
    e[n] = t[n];
  return e;
}
function _() {
}
function R(e, t, n, s) {
  if (s)
    return { log: _, warn: _, error: _ };
  const o = [];
  e = e.toUpperCase(), o.push(`%c ${e} `);
  let r = "font-weight:bold;";
  return t && (r += `color:${t};`), n && (r += `background-color:${n}`), o.push(r), {
    log: console.log.bind(console, ...o),
    warn: console.warn.bind(console, ...o),
    error: console.error.bind(console, ...o)
  };
}
const w = ["nodes", "components", "refs", "domEvents", "storeEvents"];
class u {
  constructor() {
    this.data = {};
    for (let t = 0; t < w.length; t++)
      this.data[w[t]] = [];
  }
  append(t) {
    for (const n in t)
      this.data[n] = this.data[n].concat(t[n]);
  }
  set(t) {
    for (const n in t)
      this.data[n] = t[n];
  }
  get() {
    return this.data;
  }
}
const p = [
  "xlink",
  "xmlns",
  "xml"
], m = /* @__PURE__ */ new Set([
  "placeholder",
  "autoplay",
  "muted",
  "for",
  "webkit-playsinline",
  "playsinline",
  "selected"
]);
let g;
const f = (e, t) => e.substr(0, t.length) === t, D = (e) => (t, n) => n.classList.toggle(e, t || !1), y = (e = "textContent", t) => (n, s) => {
  if (t && e !== (e = e.replace(/^xlink:?/, "")))
    s.setAttributeNS("http://www.w3.org/1999/xlink", e.toLowerCase(), n);
  else {
    if (n === void 0) {
      s.removeAttribute(e);
      return;
    }
    g = n ?? "", t || (s[e] = g), (t || m.has(e) || f(e, "data-")) && s.setAttribute(e, g);
  }
};
function k(e, t, n, s, o) {
  if (n !== void 0 && !(t === "__self" || t === "__source")) {
    t === "className" && (t = "class");
    for (let r = 0; r < p.length; r++)
      if (f(t, p[r])) {
        const i = p[r].length;
        t[i] && t[i] !== ":" && (t = p[r] + ":" + t[i].toLowerCase() + t.substr(i + 1, t.length));
        break;
      }
    if (t !== "ref") {
      if (f(t, "event-")) {
        const r = t.toLowerCase().substring(6);
        s.append({ domEvents: [{ el: e, evt: r, fn: n }] });
      } else if (t === "store") {
        const r = Array.isArray(n) ? n : [n], i = [];
        for (let c = 0, l = r.length; c < l; c++) {
          const h = Array.isArray(r[c]) ? r[c] : [r[c]], E = h[0], A = h[1], L = h[2] !== void 0 ? h[2] : !0;
          E && i.push({ store: E, fn: A, init: L, el: e });
        }
        s.append({ storeEvents: i });
      } else if (f(t, "store-class-")) {
        const r = t.substring(12), i = D(r);
        s.append({ storeEvents: [{ store: n, init: !0, fn: i, el: e }] });
      } else if (f(t, "store-")) {
        let r = t.substring(6);
        r === "text" && (r = "textContent");
        const i = y(r, o);
        s.append({ storeEvents: [{ store: n, init: !0, fn: i, el: e }] });
      } else if (!(typeof n == "function" && f(t, "on")))
        if (t === "class" && !o)
          e.className = n || "";
        else if (t === "style")
          typeof n == "object" ? b(e.style, n) : typeof n == "string" && (e.style.cssText = n);
        else if (t !== "list" && t !== "type" && !o && t in e)
          try {
            y(t, o)(n, e);
          } catch {
          }
        else
          typeof n != "object" && typeof n != "function" && y(t, o)(n, e);
    }
  }
}
function x(e) {
  return Array.isArray(e) ? e : [e];
}
function d(e, t) {
  if (Array.isArray(e))
    return M(e, t);
  if (e instanceof window.Element)
    return P(e);
  if (e === null || typeof e != "object" || !e.vnode)
    return T(e);
  const n = b(
    b({}, e.props),
    { children: [].concat.apply([], e.children || []) }
  );
  if (e.isDom)
    return $(e, n, t);
  if (e.isInstance)
    return C(e, n, t, !0);
  if (e.isStateless)
    return H(e, n, t);
  if (e.isComponent)
    return C(e, n, t);
}
function M(e, t) {
  e = x(e);
  const n = new u();
  for (let s = 0; s < e.length; s++)
    n.append(d(e[s], t));
  return n.get();
}
function T(e) {
  const t = new u();
  return e == null || e === !1 || t.append({ nodes: document.createTextNode(e + "") }), t.get();
}
function $(e, t, n) {
  const s = new u();
  let o = [];
  e.type === "svg" && (n = !0);
  for (let i = 0; i < t.children.length; i++) {
    const c = d(t.children[i], n);
    c.nodes && (o = o.concat(c.nodes), s.append({
      components: c.components,
      refs: c.refs,
      domEvents: c.domEvents,
      storeEvents: c.storeEvents
    }));
  }
  const r = n ? document.createElementNS("http://www.w3.org/2000/svg", e.type) : document.createElement(e.type);
  for (const i in e.props)
    k(r, i, e.props[i], s, n);
  for (let i = 0; i < o.length; i++)
    r.appendChild(o[i]);
  return t.ref && s.append({ refs: { ref: r, fn: t.ref } }), s.append({ nodes: r }), s.get();
}
function P(e) {
  const t = new u();
  return t.append({ nodes: e }), t.get();
}
function H(e, t, n) {
  const s = new u(), o = e.type(t);
  return s.append(d(o, n)), s.get();
}
function C(e, t, n, s = !1) {
  const o = new u(), r = s ? e.type : new e.type(t);
  s && (t = r.props), r.beforeRender(t);
  const i = r.template(t, r.state || {});
  t.ref && o.append({ refs: { ref: r, fn: t.ref } }), o.append(d(i, n));
  const c = o.data.nodes;
  r.base = c.length > 1 ? c : c[0];
  for (const l in o.data)
    l !== "nodes" && (r._collector[l] || (r._collector[l] = []), r._collector[l] = r._collector[l].concat(o.data[l]));
  o.set({
    components: [r],
    refs: [],
    domEvents: [],
    storeEvents: []
  });
  for (let l = 0; l < r._collector.components.length; l++)
    r._collector.components[l]._parent = r;
  return o.get();
}
function a(e, t, n) {
  const s = e._collector && e._collector.components;
  if (n && t(e), s)
    for (let o = 0; o < s.length; o++)
      a(s[o], t);
  n || t(e);
}
function I(e) {
  for (let t = 0; t < e._collector.refs.length; t++)
    e._collector.refs[t].fn(e._collector.refs[t].ref), e._collector.refs[t].ref = null;
}
function U(e) {
  for (let t = 0; t < e._collector.storeEvents.length; t++) {
    const n = e._collector.storeEvents[t], s = n.fn;
    n.fn = function(o) {
      s(o, n.el);
    }, n.store.subscribe(n.fn), n.init && n.fn(n.store.current);
  }
}
function W(e) {
  e.test && console.log("call dom listeners", e._collector.domEvents);
  for (let t = 0; t < e._collector.domEvents.length; t++) {
    const n = e._collector.domEvents[t];
    n.el.addEventListener(n.evt, n.fn);
  }
}
function Y(e) {
  a(e, I);
}
function q(e) {
  a(e, W), a(e, U);
}
const v = /* @__PURE__ */ new Set([
  "g",
  "svg",
  "defs"
]);
function z(e, t = document.body, n) {
  let s = 0;
  const o = d(e, t && v.has(t.tagName));
  let r = { _collector: o };
  if (Y(r), a(r, function(i) {
    i.afterRender && i.afterRender(i.props);
  }), typeof t == "function") {
    const i = o.nodes.length < 2 ? o.nodes[0] : o.nodes;
    t(i);
  } else if (t)
    for (s = 0; s < o.nodes.length; s++)
      t.appendChild(o.nodes[s]);
  if ((!n || n.mounted) && (q(r), a(r, function(i) {
    i.mounted = !0, i.afterMount && i.afterMount(i.props);
  })), n && n._collector) {
    const i = n._collector;
    for (s = 0; s < o.components.length; s++)
      o.components[s]._parent = n;
    i.refs && (i.refs = i.refs.concat(o.refs)), i.components && (i.components = i.components.concat(o.components)), i.domEvents && (i.domEvents = i.domEvents.concat(o.domEvents)), i.storeEvents && (i.storeEvents = i.storeEvents.concat(o.storeEvents));
  }
  return r = void 0, o;
}
class B {
  constructor(t = {}) {
    this._parent = null, this._collector = { refs: [], components: [], domEvents: [], storeEvents: [] }, this._storeListeners = [], this.refs = {}, this.state = {}, this.store = {}, this.props = t || {}, this.base = null, this.mounted = !1, this.destroyed = !1;
    const n = t.name || this.constructor.name || "Component", { log: s, warn: o, error: r } = R(
      n,
      "white",
      "#000",
      t.disableLog
    );
    this.log = s, this.warn = o, this.error = r;
  }
  storeSubscribe(t, n, s, o = !0) {
    t.subscribe(n, s), this._storeListeners.push([t, n, s]), o && n.call(s, t.current);
  }
  // `component.template` will be called during the component
  // initial rendering to create the `component.base` node
  // You can return real dom or jsx
  template() {
  }
  // `component.beforeRender` will be called by `render`
  // just before the component template rendering
  beforeRender() {
  }
  // `component.afterRender` will be called by `render`
  // when all the rendered dom tree is rendered
  afterRender() {
  }
  // `component.afterMount` will be called by `render`
  // when all the rendered dom tree is mounted
  afterMount() {
  }
  // `component.beforeDestroy` will be called
  // when the component or one of its ancestors is destroyed
  beforeDestroy() {
  }
  // Quickly add ref to component
  ref(t) {
    const n = this;
    return function(o) {
      n.refs[t] = o;
    };
  }
  // Quickly add ref to an array of component refs
  refArray(t, n = !1) {
    const s = this.refs[t] || (this.refs[t] = []);
    let o = s.length, r, i;
    return n && (r = this.refs.__pools || (this.refs.__pools = {}), i = r[t] || (r[t] = []), i.length && (o = i.pop())), s[o] = null, function(l) {
      s[o] = l, n && i.push(o);
    };
  }
  // Quickly add ref to a hashmap of component refs
  refMap(t, n) {
    const s = this.refs[n] || (this.refs[n] = /* @__PURE__ */ new Map());
    return function(r) {
      r ? s.set(t, r) : s.delete(t);
    };
  }
  // Render a vnode or array of vnodes
  // and register the rendered content as "child" of this component.
  // Use this method when you want to add content to the component
  // after the initial rendering. This ensures new items will be
  // correctly unmount when the component is destroyed.
  render(t, n) {
    return z(t, n, this);
  }
  // Destroy the component and its children components.
  // - This also removes component props and de-reference it from its parent.
  // - Callback refs inside the component tree will be re-called with `null`
  // - Set component.mounted to false
  destroy() {
    let t = 0;
    for (this.beforeDestroy(this.props), t = this._collector.domEvents.length - 1; t >= 0; t--) {
      const s = this._collector.domEvents[t];
      s.el.removeEventListener(s.evt, s.fn);
    }
    for (t = this._collector.storeEvents.length - 1; t >= 0; t--) {
      const s = this._collector.storeEvents[t];
      s.store.unsubscribe(s.fn);
    }
    for (t = this._storeListeners.length - 1; t >= 0; t--) {
      const s = this._storeListeners[t];
      s[0].unsubscribe(s[1], s[2]);
    }
    for (t = this._collector.components.length - 1; t >= 0; t--)
      this._collector.components[t].destroy();
    if (this.mounted = !1, this.destroyed = !0, this._parent) {
      const s = this._parent._collector.components.indexOf(this);
      ~s && this._parent._collector.components.splice(s, 1), this._parent = null;
    }
    for (t = this._collector.refs.length - 1; t >= 0; t--)
      this._collector.refs[t].fn(null), this._collector.refs.splice(t, 1);
    let n = Array.isArray(this.base) ? this.base : [this.base];
    for (t = 0; t < n.length; t++)
      n[t] && n[t].parentNode && n[t].parentNode.removeChild(n[t]);
    this.base = n = null, this.props = null, this.state = null, this.store = null, this.refs = null, this._storeListeners = null;
  }
}
export {
  B as C,
  b as e,
  N as h,
  _ as n,
  z as r
};
