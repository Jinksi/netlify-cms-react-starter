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
  transform: translateY(${props => (props.message ? '0' : '100%')});
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
  right: 1rem;
  top: 1rem;
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: 0.7;
    outline: none;
  }
`

export default class ServiceWorkerNotifications extends Component {
  static defaultProps = {
    readyMessage: 'This site is cached for offline use!',
    updatedMessage: 'New content is available please refresh.',
    offlineMessage: 'You are now offline, browsing from cache.',
    ready: false,
    updated: false,
    offline: false,
    reloadOnUpdate: true
  }

  state = {
    message: null
  }

  componentDidMount = () => {
    window.addEventListener('swReady', this.handleReady)
    window.addEventListener('swUpdated', this.handleUpdated)
    window.addEventListener('swOffline', this.handleOffline)
  }

  componentWillUnmount = () => {
    window.removeEventListener('swReady', this.handleReady)
    window.removeEventListener('swUpdated', this.handleUpdated)
    window.removeEventListener('swOffline', this.handleOffline)
  }

  reloadIfUpdated = () => {
    if (window.swUpdated) {
      console.log('New content available: reloading window')
      window.location.reload()
    }
  }

  handleReady = () => {
    if (!this.props.ready) return
    this.setState({ message: this.props.readyMessage })
  }

  handleUpdated = () => {
    window.swUpdated = true
    console.log('Window will reload on next render')
    if (!this.props.updated) return
    this.setState({ message: this.props.updatedMessage })
  }

  handleOffline = () => {
    if (!this.props.offline) return
    this.setState({ message: this.props.offlineMessage })
  }

  handleDismiss = () => {
    this.setState({ message: null })
  }

  render () {
    this.props.reloadOnUpdate && this.reloadIfUpdated()
    return this.state.message ? (
      <Notification message={this.state.message}>
        {this.state.message}
        <CloseButton onClick={this.handleDismiss} />
      </Notification>
    ) : null
  }
}
