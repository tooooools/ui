// Some portions of code are taken from preact
// https://github.com/developit/preact/blob/master/src/dom/index.js

const namespaces = [
  'xlink',
  'xmlns',
  'xml'
]

// Some attribute doesn't work well when used online as node.attr = value
// We double it with node.setAttribute
const doubleAttr = new Set([
  'placeholder',
  'autoplay',
  'muted',
  'for',
  'webkit-playsinline',
  'playsinline',
  'selected'
])

const isSignal = value => value && String(value._symbol) === 'Symbol(signal)'

let val

const startsWith = (str, w) => str.substr(0, w.length) === w
const updateClass = n => (v, el) => el.classList.toggle(n, v || false)
const updateAttrib = (name = 'textContent', isSvg) => (v, el) => {
  const ns = isSvg && (name !== (name = name.replace(/^xlink:?/, '')))
  if (ns) el.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), v)
  else {
    if (v === undefined) {
      el.removeAttribute(name)
      return
    }

    val = v == null ? '' : v
    if (!isSvg) el[name] = val
    if (isSvg || doubleAttr.has(name) || startsWith(name, 'data-')) {
      el.setAttribute(name, val)
    }
  }
}

function setDomAttrib (el, name, value, collector, isSvg) {
  // Don't treat undefined value
  if (value === undefined) return

  // Ignore JSX sourcemap props
  if (name === '__self' || name === '__source') return

  // Normalize class attribute
  if (name === 'className') name = 'class'

  // Correct attribute like xlmns:xlink
  for (let i = 0; i < namespaces.length; i++) {
    if (startsWith(name, namespaces[i])) {
      const len = namespaces[i].length
      if (name[len] && name[len] !== ':') {
        name = namespaces[i] + ':' + name[len].toLowerCase() + name.substr(len + 1, name.length)
      }
      break
    }
  }

  // Ignored props
  if (name === 'ref') {
    //
  } else if (startsWith(name, 'event-')) {
    // Synthetic DOM Events
    const eventName = name.toLowerCase().substring(6)
    collector.append({ domEvents: [{ el, evt: eventName, fn: value }] })
  } else if (isSignal(value)) {
    let attrib = name
    if (attrib === 'text') attrib = 'textContent'
    const fn = updateAttrib(attrib, isSvg)
    collector.append({ storeEvents: [{ store: value, init: true, fn, el }] })
  } else if (typeof value === 'function' && startsWith(name, 'on')) {
    // Event attribute (usually do not use this, prefer the synthetic ones)
    const eventType = name.toLowerCase()
    el[eventType] = value
  } else if (name === 'class') {
    // Handle basic class='foo'
    if (typeof value === 'string') {
      if (isSvg) el.setAttribute('class', value || '')
      else { el.className = value || '' }
    }

    // Handle class={['a', 'b', { 'c': <Signal|bool>, 'd': <Signal|bool> }, 'e', { 'f': <Signal|bool> }]}
    // Arrays are flattened one level so callers can spread props.class directly without ternary guards
    if (typeof value === 'object') {
      const entries = Array.isArray(value) ? value.flat().filter(Boolean) : value
      for (const key in entries) {
        const v = entries[key] // a, b, { c, d }, e, f
        if (typeof v === 'string') el.classList.add(...v.split(' '))
        if (typeof v === 'object') {
          for (const k in v) {
            if (typeof v[k] === 'boolean') el.classList.toggle(k, v[k])
            if (isSignal(v[k])) {
              const fn = updateClass(k)
              collector.append({ storeEvents: [{ store: v[k], init: true, fn, el }] })
            }
          }
        }
      }
    }
  } else if (name === 'style') {
    // Style attribute
    if (typeof value === 'object') {
      for (const key in value) {
        const updateProp = v => {
          if (key.startsWith('--')) el.style.setProperty(key, v)
          else { el.style[key] = v }
        }

        if (isSignal((value ?? [])[key])) {
          collector.append({ storeEvents: [{ store: value[key], init: true, fn: updateProp, el }] })
        } else {
          updateProp(value[key])
        }
      }
    } else if (typeof value === 'string') el.style.cssText = value
  } else if (name !== 'list' && name !== 'type' && !isSvg && name in el) {
    // Attrib
    // Attempt to set an attribute to the given value.
    // IE & FF throw for certain property-value combinations.
    try { updateAttrib(name, isSvg)(value, el) } catch (e) { /* */ }
  } else if (typeof value !== 'object' && typeof value !== 'function') {
    updateAttrib(name, isSvg)(value, el)
  }
}

export default setDomAttrib
