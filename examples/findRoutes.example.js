const fs = require('fs')
const { saveMatrixAsPng } = require('../src/saveMatrixAsPng')
const { findRoutes } = require('../src/findRoutes')
const destinations = require('./destinations')
const polygon = require('./polygon')
const holesMap = require('./holes')

const holes = Object.values(holesMap)
const png = './lake_washington.png'
const size = 1000

const fromPolygon = async () => {
  const routes = await findRoutes({ destinations, holes, polygon, size })
  routes.forEach(route => console.log(JSON.stringify(route, null, 2)))
}

const fromPng = async () => {
  const routes = await findRoutes({ destinations, png, polygon })
  routes.forEach(route => console.log(JSON.stringify(route, null, 2)))
}

fromPng()
// fromPolygon()
