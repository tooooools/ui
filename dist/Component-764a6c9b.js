function k(e, t) {
  const s = {};
  return s.vnode = !0, s.type = e, s.props = t || {}, s.children = [].concat.apply([], [].slice.call(arguments, 2)), s.isInstance = e && e.template && typeof e.template == "function", s.isComponent = typeof e == "function" && e.prototype && typeof e.prototype.render == "function", s.isStateless = typeof e == "function" && !s.isComponent, s.isDom = typeof e == "string", s;
}
k.f = (e) => e.children;
function w(e, t) {
  for (const s in t)
    e[s] = t[s];
  return e;
}
function g() {
}
function m(e, t, s, n) {
  if (n)
    return { log: g, warn: g, error: g };
  const i = [];
  e = e.toUpperCase(), i.push(`%c ${e} `);
  let o = "font-weight:bold;";
  return t && (o += `color:${t};`), s && (o += `background-color:${s}`), i.push(o), {
    log: console.log.bind(console, ...i),
    warn: console.warn.bind(console, ...i),
    error: console.error.bind(console, ...i)
  };
}
const C = ["nodes", "components", "refs", "domEvents", "storeEvents"];
class a {
  constructor() {
    this.data = {};
    for (let t = 0; t < C.length; t++)
      this.data[C[t]] = [];
  }
  append(t) {
    for (const s in t)
      this.data[s] = this.data[s].concat(t[s]);
  }
  set(t) {
    for (const s in t)
      this.data[s] = t[s];
  }
  get() {
    return this.data;
  }
}
const h = [
  "xlink",
  "xmlns",
  "xml"
], D = /* @__PURE__ */ new Set([
  "placeholder",
  "autoplay",
  "muted",
  "for",
  "webkit-playsinline",
  "playsinline",
  "selected"
]), y = (e) => e && String(e._symbol) === "Symbol(signal)";
let _;
const l = (e, t) => e.substr(0, t.length) === t, A = (e) => (t, s) => s.classList.toggle(e, t || !1), b = (e = "textContent", t) => (s, n) => {
  if (t && e !== (e = e.replace(/^xlink:?/, "")))
    n.setAttributeNS("http://www.w3.org/1999/xlink", e.toLowerCase(), s);
  else {
    if (s === void 0) {
      n.removeAttribute(e);
      return;
    }
    _ = s ?? "", t || (n[e] = _), (t || D.has(e) || l(e, "data-")) && n.setAttribute(e, _);
  }
};
function x(e, t, s, n, i) {
  if (s !== void 0 && !(t === "__self" || t === "__source")) {
    t === "className" && (t = "class");
    for (let o = 0; o < h.length; o++)
      if (l(t, h[o])) {
        const r = h[o].length;
        t[r] && t[r] !== ":" && (t = h[o] + ":" + t[r].toLowerCase() + t.substr(r + 1, t.length));
        break;
      }
    if (t !== "ref")
      if (l(t, "event-")) {
        const o = t.toLowerCase().substring(6);
        n.append({ domEvents: [{ el: e, evt: o, fn: s }] });
      } else if (t === "store") {
        const o = Array.isArray(s) ? s : [s], r = [];
        for (let c = 0, f = o.length; c < f; c++) {
          const u = Array.isArray(o[c]) ? o[c] : [o[c]], E = u[0], N = u[1], R = u[2] !== void 0 ? u[2] : !0;
          E && r.push({ store: E, fn: N, init: R, el: e });
        }
        n.append({ storeEvents: r });
      } else if (l(t, "store-class-")) {
        const o = t.substring(12), r = A(o);
        n.append({ storeEvents: [{ store: s, init: !0, fn: r, el: e }] });
      } else if (l(t, "store-") || y(s)) {
        let o = l(t, "store-") ? t.substring(6) : t;
        o === "text" && (o = "textContent");
        const r = b(o, i);
        n.append({ storeEvents: [{ store: s, init: !0, fn: r, el: e }] });
      } else if (typeof s == "function" && l(t, "on")) {
        const o = t.toLowerCase();
        e[o] = s;
      } else if (t === "class" && !i) {
        if (typeof s == "string" && (e.className = s || ""), typeof s == "object")
          for (const o in s) {
            const r = s[o];
            if (typeof r == "string" && e.classList.add(r), typeof s == "object") {
              for (const c in r)
                if (typeof r[c] == "boolean" && e.classList.toggle(c, r[c]), y(r[c])) {
                  const f = A(c);
                  n.append({ storeEvents: [{ store: r[c], init: !0, fn: f, el: e }] });
                }
            }
          }
      } else if (t === "style")
        if (typeof s == "object")
          for (const o in s) {
            const r = (c) => {
              o.startsWith("--") ? e.style.setProperty(o, c) : e.style[o] = c;
            };
            y((s ?? [])[o]) ? n.append({ storeEvents: [{ store: s[o], init: !0, fn: r, el: e }] }) : r(s);
          }
        else
          typeof s == "string" && (e.style.cssText = s);
      else if (t !== "list" && t !== "type" && !i && t in e)
        try {
          b(t, i)(s, e);
        } catch {
        }
      else
        typeof s != "object" && typeof s != "function" && b(t, i)(s, e);
  }
}
function M(e) {
  return Array.isArray(e) ? e : [e];
}
function p(e, t) {
  if (Array.isArray(e))
    return P(e, t);
  if (e instanceof window.Element)
    return j(e);
  if (e === null || typeof e != "object" || !e.vnode)
    return T(e);
  const s = w(
    w({}, e.props),
    { children: [].concat.apply([], e.children || []) }
  );
  if (e.isDom)
    return B(e, s, t);
  if (e.isInstance)
    return L(e, s, t, !0);
  if (e.isStateless)
    return W(e, s, t);
  if (e.isComponent)
    return L(e, s, t);
}
function P(e, t) {
  e = M(e);
  const s = new a();
  for (let n = 0; n < e.length; n++)
    s.append(p(e[n], t));
  return s.get();
}
function T(e) {
  const t = new a();
  return e == null || e === !1 || t.append({ nodes: document.createTextNode(e + "") }), t.get();
}
function B(e, t, s) {
  const n = new a();
  let i = [];
  e.type === "svg" && (s = !0);
  for (let r = 0; r < t.children.length; r++) {
    const c = p(t.children[r], s);
    c.nodes && (i = i.concat(c.nodes), n.append({
      components: c.components,
      refs: c.refs,
      domEvents: c.domEvents,
      storeEvents: c.storeEvents
    }));
  }
  const o = s ? document.createElementNS("http://www.w3.org/2000/svg", e.type) : document.createElement(e.type);
  for (const r in e.props)
    x(o, r, e.props[r], n, s);
  for (let r = 0; r < i.length; r++)
    o.appendChild(i[r]);
  return t.ref && n.append({ refs: { ref: o, fn: t.ref } }), n.append({ nodes: o }), n.get();
}
function j(e) {
  const t = new a();
  return t.append({ nodes: e }), t.get();
}
function W(e, t, s) {
  const n = new a(), i = e.type(t);
  return n.append(p(i, s)), n.get();
}
function L(e, t, s, n = !1) {
  const i = new a(), o = n ? e.type : new e.type(t);
  n && (t = o.props), o.beforeRender(t);
  const r = o.template(t, o.state || {}) || t.children;
  t.ref && i.append({ refs: { ref: o, fn: t.ref } }), i.append(p(r, s));
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
function d(e, t, s) {
  const n = e._collector && e._collector.components;
  if (s && t(e), n)
    for (let i = 0; i < n.length; i++)
      d(n[i], t);
  s || t(e);
}
function $(e) {
  for (let t = 0; t < e._collector.refs.length; t++)
    e._collector.refs[t].fn(e._collector.refs[t].ref), e._collector.refs[t].ref = null;
}
function H(e) {
  for (let t = 0; t < e._collector.storeEvents.length; t++) {
    const s = e._collector.storeEvents[t], n = s.fn;
    s.fn = function(i) {
      n(i, s.el);
    }, s.store.subscribe(s.fn), s.init && s.fn(s.store.current);
  }
}
function I(e) {
  e.test && console.log("call dom listeners", e._collector.domEvents);
  for (let t = 0; t < e._collector.domEvents.length; t++) {
    const s = e._collector.domEvents[t];
    s.el.addEventListener(s.evt, s.fn);
  }
}
function O(e) {
  d(e, $);
}
function S(e) {
  d(e, I), d(e, H);
}
const U = /* @__PURE__ */ new Set([
  "g",
  "svg",
  "defs"
]);
function Y(e, t = document.body, s) {
  let n = 0;
  const i = p(e, t && U.has(t.tagName));
  let o = { _collector: i };
  if (O(o), d(o, function(r) {
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
  if ((!s || s.mounted) && (S(o), d(o, function(r) {
    r.mounted = !0, r.afterMount && r.afterMount(r.props);
  })), s && s._collector) {
    const r = s._collector;
    for (n = 0; n < i.components.length; n++)
      i.components[n]._parent = s;
    r.refs && (r.refs = r.refs.concat(i.refs)), r.components && (r.components = r.components.concat(i.components)), r.domEvents && (r.domEvents = r.domEvents.concat(i.domEvents)), r.storeEvents && (r.storeEvents = r.storeEvents.concat(i.storeEvents));
  }
  return o = void 0, i;
}
class q {
  constructor(t = {}) {
    this._parent = null, this._collector = { refs: [], components: [], domEvents: [], storeEvents: [] }, this._storeListeners = [], this.refs = {}, this.state = {}, this.store = {}, this.props = t || {}, this.base = null, this.mounted = !1, this.destroyed = !1;
    const s = t.name || this.constructor.name || "Component", { log: n, warn: i, error: o } = m(
      s,
      "white",
      "#000",
      t.disableLog
    );
    this.log = n, this.warn = i, this.error = o;
  }
  get dataProps() {
    return Object.entries(this.props).filter(([t]) => t.startsWith("data-")).reduce((t, [s, n]) => ({ ...t, [s]: n }), {});
  }
  storeSubscribe(t, s, n, i = !0) {
    t.subscribe(s, n), this._storeListeners.push([t, s, n]), i && s.call(n, t.current);
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
    const s = this;
    return function(i) {
      s.refs[t] = i;
    };
  }
  // Quickly add ref to an array of component refs
  refArray(t, s = !1) {
    const n = this.refs[t] || (this.refs[t] = []);
    let i = n.length, o, r;
    return s && (o = this.refs.__pools || (this.refs.__pools = {}), r = o[t] || (o[t] = []), r.length && (i = r.pop())), n[i] = null, function(f) {
      n[i] = f, s && r.push(i);
    };
  }
  // Quickly add ref to a hashmap of component refs
  refMap(t, s) {
    const n = this.refs[s] || (this.refs[s] = /* @__PURE__ */ new Map());
    return function(o) {
      o ? n.set(t, o) : n.delete(t);
    };
  }
  // Render a vnode or array of vnodes
  // and register the rendered content as "child" of this component.
  // Use this method when you want to add content to the component
  // after the initial rendering. This ensures new items will be
  // correctly unmount when the component is destroyed.
  render(t, s) {
    return Y(t, s, this);
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
    let s = Array.isArray(this.base) ? this.base : [this.base];
    for (t = 0; t < s.length; t++)
      s[t] && s[t].parentNode && s[t].parentNode.removeChild(s[t]);
    this.base = s = null, this.props = null, this.state = null, this.store = null, this.refs = null, this._storeListeners = null;
  }
}
export {
  q as C,
  w as e,
  k as h,
  g as n,
  Y as r
};
//# sourceMappingURL=Component-764a6c9b.js.map
