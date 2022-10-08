import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useChangeEvent } from 'react-hooks-custom'
import { useSearchParams } from 'react-router-dom'
import Announcement from '@App/components/Announcement'
import BackTo from '@App/components/BackTo'
import Footer from '@App/components/Footer'
import Navbar from '@App/components/Navbar'
import Newsletter from '@App/components/Newsletter'
import Products from '@App/components/Products'
import { CategoriesProduct, ColorProduct, RouteUrl } from '@App/constants'
import { Gender } from '@App/constants/product'
import {
  Container as StyledContainer,
  Filter,
  Option,
  Select,
  SelectContainer,
  Title
} from './ProductList.styled'

const ProductList = () => {
  const [searchParams] = useSearchParams()
  const { value: filter, onChange } = useChangeEvent({
    color: searchParams.get('color') || 'all',
    cate: searchParams.get('cate') || 'all',
    sort: searchParams.get('sort') || 'newest',
    gender: searchParams.get('gender') || 'all',
    min: searchParams.get('min') || 1,
    max: searchParams.get('max') || 5000
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const displayColors = () => {
    return Object.keys(ColorProduct).map((c) => {
      return (
        <Option key={c} selected={filter.color === c.trim().toLowerCase()}>
          {c}
        </Option>
      )
    })
  }

  const displayCategories = () => {
    return Object.keys(CategoriesProduct).map((c) => {
      return (
        <Option key={c} selected={filter.cate === c.trim().toLowerCase()}>
          {c}
        </Option>
      )
    })
  }

  const displayGender = () => {
    return Object.keys(Gender).map((g) => {
      return (
        <Option key={g} selected={filter.gender === g.trim().toLowerCase()}>
          {g}
        </Option>
      )
    })
  }

  const displayPrice = (num: any) => {
    const nums = []
    for (let i = 0; i <= 5000; i += 500) {
      nums.push(i)
    }
    return nums.map((n) => {
      return (
        <Option key={n} selected={`${num}` === `${n}`}>
          {n === 0 ? n + 1 : n}
        </Option>
      )
    })
  }

  return (
    <StyledContainer>
      <Navbar />
      <Announcement />
      <Container className="p-0">
        <Row>
          <Col style={{ marginLeft: '20px', marginTop: '20px' }}>
            <BackTo url={RouteUrl.HOME}>Back to home</BackTo>
          </Col>
        </Row>
        <Title>{filter.cate}</Title>
        <Filter>
          <SelectContainer>
            <h6>Color</h6>
            <Select onChange={onChange} name="color">
              <Option disabled selected>
                Color
              </Option>
              <Option selected={filter.color === 'all'}>ALL</Option>
              {displayColors()}
            </Select>
          </SelectContainer>
          <SelectContainer>
            <h6>Categories</h6>
            <Select onChange={onChange} name="cate">
              <Option disabled selected>
                Categories
              </Option>
              <Option selected={filter.cate === 'all'}>ALL</Option>
              {displayCategories()}
            </Select>
          </SelectContainer>
          <SelectContainer>
            <h6>Gender</h6>
            <Select onChange={onChange} name="gender">
              <Option disabled selected>
                Gender
              </Option>
              <Option selected={filter.gender === 'all'}>ALL</Option>
              {displayGender()}
            </Select>
          </SelectContainer>
          <SelectContainer>
            <h6>Min price</h6>
            <Select name="min" onChange={onChange}>
              {displayPrice(filter.min)}
            </Select>
          </SelectContainer>
          <SelectContainer>
            <h6>Max price</h6>
            <Select name="max" onChange={onChange}>
              {displayPrice(filter.max)}
            </Select>
          </SelectContainer>
          <SelectContainer>
            <h6>Sort</h6>
            <Select name="sort" onChange={onChange}>
              <Option selected>Newest</Option>
              <Option>Price(asc)</Option>
              <Option>Price(desc)</Option>
            </Select>
          </SelectContainer>
        </Filter>
      </Container>
      <Products filter={filter} path={RouteUrl.PRODUCT_LIST} />
      <Newsletter />
      <Footer />
    </StyledContainer>
  )
}

export default ProductList
