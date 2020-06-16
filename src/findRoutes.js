const Jimp = require('jimp')
const PF = require('pathfinding')
const {
  convertCoordsToLatLng,
  convertLatLngToCoords,
  convertLatLngToMatrix,
} = require('./utils')

const convertPngToMatrix = async (png) => {
  const image = await Jimp.read(png)
  const { data, width, height } = image.bitmap
  const limit = width * 4
  const matrix = []

  let boole, digit, row = [], i, x, y

  for (i = 0; i < data.length; i += 4) {
    digit = data[i]
    boole = (digit === 255) ? '0' : '1'
    y = Math.floor(i / limit)
    x = (i % limit) / 4
    row.push(boole)

    if (x === width - 1) {
      matrix.push(row)
      row = []
    }
  }

  return matrix
}

const getMatrix = async ({ png, polygon, holes, size }) => {
  if (png) {
    return await convertPngToMatrix(png)
  } else {
    return convertLatLngToMatrix({ polygon, holes, size })
  }
}

const findRoutes = async ({ polygon, holes, png, destinations, size = 800 }) => {
  const matrix = await getMatrix({ png, polygon, holes, size })
  const latLngs = [...destinations, ...polygon]
  const { coords } = convertLatLngToCoords(latLngs, size)
  const destinationCoords = coords.slice(0, destinations.length)
  // Ensure each launch is on a free space
  destinationCoords.forEach(([x, y]) => { matrix[y][x] = '0' })

  const grid = new PF.Grid(matrix)
  const finder = new PF.BiAStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true,
  })

  const routes = destinationCoords.map((start, i) => {
    const { name, place_id } = destinations[i]

    console.log(`Finding routes for ${name}.`)

    const route = destinationCoords.reduce((acc, finish, j) => {
      const gridClone = grid.clone()
      const key = destinations[j].place_id
      if (i === j) return acc
      const path = finder.findPath(...start, ...finish, gridClone)
      if (path.length) {
        const smoothPath = PF.Util.smoothenPath(gridClone, path)
        const coords = convertCoordsToLatLng(smoothPath, destinations[i], destinations[j])
        return { ...acc, [key]: coords }
      } else {
        return acc
      }
    }, {})

    return route
  })

  return routes
}

module.exports = { findRoutes }
