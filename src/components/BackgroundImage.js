import React from 'react'

import './BackgroundImage.css'

export default ({
  className = '',
  src,
  imageSize,
  contain = false,
  opacity = 1
}) => (
  <div
    className={`BackgroundImage absolute ${className}`}
    style={{
      backgroundImage: `url(${encodeURI(src)})`,
      backgroundSize: contain ? 'contain' : 'cover',
      opacity: opacity
    }}
  />
)
