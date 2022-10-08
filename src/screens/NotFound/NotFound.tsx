import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RouteUrl } from '@App/constants'
import { Button, Container, H1, P } from './NotFoundStyled'

const NotFound = () => {
  const navigate = useNavigate()

  const onNavigate = () => {
    navigate(RouteUrl.HOME, { replace: true })
  }

  return (
    <Container>
      <H1>404</H1>
      <P>Oops! Something is wrong.</P>
      <Button onClick={onNavigate}>Back to home page</Button>
    </Container>
  )
}

export default NotFound
