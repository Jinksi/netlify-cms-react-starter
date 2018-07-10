import React from 'react'
import PropTypes from 'prop-types'

import './LazyImage.css'

// Not lazy yet

class LazyImage extends React.Component {
  static defaultProps = {
    lazy: false,
    imageSize: '300'
  }

  render() {
    let {
      className = '',
      src,
      srcSet,
      source,
      sizes,
      lazy,
      onClick,
      alt
    } = this.props
    src = src || source
    return (
      <img
        className={`LazyImage loaded ${className}`}
        src={src}
        srcSet={srcSet}
        sizes={sizes || '100vw'}
        onClick={onClick}
        alt={alt}
      />
    )
  }
}

LazyImage.propTypes = {
  alt: PropTypes.string.isRequired
}

export default LazyImage
