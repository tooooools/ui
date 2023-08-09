import { render, h } from '../jsx'
import Toolbar from './Toolbar'

import Icon from 'iconoir/icons/circle.svg?raw'

import Button from './Button'

export default {
  title: 'Layout/<Toolbar>',
  render: args => render(h(Toolbar, args, ...[
    h(Button, { icon: Icon, label: 'button' }),
    h('hr'),
    h(Button, { icon: Icon }),
    h(Button, { icon: Icon }),
    h(Button, { icon: Icon })
  ]), null).nodes[0],
  argTypes: {
    compact: { type: 'boolean', description: '`store-`' },

    id: { type: 'string' },
    class: { type: 'string' },

    disabled: { type: 'boolean', description: '`store-`' },
    hidden: { type: 'boolean', description: '`store-`' },

    'event-mouseenter': { action: 'event-mouseenter' },
    'event-mouseleave': { action: 'event-mouseleave' }
  },
  args: {
    compact: false
  }
}

export const Primary = {
  args: {
    compact: false,
    disabled: false,
    hidden: false
  }
}

export const Nested = {
  render: args => render(h(Toolbar, args, ...[
    h(Button, { icon: Icon, label: 'button' }),
    h(Toolbar, { compact: true }, ...[
      h(Button, { icon: Icon, label: 'button' }),
      h('hr'),
      h(Button, { icon: Icon }),
      h(Button, { icon: Icon })
    ]),
    h(Button, { icon: Icon })
  ]), null).nodes[0]
}
