import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RouteUrl } from '@App/constants'

const NavMenuContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const NavList = styled.ul`
  padding: 0 0.8em;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const NavLink = styled(motion.li)`
  font-weight: 600;
  height: 42px;
  display: flex;
  align-items: center;
  cursor: pointer;

  a {
    text-decoration: none;
    color: #444;
    font-size: 20px;
    transition: all 200ms ease-in-out;
  }

  &:hover {
    a {
      color: #555;
    }
  }
`

const variants = {
  show: {
    transform: 'translateX(0em)',
    opacity: 1
  },
  hide: {
    transform: 'translateX(5em)',
    opacity: 0
  }
}

export function NavMenu({ isOpen }: any) {
  return (
    <NavMenuContainer>
      <NavList>
        <NavLink
          initial={false}
          animate={isOpen ? 'show' : 'hide'}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.3, duration: 0.2 }
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.05, duration: 0.05 }
            }
          }}
        >
          <Link to={RouteUrl.HOME}>Home</Link>
        </NavLink>
        <NavLink
          initial={false}
          animate={isOpen ? 'show' : 'hide'}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.4, duration: 0.2 }
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.1, duration: 0.05 }
            }
          }}
        >
          <Link to={RouteUrl.PRODUCT_LIST}>Products</Link>
        </NavLink>
        <NavLink
          initial={false}
          animate={isOpen ? 'show' : 'hide'}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.5, duration: 0.2 }
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.15, duration: 0.05 }
            }
          }}
        >
          <Link to={RouteUrl.CART}>Cart</Link>
        </NavLink>
        <NavLink
          initial={false}
          animate={isOpen ? 'show' : 'hide'}
          variants={{
            show: {
              ...variants.show,
              transition: { delay: 0.6, duration: 0.2 }
            },
            hide: {
              ...variants.hide,
              transition: { delay: 0.2, duration: 0.05 }
            }
          }}
        >
          <Link to={RouteUrl.PROFILE}>Profile</Link>
        </NavLink>
      </NavList>
    </NavMenuContainer>
  )
}
