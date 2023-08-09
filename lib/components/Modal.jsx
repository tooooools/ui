import style from './Modal.module.scss'

import { Component } from '../jsx'
import { ensure, writable } from '../state'

import noop from '../utils/noop'
import classnames from 'classnames'

import Button from './Button'
import Backdrop from './Backdrop'
import IconClose from 'iconoir/icons/cancel.svg?raw'

export default class Modal extends Component {
  beforeRender (props) {
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      title: ensure(writable)(props['store-title'], props.title),
      tabs: ensure(writable)(props['store-tabs'], props.tabs),
      locked: ensure(writable)(props['store-locked'], props.locked)
    }
  }

  template (props, state) {
    return (
      <Backdrop
        ref={this.ref('backdrop')}
        event-open={props['event-open']}
        event-close={props['event-close']}
      >
        <div
          id={props.id}
          class={classnames(style.modal, props.class)}
          event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
          event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
        >
          <header class={style.modal__header}>
            <Button
              class={style.modal__title}
              icon={props.icon}
              store-label={state.title}
            />
            <Button
              class={style.modal__close}
              icon={IconClose}
              store-hidden={state.locked}
              event-click={this.handleClose}
            />
          </header>

          <div class={style.modal__content}>
            {props.children}
          </div>
        </div>
      </Backdrop>
    )
  }

  handleClose () {
    if (this.state.locked.get()) return
    this.refs.backdrop.close()
  }
}
