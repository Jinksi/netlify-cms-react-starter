import { injectGlobal } from 'styled-components'
import { normalize } from 'polished'

export const font = {
  primary: `'Open Sans', sans-serif`
}

export const color = {
  primary: '#FA5463',
  secondary: '#212121',
  lightGrey: 'whitesmoke'
}

export default () => injectGlobal`
  ${normalize()}

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    background: ${color.lightGrey};
  }

  body {
    font-family: ${font.primary};
    min-height: 100vh;
    position: relative;
    background: white;
    color: ${color.secondary};
    font-size: 1.6em;
    font-weight: 300;
    letter-spacing: .01em;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a {
    color: ${color.primary};
  }

  strong{
    font-weight: 600;
  }
`
