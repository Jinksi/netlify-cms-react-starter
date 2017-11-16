import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import { Container, Section } from '../components/common'
import PageHeader from '../components/PageHeader'
import Marked from 'react-markdown'

const content = `
  # 🍉 HyperStatic

  A not-so-static site boilerplate:
  - **Create React App** for simplicity
  - **Styled Components** for component-based css
  - **React Router** for routing (v4)
  - **React Helmet** for document titles, descriptions, meta
  - **React Snapshot** for pre-rendering to static html so it works without Javascript ⭐️

  [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Jinksi/hyperstatic)
`

export default ({ title }) => {
  return (
    <Page>
      <PageHeader title={title} subtitle='<Home />' />
      <Section thin>
        <Container>
          <Marked source={content} />
        </Container>
      </Section>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </Page>
  )
}
