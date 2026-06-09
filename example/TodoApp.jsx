import { Component } from '/lib/jsx'
import { $, not } from '/lib/state'

import style from './TodoApp.module.scss'
import TodoItem from './TodoItem.jsx'

let nextId = 0

export default class TodoApp extends Component {
  static props = {}

  $input = $('')
  $todos = $([])
  $total = $(this.$todos, todos => todos.length)
  $doneCount = $(this.$todos, todos => todos.filter(t => t.done).length)
  $pendingCount = $(this.$todos, todos => todos.filter(t => !t.done).length)

  $summary = $(
    [this.$doneCount, this.$total],
    ([done, total]) => total === 0
      ? 'Add your first task above.'
      : `${done} / ${total} completed`
  )

  $pendingLabel = $(
    this.$pendingCount,
    n => n === 1 ? '1 item left' : `${n} items left`
  )

  $hasDone = $(this.$doneCount, n => n > 0)
  $noDone = not(this.$hasDone)

  #todoItems = new Map()

  #countSubscribers (signal) {
    let n = 0
    let node = signal._first
    while (node) { n++; node = node.next }
    return n
  }

  afterRender () {
    this.watch(this.$todos, this.renderList.bind(this), { immediate: true })
  }

  beforeDestroy () {
    for (const { component } of this.#todoItems.values()) {
      if (!component.destroyed) component.destroy()
    }
    this.#todoItems.clear()
  }

  template () {
    return (
      <div class={style.app}>

        <h1 class={style.title}>Todos</h1>
        <p class={style.subtitle} textContent={this.$summary} />

        <div class={style['input-row']}>
          <input
            ref={this.ref('input')}
            type='text'
            placeholder='What needs to be done?'
            class={style.input}
            event-keydown={e => { if (e.key === 'Enter') this.handleAdd() }}
            event-input={e => { this.$input.value = e.target.value }}
          />
          <button
            class={style['add-button']}
            event-click={() => this.handleAdd()}
          >
            Add
          </button>
        </div>

        <ul ref={this.ref('list')} class={style.list} />

        <div class={style.footer}>
          <span class={style['pending-label']} textContent={this.$pendingLabel} />
          <button
            class={[style['clear-button'], { 'is-hidden': this.$noDone }]}
            event-click={() => this.handleClearDone()}
          >
            Clear completed
          </button>
        </div>

        <div class={style.debug}>
          <strong>Debug — watch() cleanup</strong>
          <p ref={this.ref('debugInfo')} />
          <button class={style['stress-button']} event-click={this.handleStressTest}>
            Stress test (add 5 → toggle all → delete all × 3)
          </button>
        </div>

      </div>
    )
  }

  updateDebug () {
    if (!this.refs.debugInfo) return
    const itemCount = this.#todoItems.size
    const todosSubscribers = this.#countSubscribers(this.$todos)
    const itemSubscribers = [...this.#todoItems.values()]
      .reduce((sum, { $done }) => sum + this.#countSubscribers($done), 0)
    this.refs.debugInfo.textContent =
      `$todos subscribers: ${todosSubscribers} | ` +
      `live TodoItems: ${itemCount} | ` +
      `$done subscribers total: ${itemSubscribers} ` +
      `(expected: ${itemCount} per item = ${itemCount})`
  }

  handleStressTest = async () => {
    for (let round = 0; round < 3; round++) {
      for (let i = 0; i < 5; i++) {
        this.$todos.value = [...this.$todos.value, { id: nextId++, label: `Stress ${nextId}`, done: false }]
      }
      this.$todos.value = this.$todos.value.map(t => ({ ...t, done: true }))
      this.$todos.value = []
    }
    this.updateDebug()
  }

  renderList (todos) {
    const nextIds = new Set(todos.map(t => t.id))

    for (const [id, { component }] of this.#todoItems) {
      if (!nextIds.has(id)) {
        if (!component.destroyed) component.destroy()
        this.#todoItems.delete(id)
      }
    }

    for (const todo of todos) {
      if (this.#todoItems.has(todo.id)) {
        this.#todoItems.get(todo.id).$done.value = todo.done
      } else {
        const $done = $(todo.done)
        const result = this.render(
          <TodoItem
            id={todo.id}
            done={$done}
            label={$(todo.label)}
            event-toggle={(id, done) => this.handleToggle(id, done)}
            event-delete={id => this.handleDelete(id)}
          />,
          this.refs.list
        )
        this.#todoItems.set(todo.id, { component: result.components[0], $done })
      }
    }

    this.updateDebug()
  }

  handleAdd () {
    const label = this.$input.value.trim()
    if (!label) return

    this.$todos.value = [...this.$todos.value, { id: nextId++, label, done: false }]

    this.$input.value = ''
    this.refs.input.value = ''
    this.refs.input.focus()
  }

  handleToggle (id, done) {
    this.$todos.value = this.$todos.value.map(t => t.id === id ? { ...t, done } : t)
  }

  handleDelete (id) {
    this.$todos.value = this.$todos.value.filter(t => t.id !== id)
  }

  handleClearDone () {
    this.$todos.value = this.$todos.value.filter(t => !t.done)
  }
}
