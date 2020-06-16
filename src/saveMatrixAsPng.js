const Jimp = require('jimp')
const { convertLatLngToMatrix } = require('./utils')

const saveMatrixAsPng = (filename, polygon, holes, size) => {
  const matrix = convertLatLngToMatrix(polygon, holes, size)
  const width = matrix[0].length
  const height = matrix.length
  const length = 4 * width * height
  const buffer = new Uint8ClampedArray(length)

  let val, x, y

  for (let i = 0; i < length; i += 4) {
    y = Math.floor(i / (4 * width))
    x = (i / 4) - (y * width)
    val = (matrix[y][x] === 0) ? 255 : 0

    buffer[i + 0] = val // R value
    buffer[i + 1] = val // G value
    buffer[i + 2] = val // B value
    buffer[i + 3] = 255 // A value
  }

  new Jimp({ data: buffer, width, height }, (err, image) => {
    if (err) return console.error(err)
    image.write(filename)
  })
}

module.exports = { saveMatrixAsPng }
