import style from './Toast.module.scss'

import { Component, render } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

import noop from '../utils/noop'

import Button from './Button'
import IconClose from 'iconoir/icons/cancel.svg?raw'

export default class Toast extends Component {
  static props = {
    label: [Props.string, Props.Signal],
    title: [Props.string, Props.Signal],
    icon: [Props.string, Props.Signal],
    tone: [Props.string, Props.Signal],
    count: [Props.number, Props.Signal],
    duration: Props.number,
    id: Props.string
  }

  static display (message, { parent = Toast.container, ...props } = {}) {
    render(<Toast {...props}>{message}</Toast>, parent)
  }

  static get container () {
    return document.querySelector('.' + style['toast-container']) ?? render(<div class={style['toast-container']} />, document.body).nodes[0]
  }

  $label = $(this.props.label)
  $title = $(this.props.title)
  $icon = $(this.props.icon)
  $tone = $(this.props.tone)
  $count = $(this.props.count)

  handleClose = e => {
    e.stopPropagation()
    this.destroy()
  }

  afterMount () {
    if (this.props.duration) {
      this.refs.timer = window.setTimeout(() => this.destroy(), this.props.duration)
    }
  }

  beforeDestroy () {
    ;(this.props['event-close'] || noop)()
    if (this.refs.timer) window.clearTimeout(this.refs.timer)
  }

  template (props) {
    return (
      <div
        {...this.dataProps}
        {...this.eventProps}
        id={props.id}
        class={[
          style.toast,
          {
            'has-icon': this.$icon,
            'has-duration': props.duration
          },
          props.class
        ]}
        data-count={this.$count}
        data-tone={this.$tone}
        style={{ '--toast-duration': (props.duration ?? -1) + 'ms' }}
      >
        <span
          ref={this.ref('icon')}
          class={style.toast__icon}
          data-count={this.$count}
          innerHTML={this.$icon}
        />

        <div class={style.toast__content}>
          {props.children}
        </div>

        <Button
          icon={IconClose}
          class='toast__btn--close'
          title='Effacer la notification'
          event-click={this.handleClose}
        />
      </div>
    )
  }
}
