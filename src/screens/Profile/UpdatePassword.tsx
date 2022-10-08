import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useMutation } from 'react-hooks-axios'
import { useChangeEvent } from 'react-hooks-custom'
import ButtonCustom from '@App/components/ButtonCustom'
import { ApiUrl } from '@App/constants'
import useAlert from '@App/hooks/useAlert'
import { handleError } from '@App/utils'

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    value: input,
    onChange,
    setValue
  } = useChangeEvent({
    password: '',
    newPassword: '',
    confirm: ''
  })

  const { mutationCallback } = useMutation()
  const [updateInfo, { loading }] = mutationCallback(
    ApiUrl.User.UPDATE_PASSWORD
  )

  const alert = useAlert()

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateInfo({
      body: input,
      method: 'patch',
      onCompleted() {
        alert.successToast('Update successfully!')
        setValue!!({
          password: '',
          newPassword: '',
          confirm: ''
        })
      },
      onError(error) {
        alert.errorModal(handleError(error))
      }
    })
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Control
                className="mb-3"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                required={true}
                value={input.password}
                onChange={onChange}
                minLength={6}
                disabled={loading}
              />
              <Form.Control
                className="mb-3"
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                name="newPassword"
                required={true}
                value={input.newPassword}
                onChange={onChange}
                minLength={6}
                disabled={loading}
              />
              <Form.Control
                className="mb-3"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                name="confirm"
                required={true}
                value={input.confirm}
                onChange={onChange}
                minLength={6}
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
              block={false}
              variant="teal"
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Update
            </ButtonCustom>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default UpdatePassword
