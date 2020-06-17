const { saveMatrixAsPng } = require('../src/saveMatrixAsPng')
const { findRoutes } = require('../src/findRoutes')
const destinations = require('./destinations')
const polygon = require('./polygon')
const holes = require('./holes')

const size = 1000

saveMatrixAsPng('lake_washington.png', polygon, holes, size)
