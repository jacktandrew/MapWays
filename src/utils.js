const pointInPolygon = (point, vertices) => {
  const x = point[0]
  const y = point[1]

  var inside = false
  var intersect, xi, xj, yi, yj

  for (var i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    xi = vertices[i][0]
    yi = vertices[i][1]
    xj = vertices[j][0]
    yj = vertices[j][1]

    intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)

    if (intersect) inside = !inside
  }

  return inside
}

const convertCoordsToMatrix = (polygonCoords, holeCoords, xRange, yRange) => {
  var binaryGrid = [], boole, insideHoles, insidePolygon, row, str, x, y

  polygonCoords.push(polygonCoords[0]) // Connect head to tail

  for (y = 0; y < yRange; y++) {
    row = []
    for (x = 0; x < xRange; x++) {
      insidePolygon = pointInPolygon([x, y], polygonCoords) ? 0 : 1
      insideHoles = holeCoords.map(hole => pointInPolygon([x, y], hole) ? 1 : 0)
      boole = Math.max(insidePolygon, ...insideHoles)
      row[x] = boole
    }
    binaryGrid[y] = row
    const percent = (y / yRange * 100).toFixed(1)

    process.stdout.write(`  ${percent}% complete\r`)
  }

  process.stdout.write('Done!\n')

  return binaryGrid
}

const getInfo = (latLngs, size = 800) => {
  const [lngs, lats] = latLngs.reduce((acc, { latitude, longitude }) => {
    return [
      [...acc[0], longitude],
      [...acc[1], latitude]
    ]
  }, [[], []])

  const latMax = Math.max(...lats)
  const latMin = Math.min(...lats)
  const lngMax = Math.max(...lngs)
  const lngMin = Math.min(...lngs)
  const latRange = latMax - latMin
  const lngRange = lngMax - lngMin
  const ratio = latRange / lngRange
  const yRange = Math.round(ratio * size)
  const xRange = size
  const latFactor = yRange / latRange
  const lngFactor = xRange / lngRange

  return {
    latFactor,
    latMax,
    latMin,
    latRange,
    lngFactor,
    lngMax,
    lngMin,
    lngRange,
    xRange,
    yRange,
  }
}

const convertLatLngToCoords = (latLngs, size = 800) => {
  const { latFactor, latMax, lngFactor, lngMin, xRange, yRange } = getInfo(latLngs, size)

  const coords = latLngs.map(({ latitude, longitude }) => {
    const lngDelta = Math.abs(lngMin) - Math.abs(longitude)
    const latDelta = Math.abs(latMax) - Math.abs(latitude)

    return [
      Math.floor(lngDelta * lngFactor),
      Math.floor(latDelta * latFactor),
    ]
  })

  return { coords, xRange, yRange }
}

const convertLatLngToMatrix = (polygon, holes, size = 800) => {
  const flattened = holes.reduce((acc, hole) => [...acc, ...hole], [])
  const { coords, xRange, yRange } = convertLatLngToCoords([...flattened, ...polygon], size)
  const polygonCoords = coords.slice(flattened.length)
  const { holeCoords } = holes.reduce(({ holeCoords, start }, { length }) => {
    const end = start + length
    const hole = coords.slice(start, end)
    return { start: end, holeCoords: [...holeCoords, hole] }
  }, { holeCoords: [], start: 0 })

  const grid = convertCoordsToMatrix(polygonCoords, holeCoords, xRange, yRange)
  return grid
}

const convertCoordsToLatLng = (path, start, end) => {
  const first = path[0]
  const last = path[path.length - 1]
  const xDelta = first[0] - last[0]
  const yDelta = first[1] - last[1]
  const lngDelta = start.longitude - end.longitude
  const latDelta = start.latitude - end.latitude
  const xFactor = lngDelta / xDelta
  const yFactor = latDelta / yDelta

  const latLngs = path.map(([x, y], i) => {
    const xDiff = x - first[0]
    const yDiff = y - first[1]
    const lat = parseFloat((yDiff * yFactor + start.latitude).toFixed(5))
    const lng = parseFloat((xDiff * xFactor + start.longitude).toFixed(5))
    return ({ lng, lat })
  })

  return latLngs
}

module.exports = {
  convertCoordsToMatrix,
  convertCoordsToLatLng,
  convertLatLngToCoords,
  convertLatLngToMatrix,
}