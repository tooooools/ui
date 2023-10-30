import { render, h } from '../jsx'
import Picker from './Picker'

import Icon from 'iconoir/icons/circle.svg?raw'
import IconOpen from 'iconoir/icons/nav-arrow-right.svg?raw'
import IconClose from 'iconoir/icons/nav-arrow-left.svg?raw'

import Button from './Button'

export default {
  title: 'Layout/<Picker>',
  render: args => render(h(Picker, args, ...[
    h(Button, {
      icon: Icon,
      label: 'Action #1',
      'event-click': () => console.log('click'),
      active: true
    }),
    h(Button, { icon: Icon, label: 'Action #2' }),
    h(Button, { icon: Icon, label: 'Action #3' }),
    h(Button, { icon: Icon, label: 'Action #4' })
  ]), null).nodes[0],
  argTypes: {
    iconOpen: { type: 'string', description: '`store-`' },
    iconClose: { type: 'string', description: '`store-`' },

    autoClose: { type: 'boolean' },
    autoOrder: { type: 'boolean' },
    label: { type: 'string', description: '`store-`' },
    title: { type: 'string', description: '`store-`' },

    id: { type: 'string' },
    class: { type: 'string' },

    open: { type: 'boolean', description: '`store-`' },
    disabled: { type: 'boolean', description: '`store-`' },
    hidden: { type: 'boolean', description: '`store-`' },

    'event-change': { action: 'event-change' },
    'event-open': { action: 'event-open' },
    'event-close': { action: 'event-close' },
    'event-mouseenter': { action: 'event-mouseenter' },
    'event-mouseleave': { action: 'event-mouseleave' }
  }
}

export const Primary = {
  args: {
    label: 'pick one',
    title: 'click to pick a new button',
    autoClose: false,

    iconOpen: IconOpen,
    iconClose: IconClose,

    id: undefined,
    class: undefined,

    open: false,
    disabled: false,
    hidden: false
  }
}

export const AutoClose = {
  args: {
    ...Primary.args,
    autoClose: true
  }
}
