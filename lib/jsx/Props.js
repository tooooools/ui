import Component from './Component.js'

// Defined types, sorted by specificity
const Props = new Proxy({
  required: test => new Required(test),

  // Instances
  SVGElement: value => value instanceof SVGElement,
  Element: value => value instanceof Element,
  Component: value => value instanceof Component,
  Signal: value => String(value?._symbol) === 'Symbol(signal)',

  // Primitives
  number: value => typeof value === 'number',
  string: value => typeof value === 'string',
  boolean: value => typeof value === 'boolean',
  function: value => typeof value === 'function',
  array: value => Array.isArray(value),
  object: value => typeof value === 'object' && !Array.isArray(value),

  // Special types
  enum: (...values) => new Enum(values)
}, {
  get (target, key) {
    if (key in target) return target[key]
    throw new TypeError(`Props.${key} is not a valid prop type`)
  }
})

function typeOf (value) {
  const [type] = Object.entries(Props).find(([k, t]) => k !== 'required' && k !== 'enum' && t(value)) ?? []
  return type
}

export function validate (props, schema, name = '') {
  for (const prop in schema) {
    const value = props[prop]
    const spec = schema[prop]

    if (spec instanceof Enum) {
      if (!spec.values.includes(value)) {
        throw new TypeError(`<${name} ${prop}={${JSON.stringify(value)}} /> must be one of: ${spec.values.map(v => JSON.stringify(v)).join(', ')}`)
      }
      continue
    }

    if (spec instanceof Required) {
      const tests = Array.isArray(spec.test) ? spec.test : [spec.test]
      const label = tests.map(t => t.name).join('|')
      if (value === undefined) {
        throw new TypeError(`<${name} ${prop}={${label}} /> is required`)
      }
      if (!tests.some(t => t(value))) {
        throw new TypeError(`<${name} ${prop}={${typeOf(value)}} /> must be {${label}}`)
      }
      continue
    }

    if (value === undefined) continue

    const tests = Array.isArray(spec) ? spec : [spec]
    if (!tests.some(t => t(value))) {
      console.warn(`<${name} ${prop}={${tests.map(t => t.name).join('|')}} /> is {${typeOf(value)}}`)
    }
  }
}

class Required {
  test
  constructor (test) { this.test = test }
  get type () { return this.test.name }
}

class Enum {
  values
  constructor (values) { this.values = values }
}

export default Props
