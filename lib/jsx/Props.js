import Component from './Component.js'

// Defined types, sorted by specificity
const Props = {
  required: test => new Required(test),

  // Instances
  SVGElement: value => value instanceof Element,
  Element: value => value instanceof Element,
  Component: value => value instanceof Component,
  Signal: value => String(value?._symbol) === 'Symbol(signal)',

  // Primitives
  number: value => typeof value === 'number',
  string: value => typeof value === 'string',
  boolean: value => typeof value === 'boolean',
  function: value => typeof value === 'function',
  array: value => Array.isArray(value),
  object: value => typeof value === 'object' && !Array.isArray(value)
}

export function validate (props, schema, name = '') {
  for (const prop in schema) {
    const value = props[prop]
    const [type] = Object.entries(Props).find(([type, t]) => type !== 'required' && t(value)) ?? []
    const test = schema[prop] instanceof Required
      ? schema[prop].test
      : schema[prop]

    // Test prop.required
    if (test.name === 'required' && value === undefined) {
      throw new TypeError(`<${name} ${prop} /> is required`)
    }

    if (schema[prop] instanceof Required) {
      // Test prop.require([prop.<type>, …])
      if (Array.isArray(test)) {
        if (value === undefined) throw new TypeError(`<${name} ${prop}={${test.map(t => t.name).join('|')}} />, is required`)
        if (!test.find(t => t(value))) throw new TypeError(`<${name} ${prop}={${type}} /> must be {${test.map(t => t.name).join('|')}}`)
      } else if (!test(value)) {
        // Test prop.require(prop.<type>)
        if (value === undefined) throw new TypeError(`<${name} ${prop}={${schema[prop].type}} /> is required`)
        if (schema[prop].type && type !== schema[prop].type) throw new TypeError(`<${name} ${prop}={${type}} /> must {${schema[prop].type}}`)
        // Test prop.require(callback)
        else throw new TypeError(`<${name} ${prop}={${type}} /> must validate the following test:\n\n${test}\n`)
      }
    }

    // Skip empty non-required value
    if (value === undefined) continue

    // Warn on validation failed for all prop.<type>
    if (Array.isArray(test)) {
      for (const t of test) {
        if (t(value)) return
      }
      console.warn(`<${name} ${prop}={${test.map(t => t.name).join('|')}} /> is {${type}}`)
    } else if (!test(value)) {
      console.warn(`<${name} ${prop}={${test.name}} /> is {${type}}`)
    }
  }
}

class Required {
  test
  constructor (test) { this.test = test }
  get type () { return this.test.name }
}

export default Props
