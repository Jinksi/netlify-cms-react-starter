import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import NetlifyControlledForm from '../components/NetlifyControlledForm'
import NetlifySimpleForm from '../components/NetlifySimpleForm'
import { Container, Section } from '../components/common'
import Marked from 'react-markdown'

export default ({ page, site }) => (
  <Page>
    <PageHeader title={page.title} subtitle='<Contact />' />
    <Section thin>
      <Container>
        <Marked source={page.body} />
        <br />
        <h3>{'<NetlifyControlledForm />'}</h3>
        <NetlifyControlledForm />
        <br />
        <h3>{'<NetlifySimpleForm />'}</h3>
        <NetlifySimpleForm />
        <em>Note: these will only work when deployed on Netlify</em>
        <br />
        <em>Also, they are active and I will receive submissions</em> 😉
      </Container>
    </Section>
    <Helmet>
      <title>{page.title}</title>
    </Helmet>
  </Page>
)
