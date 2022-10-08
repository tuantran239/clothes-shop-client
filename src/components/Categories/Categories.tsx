import { Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { CategoriesProduct } from '@App/constants'
import { mobile } from '@App/responsive'
import CategoryItem from '../CategoryItem'

const categoryItems = Object.keys(CategoriesProduct).map((c) => {
  const item = {
    title: c,
    img: `/images/${c}.jpg`,
    cate: c.trim().toString()
  }
  return item
})

const Categories = () => {
  return (
    <Container>
      <Row>
        {categoryItems.map((item) => (
          <CategoryItem item={item} key={item.title} />
        ))}
      </Row>
    </Container>
  )
}

export default Categories
