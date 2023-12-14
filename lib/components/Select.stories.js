import { render, h } from '../jsx'
import Select from './Select'

import Icon from 'iconoir/icons/circle.svg?raw'

export default {
  title: 'Inputs/<Select>',
  render: args => render(h(Select, args), null).nodes[0],
  argTypes: {
    icon: { type: 'string' },

    title: { type: 'string', description: '`store-`' },
    value: { type: 'string', description: '`store-`' },
    compare: { type: 'string', description: 'Define a custom comparison function for getting the value index from the option. Default to `a === b`' },
    options: {
      type: 'array',
      description: [
        '`store-`',
        '`[{ value: mixed, label: string, disabled?: boolean, group?: string }, …]`',
        'Can also contain `Select.separator`'
      ].map(l => `<p>${l}</p>`).join('\n')
    },

    id: { type: 'string' },
    class: { type: 'string' },

    disabled: { type: 'boolean', description: '`store-`' },
    hidden: { type: 'boolean', description: '`store-`' },

    'event-change': { action: 'event-change' },
    'event-mouseenter': { action: 'event-mouseenter' },
    'event-mouseleave': { action: 'event-mouseleave' }
  }
}

export const Primary = {
  args: {
    icon: Icon,

    title: 'select me',

    value: undefined,
    placeholder: 'Select an option',
    options: [
      Select.separator,
      // { label: 'foo', value: -1, disabled: true },
      { label: 'String', value: 'UID_12345' },
      { label: 'Number', value: 42 },
      { label: 'Symbol', value: Symbol('first') },
      { label: 'Object', value: { color: '#FFF' } },
      { label: 'Disabled', disabled: true }
    ],

    'event-change': (e, c) => console.log(c.state.value.current),

    id: undefined,
    class: undefined,

    disabled: false,
    hidden: false
  }
}

export const Grouped = {
  args: {
    ...Primary.args,
    options: [
      { group: 'Fruits', label: 'Apple', value: '🍎' },
      { group: 'Fruits', label: 'Banana', value: '🍌' },
      { group: 'Fruits', label: 'Cherry', value: '🍒', disabled: true },
      { group: 'Vegetables', label: 'Eggplant', value: '🍆' },
      { label: 'Tomato', value: '🍅' },
      { label: 'Juice', value: '🥤' }
    ]
  }
}
