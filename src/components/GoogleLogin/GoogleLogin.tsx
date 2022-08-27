import React from 'react'
import { FaGooglePlusG } from 'react-icons/fa'
import ButtonCustom from '../ButtonCustom'

const GoogleLogin = () => {
  return (
    <div className="social d-flex justify-content-center">
      <ButtonCustom
        className="my-2"
        block={false}
        variant="danger"
        icon={<FaGooglePlusG size="22px" />}
      >
        Login with Google
      </ButtonCustom>
    </div>
  )
}

export default GoogleLogin
