import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useChangeEvent } from 'react-hooks-custom'
import ButtonCustom from '@App/components/ButtonCustom'
import PhoneInput from 'react-phone-number-input'

interface PropsType {
  onSetShippingInfo: (info: any) => void
  loading?: boolean
}

const ShippingInfo = ({ onSetShippingInfo, loading }: PropsType) => {
  const checkedSaveInfo = JSON.parse(
    localStorage.getItem('CheckedSaveInfo') as string
  )
  const Info = JSON.parse(localStorage.getItem('Info') as string)

  const [isChecked, setIsChecked] = useState<boolean>(checkedSaveInfo || false)
  const {
    value: input,
    onChange,
    setValue
  } = useChangeEvent({
    fullname: Info?.fullname || '',
    email: Info?.email || '',
    phone: Info?.phone || '',
    address: Info?.address || ''
  })

  useEffect(() => {
    if (checkedSaveInfo) {
      localStorage.setItem('Info', JSON.stringify(input))
    }
  }, [input])

  const onSaveInfo = () => {
    if (!checkedSaveInfo) {
      localStorage.setItem('CheckedSaveInfo', JSON.stringify(true))
      setIsChecked(true)
    } else {
      localStorage.removeItem('CheckedSaveInfo')
      localStorage.removeItem('Info')
      setIsChecked(false)
    }
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSetShippingInfo({ ...input })
  }

  return (
    <Container
      className="d-flex flex-column justify-content-center"
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
          <h4>Shipping Info</h4>
          <Form onSubmit={onSubmitHandler}>
            <Form.Group>
              <Form.Label>
                <h6 className="m-0">Fullname</h6>
              </Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="Fullname"
                required={true}
                name="fullname"
                value={input.fullname}
                onChange={onChange}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h6 className="m-0">Email</h6>
              </Form.Label>
              <Form.Control
                className="mb-2"
                type="email"
                placeholder="Email address"
                required={true}
                name="email"
                value={input.email}
                onChange={onChange}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h6 className="m-0">Phone</h6>
              </Form.Label>
              {/* <PhoneInput
                country="US"
                className="mb-2"
                type="text"
                placeholder="xxxxxxxxxx"
                required={true}
                name="phone"
                value={input.phone}
                onChange={(val) => {
                  setValue!!((pre) => {
                    return { ...pre, phone: val }
                  })
                }}
                disabled={loading}
              /> */}
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="xxxxxxxxxx"
                required={true}
                name="phone"
                value={input.phone}
                onChange={onChange}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h6 className="m-0">Address</h6>
              </Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                placeholder="address, city, country"
                required={true}
                name="address"
                value={input.address}
                onChange={onChange}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                onClick={onSaveInfo}
                checked={isChecked}
                type="checkbox"
                label="Save info"
                disabled={loading}
              />
            </Form.Group>
            <ButtonCustom
              className="my-2"
              block={true}
              variant="teal"
              type="submit"
              textloading="Hadling..."
              loading={loading}
              disabled={loading}
            >
              Create Order
            </ButtonCustom>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default ShippingInfo
