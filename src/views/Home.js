import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import { Container, Section } from '../components/common'
import Content from '../components/Content'
import PageHeader from '../components/PageHeader'

export default ({ page }) => {
  const { title, subtitle } = page
  return (
    <Page>
      <PageHeader title={title} subtitle={subtitle} />
      <Section thin>
        <Container>
          <Content source={page.content} />
        </Container>
      </Section>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </Page>
  )
}
