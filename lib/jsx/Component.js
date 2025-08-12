import logger from '../utils/logger'
import _render from './render'
import { validate } from './Props'

export default class Component {
  // Props schema for validation, see ./Props
  static props = {}

  refs = {}
  state = {}
  store = {}
  props = {}

  base = null
  mounted = false
  destroyed = false

  static flatten (component) {
    let children = []
    for (const child of Array.isArray(component) ? component : (component.children ?? [])) {
      children = children.concat(child, Component.flatten(child))
    }
    return children
  }

  constructor (props = {}) {
    const label = this.props.name || this.constructor.name || 'Component'
    validate(props, this.constructor.props, label)

    this._parent = null
    this._collector = { refs: [], components: [], domEvents: [], storeEvents: [] }
    this._storeListeners = []

    // Contains all component properties and children.
    // Do not modify it directly, recreate a new component using `cloneElement`
    this.props = props

    const { log, warn, error } = logger(label, 'white', '#000', props.disableLog)
    this.log = log
    this.warn = warn
    this.error = error
  }

  get dataProps () {
    return Object.entries(this.props)
      .filter(([attr]) => attr.startsWith('data-'))
      .reduce((acc, [attr, value]) => ({ ...acc, [attr]: value }), {})
  }

  template () {}
  beforeRender () {}
  afterRender () {}
  afterMount () {}
  beforeDestroy () {}

  // Quickly add ref to component
  ref (k) {
    const self = this
    return function updateRef (el) {
      self.refs[k] = el
    }
  }

  // Quickly add ref to an array of component refs
  refArray (k, poolable = false) {
    const arr = this.refs[k] || (this.refs[k] = [])
    let index = arr.length
    let pools, pool

    if (poolable) {
      pools = this.refs.__pools || (this.refs.__pools = {})
      pool = pools[k] || (pools[k] = [])
      if (pool.length) index = pool.pop()
    }

    arr[index] = null

    return function updateRefArray (el) {
      arr[index] = el
      if (poolable) pool.push(index)
    }
  }

  // Quickly add ref to a hashmap of component refs
  refMap (id, k) {
    const map = this.refs[k] || (this.refs[k] = new Map())
    return function updateRefHashmap (el) {
      if (el) map.set(id, el)
      else map.delete(id)
    }
  }

  // Render a vnode or array of vnodes and register the rendered content as "child" of this component.
  // Use this method when you want to add content to the component
  // after the initial rendering. This ensures new items will be
  // correctly unmount when the component is destroyed.
  render (vdom, parent) {
    return _render(vdom, parent, this)
  }

  // Destroy the component and its children components.
  // - This also removes component props and de-reference it from its parent.
  // - Callback refs inside the component tree will be re-called with `null`
  // - Set component.mounted to false
  destroy () {
    let i = 0
    this.beforeDestroy(this.props)

    // Unlisten to dom events
    for (i = this._collector.domEvents.length - 1; i >= 0; i--) {
      const event = this._collector.domEvents[i]
      event.el.removeEventListener(event.evt, event.fn)
    }

    // Unlisten to store events
    for (i = this._collector.storeEvents.length - 1; i >= 0; i--) {
      const event = this._collector.storeEvents[i]
      event.store.unsubscribe(event.fn)
    }

    // Unlisten to store events 2
    for (i = this._storeListeners.length - 1; i >= 0; i--) {
      const event = this._storeListeners[i]
      event[0].unsubscribe(event[1], event[2])
    }

    // destroy subcomponents
    for (i = this._collector.components.length - 1; i >= 0; i--) {
      this._collector.components[i].destroy()
    }

    this.mounted = false
    this.destroyed = true

    // unregister component from parent and dispose _parent
    if (this._parent) {
      const index = this._parent._collector.components.indexOf(this)
      if (~index) this._parent._collector.components.splice(index, 1)
      this._parent = null
    }

    // callback all ref with null and destroy them from the collector
    for (i = this._collector.refs.length - 1; i >= 0; i--) {
      this._collector.refs[i].fn(null)
      this._collector.refs.splice(i, 1)
    }

    // Unmount from dom
    let base = Array.isArray(this.base) ? this.base : [this.base]
    for (i = 0; i < base.length; i++) {
      if (base[i] && base[i].parentNode) base[i].parentNode.removeChild(base[i])
    }

    // Remove base
    this.base = base = null

    // Remove props / state / store / refs to avoid memory leaks
    this.props = null
    this.state = null
    this.store = null
    this.refs = null
    this._storeListeners = null
  }
}
