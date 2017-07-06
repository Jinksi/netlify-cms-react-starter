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
    this.setState({ message: 'ready' })
  }

  handleUpdated () {
    this.setState({ message: 'updated' })
  }

  handleOffline () {
    this.setState({ message: 'offline' })
  }

  render () {
    if (this.state.message) {
      return (
        <Notification>{this.state.message}</Notification>
      )
    }
    return null
  }
}
