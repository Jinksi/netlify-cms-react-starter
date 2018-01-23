const sizes = [10, 300, 600, 1200, 1800]
const outputDir = '/images/uploads/'
const resizedDir = '/images/uploads/resized/'

const parseFilename = filename => {
  const parts = filename.match(/(.+)\.([\w]+)$/)
  return {
    filename: parts[1],
    extname: parts[2]
  }
}

const getImageSrcset = path => {
  if (!path || path.match(/^http/) || path.match(/svg$/) || window.CMS) { return null }
  const { filename, extname } = parseFilename(path)
  const pathname = encodeURI(filename.replace(outputDir, resizedDir))

  const srcset = sizes
    .map(size => `${pathname}.${size}.${extname} ${size}w`)
    .join(', ')
  return srcset
}

const getImageSrc = (path, sizeRequested) => {
  if (!path || path.match(/^http/) || path.match(/svg$/) || window.CMS) { return path }
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

  const { filename, extname } = parseFilename(path)
  const pathname = encodeURI(filename.replace(outputDir, resizedDir))
  return `${pathname}.${size}.${extname}`
}

module.exports = {
  getImageSrcset,
  getImageSrc,
  sizes,
  outputDir
}
