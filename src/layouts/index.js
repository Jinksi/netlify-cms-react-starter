import React from 'react'
import Helmet from 'react-helmet'
import 'modern-normalize/modern-normalize.css'

import Meta from '../components/Meta'
import Nav from '../components/Nav'
import GithubCorner from '../components/GithubCorner'
import './globalStyles.css'

export default ({ children, data }) => {
  const {
    siteTitle,
    siteUrl,
    siteDescription,
    socialMediaCard,
    headerScripts
  } = data.settingsYaml

  return (
    <div>
      <GithubCorner url="https://github.com/Jinksi/netlify-cms-react-starter" />
      <Helmet defaultTitle={siteTitle} titleTemplate={`${siteTitle} | %s`} />
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

      <Nav />

      <div>{children()}</div>
    </div>
  )
}

export const query = graphql`
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
`
