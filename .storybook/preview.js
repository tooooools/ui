import '../lib/style/preview.scss'

export default {
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: /^event-.*/ },
    backgrounds: { default: 'dark' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      }
    }
  },

  initialGlobals: {
    backgrounds: {
      grid: true
    }
  },

  tags: ['autodocs']
}
