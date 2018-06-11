const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  siteMetadata: {
    title: 'Gatsby + Netlify CMS Starter'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-yaml`,

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images'
      }
    },

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          // {
          //   resolve: `gatsby-remark-relative-images`
          // },
          // {
          //   resolve: `gatsby-remark-images`,
          //   options: {
          //     maxWidth: 650
          //   }
          // },
          // {
          //   resolve: `gatsby-remark-responsive-iframe`,
          //   options: {
          //     wrapperStyle: `margin-bottom: 1.0725rem`
          //   }
          // }
        ]
      }
    },

    // images
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    // css
    {
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [postcssPresetEnv()]
      }
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
    'gatsby-plugin-netlify' // make sure to keep it last in the array
  ]
}
