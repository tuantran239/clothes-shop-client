import React, { Fragment, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import Collapse from 'react-bootstrap/Collapse'
import ButtonCustom from '@App/components/ButtonCustom'
import DeleteModal from '@App/components/DeleteModal'
import PaymentModal from '@App/components/PaymentModal'
import { ApiUrl } from '@App/constants'
import useModal from '@App/hooks/useModal'
import { OrderState } from '@App/types/product.type'

interface PropsType {
  order: any
  onRemoveOrder: (OrderID: any) => void
}

const TableItems = ({ order, onRemoveOrder }: PropsType) => {
  const orderItems = order?.orderItems || []
  const OrderID = order?.OrderID || ''
  const total = order?.total || 0
  const shippingInfo = order?.shippingInfo || null

  const [open, setOpen] = useState(true)
  const [state, setState] = useState(order?.state || '')

  const { displayModal, handleClose, handleShow } = useModal()
  const {
    displayModal: dispalyPaymentModal,
    handleClose: onClose,
    handleShow: onShow
  } = useModal()

  const displayOrderItems = () => {
    if (orderItems && orderItems.length > 0) {
      return orderItems.map((item: any) => {
        return (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td className="text-center">
              <img
                src={item.mainImage?.url}
                alt={item.name}
                width="50px"
                height="50px"
              />
            </td>
            <td>${item.price}</td>
            <td>{item.quantity}</td>
          </tr>
        )
      })
    }
  }

  return (
    <Fragment>
      {displayModal({
        component: (
          <DeleteModal
            url={
              ApiUrl.Order.CANCEL_MY_ORDER +
              `?OrderID=${OrderID}&state=${state}`
            }
            handleClose={handleClose}
            title="Are you sure cancel this order?"
            buttonText="Cancel"
            onCompleted={() => {
              onRemoveOrder(OrderID)
            }}
          />
        )
      })}

      {dispalyPaymentModal({
        component: (
          <PaymentModal
            setState={(state: any) => setState(state)}
            order={order}
            handleClose={onClose}
          />
        )
      })}

      <ButtonCustom
        variant="teal"
        block={true}
        onClick={() => setOpen(!open)}
        className="mt-5"
      >
        {OrderID}
      </ButtonCustom>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{shippingInfo?.fullname}</td>
                <td>{shippingInfo?.email}</td>
                <td>{shippingInfo?.phone}</td>
                <td>{shippingInfo?.address}</td>
              </tr>
            </tbody>
          </Table>
          <Table bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>{displayOrderItems()}</tbody>
            <tbody>
              <tr>
                <div className="d-flex align-items-center">
                  <h6 className="my-0 mx-2">State: </h6> {state}
                </div>
                <div className="d-flex align-items-center">
                  <h6 className="my-0 mx-2">Total: </h6>${total}
                </div>
              </tr>
            </tbody>
          </Table>
          <div className="">
            {state && state === OrderState.CHECKED && (
              <Button variant="teal" onClick={onShow}>
                Payment
              </Button>
            )}{' '}
            {state && state === OrderState.PLACEMENT && (
              <Button variant="danger" onClick={handleShow}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </Collapse>
    </Fragment>
  )
}

export default TableItems
