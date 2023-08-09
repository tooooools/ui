import { render, h } from '../jsx'
import Tabs from './Tabs'

import Icon from 'iconoir/icons/circle.svg?raw'

export default {
  title: 'Layout/<Tabs>',
  argTypes: {
    value: { type: 'number', description: '`store-`' },
    options: {
      type: 'array',
      description: [
        '`store-`',
        '`[{ icon?: string, label?: string, disabled?: boolean, hidden?: boolean }, …]`'
      ].map(l => `<p>${l}</p>`).join('\n')
    },

    id: { type: 'string' },
    class: { type: 'string' },

    'event-change': { action: 'event-change' }
  }
}

export const Primary = {
  render: args => render(h(Tabs, args, ...[
    Tabs.panel(h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.')),
    Tabs.panel(h('p', {}, 'Hendrerit gravida enim natoque mauris nisl magna ac nec aliquet sed consectetur efficitur aptent, justo proin nostra volutpat rutrum suspendisse a vehicula lorem mollis varius. Dapibus rhoncus augue eleifend facilisis enim semper ornare turpis, sed imperdiet commodo non dolor elit. Tempor parturient enim nec libero posuere feugiat euismod ac lobortis elit, pellentesque mollis lacinia magna lacus sit suscipit maximus ad, etiam leo nisl imperdiet mauris viverra a urna justo.')),
    Tabs.panel(h('p', {}, 'Aptent nullam tristique ut non justo malesuada vel efficitur risus pulvinar feugiat, sodales massa ultrices habitant class suspendisse porta sit suscipit. Curae imperdiet luctus egestas scelerisque odio tempus auctor, vel leo rutrum eros faucibus condimentum. Rutrum sem habitasse malesuada maximus integer elit consequat curae platea ligula mauris commodo pretium adipiscing, tristique ad at sociosqu ultrices vivamus elementum ridiculus laoreet phasellus tortor pharetra.')),
    Tabs.panel(h('p', {}, 'Metus efficitur pulvinar ultrices cras accumsan dictumst eros ipsum interdum auctor pretium nec, magnis laoreet tortor nullam per sociosqu mollis aliquet porttitor feugiat commodo. Gravida nunc accumsan facilisi cubilia mus purus ante neque cras risus, augue non velit ex vehicula ad etiam penatibus mi. Phasellus nullam neque quis elit luctus euismod vel massa ad proin eleifend molestie fusce, magnis et pretium mattis varius dolor egestas ut nam eros ligula.'))
  ]), null).nodes[0],
  args: {
    value: 0,
    tabs: [
      { icon: Icon, label: 'one' },
      { icon: Icon, label: 'two' },
      { icon: Icon, label: 'three', disabled: true },
      { icon: Icon, label: 'four' },
      { icon: Icon, label: 'top secret', hidden: true }
    ]
  }
}
