import { render, h } from '../jsx'
import Button from './Button'

import Icon from 'iconoir/icons/empty-page.svg?raw'

export default {
  title: 'Inputs/<Button>',
  render: args => render(h(Button, args), null).nodes[0],
  argTypes: {
    icon: { type: 'string' },

    label: { type: 'string', description: '`store-`' },
    title: { type: 'string', description: '`store-`' },

    type: { type: 'string' },
    id: { type: 'string' },
    class: { type: 'string' },

    active: { type: 'boolean', description: '`store-`' },
    disabled: { type: 'boolean', description: '`store-`' },
    hidden: { type: 'boolean', description: '`store-`' },
    waiting: { type: 'boolean', description: '`store-`' },

    'event-click': { action: 'event-click' },
    'event-mouseenter': { action: 'event-mouseenter' },
    'event-mouseleave': { action: 'event-mouseleave' }
  }
}

export const Primary = {
  args: {
    icon: Icon,

    label: 'button',
    title: 'click me',

    type: undefined,
    class: undefined,

    active: false,
    disabled: false,
    hidden: false,
    waiting: false
  }
}

export const Async = {
  args: {
    ...Primary.args,
    waiting: true
  }
}
