import React from 'react'
import GatsbyImage from 'gatsby-image'
import PropTypes from 'prop-types'

import { extractChildImageSharp } from '../utils'
import './Image.css'

// Not lazy yet

class Image extends React.Component {
  render() {
    let {
      className = '',
      src,
      srcSet,
      source,
      onClick,
      sizes,
      alt,
      style,
      imgStyle
    } = this.props

    const imageSizes = extractChildImageSharp(src, 'sizes')
    const resolutions = extractChildImageSharp(src, 'resolutions')
    const imageSrcSet = srcSet || extractChildImageSharp(src, 'srcSet')
    const imageSrc = extractChildImageSharp(src || source)

    if (imageSizes || resolutions) {
      return (
        <GatsbyImage
          className={`Image ${className}`}
          sizes={imageSizes}
          resolutions={resolutions}
          onClick={onClick}
          alt={alt}
          style={style}
          imgStyle={imgStyle}
        />
      )
    }

    return (
      <img
        className={`Image ${className}`}
        src={imageSrc}
        srcSet={imageSrcSet}
        sizes={sizes || '100vw'}
        onClick={onClick}
        alt={alt}
      />
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired
}

export default Image

export const query = graphql`
  fragment FluidImage on File {
    publicURL
    childImageSharp {
      sizes(quality: 75) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
  fragment LargeImage on File {
    publicURL
    childImageSharp {
      sizes(maxWidth: 1800, quality: 75) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
  fragment MediumImage on File {
    publicURL
    childImageSharp {
      sizes(maxWidth: 800, quality: 75) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
  fragment SmallImage on File {
    publicURL
    childImageSharp {
      sizes(maxWidth: 400, quality: 75) {
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
  fragment LargeImageFixed on File {
    publicURL
    childImageSharp {
      resolutions(width: 1800, quality: 75) {
        ...GatsbyImageSharpResolutions_withWebp
      }
    }
  }
  fragment MediumImageFixed on File {
    publicURL
    childImageSharp {
      resolutions(width: 800, quality: 75) {
        ...GatsbyImageSharpResolutions_withWebp
      }
    }
  }
  fragment SmallImageFixed on File {
    publicURL
    childImageSharp {
      resolutions(width: 400, quality: 75) {
        ...GatsbyImageSharpResolutions_withWebp
      }
    }
  }
`
