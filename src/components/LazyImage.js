import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getImageSrc, getImageSrcset } from '../util/getImageUrl'
import 'intersection-observer'
import Observer from '@researchgate/react-intersection-observer'

const Image = styled.img`
  display: block;
  width: 100%;
  margin-bottom: 2.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

class LazyImage extends React.Component {
  state = {
    src: getImageSrc(this.props.src, '10'),
    srcSet: '',
    dataSrc: getImageSrc(this.props.src, '300'),
    dataSrcSet: getImageSrcset(this.props.src)
  }

  handleIntersection = e => {
    if (e.isIntersecting) {
      this.setState({
        src: this.state.dataSrc,
        srcSet: this.state.dataSrcSet
      })
    }
  }

  render () {
    const { sizes, alt, className } = this.props
    const options = {
      onChange: this.handleIntersection,
      onlyOnce: true,
      rootMargin: '0% 0% 50%'
    }

    return (
      <Observer {...options}>
        <Image
          src={this.state.src}
          srcSet={this.state.srcSet}
          sizes={sizes || '100vw'}
          alt={alt}
          className={className}
        />
      </Observer>
    )
  }
}

LazyImage.propTypes = {
  alt: PropTypes.string.isRequired
}

export default LazyImage
