import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ContainerAuth from '../../components/ContainerAuth'
import { RouteUrl } from '../../constants/router'

const ForgotPassword = () => {
  return (
    <ContainerAuth>
      <Form>
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Forgot password
        </h1>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email address"
            required={true}
          />
        </Form.Group>
        <div className="d-grid gap-2 mt-3 mb-2">
          <Button className="btn-block" variant="primary" type="submit">
            Send
          </Button>
        </div>
        <Link to={RouteUrl.LOGIN} className="text-success" id="forgot_pswd">
          <FaAngleLeft /> Back to login
        </Link>
      </Form>
    </ContainerAuth>
  )
}

export default ForgotPassword
