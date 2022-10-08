import React, { useState } from 'react'
import {
  Button,
  EachSlide,
  EachSlideDiv,
  EachSlideImage
} from './Slider.styled'
import { Fade } from 'react-slideshow-image'
import { useNavigate } from 'react-router-dom'

const Slider = () => {
  const navigate = useNavigate()

  const images = ['./images/bg1.webp', '/images/bg2.gif', '/images/bg3.webp']

  const onNavigate = () => navigate('/products', { replace: true })

  const displaySlide = () => {
    let c = 0
    return images.map((image) => {
      c += 1
      const isOdd = c % 2 !== 0
      return (
        <EachSlide key={image}>
          {!isOdd && <Button onClick={onNavigate}>SHOW NOW</Button>}
          <EachSlideDiv>
            <EachSlideImage src={image} />
          </EachSlideDiv>
          {isOdd && <Button onClick={onNavigate}>SHOW NOW</Button>}
        </EachSlide>
      )
    })
  }

  return (
    <div>
      <Fade>{displaySlide()}</Fade>
    </div>
  )
}

export default Slider
