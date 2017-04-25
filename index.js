'use strict'

const component = require('microcomponent')
const html = require('bel')

module.exports = () => {
  const width = 2
  const c = component({
    name: 'svg-grid-resizable',
    pure: true,
    state: {
      width: null,
      offsetX: null
    }
  })
  c.on('render', () => {
    return html`
      <g
        width=${c.props.width}
      >
        ${c.props.el({
          height: c.props.height,
          width: c.props.width
        })}
        <rect
          x=${c.props.width - width}
          y=0
          width=${width}
          height=${c.props.height}
          fill=green
          onmousedown=${dragstart}
        />
      </g>
    `
  })
  const dragstart = ev => {
    c.state.offsetX = ev.offsetX
    c._element.removeAttribute('onmousedown')
    window.addEventListener('mouseup', dragend)
    window.addEventListener('mousemove', dragmove)
  }
  const dragend = () => {
    window.removeEventListener('mouseup', dragend)
    window.removeEventListener('mousemove', dragmove)
    c.emit(
      'render',
      Object.assign(c.props, {
        width: c.state.width
      })
    )
    c.props.onresize({
      height: c.props.height,
      width: c.props.width
    })
  }
  const dragmove = ev => {
    const prev = {
      width: c.state.width
    }
    c.state.width = Math.round(
      (ev.offsetX - c.state.offsetX) / c.props.cellWidth
    ) *
      c.props.cellWidth +
      c.props.width
    if (c.state.width === prev.width) return
    c._element.setAttribute('width', c.state.width)
    c._element.children[c._element.children.length - 1].setAttribute(
      'x',
      c.state.width - width
    )
    c.props.el({
      height: c.props.height,
      width: c.state.width
    })
  }
  return c
}
