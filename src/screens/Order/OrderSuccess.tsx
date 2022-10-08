import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { RouteUrl } from '@App/constants'

const OrderSuccess = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Row>
        <Col xl={10} lg={10} className="my-5 mx-auto text-center">
          <h3>Thanks your order, our employee will contact you later</h3>
          <Button
            className="btn-teal mb-2"
            onClick={() => navigate(RouteUrl.PRODUCT_LIST)}
          >
            CONTINUE SHOPPING
          </Button>
          <Button
            className="btn-teal mb-2"
            onClick={() => navigate(RouteUrl.MY_ORDERS)}
          >
            CHECK YOUR ORDER
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderSuccess
