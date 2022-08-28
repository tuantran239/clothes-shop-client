import React from 'react'
import { FaGooglePlusG } from 'react-icons/fa'
import ButtonCustom from '../ButtonCustom'
import ApiUrl from '../../constants/api'

const GoogleLogin = () => {
  const onClickHandler = () => {
    window.location.replace(`http://localhost:5000${ApiUrl.Auth.LOGIN_GOOGLE}`)
  }

  return (
    <div className="social d-flex justify-content-center">
      <ButtonCustom
        className="my-2"
        block={false}
        variant="danger"
        icon={<FaGooglePlusG size="22px" />}
        onClick={onClickHandler}
        type="button"
      >
        Login with Google
      </ButtonCustom>
    </div>
  )
}

export default GoogleLogin
