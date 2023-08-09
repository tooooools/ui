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
    options: {
      type: 'array',
      description: [
        '`store-`',
        '`[{ value: string, label?: string, disabled?: boolean }, …]`',
        'Can also contain `Select.placeholder("Your text")` and `Select.separator`'
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
    options: [
      Select.placeholder('select an option'),
      Select.separator,
      { value: 'foo' },
      { value: 'bar' },
      { value: 'baz', disabled: true }
    ],

    id: undefined,
    class: undefined,

    disabled: false,
    hidden: false
  }
}
