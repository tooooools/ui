import { render, h } from '../jsx'
import Backdrop from './Backdrop'

export default {
  title: 'Layout/<Backdrop>',
  render: args => render(h(Backdrop, args), null).nodes[0],
  argTypes: {
    id: { type: 'string' },
    class: { type: 'string' },

    'event-click': { action: 'event-click' },
    'event-open': { action: 'event-open' },
    'event-close': { action: 'event-close' }
  }
}

export const Primary = {}
