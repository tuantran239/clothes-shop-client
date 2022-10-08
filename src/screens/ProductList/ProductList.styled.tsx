import styled from 'styled-components'
import { medium, mobile } from '@App/responsive'

export const Container = styled.div``

export const Title = styled.h1`
  margin: 20px;
  text-transform: uppercase;
`

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Filter = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: row;
  ${medium({ width: '0px 20px', display: 'flex', 'flex-wrap': 'wrap' })}
`

export const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: '0px' })}
`
export const SelectContainer = styled.div`
  ${medium({ margin: '5px 5px' })}
`

export const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`
export const Option = styled.option``
