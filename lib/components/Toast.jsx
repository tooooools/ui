import style from './Toast.module.scss'

import { Component, render } from '../jsx'
import { ensure, derived, writable } from '../state'

import Button from './Button'
import IconClose from 'iconoir/icons/cancel.svg?raw'

import noop from '../utils/noop'

export default class Toast extends Component {
  static display (message, { parent = Toast.container, ...props } = {}) {
    render(<Toast {...props} >{message}</Toast>, parent)
  }

  static get container () {
    return document.querySelector('.' + style['toast-container']) ?? render(<div class={style['toast-container']} />, document.body).nodes[0]
  }

  beforeRender (props) {
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      label: ensure(writable)(props['store-label'], props.label),
      title: ensure(writable)(props['store-title'], props.title),
      icon: ensure(writable)(props['store-icon'], props.icon),
      tone: ensure(writable)(props['store-tone'], props.tone),
      count: ensure(writable)(props['store-count'], props.count)
    }
  }

  template (props, state) {
    return (
      <div
        {...this.dataProps}
        id={props.id}
        class={[
          style.toast,
          {
            'has-icon': state.icon,
            'has-duration': props.duration
          },
          ...(Array.isArray(props.class) ? props.class : [props.class])
        ]}
        event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
        event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
        store-data-count={state.count}
        data-tone={state.tone}
        style={{
          '--toast-duration': (props.duration ?? -1) + 'ms'
        }}
      >
        <span
          ref={this.ref('icon')}
          class={style.toast__icon}
          store-data-count={state.count}
          store-innerHTML={state.icon}
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

  afterMount () {
    if (this.props.duration) {
      this.refs.timer = window.setTimeout(() => this.destroy(), this.props.duration)
    }
  }

  handleClose (e) {
    e.stopPropagation()
    this.destroy()
  }

  beforeDestroy () {
    ;(this.props['event-close'] || noop)()
    if (this.refs.timer) window.clearTimeout(this.refs.timer)
  }
}
