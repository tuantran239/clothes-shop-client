import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.button`
  background: teal;
  padding: 10px;
  color: white;
  text-align: center;
  border: none;
  &:focus {
    outline: none;
  }
`

interface PropsType {
  url: string
  children: React.ReactNode
}

const BackTo = ({ url, children }: PropsType) => {
  const navigate = useNavigate()
  const onNavigate = () => {
    navigate(url, { replace: true })
  }
  return <Button onClick={onNavigate}>{children}</Button>
}

export default BackTo
