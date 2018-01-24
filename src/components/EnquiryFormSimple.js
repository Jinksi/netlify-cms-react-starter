import React from 'react'

import './EnquiryForm.css'

export default ({
  name = 'Simple Form',
  subject = '', // optional subject of the notification email
  action = ''
}) => (
  <form
    className='EnquiryForm'
    name={name}
    action={action}
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
        defaultValue='Type of Enquiry'
        required
      >
        <option disabled hidden>
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
