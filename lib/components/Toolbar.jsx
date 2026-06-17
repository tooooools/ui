import style from './Toolbar.module.scss'

import { Component } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

export default class Toolbar extends Component {
  static props = {
    compact: [Props.boolean, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    id: Props.string,
    style: [Props.string, Props.object]
  }

  $compact = $(this.props.compact)
  $disabled = $(this.props.disabled)
  $hidden = $(this.props.hidden)

  template (props) {
    return (
      <div
        {...this.dataProps}
        {...this.eventProps}
        id={props.id}
        class={[
          style.toolbar,
          {
            'is-compact': this.$compact,
            'is-disabled': this.$disabled,
            'is-hidden': this.$hidden
          },
          props.class
        ]}
        style={props.style}
      >
        {props.children}
      </div>
    )
  }
}
