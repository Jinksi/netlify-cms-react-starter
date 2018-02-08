const generateSitemap = require('sitemap-static')
const fs = require('fs')
const _find = require('lodash/find')
const _endsWith = require('lodash/endsWith')
const data = require('../src/data.json')

const options = {
  buildDir: 'build',
  ignoreFile: 'functions/sitemap-ignore.json',
  siteUrl: null,
  pretty: true
}

const getSiteUrl = () => {
  // get siteUrl from: data.settings.global.siteUrl
  if (!data || !data.settings) return null
  const globalSettings = _find(data.settings, item => item.name === 'global')
  if (!globalSettings) return null
  const siteUrl = _endsWith(globalSettings.siteUrl, '/')
    ? globalSettings.siteUrl
    : globalSettings.siteUrl + '/'
  return siteUrl
}

const siteUrl = options.siteUrl || getSiteUrl()

const writeSitemapToRobotsTxt = siteUrl => {
  console.log(`Writing sitemap to ./${options.buildDir}/robots.txt`)
  fs.appendFileSync(
    `./${options.buildDir}/robots.txt`,
    `Sitemap: ${siteUrl}sitemap.xml`,
    'utf8',
    err => {
      throw err
    }
  )
}

if (siteUrl) {
  console.log(`Writing sitemap.xml to ./${options.buildDir}/sitemap.xml`)
  const writer = fs.createWriteStream(`./${options.buildDir}/sitemap.xml`)

  generateSitemap(writer, {
    findRoot: options.buildDir,
    ignoreFile: options.ignoreFile,
    prefix: siteUrl,
    pretty: options.pretty
  })
  writeSitemapToRobotsTxt(siteUrl)
} else {
  console.log(`Cannot write sitemap, couldn't find siteUrl in data.json`)
}
