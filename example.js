'use strict'

const html = require('bel')
const Note = require('svg-midi-note')
const Grid = require('svg-midi-grid')
const Resizable = require('.')

const note = Note()
const resizable = Resizable()
const grid = new Grid()

const cellHeight = 10
const cellWidth = 20

const onresize = (height, width) => console.log(height, width)

const el = html`
  <svg width=400 height=200>
    ${grid.render({ height: 201, width: 401, cellHeight, cellWidth })}
    ${resizable.render({
      cellWidth,
      height: cellHeight,
      width: cellWidth,
      onresize,
      el: ({ height, width }) => note.render({
        height,
        width,
        velocity: 1
      })
    })}
  </svg>
`

document.body.appendChild(el)
