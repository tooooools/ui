import style from './Modal.module.scss'

import { Component, render } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

import noop from '../utils/noop'

import Button from './Button'
import Backdrop from './Backdrop'
import IconClose from 'iconoir/icons/cancel.svg?raw'

export default class Modal extends Component {
  static props = {
    title: [Props.string, Props.Signal],
    icon: [Props.string, Props.Signal],
    locked: [Props.boolean, Props.Signal],
    id: Props.string,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  }

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

      render(<Modal event-close={onClose} {...props}>{props.children}</Modal>, parent)
    })
  }

  /**
   * Display a confirmation Modal
   * @param  {string|Element} message - Confirmation message, rendered as HTML when a string
   * @param  {Object} [props] - Modal jsx props, plus no/yes Button props to customize the buttons
   * @param  {Element} [parent=document.body] - Element to render the Modal
   * @return {Promise<boolean>} resolve true when confirmed, false when cancelled/closed
   */
  static async confirm (message, { no = {}, yes = {}, ...props } = {}, parent = document.body) {
    return new Promise(resolve => {
      let confirmed = false
      let modal

      const onClose = (...args) => {
        ;(props['event-close'] ?? noop)(...args)
        resolve(confirmed)
      }

      this.display({
        ...props,
        ref: instance => {
          props.ref?.(instance)
          modal = instance
        },
        'event-close': onClose,
        children: [
          <div innerHTML={message} />,
          <footer>
            <Button
              label='Cancel'
              {...no}
              event-click={() => modal.handleClose()}
            />
            <Button
              label='Confirm'
              {...yes}
              event-click={() => {
                confirmed = true
                modal.handleClose()
              }}
            />
          </footer>
        ]
      }, parent)
    })
  }

  $title = $(this.props.title)
  $locked = $(this.props.locked)

  handleClick = e => {
    if (e.target === this.base) this.handleClose()
  }

  handleClose = () => {
    if (this.$locked.value) return
    this.refs.backdrop.close()
  }

  template (props) {
    return (
      <Backdrop
        ref={this.ref('backdrop')}
        locked={this.$locked}
        event-open={props['event-open']}
        event-close={props['event-close']}
        event-click={this.handleClick}
      >
        <div
          {...this.dataProps}
          id={props.id}
          class={[
            style.modal,
            props.class
          ]}
          style={props.style}
          event-mouseenter={e => (props['event-mouseenter'] ?? noop)(e, this)}
          event-mouseleave={e => (props['event-mouseleave'] ?? noop)(e, this)}
        >
          <header class={style.modal__header}>
            <Button
              class={style.modal__title}
              icon={props.icon}
              label={this.$title}
            />
            <Button
              class={style.modal__close}
              icon={IconClose}
              hidden={this.$locked}
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
}
