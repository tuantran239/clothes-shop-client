import React, { Fragment } from 'react'
import { ArrowDropDown, Search, ShoppingCartOutlined } from '@material-ui/icons'
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem as MItem
} from '@mui/material'
import {
  Center,
  Container,
  Language,
  Left,
  Logo,
  MenuIcon,
  MenuItem,
  Right,
  SearchContainer,
  Wrapper,
  Input
} from './Navbar.styled'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useChangeEvent } from 'react-hooks-custom'
import HamburgerMenu from '@App/components/HamburgerMenu'
import { ApiUrl, IsLogin, RouteUrl } from '@App/constants'
import { useQuery } from 'react-hooks-axios'
import { useRecoilValue } from 'recoil'
import { User } from '@App/recoils/user/atom'
import { NumberOfCart } from '@App/recoils/cart/atom'

import './Navbar.css'

const Navbar = () => {
  const [searchParams] = useSearchParams()
  const { value: s, onChange } = useChangeEvent(
    searchParams.get('search') || ''
  )
  const navigate = useNavigate()
  const { queryCallback } = useQuery()
  const [logout] = queryCallback(ApiUrl.Auth.LOGOUT)

  const user = useRecoilValue(User)
  const numberOfCart = useRecoilValue(NumberOfCart)

  const onLoginNavigate = () => {
    navigate('/login', { replace: true })
  }

  const onSearchHandler = () => {
    navigate(`/products?search=${s}`, { replace: true })
  }

  const onSumitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`/products?search=${s}`, { replace: true })
  }

  const onNavigate = (url: string) => {
    navigate(url, { replace: true })
  }

  const onLogout = () => {
    localStorage.removeItem('isLogin')
    logout({})
    window.location.reload()
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer onSubmit={onSumitHandler}>
            <Input placeholder="Search" onChange={onChange} value={s} />
            <Search
              style={{ color: 'gray', fontSize: 16, cursor: 'pointer' }}
              onClick={onSearchHandler}
            />
          </SearchContainer>
        </Left>
        <Center onClick={() => onNavigate(RouteUrl.HOME)}>
          <Logo>CLOTHES</Logo>
        </Center>
        <Right>
          {IsLogin && (
            <Fragment>
              <MenuItem className="m-item">
                <IconButton onClick={handleClick}>
                  <Avatar
                    src={user?.avatar?.url}
                    alt={user?.name}
                    sx={{ width: 32, height: 32 }}
                  />
                  <ArrowDropDown></ArrowDropDown>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  <MItem onClick={() => onNavigate(RouteUrl.PROFILE)}>
                    Profile
                  </MItem>
                  <MItem onClick={() => onNavigate(RouteUrl.MY_ORDERS)}>
                    My orders
                  </MItem>
                  <MItem onClick={onLogout}>Logout</MItem>
                </Menu>
              </MenuItem>
              <MenuItem>
                <Badge
                  badgeContent={numberOfCart}
                  color="primary"
                  overlap="rectangular"
                >
                  <ShoppingCartOutlined
                    onClick={() => onNavigate(RouteUrl.CART)}
                  />
                </Badge>
              </MenuItem>
            </Fragment>
          )}
          {!IsLogin && <MenuItem onClick={onLoginNavigate}>LOGIN</MenuItem>}
          <MenuIcon>
            <HamburgerMenu />
          </MenuIcon>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
