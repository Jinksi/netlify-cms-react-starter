const fs = require('fs')
const path = require('path')
const _set = require('lodash/set')
const _merge = require('lodash/merge')
const globCb = require('glob')
const util = require('util')

const glob = util.promisify(globCb)
const readFile = util.promisify(fs.readFile)

const options = {
  contentDir: './content/',
  outputFile: './src/data.json'
}

const getNestedKey = filePath => {
  const pathParsed = path.parse(filePath)
  const objectKey = pathParsed.dir.replace(options.contentDir, '').replace(/\//g, '.')
  return `${objectKey}.${pathParsed.name}`
}

const getFileContents = filePath =>
  readFile(filePath, 'utf8')
    .then(data => {
      let obj = {}
      _set(obj, getNestedKey(filePath), data)
      return obj
    })

const readFiles = async paths => Promise.all(paths.map(getFileContents))

const combineJSON = async () => {
  const paths = await glob(`${options.contentDir}/**/**.json`)
  const results = await readFiles(paths)
  const data = _merge({}, ...results)
  return JSON.stringify(data, null, 2)
}

const writeJSON = async () => {
  const json = await combineJSON()
  fs.writeFileSync(options.outputFile, json)
}

writeJSON()
