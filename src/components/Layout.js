import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import 'modern-normalize/modern-normalize.css'

import Meta from './Meta'
import Nav from './Nav'
import Footer from './Footer'
import GithubCorner from './GithubCorner'
import './globalStyles.css'

export default ({ children }) => (
  <StaticQuery
    render={data => {
      const {
        siteTitle,
        siteUrl,
        siteDescription,
        socialMediaCard,
        headerScripts
      } =
        data.settingsYaml || {}
      return (
        <Fragment>
          <Helmet defaultTitle={siteTitle} titleTemplate={`${siteTitle} | %s`}>
            {/* Add font link tags here */}
          </Helmet>

          <Meta
            headerScripts={headerScripts}
            absoluteImageUrl={
              socialMediaCard &&
              socialMediaCard.image &&
              siteUrl + socialMediaCard.image
            }
            twitterCreatorAccount={
              socialMediaCard && socialMediaCard.twitterCreatorAccount
            }
            twitterSiteAccount={
              socialMediaCard && socialMediaCard.twitterSiteAccount
            }
          />

          <GithubCorner url="https://github.com/Jinksi/netlify-cms-react-starter" />

          <Nav />

          <Fragment>{children}</Fragment>

          <Footer />
        </Fragment>
      )
    }}
    query={graphql`
      query IndexLayoutQuery {
        settingsYaml {
          siteTitle
          siteDescription
          headerScripts
          socialMediaCard {
            image
            twitterCreatorAccount
            twitterSiteAccount
          }
        }
      }
    `}
  />
)
