import { render, h } from '../jsx'
import Button from './Button'

export default {
  title: 'Button',
  render: (args) => render(h(Button, args), null).nodes[0],
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    label: {
      control: 'text'
    },
    'event-click': { action: 'event-click' }
  }
}

export const Primary = {
  args: {
    label: 'Button'
  }
}
