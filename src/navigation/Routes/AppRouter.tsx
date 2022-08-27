import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RouteUrl } from '../../constants/router'
import Home from '../../screens/Home'
import AuthRouterConfig from '../RouterConfig/AuthRouterConfig'
import AuthRoute from './AuthRoute'

const renderRoutes = (routes: any, RouteWrapper: any) =>
  routes.map(({ path, title, component, exact = true, ...props }: any) => (
    <Route
      key={path}
      path={path}
      element={
        <RouteWrapper
          title={title}
          path={path}
          exact={exact}
          component={component}
          {...props}
        />
      }
    ></Route>
  ))

const AppRouter = () => {
  return (
    <Routes>
      <Route path={RouteUrl.HOME} element={<Home />} />
      {renderRoutes(AuthRouterConfig, AuthRoute)}
    </Routes>
  )
}

export default AppRouter
