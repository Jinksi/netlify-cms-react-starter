import React from 'react'
import PropTypes from 'prop-types'
import 'intersection-observer'
import Observer from '@researchgate/react-intersection-observer'

import { getImageSrc, getImageSrcset } from '../util/getImageUrl'
import './LazyImage.css'

class LazyImage extends React.Component {
  static defaultProps = {
    lazy: false,
    enableSrcset: true,
    imageSize: '300'
  }

  state = {
    src: getImageSrc(
      this.props.src,
      this.props.lazy ? '10' : this.props.imageSize
    ),
    srcSet: this.props.lazy ? '' : getImageSrcset(this.props.src),
    dataSrc: getImageSrc(this.props.src, this.props.imageSize),
    dataSrcSet: getImageSrcset(this.props.src),
    loaded: !this.props.lazy
  }

  handleIntersection = e => {
    if (e.isIntersecting) {
      const img = new Image()
      img.src = this.state.dataSrc
      img.onload = () => {
        this.setState({
          src: this.state.dataSrc,
          srcSet: this.state.dataSrcSet,
          loaded: true
        })
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.src === nextProps.src) return
    this.setState({
      src: getImageSrc(nextProps.src, '10'),
      srcSet: '',
      dataSrc: getImageSrc(nextProps.src, '300'),
      dataSrcSet: getImageSrcset(nextProps.src)
    })
  }

  render () {
    const { sizes, lazy, onClick, alt } = this.props
    let className = this.props.className || ''
    if (this.state.loaded) className += ' loaded'
    const options = {
      onChange: this.handleIntersection,
      onlyOnce: true,
      rootMargin: '0% 0% 100%'
    }

    if (!lazy) {
      return (
        <img
          className={`LazyImage ${className}`}
          src={this.state.src}
          srcSet={this.props.enableSrcset ? this.state.srcSet : undefined}
          sizes={sizes || '100vw'}
          onClick={onClick}
          alt={alt}
        />
      )
    }

    return (
      <Observer {...options}>
        <img
          className={`LazyImage ${className}`}
          src={this.state.src}
          srcSet={this.props.enableSrcset ? this.state.srcSet : undefined}
          sizes={sizes || '100vw'}
          onClick={onClick}
          alt={alt}
        />
      </Observer>
    )
  }
}

LazyImage.propTypes = {
  alt: PropTypes.string.isRequired
}

export default LazyImage
