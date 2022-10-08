import { lazy } from 'react'
import { RouteUrl } from '@App/constants'

const ProductRouterConfig = [
  {
    component: lazy(() => import('@App/screens/ProductList')),
    path: RouteUrl.PRODUCT_LIST,
    isPublic: true
  },
  {
    component: lazy(() => import('@App/screens/ProductDetail')),
    path: RouteUrl.PRODUCT_DETAIL,
    isPublic: true
  },
  {
    component: lazy(() => import('@App/screens/Cart')),
    path: RouteUrl.CART,
    isPublic: false
  },
  {
    component: lazy(() => import('@App/screens/Order')),
    path: RouteUrl.ORDER,
    isPublic: false
  },
  {
    component: lazy(() => import('@App/screens/MyOrders')),
    path: RouteUrl.MY_ORDERS,
    isPublic: false
  }
]

export default ProductRouterConfig
