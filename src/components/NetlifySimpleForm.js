import React from 'react'
import styled from 'styled-components'
import { color } from '../globalStyles'

export default ({
  name = 'Simple Form',
  subject = '', // optional subject of the notification email
  action = ''
}) => (
  <StyledForm
    name={name}
    action={action}
    data-netlify=''
    data-netlify-honeypot='_gotcha'
  >
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
      />
    </Label>
    <Label className='Label'>
      <Textarea
        className='Input'
        placeholder='Message'
        name='message'
        rows='10'
        required
      />
    </Label>
    <Input type='text' name='_gotcha' style={{ display: 'none' }} />
    {!!subject && <Input type='hidden' name='subject' value={subject} />}
    <Input type='hidden' name='form-name' value={name} />
    <Button className='button' type='submit' value='Send' />
  </StyledForm>
)

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
