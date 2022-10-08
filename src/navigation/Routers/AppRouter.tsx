import React, { useEffect, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { IsLogin, RouteUrl } from '@App/constants'
import Home from '@App/screens/Home'
import AuthRouterConfig from '../RouterConfig/AuthRouterConfig'
import AuthRouter from './AuthRouter'
import { useQuery } from 'react-hooks-axios'
import ApiUrl from '@App/constants/api'
import { useSetRecoilState } from 'recoil'
import { User } from '@App/recoils/user/atom'
import ProductRouterConfig from '../RouterConfig/ProductRouterConfig'
import ProductRouter from './ProductRouter'
import NotFound from '@App/screens/NotFound'
import { NumberOfCart } from '@App/recoils/cart/atom'

const renderRoutes = (routes: any, RouteWrapper: any) =>
  routes.map(
    ({ path, title, isPublic, component, exact = true, ...props }: any) => (
      <Route
        key={path}
        path={path}
        element={
          <RouteWrapper
            title={title}
            path={path}
            exact={exact}
            isPublic={isPublic}
            component={component}
            {...props}
          />
        }
      ></Route>
    )
  )

const AppRouter = () => {
  const setUser = useSetRecoilState(User)
  const setNumberOfCart = useSetRecoilState(NumberOfCart)

  const { queryCallback } = useQuery()
  const [authUser] = queryCallback(ApiUrl.Auth.AUTH_USER)
  const [getNumberOfCart] = queryCallback(ApiUrl.Cart.GET_NUMBER_OF_CART)

  useEffect(() => {
    authUser({
      onCompleted(data) {
        setUser(data.user)
        if (!IsLogin) {
          localStorage.setItem('isLogin', 'true')
          window.location.reload()
        }
      },
      onError() {
        if (IsLogin) {
          localStorage.removeItem('isLogin')
          window.location.reload()
        }
      }
    })
    getNumberOfCart({
      onCompleted(data) {
        setNumberOfCart(data.numberOfCart || 0)
      }
    })
  }, [])

  return (
    <Fragment>
      <Routes>
        <Route path={RouteUrl.HOME} element={<Home />} />
        {renderRoutes(AuthRouterConfig, AuthRouter)}
        {renderRoutes(ProductRouterConfig, ProductRouter)}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Fragment>
  )
}

export default AppRouter
