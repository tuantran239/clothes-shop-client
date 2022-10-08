import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { RouteUrl } from '@App/constants'
import ButtonCustom from '../ButtonCustom'
import { useMutation } from 'react-hooks-axios'
import ApiUrl from '@App/constants/api'
import useAlert from '@App/hooks/useAlert'
import { handleError } from '@App/utils'

interface PropsType {
  body: any
}

const ResendMail = ({ body }: PropsType) => {
  const { mutationCallback } = useMutation()
  const [sendMail, { loading }] = mutationCallback(ApiUrl.Auth.RESEND_MAIL)
  const alert = useAlert()

  const onClickHandler = () => {
    sendMail({
      body,
      onCompleted() {
        alert.successToast('Send mail successfully!')
      },
      onError(error) {
        alert.errorModal(handleError(error))
      }
    })
  }

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center py-3 bg-primary"
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
          <h3>Check your email to verify email</h3>
          <ButtonCustom
            className="my-3"
            variant="primary"
            block={true}
            loading={loading}
            onClick={onClickHandler}
          >
            Resend mail
          </ButtonCustom>
          <Link to={RouteUrl.LOGIN} className="text-success">
            <FaAngleLeft /> Back to login
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default ResendMail
