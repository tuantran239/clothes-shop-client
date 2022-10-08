import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import './ContainerAuth.css'

interface PropsType {
  children: React.ReactNode
}

const ContainerAuth = ({ children }: PropsType) => {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center py-3 container-auth"
      style={{ height: '100vh' }}
    >
      <Row>
        <Col
          className="bg-light mx-auto shadow-sm px-4 py-3 rounded"
          lg={4}
          md={6}
          sm={8}
          xs={9}
        >
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default ContainerAuth
