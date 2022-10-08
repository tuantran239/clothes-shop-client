import React, { useEffect, useState, Fragment } from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useMutation } from 'react-hooks-axios'
import { ApiUrl } from '@App/constants'
import ButtonCustom from '@App/components/ButtonCustom'
import useAlert from '@App/hooks/useAlert'
import { handleError } from '@App/utils'

interface PropsType {
  order: any
  handleClose: () => void
  setState: (state: string) => void
}

const cardStyle = {
  style: {
    base: {
      color: '#000',
      fontFamily: 'Roboto, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#606060'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
}

const PaymentModal = ({ order, setState, handleClose }: PropsType) => {
  const { mutationCallback } = useMutation()
  const [createPaymentIntent] = mutationCallback()
  const [payment] = mutationCallback()

  const [paymentIntent, setPaymentIntent] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const stripe = useStripe()
  const elements = useElements()
  const alert = useAlert()

  useEffect(() => {
    createPaymentIntent({
      url: ApiUrl.Order.CREATE_PAYMENT_INTENT,
      body: { amount: (order?.total || 1) * 100 },
      onCompleted(data) {
        setPaymentIntent({ ...data.paymentIntent })
      }
    })
  }, [])

  const cardHandleChange = (event: any) => {
    const { error } = event
    // setError(error ? error.message : '')
  }

  const onPaymentHandler = async () => {
    setLoading(true)
    try {
      await stripe?.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: elements?.getElement(CardNumberElement)!!
        }
      })

      payment({
        url: ApiUrl.Order.PAYMENT,
        body: { ...order, paymentInfo: paymentIntent },
        onCompleted(data) {
          setState(data.state)
          setLoading(false)
          alert.successToast('Payment successfully!')
          handleClose()
        },
        onError(error) {
          setLoading(false)
          alert.errorModal(handleError(error))
        }
      })
    } catch (error: any) {
      setLoading(false)
      alert.errorToast('Cant handle payment')
    }
  }

  return (
    <Container className="d-flex flex-column justify-content-center pb-5">
      <Row>
        <Col
          className="bg-light mx-auto shadow-sm px-4 py-3 rounded"
          xl={10}
          lg={10}
          md={10}
          sm={10}
        >
          <Fragment>
            <h4>Enter Payment Details</h4>
            <Form.Group>
              <Form.Label>
                <h6 className="m-0">Cart number</h6>
              </Form.Label>
              <CardNumberElement
                className="form-control mb-2"
                options={cardStyle}
                onChange={cardHandleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h6 className="m-0">Expire</h6>
              </Form.Label>
              <CardExpiryElement
                className="form-control mb-2"
                options={cardStyle}
                onChange={cardHandleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h6 className="m-0">Cvc</h6>
              </Form.Label>
              <CardCvcElement
                className="form-control mb-2"
                options={cardStyle}
                onChange={cardHandleChange}
              />
            </Form.Group>
            <ButtonCustom
              className="my-2"
              block={true}
              variant="teal"
              type="button"
              loading={loading}
              textloading="Handling..."
              disabled={loading}
              onClick={onPaymentHandler}
            >
              Payment
            </ButtonCustom>
          </Fragment>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentModal
