import React from 'react'
import Marked from 'react-markdown'

import { getImageSrc, getImageSrcset } from '../util/getImageUrl'
import './Content.css'

const encodeMarkdownURIs = source => {
  const markdownLinkRegex = /\[(?:\[[^\]]*\]|[^[\]])*\]\([ \t]*<?((?:\([^)]*\)|[^()])*?)>?[ \t]*(['"].*?\6[ \t]*)?\)/g
  return source.replace(markdownLinkRegex, (match, linkURI) => {
    if (!linkURI) return match
    const replaced = match.replace(linkURI, encodeURI(linkURI))
    return replaced
  })
}

export default ({ source, className = '' }) => (
  <Marked
    className={`Content ${className}`}
    source={encodeMarkdownURIs(source)}
    renderers={{
      image: ImageWithSrcset,
      html: HtmlBlock
    }}
  />
)

const ImageWithSrcset = ({ nodeKey, src, alt, ...props }) => {
  const decodedSrc = decodeURI(src)
  return (
    <img
      className='Content--Image'
      {...props}
      src={getImageSrc(decodedSrc)}
      srcSet={getImageSrcset(decodedSrc)}
      alt={alt}
    />
  )
}

const HtmlBlock = ({ value }) => (
  <div
    className={value.indexOf('iframe') ? `Content--Iframe` : ``}
    dangerouslySetInnerHTML={{
      __html: value
    }}
  />
)
