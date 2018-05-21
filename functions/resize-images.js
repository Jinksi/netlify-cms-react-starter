const fs = require('fs')
const path = require('path')
const globCb = require('glob')
const util = require('util')
const sharp = require('sharp')
const ora = require('ora')

const glob = util.promisify(globCb)
const readFile = util.promisify(fs.readFile)

const { sizes, resizedDir, outputDir } = require('../src/util/getImageUrl')
const dirPrefix = './public'

const options = {
  sizes,
  inputDir: `${dirPrefix}${outputDir}`,
  outputDir: `${dirPrefix}${resizedDir}`,
  imageFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
}

let spinner

const saveImage = ({ buffer, size, outputFile, spinner }) => {
  return new Promise((resolve, reject) => {
    sharp(buffer)
      .resize(size)
      .withoutEnlargement()
      .toFile(outputFile, err => {
        if (err) {
          spinner.fail(err)
          return reject(err)
        } else {
          spinner.succeed(`Saved ${outputFile}`)
          return resolve(`Saved ${outputFile}`)
        }
      })
  })
}

const saveImages = ({ buffer, filename }) => {
  spinner.text = `Processing ${filename}`

  return Promise.all(
    options.sizes.map(async size => {
      const extname = path.extname(filename)
      const newFilename = `${path.basename(
        filename,
        extname
      )}.${size}${extname}`
      const outputFile = path.resolve(options.outputDir, newFilename)
      const fileExists = await doesFileExist({ filename: outputFile })
      if (fileExists) {
        spinner.info(`${outputFile} exists, skipping`)
        return `${outputFile} exists, skipping`
      }
      return saveImage({ buffer, size, outputFile, spinner })
    })
  )
}

const readFiles = files =>
  Promise.all(
    files.map(async filename => {
      const buffer = await readFile(filename)
      return { filename, buffer }
    })
  )

const doesFileExist = async ({ filename }) => {
  try {
    await readFile(filename)
    return true
  } catch (e) {
    return false
  }
}

const resizeImages = async () => {
  spinner = ora(`Reading image files in ${options.inputDir}`).start()
  try {
    const fileGlob = `${options.inputDir}/**/**.+(${options.imageFormats.join(
      '|'
    )})`
    const files = await glob(fileGlob)
    const ignore = new RegExp(
      `(${options.sizes.join('|')}).(${options.imageFormats.join('|')})$`
    )
    const filesToResize = files.filter(filename => !filename.match(ignore))
    const imageFiles = await readFiles(filesToResize)
    Promise.all(imageFiles.map(saveImages))
      .then(() => {
        spinner.succeed(`Finished reading image files in ${options.inputDir}`)
        process.exit()
      })
      .catch(spinner.fail)
  } catch (e) {
    spinner.fail(e)
    process.exit(1)
  }
}

resizeImages()
