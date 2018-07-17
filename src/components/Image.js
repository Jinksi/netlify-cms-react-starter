import React from 'react'
import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'
import PropTypes from 'prop-types'
import _get from 'lodash/get'

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
      sizes,
      onClick,
      alt,
      style,
      ...props
    } = this.props

    const fluid = extractChildImageSharp(src, 'fluid')
    const fixed = extractChildImageSharp(src, 'fixed')
    const imageSrcSet = srcSet || extractChildImageSharp(src, 'srcSet')
    const imageSrc = extractChildImageSharp(src || source)

    if (fluid || fixed) {
      return (
        <GatsbyImage
          className={`Image ${className}`}
          fluid={fluid}
          fixed={fixed}
          onClick={onClick}
          alt={alt}
          style={style}
        />
      )
    }

    return (
      <img
        className={`Image Normal-Image ${className}`}
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
  fragment LargeImageFluid on File {
    publicURL
    childImageSharp {
      fluid(maxWidth: 1800, quality: 75) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment MediumImageFluid on File {
    publicURL
    childImageSharp {
      fluid(maxWidth: 800, quality: 75) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment SmallImageFluid on File {
    publicURL
    childImageSharp {
      fluid(maxWidth: 400, quality: 75) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment LargeImage on File {
    publicURL
    childImageSharp {
      fixed(width: 1800, quality: 75) {
        ...GatsbyImageSharpFixed_withWebp
      }
    }
  }
  fragment MediumImage on File {
    publicURL
    childImageSharp {
      fixed(width: 800, quality: 75) {
        ...GatsbyImageSharpFixed_withWebp
      }
    }
  }
  fragment SmallImage on File {
    publicURL
    childImageSharp {
      fixed(width: 400, quality: 75) {
        ...GatsbyImageSharpFixed_withWebp
      }
    }
  }
`
