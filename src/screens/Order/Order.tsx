import React, { Fragment, useState } from 'react'
import { useMutation } from 'react-hooks-axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import Announcement from '@App/components/Announcement'
import Navbar from '@App/components/Navbar'
import { ApiUrl, RouteUrl } from '@App/constants'
import useAlert from '@App/hooks/useAlert'
import { AmountPriceCart, Carts, UUID } from '@App/recoils/cart/atom'
import { handleError } from '@App/utils'
import OrderSuccess from './OrderSuccess'
import ShippingInfo from './ShippingInfo'

const Order = () => {
  const [switchSuceess, setSwitch] = useState<boolean>(false)

  const [carts, setCarts] = useRecoilState(Carts)
  const [amountPriceCart, setAmountPriceCart] = useRecoilState(AmountPriceCart)

  const { mutationCallback } = useMutation()
  const [createOrder, { loading }] = mutationCallback()

  const navigate = useNavigate()
  const alert = useAlert()
  const [searchParams] = useSearchParams()

  const ID = useRecoilValue(UUID)

  if (ID !== searchParams.get('id')) {
    navigate(RouteUrl.CART)
  }

  const handleOrderItems = () => {
    if (carts.length > 0) {
      return carts.map((c) => {
        return {
          id: c?.product?.id,
          name: c?.product?.name,
          quantity: c?.quantity,
          mainImage: c?.product?.mainImage,
          color: c?.product?.color,
          size: c?.product?.size,
          price: c?.price
        }
      })
    }
  }

  const onCreateOrderHandler = (shippingInfo: any) => {
    const orderItems = handleOrderItems()
    createOrder({
      url: ApiUrl.Order.CREATE_ORDER,
      body: {
        shippingInfo,
        orderItems,
        total: amountPriceCart
      },
      onCompleted() {
        setCarts([])
        setAmountPriceCart(0)
        setSwitch(true)
        alert.successToast('Order successfully')
      },
      onError(error: any) {
        alert.errorModal(handleError(error))
      }
    })
  }

  return (
    <Fragment>
      <Navbar />
      <Announcement />
      {!switchSuceess && (
        <ShippingInfo
          onSetShippingInfo={(si: any) => onCreateOrderHandler(si)}
          loading={loading}
        />
      )}
      {switchSuceess && <OrderSuccess />}
    </Fragment>
  )
}

export default Order
