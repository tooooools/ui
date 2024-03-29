import { render, h } from '../jsx'
import Input from './Input'

import Icon from 'iconoir/icons/circle.svg?raw'

export default {
  title: 'Inputs/<Input>',
  render: args => render(h(Input, args), null).nodes[0],
  argTypes: {
    icon: { type: 'string', description: '`store-`' },

    label: { type: 'string', description: '`store-`' },
    title: { type: 'string', description: '`store-`' },
    before: { type: 'string', description: '`store-`' },
    after: { type: 'string', description: '`store-`' },
    placeholder: { type: 'string', description: '`store-`' },
    accept: { type: 'string', description: '`store-`' },
    multiple: { type: 'boolean', description: '`store-`' },
    size: { type: 'string', description: 'As defined in HTML, but with `auto` handled as well' },
    autoSelectAll: { type: 'boolean' },

    type: { type: 'string' },
    id: { type: 'string' },
    class: { type: 'string' },
    editOnDblClick: { type: 'boolean', description: 'Focus input only on dblClick' },

    active: { type: 'boolean', description: '`store-`' },
    disabled: { type: 'boolean', description: '`store-`' },
    hidden: { type: 'boolean', description: '`store-`' },

    'event-input': { action: 'event-input' },
    'event-click': { action: 'event-click' },
    'event-dblclick': { action: 'event-dblclick' },
    'event-focus': { action: 'event-focus' },
    'event-blur': { action: 'event-blur' },
    'event-mouseenter': { action: 'event-mouseenter' },
    'event-mouseleave': { action: 'event-mouseleave' }
  }
}

export const Primary = {
  args: {
    icon: Icon,

    title: 'click me',
    placeholder: 'type something…',

    type: 'text',
    class: undefined,
    autoSelectAll: false,

    active: false,
    disabled: false,
    hidden: false,
    waiting: false
  }
}

export const Number = {
  args: {
    ...Primary.args,
    type: 'number',
    before: 'font-size: ',
    after: 'px',
    placeholder: 10
  }
}

export const File = {
  args: {
    ...Primary.args,
    label: 'choose file',
    type: 'file',
    accept: 'image/png',
    multiple: true
  }
}

export const SizeAuto = {
  args: {
    ...Primary.args,
    size: 'auto'
  }
}

export const Async = {
  args: {
    ...Primary.args,
    waiting: true
  }
}
