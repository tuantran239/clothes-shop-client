import { lazy } from 'react'
import { RouteUrl } from '@App/constants'

const AuthRouterConfig = [
  {
    component: lazy(() => import('@App/screens/Login')),
    path: RouteUrl.LOGIN,
    isPublic: true
  },
  {
    component: lazy(() => import('@App/screens/Signup')),
    path: RouteUrl.SIGNUP,
    isPublic: true
  },
  {
    component: lazy(() => import('@App/screens/ForgotPassword')),
    path: RouteUrl.FORGOT_PASSWORD,
    isPublic: true
  },
  {
    component: lazy(() => import('@App/screens/Profile')),
    path: RouteUrl.PROFILE,
    isPublic: false
  }
]

export default AuthRouterConfig
