import React from 'react'
import styled from 'styled-components'
import { Container } from './common'

const Nav = styled.nav`
  padding: 0;
  display: flex;
  align-items: center;
`

export default (props) => (
  <Container>
    <Nav {...props} />
  </Container>
)
