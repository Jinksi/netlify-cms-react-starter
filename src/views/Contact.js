import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import NetlifyForm from '../components/NetlifyForm'
import { Container, Section } from '../components/common'
import Marked from 'react-markdown'

export default ({ page, site }) => (
  <Page>
    <PageHeader title={page.title} subtitle='<Contact />' />
    <Section thin>
      <Container>
        <Marked source={page.body} />
        <br />
        <h3>{'<NetlifyForm />'}</h3>
        <NetlifyForm siteTitle={site.siteTitle} />
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
