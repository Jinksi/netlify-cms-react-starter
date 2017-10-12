import React from 'react'
import Helmet from 'react-helmet'

import Page from '../components/Page'
import { Container, Section } from '../components/common'
import PageHeader from '../components/PageHeader'

export default ({ page }) => {
  const { title, subtitle } = page.data
  return (
    <Page>
      <PageHeader title={title} subtitle={subtitle} />
      <Section thin>
        <Container dangerouslySetInnerHTML={{__html: page.contents}} />
      </Section>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </Page>
  )
}
