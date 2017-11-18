import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import { Section, Container } from '../components/common'

export default () => (
  <Page>
    <PageHeader title='404' subtitle='<NoMatch />' />
    <Section>
      <Container taCenter>
        <h3>404 – Page Not Found</h3>
      </Container>
    </Section>
    <Helmet>
      <title>404 – Page Not Found</title>
    </Helmet>
  </Page>
)
