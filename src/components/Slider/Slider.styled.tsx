import styled from 'styled-components'
import { large, medium } from '@App/responsive'

export const EachSlide = styled.div`
display: flex;
width: 100%;
height: 400px;
`

export const EachSlideDiv = styled.div`
width: 75%;
${large({ width: '100%' })}
`
export const EachSlideImage = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`

export const Button = styled.button`
  padding: 0px;
  font-size: 20px;
  cursor: pointer;
  border: none;
  width: 25%;
  font-size: 1em;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0;
  background: #c6c6c640;
  font-weight: bold;
  ${large({ display: ' none' })}
`
