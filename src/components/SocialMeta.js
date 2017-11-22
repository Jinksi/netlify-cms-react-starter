import React from 'react'
import Helmet from 'react-helmet'

const SocialMeta = ({
  title,
  url,
  description,
  absoluteImageUrl,
  twitterSiteAccount,
  twitterCreatorAccount
}) => (
  <Helmet>
    <meta property='og:title' content={title} />
    <meta property='og:type' content='website' />
    <meta property='og:url' content={url} />
    <meta property='og:image' content={absoluteImageUrl} />
    <meta property='og:description' content={description} />
    <meta name='twitter:card' content='summary_large_image' />
    {twitterSiteAccount && (
      <meta name='twitter:site' content={twitterSiteAccount} />
    )}
    {twitterCreatorAccount && (
      <meta name='twitter:creator' content={twitterCreatorAccount} />
    )}
  </Helmet>
)
export default SocialMeta
