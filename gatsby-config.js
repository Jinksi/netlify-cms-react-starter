const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  siteMetadata: {
    title: 'Gatsby + Netlify CMS Starter',
    siteUrl: 'https://netlify-cms-react-starter.netlify.com'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-yaml`,
    // Add static assets before markdown files
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/images/uploads`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800
            }
          }
        ]
      }
    },

    // images
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    // css
    // {
    //   resolve: `gatsby-plugin-postcss-sass`,
    //   options: {
    //     postCssPlugins: [
    //       postcssPresetEnv({
    //         browsers: '> 0.5%, last 2 versions, ie 11'
    //       })
    //     ]
    //   }
    // },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `white`,
        // Disable the loading spinner.
        showSpinner: false
      }
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ]
}
