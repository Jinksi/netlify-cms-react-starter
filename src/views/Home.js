import React from 'react'
import Helmet from 'react-helmet'
import Page from '../components/Page'
import { Container } from '../components/common'
import PageHeader from '../components/PageHeader'

export default (props) => (
  <Page>
    <PageHeader title={props.title}/>
    <Container>
      <h1>Welcome.</h1>
      <p>Hello!</p>
    </Container>
    <Helmet title='Home' />
  </Page>
)
