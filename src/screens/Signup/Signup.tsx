import React, { Fragment, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FaUserPlus, FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ButtonCustom from '../../components/ButtonCustom'
import ContainerAuth from '../../components/ContainerAuth'
import { RouteUrl } from '../../constants/router'
import useAlert from '../../hooks/useAlert'
import { useChangeEvent } from 'react-hooks-custom'
import GoogleLogin from '../../components/GoogleLogin'
import ResendMail from '../../components/ResendMail'
import { useMutation } from 'react-hooks-axios'
import ApiUrl from '../../constants/api'
import { handleError } from '../../utils'

const Signup = () => {
  const alert = useAlert()
  const [completed, setCompleted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [body, setBody] = useState(null)
  const { value: input, onChange } = useChangeEvent({
    name: '',
    email: '',
    password: ''
  })
  const { mutationCallback } = useMutation()
  const [signup, { loading }] = mutationCallback(ApiUrl.Auth.SIGNUP)

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signup({
      body: input,
      onCompleted(data) {
        alert.successToast('Signup successfully!')
        setCompleted(true)
        setBody(data)
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
          <h1 className="h3 mb-3 font-weight-normal text-center">Signup</h1>
          <Form onSubmit={onSubmitHandler}>
            <GoogleLogin />
            <p className="text-center"> OR </p>
            <Form.Group>
              <Form.Control
                className="mb-1"
                type="text"
                placeholder="Name"
                required={true}
                value={input.name}
                name="name"
                onChange={onChange}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="mb-1"
                type="email"
                placeholder="Email address"
                required={true}
                value={input.email}
                name="email"
                onChange={onChange}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="mb-1"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                required={true}
                value={input.password}
                onChange={onChange}
                minLength={6}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="mb-1"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                required={true}
                pattern={input.password}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Check
                type="checkbox"
                label="Show password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              />
            </Form.Group>
            <ButtonCustom
              className="my-2"
              block={true}
              icon={<FaUserPlus size="20px" />}
              variant="primary"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Sign up
            </ButtonCustom>
            <Link to={RouteUrl.LOGIN} className="text-success">
              <FaAngleLeft /> Back to login
            </Link>
          </Form>
        </ContainerAuth>
      )}
    </Fragment>
  )
}

export default Signup
