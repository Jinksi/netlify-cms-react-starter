import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'
import './EnquiryForm.css'

const handleSubmit = e => {
  e.preventDefault()
  const form = e.target
  const data = serialize(form)
  console.log(data)
  fetch(form.action + '?' + stringify(data), {
    method: 'POST'
  })
    .then(res => {
      if (res.ok) {
        return res
      } else {
        throw new Error('Network error')
      }
    })
    .catch(console.error)
}

export default ({
  name = 'Simple Form Ajax',
  subject = '', // optional subject of the notification email
  action = ''
}) => (
  <form
    className='EnquiryForm'
    name={name}
    action={action}
    onSubmit={handleSubmit}
    data-netlify=''
    data-netlify-honeypot='_gotcha'
  >
    <label className='EnquiryForm--Label'>
      <input
        className='EnquiryForm--Input'
        type='text'
        placeholder='Name'
        name='name'
        required
      />
    </label>
    <label className='EnquiryForm--Label'>
      <input
        className='EnquiryForm--Input'
        type='email'
        placeholder='Email'
        name='email'
        required
      />
    </label>
    <label className='EnquiryForm--Label has-arrow'>
      <select
        className='EnquiryForm--Input EnquiryForm--Select'
        name='type'
        placeholder='Type of enquiry'
        required
      >
        <option selected disabled hidden>
          Type of Enquiry
        </option>
        <option>Need to know more</option>
        <option>Found a bug</option>
        <option>Want to say hello</option>
      </select>
    </label>
    <label className='EnquiryForm--Label'>
      <textarea
        className='EnquiryForm--Input EnquiryForm--Textarea'
        placeholder='Message'
        name='message'
        rows='10'
        required
      />
    </label>
    <input type='text' name='_gotcha' style={{ display: 'none' }} />
    {!!subject && <input type='hidden' name='subject' value={subject} />}
    <input type='hidden' name='form-name' value={name} />
    <input
      className='Button EnquiryForm--SubmitButton'
      type='submit'
      value='Enquire'
    />
  </form>
)
