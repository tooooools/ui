import { render, h } from '../jsx'
import Toggles from './Toggles'

import Icon from 'iconoir/icons/circle.svg?raw'

export default {
  title: 'Inputs/<Toggles>',
  render: args => render(h(Toggles, args), null).nodes[0],
  argTypes: {
    title: { type: 'string', description: '`store-`' },
    value: { type: 'string', description: '`store-`' },
    options: {
      type: 'array',
      description: [
        '`store-`',
        '`[{ value?: mixed, icon?: string, label?: string, disabled?: boolean, hidden?: boolean }, …]`'
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
    options: [
      { icon: Icon, label: 'first', value: Symbol('first') },
      { icon: Icon, label: 'second', value: { color: '#FFF' } },
      { icon: Icon, label: 'third', disabled: true },
      { icon: Icon, label: 'top secret', hidden: true }
    ],
    disabled: false,
    hidden: false
  }
}
