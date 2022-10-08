import React, { Fragment, useEffect, useState } from 'react'
import { Add, Remove } from '@material-ui/icons'
import Announcement from '@App/components/Announcement'
import Footer from '@App/components/Footer'
import Navbar from '@App/components/Navbar'
import {
  Bottom,
  Button,
  ChangeButton,
  Container,
  Details,
  Hr,
  Image,
  Info,
  PriceDetail,
  Product,
  ProductAmount,
  ProductAmountContainer,
  ProductColor,
  ProductDetail,
  ProductName,
  ProductPrice,
  ProductSize,
  Summary,
  SummaryItem,
  SummaryItemPrice,
  SummaryItemText,
  SummaryTitle,
  Title,
  Top,
  TopButton,
  Wrapper
} from './Cart.styled'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { User } from '@App/recoils/user/atom'
import { useMutation, useQuery } from 'react-hooks-axios'
import { ApiUrl, ColorProduct, MaxQuantity, RouteUrl } from '@App/constants'
import Skeleton from 'react-loading-skeleton'
import { AmountPriceCart, Carts, UUID } from '@App/recoils/cart/atom'
import useAlert from '@App/hooks/useAlert'
import ButtonCustom from '@App/components/ButtonCustom'
import { handleError } from '@App/utils'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'

const Cart = () => {
  const user = useRecoilValue(User)
  const [carts, setCarts] = useRecoilState(Carts)
  const setAmountPriceCart = useSetRecoilState(AmountPriceCart)
  const setUUID = useSetRecoilState(UUID)
  const [total, setTotal] = useState(0)
  const [ID, setID] = useState('')
  const alert = useAlert()
  const navigate = useNavigate()

  const { queryCallback } = useQuery()
  const [getUserCarts, { loading }] = queryCallback(ApiUrl.Cart.GET_MY_CARTS)

  const { mutationCallback } = useMutation()
  const [deleteCart, { loading: deleting }] = mutationCallback(
    ApiUrl.Cart.DELETE_CART
  )

  useEffect(() => {
    getUserCarts({
      onCompleted(data) {
        setCarts(data.carts || [])
      }
    })
  }, [])

  useEffect(() => {
    const t = countTotal(carts)
    setTotal(t)
    setAmountPriceCart(t)
  }, [carts])

  const onChangeQuantityProduct = (action: 'add' | 'remove', id: any) => {
    const cartsClone = JSON.parse(JSON.stringify(carts))
    const index = cartsClone.findIndex((c: any) => c.id === id)
    if (index !== -1) {
      const quantity = cartsClone[index].quantity
      if (action === 'add') {
        if (quantity + 1 > MaxQuantity) {
          alert.warningModal(<h6>Number of products exceed {MaxQuantity}</h6>)
          return
        }
        cartsClone[index].quantity = quantity + 1
        setCarts(JSON.parse(JSON.stringify(cartsClone)))
      } else if (action === 'remove') {
        if (quantity - 1 > 0) {
          cartsClone[index].quantity = quantity - 1
          setCarts(JSON.parse(JSON.stringify(cartsClone)))
        }
      }
    }
  }

  const onDeleteCart = async (id: any) => {
    setID(id)
    deleteCart({
      body: { id },
      onCompleted() {
        let cartsClone = JSON.parse(JSON.stringify(carts))
        cartsClone = cartsClone.filter((c: any) => c.id !== id)
        setCarts(JSON.parse(JSON.stringify(cartsClone)))
        setID('')
      },
      onError(error) {
        alert.errorModal(handleError(error))
      }
    })
  }

  const displayCarts = () => {
    if (carts.length > 0) {
      return carts.map((cart) => {
        const { id, quantity, product, price } = cart
        return (
          <Fragment>
            <Product key={id}>
              <ProductDetail>
                <Image src={product?.mainImage?.url} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product?.name}
                  </ProductName>
                  <ProductColor
                    color={ColorProduct[product?.color || '']?.hex}
                  />
                  <ProductSize>
                    <b>Color:</b> {ColorProduct[product?.color || '']?.name}
                  </ProductSize>
                  <ProductSize>
                    <b>Size:</b> {product?.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <ProductAmount>
                    {' '}
                    <ChangeButton
                      onClick={() => onChangeQuantityProduct('remove', id)}
                    >
                      <Remove />
                    </ChangeButton>
                    {quantity}
                    <ChangeButton
                      onClick={() => onChangeQuantityProduct('add', id)}
                    >
                      <Add />
                    </ChangeButton>
                  </ProductAmount>
                </ProductAmountContainer>
                <ProductPrice>${price}</ProductPrice>
                <ButtonCustom
                  onClick={() => onDeleteCart(id)}
                  block={false}
                  variant="teal"
                  type="button"
                  className="mt-4"
                  loading={ID === id && deleting}
                  disabled={deleting}
                >
                  REMOVE
                </ButtonCustom>
              </PriceDetail>
            </Product>
            <Hr />
          </Fragment>
        )
      })
    }
  }

  const countTotal = (carts: any[]) => {
    if (carts.length === 0) return 0
    return carts.reduce((total, cart) => {
      return cart?.price * cart?.quantity + total
    }, 0)
  }

  const onNavigateCheckout = () => {
    if (carts.length === 0) {
      alert.warningModal(<h6>Cart empty</h6>)
      return
    }
    const id = uuid()
    setUUID(id)
    navigate(RouteUrl.ORDER + `?id=${id}`)
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton typeColor="filled">CONTINUE SHOPPING</TopButton>
        </Top>
        {loading && <Skeleton count={20} />}
        {!loading && (
          <Bottom>
            <Info>{displayCarts()}</Info>

            <Fragment>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem type={undefined}>
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>${total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type={undefined}>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 6</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type={undefined}>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -6</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {total}</SummaryItemPrice>
                </SummaryItem>
                <Button onClick={onNavigateCheckout}>ORDER</Button>
              </Summary>
            </Fragment>
          </Bottom>
        )}
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart
