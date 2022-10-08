import React, { useEffect } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useMutation } from 'react-hooks-axios'
import { useChangeEvent } from 'react-hooks-custom'
import ButtonCustom from '@App/components/ButtonCustom'
import { ApiUrl } from '@App/constants'
import useAlert from '@App/hooks/useAlert'
import { handleError } from '@App/utils'

interface PropsType {
  user: any
}

const Info = ({ user }: PropsType) => {
  const { value: input, onChange } = useChangeEvent({
    email: user?.email || '',
    name: user?.name || ''
  })

  const { mutationCallback } = useMutation()
  const [updateInfo, { loading }] = mutationCallback(ApiUrl.User.UPDATE_INFO)

  const alert = useAlert()

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateInfo({
      body: input,
      method: 'patch',
      onCompleted() {
        alert.successToast('Update successfully!')
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
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
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
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
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

export default Info
