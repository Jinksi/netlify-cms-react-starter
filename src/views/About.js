import React from 'react'
import Helmet from 'react-helmet'

import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import LazyImage from '../components/LazyImage'
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
        <p>The image below is a {'<LazyImage />'}</p>
        <LazyImage src={page.featuredImage} alt='LazyImage' />
      </Container>
    </Section>
  </Page>
)
