import { render, h } from '../jsx'
import Toast from './Toast'

import Button from './Button'
import Icon from 'iconoir/icons/circle.svg?raw'

export default {
  title: 'Inputs/<Toast>',
  render: args => render(h(Toast, args), null).nodes[0],
  argTypes: {
    icon: { type: 'string', description: '`store-`' },
    tone: { type: 'string', description: '`store-`' },
    count: { type: 'string', description: '`store-`' },

    id: { type: 'string' },
    class: { type: 'string' },

    'event-click': { action: 'event-click' },
    'event-mouseenter': { action: 'event-mouseenter' },
    'event-mouseleave': { action: 'event-mouseleave' }
  }
}

export const Primary = {
  render: args => render(h(Toast, args, 'Hello world'), null).nodes[0],
  args: { icon: Icon }
}

export const StackTrace = {
  render: args => render(h(Toast, args, [
    h('p', {}, 'A problem occured'),
    h('pre', {}, 'Sapien eros platea nostra praesent neque\nFringilla ligula nam iaculis duis sed conubia mus cubilia, ultricies\nvivamus class pretium porttitor maximus maecenas ad mi molestie imperdiet sodales.\nSagittis elit litora netus mollis vel proin fames interdum parturient donec, tempor aliquam curabitur dignissim elementum porttitor posuere libero viverra. Diam mattis neque curae gravida tincidunt curabitur massa ornare sodales aenean, tortor eu parturient at ridiculus finibus a sociosqu.')
  ]), null).nodes[0],
  args: {
    icon: Icon,
    tone: 'error',
    count: 2,
  }
}

export const Display = {
  render: args => render(h(Button, {
    label: 'say hello',
    'event-click': e => Toast.display('hello world', { icon: Icon })
  })).nodes[0]
}
