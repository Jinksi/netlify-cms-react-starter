import React from 'react'

import Image from './Image'
import { extractChildImageSharp } from '../utils'
import './BackgroundImage.css'

export default ({ className = '', alt = '', src, size = 'cover' }) => {
  let style = {}

  src = extractChildImageSharp(src)

  if (typeof src === 'string') {
    style = { backgroundImage: `url(${src})`, backgroundSize: size }
  }

  return (
    <div className={`BackgroundImage absolute ${className}`} style={style}>
      {!style.backgroundImage && (
        <Image
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            width: 'auto',
            height: 'auto'
          }}
          imgStyle={{
            objectFit: size
          }}
        />
      )}
    </div>
  )
}
