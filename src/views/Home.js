import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import { Container, Section } from '../components/common'
import PageHeader from '../components/PageHeader'

export default (props) => {
  console.log(props)
  return (
    <Page>
      <PageHeader title={props.title} />
      <Section thin>
        <Container>
          <h1>Welcome.</h1>
          <p>Hello!</p>
        </Container>
      </Section>
      <Helmet>
        <title>Home</title>
      </Helmet>
    </Page>
  )
}
