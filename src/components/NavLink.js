import React from 'react'
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'

const NavLink = styled.span`
  a {
    padding: .5rem 1rem;
    display: block;
    font-weight: 400;
    transition: color 0.2s, border-bottom-color 0.2s;
    color: ${props => props.active ? 'var(--col1)' : 'inherit'};
    text-decoration: none;
    border-bottom: 1px solid;
    border-bottom-color: ${props => props.active ? 'var(--col1)' : 'transparent'};
    &:hover, &:active, &:focus {
      color: ${props => props.active ? 'var(--col1)' : 'inherit'};
    }
  }
`

export default ({path, exact, ...props}) => (
  <Route path={path} exact={exact} children={({match}) => (
    <NavLink active={match}>
      <Link to={path}>{props.title}</Link>
    </NavLink>
  )} />
)
