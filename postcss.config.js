const cssnext = require('postcss-cssnext')
module.exports = {
  plugins: [
    cssnext({
      features: {
        customProperties: {
          preserve: true
        }
      }
    })
  ]
}
