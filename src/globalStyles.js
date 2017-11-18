import { injectGlobal } from 'styled-components'
import { normalize } from 'polished'

export const font = {
  primary: `'Open Sans', sans-serif`,
  system: `-apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`
}

export const color = {
  primary: 'tomato',
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
    font-family: ${font.system};
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

  strong {
    font-weight: 600;
  }

  p {
    margin-top: 0;
    margin-bottom: 1em;
  }

  h1, h2, h3, h4, h5 ,h6{
    margin: 0;
    margin-bottom: 0.5em;
  }

  pre {
    background: ${color.lightGrey};
    line-height: 1.45;
    font-size: 85%;
    border-radius: 3px;
    padding: 16px;
  }

  code {
    font-size: 85%;
    padding: 0.15em 0;
    background: ${color.lightGrey};
    border-radius: 3px;

    &:before,
    &:after {
      letter-spacing: -0.2em;
      content: "\00a0";
    }

    pre & {
      font-size: inherit;

      &:before,
      &:after {
        display: none;
      }
    }
  }
`
