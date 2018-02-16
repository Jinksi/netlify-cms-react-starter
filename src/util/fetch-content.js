const matter = require('gray-matter')
const yaml = require('js-yaml')

const mediaFolder = 'public/images/uploads'
const publicFolder = '/images/uploads'

const b64DecodeUnicode = str =>
  // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings#30106551
  decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

const getFileExtension = str => {
  const matches = str.match(/.*\.(.{2,4})$/i)
  return matches && matches[1]
}

const parseMarkdown = data => {
  console.log('Parsing md')
  data = matter(data)
  data = { ...data, ...data.data }
  delete data.data
  return data
}

const parseYaml = data => {
  console.log('Parsing yaml')
  return yaml.safeLoad(data) || {}
}

const replaceUploadUrls = (uploads = [], string) => {
  uploads.forEach(upload => {
    const url = new URL(upload.download_url)
    if (url.pathname.match(/.svg$/)) {
      url.search += (url.search.slice(1) === '' ? '?' : '&') + 'sanitize=true'
    }
    string = string.replace(upload.publicPath, url)
  })
  return string
}

export const fetchContent = async (rateLimit = 0) => {
  if (!window.localStorage || !window.netlifyIdentity) {
    return Promise.resolve(null)
  }

  const currentUser = window.netlifyIdentity.currentUser()

  if (!currentUser) return Promise.resolve(null)

  const token = await currentUser.jwt()

  const wait = time =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(), time)
    })

  const fetchGithub = (path = 'content', endpoint = 'contents') => {
    const siteUrl = window.localStorage.netlifySiteURL || ''
    const url = `${siteUrl}/.netlify/git/github/${endpoint}/${path}`
    console.log(`Fetching ${path}`)
    return wait(rateLimit)
      .then(() =>
        fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cache: 'no-store'
        })
      )
      .then(res => res.json())
      .then(res => {
        if (res.code === 401) throw new Error(res.msg)
        return res
      })
      .catch(console.error)
  }

  const checkSHA = () => {
    console.log('Checking SHA')
    let githubSHA = ''
    let localSHA = ''
    return fetchGithub('refs/heads/master', 'git')
      .then(ref => {
        githubSHA = ref.object.sha
      })
      .then(() => fetch('/sha'))
      .then(res => res.text())
      .then(res => (localSHA = res))
      .then(() => {
        if (githubSHA.trim() === localSHA.trim()) {
          return Promise.reject('Github latest commit equal to build')
        } else {
          console.log(
            `Github SHA ${githubSHA} not equal to build SHA ${localSHA}: Fetching content from git`
          )
        }
      })
  }

  let data = {}
  let uploads = []
  return checkSHA()
    .then(() => fetchGithub(mediaFolder))
    .then((res = []) => {
      uploads = res.filter(file => file.type !== 'dir').map(file => ({
        ...file,
        publicPath: `${publicFolder}/${file.name}`
      }))
    })
    .then(() => fetchGithub())
    .then(items => {
      if (!items) throw new Error('No items found')
      const dirs = items.filter(item => item.type === 'dir')
      return dirs
    })
    .then(dirs => {
      const dirsToFetch = dirs.map(dir => {
        const dirKey = dir.path.split('/').pop()
        data[dirKey] = []
        return fetchGithub(dir.path)
          .then(files => {
            const filesToFetch = files
              .filter(file => file.type === 'file')
              .map(file => wait(rateLimit).then(() => fetchGithub(file.path)))
            return Promise.all(filesToFetch)
          })
          .then(files => {
            files.forEach(file => {
              const fileType = getFileExtension(file.name)
              let fileContents = b64DecodeUnicode(file.content)
              fileContents = replaceUploadUrls(uploads, fileContents)
              const json =
                fileType === 'md'
                  ? parseMarkdown(fileContents)
                  : parseYaml(fileContents)
              if (json) data[dirKey].push(json)
            })
            return data
          })
      })
      return Promise.all(dirsToFetch)
    })
    .then(() => data)
    .catch(console.warn)
}
