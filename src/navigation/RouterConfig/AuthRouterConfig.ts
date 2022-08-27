import { lazy } from 'react'
import { RouteUrl } from '../../constants/router'

const AuthRouterConfig = [
  {
    component: lazy(() => import('../../screens/Login')),
    path: RouteUrl.LOGIN
  },
  {
    component: lazy(() => import('../../screens/Signup')),
    path: RouteUrl.SIGNUP
  },
  {
    component: lazy(() => import('../../screens/ForgotPassword')),
    path: RouteUrl.FORGOT_PASSWORD
  }
]

export default AuthRouterConfig
