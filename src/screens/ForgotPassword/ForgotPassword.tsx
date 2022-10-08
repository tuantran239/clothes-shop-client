import React, { Fragment, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ContainerAuth from '@App/components/ContainerAuth'
import { RouteUrl } from '@App/constants'
import { useMutation } from 'react-hooks-axios'
import ResendMail from '@App/components/ResendMail'
import ApiUrl from '@App/constants/api'
import useAlert from '@App/hooks/useAlert'
import { handleError } from '@App/utils'
import ButtonCustom from '@App/components/ButtonCustom'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [completed, setCompleted] = useState(false)
  const [body, setBody] = useState(null)
  const alert = useAlert()

  const { mutationCallback } = useMutation()
  const [send, { loading }] = mutationCallback(ApiUrl.Auth.FORGOT_PASSWORD)

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    send({
      body: { email },
      onCompleted(data) {
        alert.successToast('Successfully!')
        setBody(data)
        setCompleted(true)
      },
      onError(error) {
        alert.errorModal(handleError(error))
      }
    })
  }

  return (
    <Fragment>
      {completed && <ResendMail body={body} />}
      {!completed && (
        <ContainerAuth>
          <Form onSubmit={onSubmitHandler}>
            <h1 className="h3 mb-3 font-weight-normal text-center">
              Forgot password
            </h1>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email address"
                required={true}
                name="email"
                value={email}
                disabled={loading}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </Form.Group>
            <ButtonCustom
              className="my-3"
              variant="primary"
              type="submit"
              block={true}
              loading={loading}
              disabled={loading}
            >
              Send
            </ButtonCustom>
            <Link to={RouteUrl.LOGIN} className="text-success" id="forgot_pswd">
              <FaAngleLeft /> Back to login
            </Link>
          </Form>
        </ContainerAuth>
      )}
    </Fragment>
  )
}

export default ForgotPassword
