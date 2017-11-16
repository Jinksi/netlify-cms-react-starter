import React from 'react'
import Helmet from 'react-helmet'
import { KawaiiPlanet } from 'react-kawaii'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import { Section, Container, Flex } from '../components/common'
import { color } from '../globalStyles'

export default () => (
  <Page>
    <PageHeader title='404' subtitle='<NoMatch />' />
    <Section>
      <Container taCenter>
        <Flex justifyCenter>
          <KawaiiPlanet
            size={200}
            mood='sad'
            color={color.primary}
            text={`😖`}
          />
        </Flex>
        <h3>404 – Page Not Found</h3>
      </Container>
    </Section>
    <Helmet>
      <title>404 – Page Not Found</title>
    </Helmet>
  </Page>
)
