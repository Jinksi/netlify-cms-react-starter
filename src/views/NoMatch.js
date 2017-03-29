import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import { Section, Container } from '../components/common'

export default () => (
  <Page>
    <Section thin>
      <Container>
        <h1>404 – Page Not Found ⛈</h1>
      </Container>
    </Section>
    <Helmet>
      <title>404 – Page Not Found</title>
    </Helmet>
  </Page>
)
