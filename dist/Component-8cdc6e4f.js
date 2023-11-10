function N(t, e) {
  const n = {};
  return n.vnode = !0, n.type = t, n.props = e || {}, n.children = [].concat.apply([], [].slice.call(arguments, 2)), n.isInstance = t && t.template && typeof t.template == "function", n.isComponent = typeof t == "function" && t.prototype && typeof t.prototype.render == "function", n.isStateless = typeof t == "function" && !n.isComponent, n.isDom = typeof t == "string", n;
}
N.f = (t) => t.children;
function b(t, e) {
  for (const n in e)
    t[n] = e[n];
  return t;
}
function _() {
}
function R(t, e, n, s) {
  if (s)
    return { log: _, warn: _, error: _ };
  const o = [];
  t = t.toUpperCase(), o.push(`%c ${t} `);
  let r = "font-weight:bold;";
  return e && (r += `color:${e};`), n && (r += `background-color:${n}`), o.push(r), {
    log: console.log.bind(console, ...o),
    warn: console.warn.bind(console, ...o),
    error: console.error.bind(console, ...o)
  };
}
const w = ["nodes", "components", "refs", "domEvents", "storeEvents"];
class a {
  constructor() {
    this.data = {};
    for (let e = 0; e < w.length; e++)
      this.data[w[e]] = [];
  }
  append(e) {
    for (const n in e)
      this.data[n] = this.data[n].concat(e[n]);
  }
  set(e) {
    for (const n in e)
      this.data[n] = e[n];
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
const f = (t, e) => t.substr(0, e.length) === e, D = (t) => (e, n) => n.classList.toggle(t, e || !1), y = (t = "textContent", e) => (n, s) => {
  if (e && t !== (t = t.replace(/^xlink:?/, "")))
    s.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), n);
  else {
    if (n === void 0) {
      s.removeAttribute(t);
      return;
    }
    g = n ?? "", e || (s[t] = g), (e || m.has(t) || f(t, "data-")) && s.setAttribute(t, g);
  }
};
function k(t, e, n, s, o) {
  if (n !== void 0 && !(e === "__self" || e === "__source")) {
    e === "className" && (e = "class");
    for (let r = 0; r < p.length; r++)
      if (f(e, p[r])) {
        const i = p[r].length;
        e[i] && e[i] !== ":" && (e = p[r] + ":" + e[i].toLowerCase() + e.substr(i + 1, e.length));
        break;
      }
    if (e !== "ref") {
      if (f(e, "event-")) {
        const r = e.toLowerCase().substring(6);
        s.append({ domEvents: [{ el: t, evt: r, fn: n }] });
      } else if (e === "store") {
        const r = Array.isArray(n) ? n : [n], i = [];
        for (let l = 0, c = r.length; l < c; l++) {
          const h = Array.isArray(r[l]) ? r[l] : [r[l]], E = h[0], A = h[1], L = h[2] !== void 0 ? h[2] : !0;
          E && i.push({ store: E, fn: A, init: L, el: t });
        }
        s.append({ storeEvents: i });
      } else if (f(e, "store-class-")) {
        const r = e.substring(12), i = D(r);
        s.append({ storeEvents: [{ store: n, init: !0, fn: i, el: t }] });
      } else if (f(e, "store-")) {
        let r = e.substring(6);
        r === "text" && (r = "textContent");
        const i = y(r, o);
        s.append({ storeEvents: [{ store: n, init: !0, fn: i, el: t }] });
      } else if (!(typeof n == "function" && f(e, "on")))
        if (e === "class" && !o)
          t.className = n || "";
        else if (e === "style")
          typeof n == "object" ? b(t.style, n) : typeof n == "string" && (t.style.cssText = n);
        else if (e !== "list" && e !== "type" && !o && e in t)
          try {
            y(e, o)(n, t);
          } catch {
          }
        else
          typeof n != "object" && typeof n != "function" && y(e, o)(n, t);
    }
  }
}
function x(t) {
  return Array.isArray(t) ? t : [t];
}
function d(t, e) {
  if (Array.isArray(t))
    return M(t, e);
  if (t instanceof window.Element)
    return $(t);
  if (t === null || typeof t != "object" || !t.vnode)
    return B(t);
  const n = b(
    b({}, t.props),
    { children: [].concat.apply([], t.children || []) }
  );
  if (t.isDom)
    return T(t, n, e);
  if (t.isInstance)
    return C(t, n, e, !0);
  if (t.isStateless)
    return P(t, n, e);
  if (t.isComponent)
    return C(t, n, e);
}
function M(t, e) {
  t = x(t);
  const n = new a();
  for (let s = 0; s < t.length; s++)
    n.append(d(t[s], e));
  return n.get();
}
function B(t) {
  const e = new a();
  return t == null || t === !1 || e.append({ nodes: document.createTextNode(t + "") }), e.get();
}
function T(t, e, n) {
  const s = new a();
  let o = [];
  t.type === "svg" && (n = !0);
  for (let i = 0; i < e.children.length; i++) {
    const l = d(e.children[i], n);
    l.nodes && (o = o.concat(l.nodes), s.append({
      components: l.components,
      refs: l.refs,
      domEvents: l.domEvents,
      storeEvents: l.storeEvents
    }));
  }
  const r = n ? document.createElementNS("http://www.w3.org/2000/svg", t.type) : document.createElement(t.type);
  for (const i in t.props)
    k(r, i, t.props[i], s, n);
  for (let i = 0; i < o.length; i++)
    r.appendChild(o[i]);
  return e.ref && s.append({ refs: { ref: r, fn: e.ref } }), s.append({ nodes: r }), s.get();
}
function $(t) {
  const e = new a();
  return e.append({ nodes: t }), e.get();
}
function P(t, e, n) {
  const s = new a(), o = t.type(e);
  return s.append(d(o, n)), s.get();
}
function C(t, e, n, s = !1) {
  const o = new a(), r = s ? t.type : new t.type(e);
  s && (e = r.props), r.beforeRender(e);
  const i = r.template(e, r.state || {}) || e.children;
  e.ref && o.append({ refs: { ref: r, fn: e.ref } }), o.append(d(i, n));
  const l = o.data.nodes;
  r.base = l.length > 1 ? l : l[0];
  for (const c in o.data)
    c !== "nodes" && (r._collector[c] || (r._collector[c] = []), r._collector[c] = r._collector[c].concat(o.data[c]));
  o.set({
    components: [r],
    refs: [],
    domEvents: [],
    storeEvents: []
  });
  for (let c = 0; c < r._collector.components.length; c++)
    r._collector.components[c]._parent = r;
  return o.get();
}
function u(t, e, n) {
  const s = t._collector && t._collector.components;
  if (n && e(t), s)
    for (let o = 0; o < s.length; o++)
      u(s[o], e);
  n || e(t);
}
function H(t) {
  for (let e = 0; e < t._collector.refs.length; e++)
    t._collector.refs[e].fn(t._collector.refs[e].ref), t._collector.refs[e].ref = null;
}
function I(t) {
  for (let e = 0; e < t._collector.storeEvents.length; e++) {
    const n = t._collector.storeEvents[e], s = n.fn;
    n.fn = function(o) {
      s(o, n.el);
    }, n.store.subscribe(n.fn), n.init && n.fn(n.store.current);
  }
}
function U(t) {
  t.test && console.log("call dom listeners", t._collector.domEvents);
  for (let e = 0; e < t._collector.domEvents.length; e++) {
    const n = t._collector.domEvents[e];
    n.el.addEventListener(n.evt, n.fn);
  }
}
function W(t) {
  u(t, H);
}
function Y(t) {
  u(t, U), u(t, I);
}
const j = /* @__PURE__ */ new Set([
  "g",
  "svg",
  "defs"
]);
function q(t, e = document.body, n) {
  let s = 0;
  const o = d(t, e && j.has(e.tagName));
  let r = { _collector: o };
  if (W(r), u(r, function(i) {
    i.afterRender && i.afterRender(i.props);
  }), typeof e == "function") {
    const i = o.nodes.length < 2 ? o.nodes[0] : o.nodes;
    e(i);
  } else if (e instanceof window.Element)
    for (s = 0; s < o.nodes.length; s++)
      e.appendChild(o.nodes[s]);
  else if (typeof e == "object" && e !== null && e.insertBefore)
    for (s = 0; s < o.nodes.length; s++)
      e.insertBefore.parentNode.insertBefore(o.nodes[s], e.insertBefore);
  if ((!n || n.mounted) && (Y(r), u(r, function(i) {
    i.mounted = !0, i.afterMount && i.afterMount(i.props);
  })), n && n._collector) {
    const i = n._collector;
    for (s = 0; s < o.components.length; s++)
      o.components[s]._parent = n;
    i.refs && (i.refs = i.refs.concat(o.refs)), i.components && (i.components = i.components.concat(o.components)), i.domEvents && (i.domEvents = i.domEvents.concat(o.domEvents)), i.storeEvents && (i.storeEvents = i.storeEvents.concat(o.storeEvents));
  }
  return r = void 0, o;
}
class v {
  constructor(e = {}) {
    this._parent = null, this._collector = { refs: [], components: [], domEvents: [], storeEvents: [] }, this._storeListeners = [], this.refs = {}, this.state = {}, this.store = {}, this.props = e || {}, this.base = null, this.mounted = !1, this.destroyed = !1;
    const n = e.name || this.constructor.name || "Component", { log: s, warn: o, error: r } = R(
      n,
      "white",
      "#000",
      e.disableLog
    );
    this.log = s, this.warn = o, this.error = r;
  }
  storeSubscribe(e, n, s, o = !0) {
    e.subscribe(n, s), this._storeListeners.push([e, n, s]), o && n.call(s, e.current);
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
    const n = this;
    return function(o) {
      n.refs[e] = o;
    };
  }
  // Quickly add ref to an array of component refs
  refArray(e, n = !1) {
    const s = this.refs[e] || (this.refs[e] = []);
    let o = s.length, r, i;
    return n && (r = this.refs.__pools || (this.refs.__pools = {}), i = r[e] || (r[e] = []), i.length && (o = i.pop())), s[o] = null, function(c) {
      s[o] = c, n && i.push(o);
    };
  }
  // Quickly add ref to a hashmap of component refs
  refMap(e, n) {
    const s = this.refs[n] || (this.refs[n] = /* @__PURE__ */ new Map());
    return function(r) {
      r ? s.set(e, r) : s.delete(e);
    };
  }
  // Render a vnode or array of vnodes
  // and register the rendered content as "child" of this component.
  // Use this method when you want to add content to the component
  // after the initial rendering. This ensures new items will be
  // correctly unmount when the component is destroyed.
  render(e, n) {
    return q(e, n, this);
  }
  // Destroy the component and its children components.
  // - This also removes component props and de-reference it from its parent.
  // - Callback refs inside the component tree will be re-called with `null`
  // - Set component.mounted to false
  destroy() {
    let e = 0;
    for (this.beforeDestroy(this.props), e = this._collector.domEvents.length - 1; e >= 0; e--) {
      const s = this._collector.domEvents[e];
      s.el.removeEventListener(s.evt, s.fn);
    }
    for (e = this._collector.storeEvents.length - 1; e >= 0; e--) {
      const s = this._collector.storeEvents[e];
      s.store.unsubscribe(s.fn);
    }
    for (e = this._storeListeners.length - 1; e >= 0; e--) {
      const s = this._storeListeners[e];
      s[0].unsubscribe(s[1], s[2]);
    }
    for (e = this._collector.components.length - 1; e >= 0; e--)
      this._collector.components[e].destroy();
    if (this.mounted = !1, this.destroyed = !0, this._parent) {
      const s = this._parent._collector.components.indexOf(this);
      ~s && this._parent._collector.components.splice(s, 1), this._parent = null;
    }
    for (e = this._collector.refs.length - 1; e >= 0; e--)
      this._collector.refs[e].fn(null), this._collector.refs.splice(e, 1);
    let n = Array.isArray(this.base) ? this.base : [this.base];
    for (e = 0; e < n.length; e++)
      n[e] && n[e].parentNode && n[e].parentNode.removeChild(n[e]);
    this.base = n = null, this.props = null, this.state = null, this.store = null, this.refs = null, this._storeListeners = null;
  }
}
export {
  v as C,
  b as e,
  N as h,
  _ as n,
  q as r
};
//# sourceMappingURL=Component-8cdc6e4f.js.map
