import React, { Fragment, Suspense } from 'react'

interface PropsType {
  component: React.ElementType
}

const AuthRoute = ({ component: Component }: PropsType) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  )
}

export default AuthRoute
