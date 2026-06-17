import style from './Button.module.scss'

import { Component } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

export default class Button extends Component {
  static props = {
    label: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    icon: [Props.string, Props.Signal],
    active: [Props.boolean, Props.Signal],
    disabled: [Props.boolean, Props.Signal],
    hidden: [Props.boolean, Props.Signal],
    waiting: [Props.boolean, Props.Signal],
    type: Props.string,
    id: Props.string,
    tabindex: Props.number,
    style: [Props.string, Props.object]
  }

  $label = $(this.props.label)
  $title = $(this.props.title)
  $icon = $(this.props.icon)
  $active = $(this.props.active)
  $disabled = $(this.props.disabled)
  $hidden = $(this.props.hidden)
  $waiting = $(this.props.waiting)

  handleClick = async e => {
    if (!this.props['event-click']) return
    if (this.$disabled.value) return

    this.base.blur()
    if (this.$waiting.value) return e.preventDefault()
    this.$waiting.value = true

    try {
      await this.props['event-click'](e, this)
    } finally {
      // Testing for mounted because event-click may have destroyed this component
      if (this.mounted) {
        this.$waiting.value = false

        // Trigger animation on .button__icon if any
        if (this.refs?.icon) {
          this.refs.icon.style.animation = 'none'
          void this.refs.icon.offsetHeight // eslint-disable-line no-void
          this.refs.icon.style.animation = null
        }
      }
    }
  }

  template (props) {
    return (
      <button
        {...this.dataProps}
        {...this.eventProps}
        type={props.type}
        id={props.id}
        tabIndex={props.tabindex}
        class={[
          style.button,
          {
            'has-click': Boolean(props['event-click']),
            'has-icon': this.$icon,
            'is-active': this.$active,
            'is-disabled': this.$disabled,
            'is-hidden': this.$hidden,
            'is-waiting': this.$waiting
          },
          props.class
        ]}
        style={props.style}
        title={this.$title}
        disabled={this.$disabled}
        event-click={this.handleClick}
      >
        <span
          ref={this.ref('icon')}
          class={style.button__icon}
          innerHTML={this.$icon}
        />
        <label class={style.button__label} innerHTML={this.$label} />
        {props.children}
      </button>
    )
  }
}
