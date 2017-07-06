import React, { Component } from 'react'
import styled from 'styled-components'
import { color } from '../globalStyles'

const Notification = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background: ${color.primary};
  color: white;
  padding: 1rem;
  min-height: 5rem;
  transition: transform 0.1s ease-in-out;
  transform: translateY(${props => props.message ? '0' : '100%'});
`
const CloseButton = styled.button.attrs({
  children: 'x'
})`
  border: none;
  background: white;
  color: ${color.primary};
  border-radius: 100%;
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  right: 1rem;;
  top: 1rem;
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: 0.7;
    outline: none;
  }
`

export default class ServiceWorkerNotifications extends Component {
  constructor (props) {
    super(props)

    this.state = {
      message: null
    }

    this.handleReady = this.handleReady.bind(this)
    this.handleUpdated = this.handleUpdated.bind(this)
    this.handleOffline = this.handleOffline.bind(this)
    this.handleDismiss = this.handleDismiss.bind(this)
  }

  componentDidMount () {
    window.addEventListener('swReady', this.handleReady)
    window.addEventListener('swUpdated', this.handleUpdated)
    window.addEventListener('swOffline', this.handleOffline)
  }

  componentWillUnmount () {
    window.removeEventListener('swReady', this.handleReady)
    window.removeEventListener('swUpdated', this.handleUpdated)
    window.removeEventListener('swOffline', this.handleOffline)
  }

  handleReady () {
    this.setState({ message: 'This site is cached for offline use!' })
  }

  handleUpdated () {
    this.setState({ message: 'New content is available please refresh.' })
  }

  handleOffline () {
    this.setState({ message: null })
  }

  handleDismiss () {
    this.setState({ message: null })
  }

  render () {
    return (
      <Notification message={this.state.message}>
        {this.state.message}
        <CloseButton onClick={this.handleDismiss} />
      </Notification>
    )
  }
}
