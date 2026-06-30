import { describe, it, expect } from 'vitest'
import setDomAttrib from '../../lib/jsx/utils/setDomAttrib.js'

function fakeEl () {
  const classes = new Set()
  return {
    classList: {
      add: (...names) => names.forEach(n => classes.add(n)),
      toggle: (name, force) => { force ? classes.add(name) : classes.delete(name) }
    },
    classes
  }
}

const collector = { append () {} }

describe('setDomAttrib class prop', () => {
  it('applies a bare object map class={{ "is-large": true }}', () => {
    const el = fakeEl()
    setDomAttrib(el, 'class', { 'is-large': true, 'is-small': false }, collector, false)
    expect(el.classes.has('is-large')).toBe(true)
    expect(el.classes.has('is-small')).toBe(false)
  })

  it('still applies array form class={[{ "is-large": true }]}', () => {
    const el = fakeEl()
    setDomAttrib(el, 'class', [{ 'is-large': true }], collector, false)
    expect(el.classes.has('is-large')).toBe(true)
  })

  it('still applies string array form', () => {
    const el = fakeEl()
    setDomAttrib(el, 'class', ['a', 'b'], collector, false)
    expect(el.classes.has('a')).toBe(true)
    expect(el.classes.has('b')).toBe(true)
  })
})
