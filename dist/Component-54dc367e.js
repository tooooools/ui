function N(t, e) {
  const s = {};
  return s.vnode = !0, s.type = t, s.props = e || {}, s.children = [].concat.apply([], [].slice.call(arguments, 2)), s.isInstance = t && t.template && typeof t.template == "function", s.isComponent = typeof t == "function" && t.prototype && typeof t.prototype.render == "function", s.isStateless = typeof t == "function" && !s.isComponent, s.isDom = typeof t == "string", s;
}
N.f = (t) => t.children;
function E(t, e) {
  for (const s in e)
    t[s] = e[s];
  return t;
}
function g() {
}
function m(t, e, s, n) {
  if (n)
    return { log: g, warn: g, error: g };
  const r = [];
  t = t.toUpperCase(), r.push(`%c ${t} `);
  let o = "font-weight:bold;";
  return e && (o += `color:${e};`), s && (o += `background-color:${s}`), r.push(o), {
    log: console.log.bind(console, ...r),
    warn: console.warn.bind(console, ...r),
    error: console.error.bind(console, ...r)
  };
}
const w = ["nodes", "components", "refs", "domEvents", "storeEvents"];
class u {
  constructor() {
    this.data = {};
    for (let e = 0; e < w.length; e++)
      this.data[w[e]] = [];
  }
  append(e) {
    for (const s in e)
      this.data[s] = this.data[s].concat(e[s]);
  }
  set(e) {
    for (const s in e)
      this.data[s] = e[s];
  }
  get() {
    return this.data;
  }
}
const p = [
  "xlink",
  "xmlns",
  "xml"
], R = /* @__PURE__ */ new Set([
  "placeholder",
  "autoplay",
  "muted",
  "for",
  "webkit-playsinline",
  "playsinline",
  "selected"
]);
let y;
const f = (t, e) => t.substr(0, e.length) === e, D = (t) => (e, s) => s.classList.toggle(t, e || !1), _ = (t = "textContent", e) => (s, n) => {
  if (e && t !== (t = t.replace(/^xlink:?/, "")))
    n.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), s);
  else {
    if (s === void 0) {
      n.removeAttribute(t);
      return;
    }
    y = s ?? "", e || (n[t] = y), (e || R.has(t) || f(t, "data-")) && n.setAttribute(t, y);
  }
};
function k(t, e, s, n, r) {
  if (s !== void 0 && !(e === "__self" || e === "__source")) {
    e === "className" && (e = "class");
    for (let o = 0; o < p.length; o++)
      if (f(e, p[o])) {
        const i = p[o].length;
        e[i] && e[i] !== ":" && (e = p[o] + ":" + e[i].toLowerCase() + e.substr(i + 1, e.length));
        break;
      }
    if (e !== "ref")
      if (f(e, "event-")) {
        const o = e.toLowerCase().substring(6);
        n.append({ domEvents: [{ el: t, evt: o, fn: s }] });
      } else if (e === "store") {
        const o = Array.isArray(s) ? s : [s], i = [];
        for (let c = 0, l = o.length; c < l; c++) {
          const h = Array.isArray(o[c]) ? o[c] : [o[c]], b = h[0], A = h[1], L = h[2] !== void 0 ? h[2] : !0;
          b && i.push({ store: b, fn: A, init: L, el: t });
        }
        n.append({ storeEvents: i });
      } else if (f(e, "store-class-")) {
        const o = e.substring(12), i = D(o);
        n.append({ storeEvents: [{ store: s, init: !0, fn: i, el: t }] });
      } else if (f(e, "store-") || String((s || {})._symbol) === "Symbol(signal)") {
        let o = f(e, "store-") ? e.substring(6) : e;
        o === "text" && (o = "textContent");
        const i = _(o, r);
        n.append({ storeEvents: [{ store: s, init: !0, fn: i, el: t }] });
      } else if (typeof s == "function" && f(e, "on")) {
        const o = e.toLowerCase();
        t[o] = s;
      } else if (e === "class" && !r)
        t.className = s || "";
      else if (e === "style")
        if (typeof s == "object")
          for (const o in s) {
            const i = (c) => {
              o.startsWith("--") ? t.style.setProperty(o, c) : t.style[o] = c;
            };
            String((s || [])[o]._symbol) === "Symbol(signal)" ? n.append({ storeEvents: [{ store: s[o], init: !0, fn: i, el: t }] }) : i(s);
          }
        else
          typeof s == "string" && (t.style.cssText = s);
      else if (e !== "list" && e !== "type" && !r && e in t)
        try {
          _(e, r)(s, t);
        } catch {
        }
      else
        typeof s != "object" && typeof s != "function" && _(e, r)(s, t);
  }
}
function x(t) {
  return Array.isArray(t) ? t : [t];
}
function d(t, e) {
  if (Array.isArray(t))
    return M(t, e);
  if (t instanceof window.Element)
    return B(t);
  if (t === null || typeof t != "object" || !t.vnode)
    return P(t);
  const s = E(
    E({}, t.props),
    { children: [].concat.apply([], t.children || []) }
  );
  if (t.isDom)
    return T(t, s, e);
  if (t.isInstance)
    return C(t, s, e, !0);
  if (t.isStateless)
    return W(t, s, e);
  if (t.isComponent)
    return C(t, s, e);
}
function M(t, e) {
  t = x(t);
  const s = new u();
  for (let n = 0; n < t.length; n++)
    s.append(d(t[n], e));
  return s.get();
}
function P(t) {
  const e = new u();
  return t == null || t === !1 || e.append({ nodes: document.createTextNode(t + "") }), e.get();
}
function T(t, e, s) {
  const n = new u();
  let r = [];
  t.type === "svg" && (s = !0);
  for (let i = 0; i < e.children.length; i++) {
    const c = d(e.children[i], s);
    c.nodes && (r = r.concat(c.nodes), n.append({
      components: c.components,
      refs: c.refs,
      domEvents: c.domEvents,
      storeEvents: c.storeEvents
    }));
  }
  const o = s ? document.createElementNS("http://www.w3.org/2000/svg", t.type) : document.createElement(t.type);
  for (const i in t.props)
    k(o, i, t.props[i], n, s);
  for (let i = 0; i < r.length; i++)
    o.appendChild(r[i]);
  return e.ref && n.append({ refs: { ref: o, fn: e.ref } }), n.append({ nodes: o }), n.get();
}
function B(t) {
  const e = new u();
  return e.append({ nodes: t }), e.get();
}
function W(t, e, s) {
  const n = new u(), r = t.type(e);
  return n.append(d(r, s)), n.get();
}
function C(t, e, s, n = !1) {
  const r = new u(), o = n ? t.type : new t.type(e);
  n && (e = o.props), o.beforeRender(e);
  const i = o.template(e, o.state || {}) || e.children;
  e.ref && r.append({ refs: { ref: o, fn: e.ref } }), r.append(d(i, s));
  const c = r.data.nodes;
  o.base = c.length > 1 ? c : c[0];
  for (const l in r.data)
    l !== "nodes" && (o._collector[l] || (o._collector[l] = []), o._collector[l] = o._collector[l].concat(r.data[l]));
  r.set({
    components: [o],
    refs: [],
    domEvents: [],
    storeEvents: []
  });
  for (let l = 0; l < o._collector.components.length; l++)
    o._collector.components[l]._parent = o;
  return r.get();
}
function a(t, e, s) {
  const n = t._collector && t._collector.components;
  if (s && e(t), n)
    for (let r = 0; r < n.length; r++)
      a(n[r], e);
  s || e(t);
}
function $(t) {
  for (let e = 0; e < t._collector.refs.length; e++)
    t._collector.refs[e].fn(t._collector.refs[e].ref), t._collector.refs[e].ref = null;
}
function S(t) {
  for (let e = 0; e < t._collector.storeEvents.length; e++) {
    const s = t._collector.storeEvents[e], n = s.fn;
    s.fn = function(r) {
      n(r, s.el);
    }, s.store.subscribe(s.fn), s.init && s.fn(s.store.current);
  }
}
function j(t) {
  t.test && console.log("call dom listeners", t._collector.domEvents);
  for (let e = 0; e < t._collector.domEvents.length; e++) {
    const s = t._collector.domEvents[e];
    s.el.addEventListener(s.evt, s.fn);
  }
}
function H(t) {
  a(t, $);
}
function I(t) {
  a(t, j), a(t, S);
}
const O = /* @__PURE__ */ new Set([
  "g",
  "svg",
  "defs"
]);
function U(t, e = document.body, s) {
  let n = 0;
  const r = d(t, e && O.has(e.tagName));
  let o = { _collector: r };
  if (H(o), a(o, function(i) {
    i.afterRender && i.afterRender(i.props);
  }), typeof e == "function") {
    const i = r.nodes.length < 2 ? r.nodes[0] : r.nodes;
    e(i);
  } else if (e instanceof window.Element)
    for (n = 0; n < r.nodes.length; n++)
      e.appendChild(r.nodes[n]);
  else if (typeof e == "object" && e !== null && e.insertBefore)
    for (n = 0; n < r.nodes.length; n++)
      e.insertBefore.parentNode.insertBefore(r.nodes[n], e.insertBefore);
  if ((!s || s.mounted) && (I(o), a(o, function(i) {
    i.mounted = !0, i.afterMount && i.afterMount(i.props);
  })), s && s._collector) {
    const i = s._collector;
    for (n = 0; n < r.components.length; n++)
      r.components[n]._parent = s;
    i.refs && (i.refs = i.refs.concat(r.refs)), i.components && (i.components = i.components.concat(r.components)), i.domEvents && (i.domEvents = i.domEvents.concat(r.domEvents)), i.storeEvents && (i.storeEvents = i.storeEvents.concat(r.storeEvents));
  }
  return o = void 0, r;
}
class Y {
  constructor(e = {}) {
    this._parent = null, this._collector = { refs: [], components: [], domEvents: [], storeEvents: [] }, this._storeListeners = [], this.refs = {}, this.state = {}, this.store = {}, this.props = e || {}, this.base = null, this.mounted = !1, this.destroyed = !1;
    const s = e.name || this.constructor.name || "Component", { log: n, warn: r, error: o } = m(
      s,
      "white",
      "#000",
      e.disableLog
    );
    this.log = n, this.warn = r, this.error = o;
  }
  get dataProps() {
    return Object.entries(this.props).filter(([e]) => e.startsWith("data-")).reduce((e, [s, n]) => ({ ...e, [s]: n }), {});
  }
  storeSubscribe(e, s, n, r = !0) {
    e.subscribe(s, n), this._storeListeners.push([e, s, n]), r && s.call(n, e.current);
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
  ref(e) {
    const s = this;
    return function(r) {
      s.refs[e] = r;
    };
  }
  // Quickly add ref to an array of component refs
  refArray(e, s = !1) {
    const n = this.refs[e] || (this.refs[e] = []);
    let r = n.length, o, i;
    return s && (o = this.refs.__pools || (this.refs.__pools = {}), i = o[e] || (o[e] = []), i.length && (r = i.pop())), n[r] = null, function(l) {
      n[r] = l, s && i.push(r);
    };
  }
  // Quickly add ref to a hashmap of component refs
  refMap(e, s) {
    const n = this.refs[s] || (this.refs[s] = /* @__PURE__ */ new Map());
    return function(o) {
      o ? n.set(e, o) : n.delete(e);
    };
  }
  // Render a vnode or array of vnodes
  // and register the rendered content as "child" of this component.
  // Use this method when you want to add content to the component
  // after the initial rendering. This ensures new items will be
  // correctly unmount when the component is destroyed.
  render(e, s) {
    return U(e, s, this);
  }
  // Destroy the component and its children components.
  // - This also removes component props and de-reference it from its parent.
  // - Callback refs inside the component tree will be re-called with `null`
  // - Set component.mounted to false
  destroy() {
    let e = 0;
    for (this.beforeDestroy(this.props), e = this._collector.domEvents.length - 1; e >= 0; e--) {
      const n = this._collector.domEvents[e];
      n.el.removeEventListener(n.evt, n.fn);
    }
    for (e = this._collector.storeEvents.length - 1; e >= 0; e--) {
      const n = this._collector.storeEvents[e];
      n.store.unsubscribe(n.fn);
    }
    for (e = this._storeListeners.length - 1; e >= 0; e--) {
      const n = this._storeListeners[e];
      n[0].unsubscribe(n[1], n[2]);
    }
    for (e = this._collector.components.length - 1; e >= 0; e--)
      this._collector.components[e].destroy();
    if (this.mounted = !1, this.destroyed = !0, this._parent) {
      const n = this._parent._collector.components.indexOf(this);
      ~n && this._parent._collector.components.splice(n, 1), this._parent = null;
    }
    for (e = this._collector.refs.length - 1; e >= 0; e--)
      this._collector.refs[e].fn(null), this._collector.refs.splice(e, 1);
    let s = Array.isArray(this.base) ? this.base : [this.base];
    for (e = 0; e < s.length; e++)
      s[e] && s[e].parentNode && s[e].parentNode.removeChild(s[e]);
    this.base = s = null, this.props = null, this.state = null, this.store = null, this.refs = null, this._storeListeners = null;
  }
}
export {
  Y as C,
  E as e,
  N as h,
  g as n,
  U as r
};
//# sourceMappingURL=Component-54dc367e.js.map
