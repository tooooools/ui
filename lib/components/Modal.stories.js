import { render, h } from '../jsx'
import Modal from './Modal'

import Icon from 'iconoir/icons/circle.svg?raw'
import Tabs from './Tabs'

export default {
  title: 'Layout/<Modal>',
  render: args => render(h(Modal, args), null).nodes[0],
  argTypes: {
    icon: { type: 'string' },
    title: { type: 'string', description: '`store-`' },

    id: { type: 'string' },
    class: { type: 'string' },

    locked: { type: 'boolean', description: '`store-`' },

    'event-open': { action: 'event-open' },
    'event-close': { action: 'event-close' },
    'event-mouseenter': { action: 'event-mouseenter' },
    'event-mouseleave': { action: 'event-mouseleave' }
  }
}

export const Primary = {
  render: args => render(h(Modal, args, ...[
    h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.')
  ]), null).nodes[0],
  args: {
    icon: Icon,
    title: 'modal',
    locked: false
  }
}

export const Overflowing = {
  render: args => render(h(Modal, args, ...[
    h('p', {}, ...[
      h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.'),
      h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.'),
      h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.'),
      h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.'),
      h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.')
    ])
  ]), null).nodes[0],
  args: {
    icon: Icon,
    title: 'modal',
    locked: false
  }
}

export const WithTabs = {
  render: args => render(h(Modal, args, ...[
    h(Tabs, {
      tabs: [
        { icon: Icon, label: 'One' },
        { icon: Icon, label: 'Two' },
        { icon: Icon, label: 'Three' }
      ]
    }, ...[
      Tabs.panel(h('p', {}, 'Odio posuere et eleifend nibh mus neque massa conubia vivamus imperdiet sem, luctus vestibulum egestas ridiculus est ultrices sociosqu lectus congue at. Faucibus felis iaculis cursus eleifend tellus scelerisque quis semper nunc class dis id et maximus nulla viverra lobortis, eu nostra luctus integer mattis proin vitae dictumst dignissim enim justo ex parturient bibendum himenaeos. Mauris urna dolor ipsum facilisis volutpat sem integer parturient nibh aliquet mus donec sodales curae, at condimentum orci vulputate etiam erat blandit consectetur molestie lacus quisque lacinia.')),
      Tabs.panel(
        h('p', {}, ...[
          h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.'),
          h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.'),
          h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.'),
          h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.'),
          h('p', {}, 'Rhoncus donec montes at torquent facilisis metus molestie fermentum dui vehicula a, platea gravida tortor faucibus auctor mattis luctus mi habitant dictumst. Dictum pulvinar cursus luctus convallis lectus nam turpis placerat accumsan senectus euismod ridiculus ante eleifend tristique vel tincidunt, litora pretium elementum lacinia ut faucibus proin enim ligula potenti rutrum nullam conubia purus suspendisse eu. Commodo efficitur dui cras metus gravida mattis nullam at praesent primis senectus dapibus venenatis habitasse eleifend, dignissim aliquam ultricies sem sit vel vulputate nunc adipiscing interdum consectetur himenaeos ornare.')
        ])
      ),
      Tabs.panel(h('p', {}, 'Ipsum quam orci nunc facilisis dapibus in, penatibus molestie lacus nullam id, dolor nibh sapien arcu turpis. Semper sociosqu lacus commodo cursus auctor sit sem himenaeos, augue rutrum rhoncus purus orci vitae primis dignissim euismod, suspendisse maecenas nibh parturient maximus porttitor quis. Tristique nibh pharetra ultrices ut sapien dignissim rutrum, mauris cubilia at ultricies quisque lectus.'))
    ])
  ]), null).nodes[0],
  args: Primary.args
}
