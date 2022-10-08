import styled from 'styled-components'
import { large, medium, mobile } from '@App/responsive'

export const Container = styled.div``

export const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${large({ padding: '10px', flexDirection: 'column' })}
`

export const ImgContainer = styled.div`
  ${large({ display: 'flex' })}
  ${medium({ display: 'flex', flexDirection: 'column' })}
`

export const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${large({ width: '60%' })}
  ${medium({ width: '100%' })}
`

export const InfoContainer = styled.div`
  padding: 0px 50px;
  ${medium({ padding: '0px 20px 20px 10px' })}
`

export const Title = styled.h1`
  font-weight: 200;
`

export const Desc = styled.p`
  margin: 20px 0px;
`

export const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`

export const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${mobile({ width: '100%' })}
`

export const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`

export const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 5px;
`

export const FilterAmount = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`

export const FilterColor = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${(props: { color: string; active: boolean }) =>
    props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: ${(props: { color: string; active: boolean }) =>
    props.active ? '4px solid #f5f5f57a' : 'none'};
`

export const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`

export const FilterSizeOption = styled.option``

export const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: '100%' })}
`

export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`

export const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`

export const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
  ${medium({ 'font-size': '15px', padding: '10px' })}
`

export const ChangeButton = styled.button`
  border: 20px;
  cursor: pointer;
  background-color: white;
`
