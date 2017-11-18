import React from 'react'
import Helmet from 'react-helmet'

import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import { Container, Section } from '../components/common'
import Content from '../components/Content.js'

export default ({ page }) => (
  <Page>
    <Helmet>
      <title>{page.title}</title>
    </Helmet>
    <PageHeader
      title={page.title}
      subtitle={page.subtitle}
      backgroundImage={page.featuredImage}
    />
    <Section thin>
      <Container>
        <Content source={page.section1} />
      </Container>
    </Section>
    <Section thin>
      <Container>
        <Content source={page.section2} />
      </Container>
    </Section>
  </Page>
)
