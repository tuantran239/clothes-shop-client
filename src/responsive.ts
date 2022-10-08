import { css } from 'styled-components'

export const mobile = (props: any) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `
}

export const large = (props: any) => {
  return css`
    @media only screen and (max-width: 960px) {
      ${props}
    }
  `
}

export const medium = (props: any) => {
  return css`
    @media only screen and (max-width: 720px) {
      ${props}
    }
  `
}
