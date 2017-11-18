// we overwrite the default service worker config to enable runtimeCaching
module.exports = {
  stripPrefix: 'build/',
  staticFileGlobs: [
    'build/**/*.html',
    'build/**/*.svg',
    'build/images/*.jpg',
    'build/images/uploads/resized/*.jpg',
    'build/**/*.png',
    'build/**/*.gif',
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
      urlPattern: /^https?:\/\/.*example-cdn.com/,
      handler: 'cacheFirst'
    }
  ]
}
