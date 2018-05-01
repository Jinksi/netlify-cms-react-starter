const fs = require('fs')
const path = require('path')
const _set = require('lodash/set')
const _mergeWith = require('lodash/mergeWith')
const _isArray = require('lodash/isArray')
const globCb = require('glob')
const util = require('util')

const glob = util.promisify(globCb)
const readFile = util.promisify(fs.readFile)
const matter = require('gray-matter')
const yaml = require('js-yaml')

const options = {
  contentDir: './content/',
  outputFile: './src/data.json'
}

const getCollectionType = filePath => {
  const pathParsed = path.parse(filePath)
  const objectKey = pathParsed.dir
    .replace(options.contentDir, '')
    .replace(/\//g, '.')
  return `${objectKey}`
}

const getDocumentName = filePath => {
  const pathParsed = path.parse(filePath)
  return `${pathParsed.name}`
}

const getDocumentExt = filePath => {
  const pathParsed = path.parse(filePath)
  return `${pathParsed.ext}`
}

const parseMarkdown = data => {
  data = matter(data)
  data = { ...data, ...data.data }
  delete data.data
  return JSON.stringify(data)
}

const parseYaml = data => {
  data = yaml.safeLoad(data, 'utf8') || {}
  return JSON.stringify(data)
}

const getFileContents = filePath => {
  return readFile(filePath, 'utf8').then(data => {
    if (getDocumentExt(filePath) === '.md') {
      data = parseMarkdown(data)
    }
    if (['.yaml', '.yml'].includes(getDocumentExt(filePath))) {
      data = parseYaml(data)
    }
    let documentData = JSON.parse(data)
    documentData.name = getDocumentName(filePath)
    documentData.body = documentData.body || documentData.content
    let obj = {}
    _set(obj, getCollectionType(filePath), [documentData])
    console.log(`✨  Processed ${filePath}`)
    return obj
  })
}

const readFiles = async paths => Promise.all(paths.map(getFileContents))

const combineJSON = async () => {
  // mergeCustomiser concats arrays items
  const mergeCustomiser = (objValue, srcValue) =>
    _isArray(objValue) ? objValue.concat(srcValue) : objValue
  console.log(`✨  Reading JSON files in ${options.contentDir}`)
  const paths = await glob(`${options.contentDir}/**/**.+(json|md|yaml|yml)`)
  const results = await readFiles(paths)
  const data = _mergeWith({}, ...results, mergeCustomiser)
  return JSON.stringify(data, null, 2)
}

const writeJSON = async () => {
  const json = await combineJSON()
  fs.writeFileSync(options.outputFile, json)
  console.log(`✅  Data saved to ${options.outputFile}`)
  process.exit()
}

writeJSON()
