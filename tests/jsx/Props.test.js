import { describe, it, expect, vi } from 'vitest'

globalThis.Element = class Element {}
globalThis.SVGElement = class SVGElement extends Element {}

const { default: Props, validate } = await import('../../lib/jsx/Props.js')

// ─── type predicates ─────────────────────────────────────────────────────────

describe('Props types', () => {
  it('number', () => { expect(Props.number(1)).toBe(true); expect(Props.number('x')).toBe(false) })
  it('string', () => { expect(Props.string('x')).toBe(true); expect(Props.string(1)).toBe(false) })
  it('boolean', () => { expect(Props.boolean(true)).toBe(true); expect(Props.boolean(1)).toBe(false) })
  it('function', () => { expect(Props.function(() => {})).toBe(true); expect(Props.function(1)).toBe(false) })
  it('array', () => { expect(Props.array([])).toBe(true); expect(Props.array({})).toBe(false) })
  it('object', () => { expect(Props.object({})).toBe(true); expect(Props.object([])).toBe(false) })
  it('Element', () => { expect(Props.Element(new Element())).toBe(true); expect(Props.Element('x')).toBe(false) })
  it('Signal', () => {
    expect(Props.Signal({ _symbol: Symbol.for('signal') })).toBe(true)
    expect(Props.Signal({})).toBe(false)
  })
  it('throws on unknown type', () => {
    expect(() => Props.unknown).toThrow('Props.unknown is not a valid prop type')
  })
})

// ─── validate — optional props ───────────────────────────────────────────────

describe('validate optional props', () => {
  it('passes when value matches type', () => {
    expect(() => validate({ size: 42 }, { size: Props.number }, 'C')).not.toThrow()
  })

  it('passes when optional value is absent', () => {
    expect(() => validate({}, { size: Props.number }, 'C')).not.toThrow()
  })

  it('warns when value does not match type', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    validate({ size: 'xl' }, { size: Props.number }, 'C')
    expect(warn.mock.calls[0][0]).toBe('<C size={number} /> is {string}')
    warn.mockRestore()
  })

  it('warns with union type label', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    validate({ size: true }, { size: [Props.number, Props.string] }, 'C')
    expect(warn.mock.calls[0][0]).toBe('<C size={number|string} /> is {boolean}')
    warn.mockRestore()
  })
})

// ─── validate — required props ───────────────────────────────────────────────

describe('validate required props', () => {
  it('passes when required value is present and matches', () => {
    expect(() => validate({ size: 42 }, { size: Props.required(Props.number) }, 'C')).not.toThrow()
  })

  it('throws when required value is absent', () => {
    expect(() => validate({}, { size: Props.required(Props.number) }, 'C'))
      .toThrow('<C size={number} /> is required')
  })

  it('throws when required value has wrong type', () => {
    expect(() => validate({ size: 'xl' }, { size: Props.required(Props.number) }, 'C'))
      .toThrow('must')
  })

  it('throws with required union label when absent', () => {
    expect(() => validate({}, { size: Props.required([Props.number, Props.string]) }, 'C'))
      .toThrow('is required')
  })

  it('throws with required union label when invalid', () => {
    expect(() => validate({ size: true }, { size: Props.required([Props.number, Props.string]) }, 'C'))
      .toThrow('must')
  })
})

// ─── validate — enum props ────────────────────────────────────────────────────

describe('validate enum props', () => {
  it('passes when value is in the enum', () => {
    expect(() => validate({ foo: 'a' }, { foo: Props.enum('a', 42, true) }, 'C')).not.toThrow()
    expect(() => validate({ foo: 42 }, { foo: Props.enum('a', 42, true) }, 'C')).not.toThrow()
    expect(() => validate({ foo: true }, { foo: Props.enum('a', 42, true) }, 'C')).not.toThrow()
  })

  it('throws when value is not in the enum', () => {
    expect(() => validate({ foo: 'b' }, { foo: Props.enum('a', 42, true) }, 'C'))
      .toThrow('<C foo={"b"} /> must be one of: "a", 42, true')
  })

  it('throws when value is absent', () => {
    expect(() => validate({}, { foo: Props.enum('a', 42, true) }, 'C'))
      .toThrow('must be one of')
  })
})
