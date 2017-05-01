'use strict'

const html = require('bel')
const morph = require('nanomorph')
const Note = require('svg-midi-note')
const Grid = require('svg-midi-grid')
const Resizable = require('.')

const note = Note()
const resizable = Resizable()
const grid = new Grid()

const cellHeight = 10
const cellWidth = 20

const state = {
  height: cellHeight,
  width: cellWidth
}

const onresize = ({ height, width }) => {
  console.log(height, width)
  state.height = height
  state.width = width
  console.log('state', state)
  update()
}

const render = () => html`
  <svg width=400 height=200>
    ${grid.render({ height: 201, width: 401, cellHeight, cellWidth })}
    ${resizable.render({
      cellWidth,
      height: state.height,
      width: state.width,
      onresize,
      el: ({ height, width }) => note.render({
        height,
        width,
        velocity: 1
      })
    })}
  </svg>
`

const update = () => morph(el, render())
const el = render()
document.body.appendChild(el)
