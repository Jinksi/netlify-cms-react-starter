import React from 'react'
import Helmet from 'react-helmet'

const Meta = ({
  title,
  url,
  description,
  absoluteImageUrl,
  twitterSiteAccount,
  twitterCreatorAccount,
  headerScripts
}) => {
  const headerScriptsElement = document.head.querySelector('#headerScripts')
  if (headerScripts && headerScriptsElement) {
    headerScriptsElement.outerHTML = headerScripts
  }

  const runChecks = () => {
    if (process.env.NODE_ENV !== 'development') return

    // Site Url Check
    if (url === 'https://netlify-cms-react-starter.netlify.com') {
      console.warn(`Site url may need updating (${url})`)
    }

    // Title
    if (!title) {
      console.error(`Missing Site Title`)
    }

    // Description
    if (!description) {
      console.error(`Missing Site Description`)
    }
  }

  runChecks()

  return (
    <Helmet>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:description' content={description} />
      {absoluteImageUrl && (
        <meta property='og:image' content={absoluteImageUrl} />
      )}
      <meta name='twitter:card' content='summary_large_image' />
      {twitterSiteAccount && (
        <meta name='twitter:site' content={twitterSiteAccount} />
      )}
      {twitterCreatorAccount && (
        <meta name='twitter:creator' content={twitterCreatorAccount} />
      )}
    </Helmet>
  )
}

export default Meta
