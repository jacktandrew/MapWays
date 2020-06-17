const fs = require('fs')
const { saveMatrixAsPng } = require('../src/saveMatrixAsPng')
const { findRoutes } = require('../src/findRoutes')
const destinations = require('./destinations')
const polygon = require('./polygon')
const holesMap = require('./holes')

const holes = Object.values(holesMap)
// const png = './lake_washington.png'
const size = 1000

const init = async () => {
  const routes = await findRoutes({ destinations, holes, polygon, size })
  console.log('routes', routes)
}

init()
