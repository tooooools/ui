import style from './Modal.module.scss'

import { Component, render } from '../jsx'
import { ensure, writable } from '../state'

import noop from '../utils/noop'

import Button from './Button'
import Backdrop from './Backdrop'
import IconClose from 'iconoir/icons/cancel.svg?raw'

export default class Modal extends Component {
  /**
   * Display a Modal in a functional way
   * @param  {Object} props - Modal jsx props
   * @param  {Element} [parent=document.body] - Element to render the Modal
   * @return {Promise} resolve when the Modal is closed
   */
  static async display (props, parent = document.body) {
    return new Promise(resolve => {
      const onClose = (...args) => {
        ;(props['event-close'] ?? noop)(...args)
        resolve(...args)
      }

      render(<Modal event-close={onClose} {...props} />, parent)
    })
  }

  /**
   * WIP
   * @param  {Function} callback [description]
   * @param  {[type]}   message  [description]
   * @param  {[type]}   props    [description]
   * @param  {[type]}   parent   [description]
   * @return {[type]}            [description]
   */
  static async confirm (callback, message, props, parent = document.body) {
    return new Promise(resolve => {
      const onClose = (...args) => {
        ;(props['event-close'] ?? noop)(...args)
        resolve(...args)
      }
      this.display({
        ...props,
        'event-close': onClose,
        children: [
          typeof props.message === 'string'
            ? <div innerHTML={props.message} />
            : props.message,
          ...(props.children ?? [])
        ]
      }, parent)
    })
  }

  beforeRender (props) {
    this.handleClick = this.handleClick.bind(this)
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
        store-locked={state.locked}
        event-open={props['event-open']}
        event-close={props['event-close']}
        event-click={this.handleClick}
      >
        <div
          {...this.dataProps}
          id={props.id}
          class={[
            style.modal,
            ...(Array.isArray(props.class) ? props.class : [props.class])
          ]}
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

  handleClick (e) {
    if (e.target === this.base) this.handleClose()
  }

  handleClose () {
    if (this.state.locked.get()) return
    this.refs.backdrop.close()
  }
}
