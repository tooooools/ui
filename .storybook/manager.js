import { addons } from '@storybook/manager-api'

addons.setConfig({
  showPanel: true,
  panelPosition: 'bottom',
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: true
  }
})
