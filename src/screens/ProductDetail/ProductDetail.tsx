import React, { useEffect, useState } from 'react'
import {
  AddContainer,
  Amount,
  AmountContainer,
  Button,
  Container as StyledContainer,
  Desc,
  Filter,
  FilterAmount,
  FilterColor,
  FilterContainer,
  FilterSize,
  FilterSizeOption,
  FilterTitle,
  Image,
  ImgContainer,
  InfoContainer,
  Price,
  Wrapper,
  Title,
  ChangeButton
} from './ProductDetail.styled'
import { Add, Remove } from '@material-ui/icons'
import Navbar from '@App/components/Navbar'
import Announcement from '@App/components/Announcement'
import Newsletter from '@App/components/Newsletter'
import Footer from '@App/components/Footer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-hooks-axios'
import {
  ApiUrl,
  ColorProduct,
  IsLogin,
  MaxQuantity,
  RouteUrl
} from '@App/constants'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import Skeleton from 'react-loading-skeleton'
import { Col, Container, Row } from 'react-bootstrap'
import { handleArrayData } from '@App/utils/handler'
import ButtonCustom from '@App/components/ButtonCustom'
import useAlert from '@App/hooks/useAlert'
import { useSetRecoilState } from 'recoil'
import { NumberOfCart } from '@App/recoils/cart/atom'

const ProductDetail = () => {
  const [product, setProduct] = useState<any>(null)
  const [productType, setProductType] = useState<any[]>([])
  const [amount, setAmount] = useState(0)
  const [color, setColor] = useState<string>('')
  const [size, setSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const setNumberOfCart = useSetRecoilState(NumberOfCart)

  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const { queryCallback } = useQuery()
  const [getProduct, { loading }] = queryCallback(
    ApiUrl.Product.GET_PRODUCT + `/${id}`
  )
  const { mutationCallback } = useMutation()
  const [createCart, { loading: handling }] = mutationCallback(
    ApiUrl.Cart.CREATE_CART
  )

  const navigate = useNavigate()
  const alert = useAlert()

  useEffect(() => {
    getProduct({
      onCompleted(data) {
        window.scrollTo(0, 0)
        setProduct(data.product)
        setColor(data.product?.colors[0] || '')
        setSize(data.product?.sizes[0] || '')
        setProductType((pre) => [
          ...pre,
          ...handleArrayData(data.product.productType)
        ])
      }
    })
  }, [])

  useEffect(() => {
    const pt = productType.find((pt) => pt.size === size && pt.color === color)
    if (pt && pt.amount) {
      setAmount(pt.amount)
    } else {
      setAmount(0)
    }
  }, [color, size])

  const displayImagesView = () => {
    if (product && product.images && product.images instanceof Array) {
      return product.images.map((image: any) => {
        return (
          <PhotoView src={image.url} key={image.public_id}>
            <img
              src={image.url}
              alt={image.public_id}
              width="100px"
              height="100px"
              style={{ cursor: 'pointer' }}
              className="p-2"
            />
          </PhotoView>
        )
      })
    }
  }

  const displayColor = () => {
    if (product && product.colors && product.colors instanceof Array) {
      return product.colors.map((c: any) => {
        return (
          <FilterColor
            key={c}
            active={c === color}
            color={ColorProduct[c]?.hex}
            onClick={() => {
              setColor(c)
            }}
          />
        )
      })
    }
  }

  const displaySizes = () => {
    if (product && product.sizes && product.sizes instanceof Array) {
      return product.sizes.map((s: any) => {
        return (
          <FilterSizeOption key={s} value={s}>
            {s}
          </FilterSizeOption>
        )
      })
    }
  }

  const onChangeQuantityProduct = (action: 'add' | 'remove') => {
    if (action === 'add') {
      if (quantity + 1 > MaxQuantity) {
        alert.warningModal(<h6>Number of products exceed {MaxQuantity}</h6>)
        return
      }
      if (quantity + 1 <= amount) {
        setQuantity(quantity + 1)
      }
    } else if (action === 'remove') {
      if (quantity - 1 > 0) {
        setQuantity(quantity - 1)
      }
    }
  }

  const onAddToCartHandler = () => {
    if (!IsLogin) {
      navigate(RouteUrl.LOGIN, { replace: true })
      return
    }
    if (quantity > amount) {
      alert.warningModal(<h6>Amount 0</h6>)
      return
    }
    const body = {
      quantity,
      product: { ...product, color, size },
      price: product?.price,
      productType: `${product?.id}-${color}-${size}`
    }
    createCart({
      body,
      onCompleted() {
        setQuantity(1)
        setNumberOfCart((pre) => pre + 1)
        alert.successToast('Added to cart')
      },
      onError() {
        alert.errorToast('Cant add to cart')
      }
    })
  }

  return (
    <StyledContainer>
      <Navbar />
      <Announcement />
      {loading && (
        <Container className="my-5">
          <Row>
            <Col xl={5} lg={5} md={12}>
              <Skeleton count={15} />
            </Col>
            <Col xl={7} lg={5} md={12}>
              <Skeleton count={15} />
            </Col>
          </Row>
        </Container>
      )}
      {!loading && (
        <Wrapper>
          <ImgContainer>
            <Image src={product?.mainImage?.url} />
            <div className="mt-3">
              <PhotoProvider>{displayImagesView()}</PhotoProvider>
            </div>
          </ImgContainer>
          <InfoContainer>
            <Title className="mx-0">{product?.name}</Title>
            <Desc>{product?.description}</Desc>
            <Price>${product?.price}</Price>
            <FilterContainer>
              <Filter>{displayColor()}</Filter>
              <Filter>
                <FilterTitle>Color:</FilterTitle>
                {ColorProduct[color]?.name}
              </Filter>
              <Filter>
                <FilterTitle>Size: </FilterTitle>
                <FilterSize
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSize(e.target.value)
                  }
                >
                  {displaySizes()}
                </FilterSize>
              </Filter>
              <Filter>
                <FilterTitle>Amount: </FilterTitle>
                <FilterAmount>{amount}</FilterAmount>
              </Filter>
            </FilterContainer>
            <AddContainer>
            <FilterTitle>Quantity: </FilterTitle>
              <AmountContainer>
                <ChangeButton onClick={() => onChangeQuantityProduct('remove')}>
                  <Remove />
                </ChangeButton>
                <Amount>{quantity}</Amount>
                <ChangeButton onClick={() => onChangeQuantityProduct('add')}>
                  <Add />
                </ChangeButton>
              </AmountContainer>
            </AddContainer>
            <ButtonCustom
              onClick={onAddToCartHandler}
              block={false}
              variant="teal"
              loading={handling}
              type="button"
              className="mt-4 p-2"
            >
              ADD TO CART
            </ButtonCustom>
          </InfoContainer>
        </Wrapper>
      )}
      <Newsletter />
      <Footer />
    </StyledContainer>
  )
}

export default ProductDetail
