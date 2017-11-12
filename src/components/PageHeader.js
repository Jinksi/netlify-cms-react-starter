import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Section, Container, BackgroundImage } from './common'
import { getImageSrc } from '../util/getImageUrl'
import { color } from '../globalStyles'

const Header = styled(Section)`
  line-height: 1em;
  color: ${color.primary};
  background: ${color.primary};
  color: white;

  h2 {
    font-weight: 200;
  }
`

const PageHeader = ({ title, subtitle, backgroundImage }) => (
  <Header relative>
    {backgroundImage && (
      <BackgroundImage
        image={getImageSrc(backgroundImage, '1200')}
        opacity={0.5}
      />
    )}
    <Container relative>
      <h1>{title}</h1>
      {subtitle ? <h2>{subtitle}</h2> : ''}
    </Container>
  </Header>
)

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default PageHeader
