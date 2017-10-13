import React from 'react'
import Helmet from 'react-helmet'
import Marked from 'react-markdown'
import Page from '../components/Page'
import { Container, Section } from '../components/common'
import PageHeader from '../components/PageHeader'

export default ({ page }) => {
  const { title, subtitle } = page
  return (
    <Page>
      <PageHeader title={title} subtitle={subtitle} />
      <Section thin>
        <Container>
          <Marked source={page.body} />
        </Container>
      </Section>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </Page>
  )
}
