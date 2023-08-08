/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    '../lib/**/*.mdx',
    '../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  core: {
    disableTelemetry: true
  },
  addons: ['@storybook/addon-essentials',],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    autodocs: true
  }
}

export default config
