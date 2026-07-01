import { describe, it, expect } from 'vitest'
import Component from '../../lib/jsx/Component.js'

class TestComponent extends Component {}

function makeEl (name) {
  return { name }
}

// ─── ref ──────────────────────────────────────────────────────────────────────

describe('Component#ref', () => {
  it('assigns the element to refs[k]', () => {
    const c = new TestComponent()
    const el = makeEl('a')
    c.ref('single')(el)
    expect(c.refs.single).toBe(el)
  })

  it('overwrites the previous value on subsequent calls', () => {
    const c = new TestComponent()
    const callback = c.ref('single')
    callback(makeEl('a'))
    const b = makeEl('b')
    callback(b)
    expect(c.refs.single).toBe(b)
  })

  it('clears the ref when called with null', () => {
    const c = new TestComponent()
    const callback = c.ref('single')
    callback(makeEl('a'))
    callback(null)
    expect(c.refs.single).toBe(null)
  })
})

// ─── refArray ─────────────────────────────────────────────────────────────────

describe('Component#refArray', () => {
  it('appends a new slot on each call', () => {
    const c = new TestComponent()
    const a = makeEl('a')
    const b = makeEl('b')
    c.refArray('list')(a)
    c.refArray('list')(b)
    expect(c.refs.list).toEqual([a, b])
  })

  it('reserves the slot as null before the ref callback fires', () => {
    const c = new TestComponent()
    const callback = c.refArray('list')
    expect(c.refs.list).toEqual([null])
    callback(makeEl('a'))
    expect(c.refs.list).toEqual([makeEl('a')])
  })

  it('non-poolable: nulling a slot leaves a hole, next call still appends', () => {
    const c = new TestComponent()
    const cb1 = c.refArray('list')
    const cb2 = c.refArray('list')
    cb1(makeEl('a'))
    cb2(makeEl('b'))
    cb1(null)
    expect(c.refs.list).toEqual([null, makeEl('b')])

    c.refArray('list')(makeEl('c'))
    expect(c.refs.list).toEqual([null, makeEl('b'), makeEl('c')])
  })

  it('poolable: reuses a freed index instead of growing the array', () => {
    const c = new TestComponent()
    const cb1 = c.refArray('list', true)
    const cb2 = c.refArray('list', true)
    cb1(makeEl('a'))
    cb2(makeEl('b'))

    cb1(null) // frees index 0 back into the pool

    const cb3 = c.refArray('list', true)
    cb3(makeEl('c'))

    expect(c.refs.list).toEqual([makeEl('c'), makeEl('b')])
  })

  it('poolable pool is tracked separately per key', () => {
    const c = new TestComponent()
    c.refArray('list', true)(makeEl('a'))
    c.refArray('other', true)(makeEl('x'))
    expect(c.refs.__pools.list).toBeDefined()
    expect(c.refs.__pools.other).toBeDefined()
    expect(c.refs.list).toEqual([makeEl('a')])
    expect(c.refs.other).toEqual([makeEl('x')])
  })
})

// ─── refMap ───────────────────────────────────────────────────────────────────

describe('Component#refMap (default, single ref per id)', () => {
  it('sets the element under the given id in the map', () => {
    const c = new TestComponent()
    const el = makeEl('a')
    c.refMap('byId', 'foo')(el)
    expect(c.refs.byId).toBeInstanceOf(Map)
    expect(c.refs.byId.get('foo')).toBe(el)
  })

  it('overwrites the value for the same id on subsequent calls', () => {
    const c = new TestComponent()
    const callback = c.refMap('byId', 'foo')
    callback(makeEl('a'))
    const b = makeEl('b')
    callback(b)
    expect(c.refs.byId.get('foo')).toBe(b)
  })

  it('deletes the id from the map when called with null', () => {
    const c = new TestComponent()
    const callback = c.refMap('byId', 'foo')
    callback(makeEl('a'))
    callback(null)
    expect(c.refs.byId.has('foo')).toBe(false)
  })

  it('keeps distinct ids independent', () => {
    const c = new TestComponent()
    const a = makeEl('a')
    const b = makeEl('b')
    c.refMap('byId', 'foo')(a)
    c.refMap('byId', 'bar')(b)
    expect(c.refs.byId.get('foo')).toBe(a)
    expect(c.refs.byId.get('bar')).toBe(b)
  })
})

describe('Component#refMap with { multiple: true }', () => {
  it('stores an array of refs under the given id', () => {
    const c = new TestComponent()
    const a = makeEl('a')
    const b = makeEl('b')
    c.refMap('byId', 'foo', { multiple: true })(a)
    c.refMap('byId', 'foo', { multiple: true })(b)
    expect(c.refs.byId.get('foo')).toEqual([a, b])
  })

  it('reserves the slot as null before the ref callback fires', () => {
    const c = new TestComponent()
    const callback = c.refMap('byId', 'foo', { multiple: true })
    expect(c.refs.byId.get('foo')).toEqual([null])
    callback(makeEl('a'))
    expect(c.refs.byId.get('foo')).toEqual([makeEl('a')])
  })

  it('keeps distinct ids independent arrays', () => {
    const c = new TestComponent()
    c.refMap('byId', 'foo', { multiple: true })(makeEl('a'))
    c.refMap('byId', 'bar', { multiple: true })(makeEl('x'))
    expect(c.refs.byId.get('foo')).toEqual([makeEl('a')])
    expect(c.refs.byId.get('bar')).toEqual([makeEl('x')])
  })

  it('nulling a slot leaves a hole in that id\'s array', () => {
    const c = new TestComponent()
    const cb1 = c.refMap('byId', 'foo', { multiple: true })
    const cb2 = c.refMap('byId', 'foo', { multiple: true })
    cb1(makeEl('a'))
    cb2(makeEl('b'))
    cb1(null)
    expect(c.refs.byId.get('foo')).toEqual([null, makeEl('b')])
  })
})
