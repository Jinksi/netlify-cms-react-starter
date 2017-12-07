import React from 'react'
import styled from 'styled-components'
import Marked from 'react-markdown'
import { getImageSrc, getImageSrcset } from '../util/getImageUrl'

export default ({ source }) => (
  <Content
    source={source}
    renderers={{
      Image: ImageWithSrcset
    }}
  />
)

const Image = styled.img`
  max-width: 100%;
  height: auto;
`
const Content = styled(Marked)`
  white-space: pre-line;
`

const ImageWithSrcset = props => (
  <Image
    {...props}
    src={getImageSrc(props.src)}
    srcSet={getImageSrcset(props.src)}
  />
)
