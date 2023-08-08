import { render, h } from '../jsx'
import Range from './Range'

import Icon from 'iconoir/icons/empty-page.svg?raw'

export default {
  title: 'Inputs/<Range>',
  render: (args) => render(h(Range, args), null).nodes[0],
  // SEE https://storybook.js.org/docs/react/api/arg-types
  argTypes: {
    icon: { type: 'string' },

    label: { type: 'string', description: 'store-' },
    title: { type: 'string', description: 'store-' },
    value: { type: 'number', description: 'store-' },
    min: { type: 'number', description: 'store-' },
    max: { type: 'number', description: 'store-' },
    step: { type: 'number', description: 'store-' },

    debounce: { type: 'number', description: 'debounce `event-input` in ms' },

    class: { type: 'string' },

    disabled: { type: 'boolean', description: 'store-' },
    hidden: { type: 'boolean', description: 'store-' },

    'event-input': { action: 'event-input' },
    'event-mouseenter': { action: 'event-mouseenter' },
    'event-mouseleave': { action: 'event-mouseleave' }
  }
}

export const Primary = {
  args: {
    icon: Icon,

    label: 'range',
    title: 'slide me',
    value: 50,
    min: 0,
    max: 100,
    step: 1,

    class: undefined,

    disabled: false,
    hidden: false
  }
}
