import styled from 'styled-components'

export const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Relative = styled.div`
  position: relative;
  z-index: 0;
`

export const Section = styled.section`
  width: 100%;
  padding: ${props => {
    if (props.thick) return '10rem 0'
    if (props.thin) return '2.5rem 0'
    return '5rem 0'
  }};
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1111px;
  width: 90vw;
`

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  justify-content: ${props => {
    if (props.justifyCenter) return 'center'
    if (props.justifyEnd) return 'flex-end'
    if (props.justifyBetween) return 'space-between'
    if (props.justifyAround) return 'space-around'
    return 'flex-start'
  }};
  align-items: ${props => {
    if (props.alignStart) return 'flex-start'
    if (props.alignEnd) return 'flex-end'
    if (props.alignStretch) return 'stretch'
    return 'center'
  }};
  height: ${props => props.fill ? '100%' : 'auto'};
  width: ${props => props.fill ? '100%' : 'auto'};
`

export const BackgroundImage = styled(Absolute)`
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.image});
  opacity: ${props => props.opacity || 1};
  transition: opacity .5s ease;
`
