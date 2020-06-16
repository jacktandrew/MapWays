const fs = require('fs')
const { saveMatrixAsPng } = require('../src/saveMatrixAsPng')
const { findRoutes } = require('../src/findRoutes')
const destinations = require('./destinations')
const polygon = require('./polygon')
const holes = require('./holes')

const png = './lake_washington.png'
const size = 1000

// saveMatrixAsPng('lake_washington.png', polygon, holes, size)

const init = async () => {
  const routes = await findRoutes({ destinations, png, polygon, size })
  console.log('routes', routes)
}

init()
