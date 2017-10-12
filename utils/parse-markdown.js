const fs = require('fs')
const path = require('path')
const _set = require('lodash/set')
const globCb = require('glob')
const util = require('util')
const unified = require('unified')
const parse = require('remark-parse')
const frontmatter = require('remark-frontmatter')
const vfile = require('to-vfile')
const report = require('vfile-reporter')
const html = require('remark-html')
const yaml = require('yamljs')

const glob = util.promisify(globCb)

const options = {
  markdownDir: './content/',
  outputFile: './src/data.json'
}

const addYamlData = () => (data, file) => {
  const yamlData = data.children.find(item => item.type === 'yaml')
  file.data = yaml.parse(yamlData.value)
}

const parseFile = path => new Promise((resolve, reject) => {
  unified()
    .use(parse)
    .use(frontmatter, ['yaml'])
    .use(addYamlData)
    .use(html)
    .process(vfile.readSync(path), (err, file) => {
      if (err) reject(report(err || file))
      resolve(file)
    })
})

const parseFiles = async files => {
  const results = await Promise.all(files.map(parseFile))
  return results
}

const makeJSON = async () => {
  const paths = await glob(`${options.markdownDir}/**/**.md`)
  const results = await parseFiles(paths)
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
  fs.writeFileSync(options.outputFile, json)
}

markdownToJson()
