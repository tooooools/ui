export default {
  stories: [
    '../lib/**/*.mdx',
    '../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  core: {
    disableTelemetry: true
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-console'
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation'
  }
}
