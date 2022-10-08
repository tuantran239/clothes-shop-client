import styled from 'styled-components'
import { medium, mobile } from '@App/responsive'

export const Container = styled.div`
  height: 70px;
  ${mobile({ height: '60px' })}
`

export const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${medium({ display: 'none' })}
`

export const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${medium({ display: 'none' })}
`

export const SearchContainer = styled.form`
  border: 0.5px solid lightgray;
  border-radius: 30px;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${medium({ display: 'none' })}
`

export const Input = styled.input`
  border: none !important;
  padding: 0px 5px;
  &:focus {
    outline: none !important;
  }
  ${mobile({ width: '50px' })}
`

export const Center = styled.div`
  flex: 1;
  text-align: center;
  cursor: pointer;
  ${medium({ 'text-align': 'left' })}
`

export const MenuIcon = styled.div`
  display: none;
  ${medium({ display: 'block' })}
`

export const Logo = styled.h1`
  font-weight: bold;
`
export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`

export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${medium({ display: 'none' })}
`
