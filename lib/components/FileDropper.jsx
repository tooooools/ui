import style from './FileDropper.module.scss'

import { Component } from '../jsx'
import { writable } from '../state'

import Button from './Button'

import noop from '../utils/noop'

export default class FileDropper extends Component {
  beforeRender (props) {
    this.handleDragStart = this.handleDragStart.bind(this)
    this.handleDragEnd = this.handleDragEnd.bind(this)
    this.handleDrop = this.handleDrop.bind(this)

    this.state = {
      appliedTo: writable(undefined),
      draggedOver: writable(false),

      files: writable(null)
    }
  }

  template (props, state) {
    return (
      <div
        {...this.dataProps}
        id={props.id}
        class={[
          style['file-dropper'],
          {
            'is-dragged-over': state.draggedOver
          },
          ...(Array.isArray(props.class) ? props.class : [props.class])
        ]}
      >
        {props.children.length > 0
          ? props.children
          : (
              (props.icon || props.label) ? <Button icon={props.icon} label={props.label} tabIndex={-1} /> : null
            )}
      </div>
    )
  }

  afterMount (props) {
    this.state.appliedTo = this.base.offsetParent ?? document.body
    this.state.appliedTo.addEventListener('dragover', this.handleDragStart)
    this.state.appliedTo.addEventListener('dragenter', this.handleDragStart)
    this.state.appliedTo.addEventListener('dragleave', this.handleDragEnd)
    this.state.appliedTo.addEventListener('dragend', this.handleDragEnd)
    this.state.appliedTo.addEventListener('drop', this.handleDrop)
  }

  get isVisible () {
    return this.base.offsetParent !== null
  }

  handleDragStart (e) {
    if (!this.isVisible) return
    if (!e.dataTransfer.types.includes('Files')) return
    e.preventDefault()
    e.stopPropagation()

    this.state.draggedOver.set(true)
  }

  handleDrop (e) {
    if (!this.isVisible) return

    if (!e.dataTransfer.types.includes('Files')) {
      this.state.files.set(null)
      return
    }

    e.preventDefault()
    e.stopPropagation()

    this.state.files.set(e.dataTransfer.files)
    ;(this.props['event-drop'] ?? noop)(e, this)
    this.handleDragEnd(e)
  }

  handleDragEnd (e) {
    if (!this.isVisible) return

    if (!e.dataTransfer.types.includes('Files')) {
      this.state.files.set(null)
      return
    }

    e.preventDefault()
    e.stopPropagation()

    this.state.draggedOver.set(false)
  }

  beforeDestroy () {
    this.state.appliedTo?.removeEventListener('dragover', this.handleDragStart)
    this.state.appliedTo?.removeEventListener('dragenter', this.handleDragStart)
    this.state.appliedTo?.removeEventListener('dragleave', this.handleDragEnd)
    this.state.appliedTo?.removeEventListener('dragend', this.handleDragEnd)
    this.state.appliedTo?.removeEventListener('drop', this.drop)
  }
}
