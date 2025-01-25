function D(s, t) {
  const e = {};
  return e.vnode = !0, e.type = s, e.props = t || {}, e.children = [].concat.apply([], [].slice.call(arguments, 2)), e.isInstance = s && s.template && typeof s.template == "function", e.isComponent = typeof s == "function" && s.prototype && typeof s.prototype.render == "function", e.isStateless = typeof s == "function" && !e.isComponent, e.isDom = typeof s == "string", e;
}
D.f = (s) => s.children;
function w(s, t) {
  for (const e in t)
    s[e] = t[e];
  return s;
}
function y() {
}
function m(s, t, e, n) {
  if (n)
    return { log: y, warn: y, error: y };
  const i = [];
  s = s.toUpperCase(), i.push(`%c ${s} `);
  let o = "font-weight:bold;";
  return t && (o += `color:${t};`), e && (o += `background-color:${e}`), i.push(o), {
    log: console.log.bind(console, ...i),
    warn: console.warn.bind(console, ...i),
    error: console.error.bind(console, ...i)
  };
}
const A = ["nodes", "components", "refs", "domEvents", "storeEvents"];
class d {
  constructor() {
    this.data = {};
    for (let t = 0; t < A.length; t++)
      this.data[A[t]] = [];
  }
  append(t) {
    for (const e in t)
      this.data[e] = this.data[e].concat(t[e]);
  }
  set(t) {
    for (const e in t)
      this.data[e] = t[e];
  }
  get() {
    return this.data;
  }
}
const p = [
  "xlink",
  "xmlns",
  "xml"
], x = /* @__PURE__ */ new Set([
  "placeholder",
  "autoplay",
  "muted",
  "for",
  "webkit-playsinline",
  "playsinline",
  "selected"
]), g = (s) => s && String(s._symbol) === "Symbol(signal)";
let _;
const l = (s, t) => s.substr(0, t.length) === t, C = (s) => (t, e) => e.classList.toggle(s, t || !1), b = (s = "textContent", t) => (e, n) => {
  if (t && s !== (s = s.replace(/^xlink:?/, "")))
    n.setAttributeNS("http://www.w3.org/1999/xlink", s.toLowerCase(), e);
  else {
    if (e === void 0) {
      n.removeAttribute(s);
      return;
    }
    _ = e ?? "", t || (n[s] = _), (t || x.has(s) || l(s, "data-")) && n.setAttribute(s, _);
  }
};
function M(s, t, e, n, i) {
  if (e !== void 0 && !(t === "__self" || t === "__source")) {
    t === "className" && (t = "class");
    for (let o = 0; o < p.length; o++)
      if (l(t, p[o])) {
        const r = p[o].length;
        t[r] && t[r] !== ":" && (t = p[o] + ":" + t[r].toLowerCase() + t.substr(r + 1, t.length));
        break;
      }
    if (t !== "ref")
      if (l(t, "event-")) {
        const o = t.toLowerCase().substring(6);
        n.append({ domEvents: [{ el: s, evt: o, fn: e }] });
      } else if (t === "store") {
        const o = Array.isArray(e) ? e : [e], r = [];
        for (let c = 0, f = o.length; c < f; c++) {
          const h = Array.isArray(o[c]) ? o[c] : [o[c]], E = h[0], R = h[1], k = h[2] !== void 0 ? h[2] : !0;
          E && r.push({ store: E, fn: R, init: k, el: s });
        }
        n.append({ storeEvents: r });
      } else if (l(t, "store-class-")) {
        const o = t.substring(12), r = C(o);
        n.append({ storeEvents: [{ store: e, init: !0, fn: r, el: s }] });
      } else if (l(t, "store-") || g(e)) {
        let o = l(t, "store-") ? t.substring(6) : t;
        o === "text" && (o = "textContent");
        const r = b(o, i);
        n.append({ storeEvents: [{ store: e, init: !0, fn: r, el: s }] });
      } else if (typeof e == "function" && l(t, "on")) {
        const o = t.toLowerCase();
        s[o] = e;
      } else if (t === "class") {
        if (typeof e == "string" && (i ? s.setAttribute("class", e || "") : s.className = e || ""), typeof e == "object")
          for (const o in e) {
            const r = e[o];
            if (typeof r == "string" && s.classList.add(...r.split(" ")), typeof e == "object") {
              for (const c in r)
                if (typeof r[c] == "boolean" && s.classList.toggle(c, r[c]), g(r[c])) {
                  const f = C(c);
                  n.append({ storeEvents: [{ store: r[c], init: !0, fn: f, el: s }] });
                }
            }
          }
      } else if (t === "style")
        if (typeof e == "object")
          for (const o in e) {
            const r = (c) => {
              o.startsWith("--") ? s.style.setProperty(o, c) : s.style[o] = c;
            };
            g((e ?? [])[o]) ? n.append({ storeEvents: [{ store: e[o], init: !0, fn: r, el: s }] }) : r(e[o]);
          }
        else
          typeof e == "string" && (s.style.cssText = e);
      else if (t !== "list" && t !== "type" && !i && t in s)
        try {
          b(t, i)(e, s);
        } catch {
        }
      else
        typeof e != "object" && typeof e != "function" && b(t, i)(e, s);
  }
}
function P(s) {
  return Array.isArray(s) ? s : [s];
}
function u(s, t) {
  if (Array.isArray(s))
    return T(s, t);
  if (s instanceof window.Element)
    return W(s);
  if (s === null || typeof s != "object" || !s.vnode)
    return B(s);
  const e = w(
    w({}, s.props),
    { children: [].concat.apply([], s.children || []) }
  );
  if (s.isDom)
    return j(s, e, t);
  if (s.isInstance)
    return L(s, e, t, !0);
  if (s.isStateless)
    return $(s, e, t);
  if (s.isComponent)
    return L(s, e, t);
}
function T(s, t) {
  s = P(s);
  const e = new d();
  for (let n = 0; n < s.length; n++)
    e.append(u(s[n], t));
  return e.get();
}
function B(s) {
  const t = new d();
  return s == null || s === !1 || t.append({ nodes: document.createTextNode(s + "") }), t.get();
}
function j(s, t, e) {
  const n = new d();
  let i = [];
  s.type === "svg" && (e = !0);
  for (let r = 0; r < t.children.length; r++) {
    const c = u(t.children[r], e);
    c.nodes && (i = i.concat(c.nodes), n.append({
      components: c.components,
      refs: c.refs,
      domEvents: c.domEvents,
      storeEvents: c.storeEvents
    }));
  }
  const o = e ? document.createElementNS("http://www.w3.org/2000/svg", s.type) : document.createElement(s.type);
  for (const r in s.props)
    M(o, r, s.props[r], n, e);
  for (let r = 0; r < i.length; r++)
    o.appendChild(i[r]);
  return t.ref && n.append({ refs: { ref: o, fn: t.ref } }), n.append({ nodes: o }), n.get();
}
function W(s) {
  const t = new d();
  return t.append({ nodes: s }), t.get();
}
function $(s, t, e) {
  const n = new d(), i = s.type(t);
  return n.append(u(i, e)), n.get();
}
function L(s, t, e, n = !1) {
  const i = new d(), o = n ? s.type : new s.type(t);
  n && (t = o.props), o.beforeRender(t);
  const r = o.template(t, o.state || {}) || t.children;
  t.ref && i.append({ refs: { ref: o, fn: t.ref } }), i.append(u(r, e));
  const c = i.data.nodes;
  o.base = c.length > 1 ? c : c[0];
  for (const f in i.data)
    f !== "nodes" && (o._collector[f] || (o._collector[f] = []), o._collector[f] = o._collector[f].concat(i.data[f]));
  i.set({
    components: [o],
    refs: [],
    domEvents: [],
    storeEvents: []
  });
  for (let f = 0; f < o._collector.components.length; f++)
    o._collector.components[f]._parent = o;
  return i.get();
}
function a(s, t, e) {
  const n = s._collector && s._collector.components;
  if (e && t(s), n)
    for (let i = 0; i < n.length; i++)
      a(n[i], t);
  e || t(s);
}
function H(s) {
  for (let t = 0; t < s._collector.refs.length; t++)
    s._collector.refs[t].fn(s._collector.refs[t].ref), s._collector.refs[t].ref = null;
}
function I(s) {
  for (let t = 0; t < s._collector.storeEvents.length; t++) {
    const e = s._collector.storeEvents[t], n = e.fn;
    e.fn = function(i) {
      n(i, e.el);
    }, e.store.subscribe(e.fn), e.init && e.fn(e.store.current);
  }
}
function O(s) {
  s.test && console.log("call dom listeners", s._collector.domEvents);
  for (let t = 0; t < s._collector.domEvents.length; t++) {
    const e = s._collector.domEvents[t];
    e.el.addEventListener(e.evt, e.fn);
  }
}
function S(s) {
  a(s, H);
}
function U(s) {
  a(s, O), a(s, I);
}
const Y = /* @__PURE__ */ new Set([
  "g",
  "svg",
  "defs",
  "mask"
]);
function q(s, t = document.body, e) {
  let n = 0;
  const i = u(s, t && Y.has(t.tagName));
  let o = { _collector: i };
  if (S(o), a(o, function(r) {
    r.afterRender && r.afterRender(r.props);
  }), typeof t == "function") {
    const r = i.nodes.length < 2 ? i.nodes[0] : i.nodes;
    t(r);
  } else if (t instanceof window.Element)
    for (n = 0; n < i.nodes.length; n++)
      t.appendChild(i.nodes[n]);
  else if (typeof t == "object" && t !== null && t.insertBefore)
    for (n = 0; n < i.nodes.length; n++)
      t.insertBefore.parentNode.insertBefore(i.nodes[n], t.insertBefore);
  if ((!e || e.mounted) && (U(o), a(o, function(r) {
    r.mounted = !0, r.afterMount && r.afterMount(r.props);
  })), e && e._collector) {
    const r = e._collector;
    for (n = 0; n < i.components.length; n++)
      i.components[n]._parent = e;
    r.refs && (r.refs = r.refs.concat(i.refs)), r.components && (r.components = r.components.concat(i.components)), r.domEvents && (r.domEvents = r.domEvents.concat(i.domEvents)), r.storeEvents && (r.storeEvents = r.storeEvents.concat(i.storeEvents));
  }
  return o = void 0, i;
}
class N {
  static flatten(t) {
    let e = [];
    for (const n of Array.isArray(t) ? t : t.children ?? [])
      e = e.concat(n, N.flatten(n));
    return e;
  }
  constructor(t = {}) {
    this._parent = null, this._collector = { refs: [], components: [], domEvents: [], storeEvents: [] }, this._storeListeners = [], this.refs = {}, this.state = {}, this.store = {}, this.props = t || {}, this.base = null, this.mounted = !1, this.destroyed = !1;
    const e = t.name || this.constructor.name || "Component", { log: n, warn: i, error: o } = m(
      e,
      "white",
      "#000",
      t.disableLog
    );
    this.log = n, this.warn = i, this.error = o;
  }
  get dataProps() {
    return Object.entries(this.props).filter(([t]) => t.startsWith("data-")).reduce((t, [e, n]) => ({ ...t, [e]: n }), {});
  }
  storeSubscribe(t, e, n, i = !0) {
    t.subscribe(e, n), this._storeListeners.push([t, e, n]), i && e.call(n, t.current);
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
    const e = this;
    return function(i) {
      e.refs[t] = i;
    };
  }
  // Quickly add ref to an array of component refs
  refArray(t, e = !1) {
    const n = this.refs[t] || (this.refs[t] = []);
    let i = n.length, o, r;
    return e && (o = this.refs.__pools || (this.refs.__pools = {}), r = o[t] || (o[t] = []), r.length && (i = r.pop())), n[i] = null, function(f) {
      n[i] = f, e && r.push(i);
    };
  }
  // Quickly add ref to a hashmap of component refs
  refMap(t, e) {
    const n = this.refs[e] || (this.refs[e] = /* @__PURE__ */ new Map());
    return function(o) {
      o ? n.set(t, o) : n.delete(t);
    };
  }
  // Render a vnode or array of vnodes
  // and register the rendered content as "child" of this component.
  // Use this method when you want to add content to the component
  // after the initial rendering. This ensures new items will be
  // correctly unmount when the component is destroyed.
  render(t, e) {
    return q(t, e, this);
  }
  // Destroy the component and its children components.
  // - This also removes component props and de-reference it from its parent.
  // - Callback refs inside the component tree will be re-called with `null`
  // - Set component.mounted to false
  destroy() {
    let t = 0;
    for (this.beforeDestroy(this.props), t = this._collector.domEvents.length - 1; t >= 0; t--) {
      const n = this._collector.domEvents[t];
      n.el.removeEventListener(n.evt, n.fn);
    }
    for (t = this._collector.storeEvents.length - 1; t >= 0; t--) {
      const n = this._collector.storeEvents[t];
      n.store.unsubscribe(n.fn);
    }
    for (t = this._storeListeners.length - 1; t >= 0; t--) {
      const n = this._storeListeners[t];
      n[0].unsubscribe(n[1], n[2]);
    }
    for (t = this._collector.components.length - 1; t >= 0; t--)
      this._collector.components[t].destroy();
    if (this.mounted = !1, this.destroyed = !0, this._parent) {
      const n = this._parent._collector.components.indexOf(this);
      ~n && this._parent._collector.components.splice(n, 1), this._parent = null;
    }
    for (t = this._collector.refs.length - 1; t >= 0; t--)
      this._collector.refs[t].fn(null), this._collector.refs.splice(t, 1);
    let e = Array.isArray(this.base) ? this.base : [this.base];
    for (t = 0; t < e.length; t++)
      e[t] && e[t].parentNode && e[t].parentNode.removeChild(e[t]);
    this.base = e = null, this.props = null, this.state = null, this.store = null, this.refs = null, this._storeListeners = null;
  }
}
export {
  N as C,
  w as e,
  D as h,
  y as n,
  q as r
};
//# sourceMappingURL=Component-4f75aad4.js.map
