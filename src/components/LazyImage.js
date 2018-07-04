import React from 'react'
import PropTypes from 'prop-types'

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
        className={`LazyImage ${className}`}
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
