import { render, h } from '../jsx'
import FileDropper from './FileDropper'
import Modal from './Modal'

import Icon from 'iconoir/icons/circle.svg?raw'

export default {
  title: 'Inputs/<FileDropper>',
  render: args => render(h(Modal, { title: 'Drop your file' }, ...[
    h('p', {}, 'Drop your file here'),
    h(FileDropper, args)
  ]), null).nodes[0],
  argTypes: {
    icon: { type: 'string', description: '`store-`' },
    label: { type: 'string', description: '`store-`' },

    id: { type: 'string' },
    class: { type: 'string' },

    'event-drop': { action: 'event-drop' }
  }
}

export const Primary = {
  args: {
    icon: Icon,
    label: 'drop your file here'
  }
}
