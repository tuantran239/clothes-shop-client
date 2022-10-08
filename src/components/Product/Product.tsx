import React, { Fragment } from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ColorProduct, RouteUrl } from '@App/constants'
import useModal from '@App/hooks/useModal'
import CartModal from '@App/components/CartModal'

import './Product.css'

interface PropsType {
  item: {
    id: any
    mainImage: any
    name: string
    price: number
    colors: string[]
    productType: any
  }
}

const Product = ({ item }: PropsType) => {
  const { mainImage, name, price, colors } = item
  const nameReplace = name.replace('(', ':').replace(')', '')
  let FName = nameReplace.split(':')[0]
  let LName = nameReplace.split(':')[1]

  if (FName.length > 18) {
    const arr = FName.split(' ')
    FName = arr.slice(0, arr.length - 1).join(' ') + '...'
  }

  if (LName.length > 30) {
    const arr = LName.split(' ')
    LName = arr.slice(0, arr.length - 1).join(' ') + '...'
  }

  const navigate = useNavigate()
  const { handleShow, displayModal, handleClose } = useModal()

  const onNavigateProductDetail = () => {
    navigate(`${RouteUrl.PRODUCT_DETAIL}?id=${item.id}`, { replace: true })
  }

  const displayColor = () => {
    return colors.map((c) => {
      return (
        <div
          className="product-color px-2 mb-2 mt-1"
          style={{ background: ColorProduct[c].hex }}
        ></div>
      )
    })
  }

  const onAddToCart = () => {
    handleShow()
  }

  return (
    <Fragment>
      {displayModal({
        component: <CartModal product={item} handleClose={handleClose} />
      })}
      <Col xl={3} lg={3} md={4} sm={6} className="my-3">
        <Card>
          <Card.Img
            className="product-image m-0"
            variant="top"
            src={mainImage.url}
            onClick={onNavigateProductDetail}
          />
          <Card.Body>
            <Card.Title
              className="product-title m-0"
              onClick={onNavigateProductDetail}
            >
              {FName}
            </Card.Title>
            <Card.Text className="my-1">{LName}</Card.Text>
            <Card.Text className="my-1">${price}</Card.Text>
            <div className="d-flex">{displayColor()}</div>
            <Button variant="teal" onClick={() => onAddToCart()}>
              Add to cart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  )
}

export default Product
