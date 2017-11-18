const sizes = [300, 600, 1200, 1800]
const outputDir = '/images/uploads/'
const resizedDir = '/images/uploads/resized/'

const getImageSrcset = path => {
  if (path.indexOf('http') >= 0) {
    // Cannot get srcset for external image
    return
  }
  const filename = path.split('.').shift()
  const extname = path.split('.').pop()
  const pathname = encodeURI(filename.replace(outputDir, resizedDir))

  const srcset = sizes
    .map(size => `${pathname}.${size}.${extname} ${size}w`)
    .join(', ')
  return srcset
}

const getImageSrc = (path, sizeRequested) => {
  if (path.indexOf('http') >= 0) return path
  sizeRequested = parseInt(sizeRequested, 10)
  let size
  if (sizeRequested) {
    // rounds up to nearest size or returns largest
    size =
      sizes.filter(num => num >= sizeRequested)[0] || sizes[sizes.length - 1]
  } else {
    // get the middle size
    size = sizes[Math.ceil(sizes.length / 2)]
  }

  const extname = path.split('.').pop()
  const filename = path.split('.').shift()
  const pathname = encodeURI(filename.replace(outputDir, resizedDir))
  return `${pathname}.${size}.${extname}`
}

module.exports = {
  getImageSrcset,
  getImageSrc,
  sizes,
  outputDir
}
