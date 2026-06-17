import style from './FileDropper.module.scss'

import { Component } from '../jsx'
import { $ } from '../state'
import Props from '../jsx/Props'

import noop from '../utils/noop'

import Button from './Button'

export default class FileDropper extends Component {
  static props = {
    label: Props.string,
    icon: Props.string,
    id: Props.string,
    class: [Props.string, Props.array, Props.object],
    style: [Props.string, Props.object]
  }

  $draggedOver = $(false)
  $files = $(null)

  #appliedTo = null

  handleDragStart = e => {
    if (!this.isVisible) return
    if (!e.dataTransfer.types.includes('Files')) return
    e.preventDefault()
    e.stopPropagation()

    this.$draggedOver.value = true
  }

  handleDrop = e => {
    if (!this.isVisible) return

    if (!e.dataTransfer.types.includes('Files')) {
      this.$files.value = null
      return
    }

    e.preventDefault()
    e.stopPropagation()

    this.$files.value = e.dataTransfer.files
    ;(this.props['event-drop'] ?? noop)(e, this)
    this.handleDragEnd(e)
  }

  handleDragEnd = e => {
    if (!this.isVisible) return

    if (!e.dataTransfer.types.includes('Files')) {
      this.$files.value = null
      return
    }

    e.preventDefault()
    e.stopPropagation()

    this.$draggedOver.value = false
  }

  afterMount () {
    this.#appliedTo = this.base.offsetParent ?? document.body
    this.#appliedTo.addEventListener('dragover', this.handleDragStart)
    this.#appliedTo.addEventListener('dragenter', this.handleDragStart)
    this.#appliedTo.addEventListener('dragleave', this.handleDragEnd)
    this.#appliedTo.addEventListener('dragend', this.handleDragEnd)
    this.#appliedTo.addEventListener('drop', this.handleDrop)
  }

  beforeDestroy () {
    this.#appliedTo?.removeEventListener('dragover', this.handleDragStart)
    this.#appliedTo?.removeEventListener('dragenter', this.handleDragStart)
    this.#appliedTo?.removeEventListener('dragleave', this.handleDragEnd)
    this.#appliedTo?.removeEventListener('dragend', this.handleDragEnd)
    this.#appliedTo?.removeEventListener('drop', this.handleDrop)
  }

  get isVisible () {
    return this.base.offsetParent !== null
  }

  template (props) {
    return (
      <div
        {...this.dataProps}
        id={props.id}
        class={[
          style['file-dropper'],
          { 'is-dragged-over': this.$draggedOver },
          props.class
        ]}
        style={props.style}
      >
        {props.children.length > 0
          ? props.children
          : ((props.icon || props.label)
              ? <Button icon={props.icon} label={props.label} tabIndex={-1} />
              : null
            )}
      </div>
    )
  }
}
