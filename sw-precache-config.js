// we overwrite the default service worker config to enable runtimeCaching
module.exports = {
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/**/*.html',
    'build/**/*.svg', // all svgs
    'build/images/*.+(jpg|png|gif)',
    'build/images/uploads/**/*10.+(jpg|png|gif)', // 10px resized images
    'build/**/*.ico',
    'build/**/*.json',
    'build/static/**/!(*map*)',
    'build/manifest.json'
  ],
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: 'build/service-worker.js',
  // any external urls you wish to cache (e.g. CDN)
  runtimeCaching: [
    {
      // cache content from external url as they are loaded by browser
      urlPattern: /^https?:\/\/.*example-cdn.com/,
      handler: 'cacheFirst'
    },
    {
      // cache files in the images directory as they are loaded by browser
      urlPattern: '/images/(.*)',
      handler: 'cacheFirst',
      options: {
        cache: {
          name: 'images-cache'
        }
      }
    }
  ]
}
