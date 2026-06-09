import style from './Toolbar.module.scss'

import { Component } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

import noop from '../utils/noop'

export default class Toolbar extends Component {
  static props = {
    compact: [Props.boolean, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    id: Props.string
  }

  $compact = $(this.props.compact)
  $disabled = $(this.props.disabled)
  $hidden = $(this.props.hidden)

  template (props) {
    return (
      <div
        {...this.dataProps}
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
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
      >
        {props.children}
      </div>
    )
  }
}
