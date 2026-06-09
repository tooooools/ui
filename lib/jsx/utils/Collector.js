const TYPES = ['nodes', 'components', 'refs', 'domEvents', 'storeEvents']

export default class Collector {
  constructor () {
    this.data = {}
    for (let i = 0; i < TYPES.length; i++) { this.data[TYPES[i]] = [] }
  }

  append (obj) {
    for (const k in obj) {
      const val = obj[k]
      if (Array.isArray(val)) this.data[k].push(...val)
      else this.data[k].push(val)
    }
  }

  set (obj) {
    for (const k in obj) { this.data[k] = obj[k] }
  }

  get () {
    return this.data
  }
}
