import React, { Suspense, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '@App/components/Loading'
import { IsLogin, RouteUrl } from '@App/constants'

interface PropsType {
  isPublic: boolean
  component: React.ElementType
}

const ProductRouter = ({ component: Component, isPublic }: PropsType) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!IsLogin && !isPublic) {
      navigate(RouteUrl.LOGIN, { replace: true })
    }
  }, [])

  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  )
}

export default ProductRouter
