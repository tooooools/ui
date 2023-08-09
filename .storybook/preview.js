import '@storybook/addon-console';
import '../lib/style/preview.scss'

export default {
  globals: {
    backgrounds: {
      grid: true
    }
  },
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: "^event-.*" },
    backgrounds: { default: 'dark' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      }
    }
  }
}
