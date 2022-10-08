import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import ButtonCustom from '@App/components/ButtonCustom'
import ContainerAuth from '@App/components/ContainerAuth'
import GoogleLogin from '@App/components/GoogleLogin'
import { RouteUrl } from '@App/constants'
import useAlert from '@App/hooks/useAlert'
import { useMutation } from 'react-hooks-axios'
import ApiUrl from '@App/constants/api'
import { handleError } from '@App/utils'
import { useChangeEvent } from 'react-hooks-custom'
import styled from 'styled-components'

const Login = () => {
  const navigate = useNavigate()
  const alert = useAlert()
  const [showPassword, setShowPassword] = useState(false)
  const { value: input, onChange } = useChangeEvent({
    email: '',
    password: ''
  })
  const { mutationCallback } = useMutation()
  const [login, { loading }] = mutationCallback(ApiUrl.Auth.LOGIN)

  const onSignupNavigate = () => {
    navigate('/signup', { replace: true })
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({
      body: input,
      onCompleted() {
        localStorage.setItem('isLogin', 'true')
        navigate('/', { replace: true })
        window.location.reload()
      },
      onError(error) {
        alert.errorModal(handleError(error))
      }
    })
  }

  return (
    <ContainerAuth>
      <Form onSubmit={onSubmitHandler}>
        <h1 className="h3 mb-3 font-weight-normal text-center">Login</h1>
        <GoogleLogin />
        <p className="text-center"> OR </p>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email address"
            required={true}
            disabled={loading}
            value={input.email}
            name="email"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required={true}
            disabled={loading}
            name="password"
            value={input.password}
            onChange={onChange}
            minLength={6}
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Check
            type="checkbox"
            label="Show password"
            disabled={loading}
            onClick={() => setShowPassword(!showPassword)}
          />
        </Form.Group>
        <ButtonCustom
          className="my-2"
          variant="success"
          type="submit"
          block={true}
          icon={<FaSignInAlt size="18px" />}
          loading={loading}
          disabled={loading}
        >
          Login
        </ButtonCustom>
        <Link
          to={RouteUrl.FORGOT_PASSWORD}
          className="text-success"
          id="forgot_pswd"
        >
          Forgot password?
        </Link>
        <hr />
        <ButtonCustom
          className="btn-block"
          variant="primary"
          type="button"
          onClick={onSignupNavigate}
          block={true}
          icon={<FaUserPlus size="20px" />}
        >
          Sign up New Account
        </ButtonCustom>
      </Form>
    </ContainerAuth>
  )
}

export default Login
