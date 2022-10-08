import React from 'react'
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { handleUrlFilter } from '@App/utils'
import { Button, Container, Image, Info, Title } from './CategoryItem.styled'

interface PropsType {
  item: {
    img: string
    title: string
    cate: string
  }
}

const CategoryItem = ({ item }: PropsType) => {
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate(handleUrlFilter('/products', { cate: item.cate }))
  }

  return (
    <Col xl={4} lg={4} md={6} className="my-3">
      <div className="position-relative">
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button onClick={onClickHandler}>SHOP NOW</Button>
        </Info>
      </div>
    </Col>
  )
}

export default CategoryItem
