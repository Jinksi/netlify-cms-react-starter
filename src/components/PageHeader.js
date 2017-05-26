import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Section, Container } from './common'

import { color } from '../globalStyles'

const Header = styled(Section)`
  line-height: 1em;
  color: ${color.primary};
  background: ${color.primary};
  color: white;
  h2{
    font-weight: 200;
  }
`

const PageHeader = (props) => (
  <Header>
    <Container>
      <h1>{props.title}</h1>
      {props.subtitle ? <h2>{props.subtitle}</h2> : ''}
    </Container>
  </Header>
)

PageHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
}

export default PageHeader
