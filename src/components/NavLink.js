import React from 'react'
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'

import { color } from '../globalStyles'

const NavLink = styled.span`
  a {
    padding: .5rem 1rem;
    display: block;
    font-weight: 400;
    transition: color 0.2s, border-bottom-color 0.2s;
    color: ${props => props.active ? color.primary : 'inherit'};
    text-decoration: none;
    border-bottom: 1px solid;
    border-bottom-color: ${props => props.active ? color.primary : 'transparent'};
    &:hover, &:active, &:focus {
      color: ${props => props.active ? color.primary : 'inherit'};
    }
  }
`

export default ({ to, exact, match, children }) => (
  <Route path={to} exact={exact} children={({match}) => (
    <NavLink active={match}>
      <Link to={to}>{children}</Link>
    </NavLink>
  )} />
)
