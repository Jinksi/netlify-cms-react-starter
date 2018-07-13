import React from 'react'

import { extractChildImageSharp } from '../utils'
import './BackgroundImage.css'

export default ({
  className = '',
  src,
  imageSize,
  contain = false,
  opacity = 1
}) => {
  src = extractChildImageSharp(src)
  return (
    <div
      className={`BackgroundImage absolute ${className}`}
      style={{
        backgroundImage: `url(${encodeURI(src)})`,
        backgroundSize: contain ? 'contain' : 'cover',
        opacity: opacity
      }}
    />
  )
}
