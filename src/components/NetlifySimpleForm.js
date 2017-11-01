import React, { Component } from 'react'
import styled from 'styled-components'
import { stringify } from 'qs'
import { color } from '../globalStyles'
const fetch = window.fetch

export default class NetlifySimpleForm extends Component {
  static defaultProps = {
    name: 'SimpleForm',
    subject: '',
    action: window.location.pathname
  }

  state = {
    alert: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ disabled: true })
    fetch(e.target.action + '?' + stringify('data'), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(res => {
        this.setState({
          disabled: false,
          alert: 'Thanks for your enquiry, we will get back to you soon.'
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          disabled: false,
          alert:
            '❗️ There is a problem, your message has not been sent, please try contacting us via email'
        })
      })
  }

  render () {
    const { name, action, subject } = this.props
    const { alert } = this.state
    return (
      <StyledForm
        name={name}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=''
        data-netlify-honeypot='_gotcha'
      >
        {alert && <Alert>{alert}</Alert>}
        <Label className='Label'>
          <Input
            className='Input'
            type='text'
            placeholder='Your Name'
            name='name'
            required
          />
        </Label>
        <Label className='Label'>
          <Input
            className='Input'
            type='email'
            placeholder='Your Email'
            name='email'
            required
            disabled={this.state.disabled ? 'disabled' : ''}
          />
        </Label>
        <Label className='Label'>
          <Textarea
            className='Input'
            placeholder='Message'
            name='message'
            rows='10'
            required
            disabled={this.state.disabled ? 'disabled' : ''}
          />
        </Label>
        <Input type='text' name='_gotcha' style={{ display: 'none' }} />
        <Input type='hidden' name='subject' value={subject} />
        <Input type='hidden' name='form-name' value={name} />
        <Button
          className='button'
          type='submit'
          value='Send'
          disabled={this.state.disabled ? 'disabled' : ''}
        />
      </StyledForm>
    )
  }
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 500px;
  margin: 2.5rem 0;

  & > * + * {
    margin-top: 1.5rem;
  }
`
const Label = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const Input = styled.input`
  font-family: inherit;
  font-weight: 400;
  flex-grow: 1;
  box-sizing: border-box;
  display: block;
  margin: 0;
  border: none;
  border-bottom: 1px solid #bababa;
  padding: 0.5em 0;
  line-height: 1;
  transition: border-color 0.2s;
  resize: none;

  &:focus {
    outline: none;
    border-color: black;
  }

  &[disabled] {
    opacity: 0.4;
    pointer-events: none;
    cursor: progress;
  }
`
const Textarea = Input.withComponent('textarea')
const Alert = styled.p`
  background: whitesmoke;
  width: 100%;
  padding: 2rem;
`
const Button = styled.input`
  background: ${color.primary};
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 400;
  letter-spacing: 0.15em;
  font-size: 1.4rem;
  display: inline-block;
  padding: 1rem 2rem;
  border: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover,
  &:focus {
    color: white;
  }

  &[disabled] {
    opacity: 0.4;
    pointer-events: none;
    cursor: progress;
  }
`
