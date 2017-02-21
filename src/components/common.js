import styled from 'styled-components'

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1111px;
  width: 90vw;
`

export const Section = styled.section`
  width: 100%;
  padding: ${props => {
    if (props.thick) return '10rem 0'
    if (props.thin) return '2.5rem 0'
    return '5rem 0'
  }};
`
