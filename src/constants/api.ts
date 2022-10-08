const AuthDomain = '/api/v1/auth'
const ProductDomain = '/api/v1/product'
const UserDomain = '/api/v1/user'
const CartDomain = '/api/v1/cart'
const OrderDomain = '/api/v1/order'

const Auth = {
  LOGOUT: `${AuthDomain}/logout`,
  SIGNUP: `${AuthDomain}/signup`,
  LOGIN: `${AuthDomain}/login`,
  FORGOT_PASSWORD: `${AuthDomain}/forgot-password`,
  AUTH_USER: `${AuthDomain}`,
  RESEND_MAIL: `${AuthDomain}/send-mail`,
  LOGIN_GOOGLE: '/api/auth/google'
}

const Product = {
  GET_PRODUCTS: `${ProductDomain}/all`,
  GET_PRODUCT: `${ProductDomain}/one`
}

const User = {
  UPDATE_INFO: `${UserDomain}/update-info`,
  UPDATE_PASSWORD: `${UserDomain}/update-password`
}

const Cart = {
  CREATE_CART: `${CartDomain}/create-cart`,
  GET_MY_CARTS: `${CartDomain}/my-carts`,
  GET_NUMBER_OF_CART: `${CartDomain}/number-of-cart`,
  DELETE_CART: `${CartDomain}/delete-cart`
}

const Order = {
  CREATE_PAYMENT_INTENT: `${OrderDomain}/create-payment-intent`,
  PAYMENT: `${OrderDomain}/payment`,
  CREATE_ORDER: `${OrderDomain}/create-order`,
  MY_ORDERS: `${OrderDomain}/my-orders`,
  CANCEL_MY_ORDER: `${OrderDomain}/cancel-my-order`
}

const ApiUrl = {
  Auth,
  Product,
  User,
  Cart,
  Order
}

export default ApiUrl
