const fs = require('fs')
const path = require('path')

const globCb = require('glob')
const util = require('util')

const glob = util.promisify(globCb)
const readFile = util.promisify(fs.readFileSync)

const options = {
  contentDir: './content/',
  outputFile: './src/data.json'
}

const getFileContents = async file => {
  const result = await readFile(file, 'utf8')
  return result
}

const readFiles = async paths => {
  const results = await Promise.all(paths.map(getFileContents))
  return results
}

const makeJSON = async () => {
  const paths = await glob(`${options.contentDir}/**/**.json`)
  const results = await parseFiles(paths)
  return console.log(results)
  let data = {}
  results.map(item => {
    const pathParsed = path.parse(item.history[0])
    const objectKey = pathParsed.dir.replace(options.markdownDir, '').replace(/\//g, '.')
    const nest = `${objectKey}.${pathParsed.name}`
    _set(data, nest, {...item})
  })
  return JSON.stringify(data, null, 2)
}

const markdownToJson = async () => {
  const json = await makeJSON()
  return console.log(json)
  fs.writeFileSync(options.outputFile, json)
}

markdownToJson()
