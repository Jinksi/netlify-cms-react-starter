import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import NetlifyForm from '../components/NetlifyForm'
import { Container, Section } from '../components/common'
import Marked from 'react-markdown'

const content = `
  # Example contact form

  This form is setup to use Netlify's form handling:

  - the form action is set to the current absolute url: \`action: '/contact/'\`
  - a name attribute is sent with the form's data \`'form-name': 'Contact'\`
  - netlify data attributes are added to the form \`data-netlify data-netlify-honeypot\`

  Find out more in the [Netlify Docs](https://www.netlify.com/docs/form-handling/).
`

export default ({ page }) => (
  <Page>
    <PageHeader title={page.title} subtitle='<Contact />' />
    <Section thin>
      <Container>
        <Marked source={content} />
        <br />
        <h3>{'<NetlifyForm />'}</h3>
        <NetlifyForm />
        <em>Note: this will only work when deployed on Netlify</em>
        <br />
        <em>Also, this form is active and I will receive submissions</em> 😉
      </Container>
    </Section>
    <Helmet>
      <title>{page.title}</title>
    </Helmet>
  </Page>
)
