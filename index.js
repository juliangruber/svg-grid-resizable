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
        ${c.props.el({ height: c.props.height, width: c.props.width })}
        <rect
          x=${c.props.width - width}
          y=0
          width=${width}
          height=${c.props.height}
          fill=transparent
          onmousedown=${dragstart}
          style="cursor:e-resize"
        />
      </g>
    `
  })
  const dragstart = ev => {
    ev.stopPropagation()
    c.state.offsetX = ev.offsetX
    c._element.removeAttribute('onmousedown')
    window.addEventListener('mouseup', dragend)
    window.addEventListener('mousemove', dragmove)
    document.body.style.cursor = 'e-resize'
  }
  const dragend = () => {
    window.removeEventListener('mouseup', dragend)
    window.removeEventListener('mousemove', dragmove)
    document.body.style.cursor = 'default'
    c.props.onresize({
      height: c.state.height || c.props.height,
      width: c.state.width
    })
  }
  const dragmove = ev => {
    const prev = {
      width: c.state.width
    }
    const offsetX = ev.offsetX - c.state.offsetX
    c.state.width = Math.round(offsetX / c.props.cellWidth) *
      c.props.cellWidth +
      c.props.width
    c.state.width = Math.max(c.state.width, c.props.cellWidth)
    if (c.state.width === prev.width) return
    c._element.setAttribute('width', c.state.width)
    c._element.lastElementChild.setAttribute('x', c.state.width - width)
    c.props.el({
      height: c.props.height,
      width: c.state.width
    })
  }
  return c
}
