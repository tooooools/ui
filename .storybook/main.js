export default {
  stories: [
    '../lib/**/*.mdx',
    '../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  core: {
    disableTelemetry: true
  },
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    defaultName: 'Documentation'
  }
}
