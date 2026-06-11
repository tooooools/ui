// Create a VNode (virtual DOM element)

function h (type, props) {
  if (type === undefined) {
    throw new TypeError('h() called with undefined type: cannot render <undefined /> component')
  }

  const vn = {}

  vn.vnode = true
  vn.type = type
  vn.props = props || {}
  vn.children = [].concat.apply([], [].slice.call(arguments, 2)) // array & flatten

  vn.isInstance = (
    type &&
		type.template &&
		typeof type.template === 'function'
  )

  vn.isComponent = (
    typeof type === 'function' &&
		type.prototype &&
		typeof type.prototype.render === 'function'
  )

  vn.isStateless = typeof type === 'function' && !vn.isComponent
  vn.isDom = typeof type === 'string'

  return vn
}

h.f = p => p.children

export default h
