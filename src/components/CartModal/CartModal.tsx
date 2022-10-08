import React, { useEffect, useState } from 'react'
import {
  AddContainer,
  Amount,
  AmountContainer,
  ChangeButton,
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
  Title,
  Wrapper
} from './CartModal.styled'
import { Add, Remove } from '@material-ui/icons'
import {
  ApiUrl,
  ColorProduct,
  IsLogin,
  MaxQuantity,
  RouteUrl
} from '@App/constants'
import { useMutation } from 'react-hooks-axios'
import useAlert from '@App/hooks/useAlert'
import ButtonCustom from '@App/components/ButtonCustom'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { NumberOfCart } from '@App/recoils/cart/atom'

interface PropsType {
  product: any
  handleClose: () => void
}

const CartModal = ({ product, handleClose }: PropsType) => {
  const [productType, setProductType] = useState<any[]>(
    product?.productType || []
  )
  const [color, setColor] = useState<string>(product?.colors[0] || '')
  const [size, setSize] = useState<string>(product?.sizes[0] || '')
  const [amount, setAmount] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { mutationCallback } = useMutation()
  const [createCart, { loading }] = mutationCallback(ApiUrl.Cart.CREATE_CART)
  const alert = useAlert()
  const navigate = useNavigate()
  const setNumberOfCart = useSetRecoilState(NumberOfCart)

  useEffect(() => {
    const pt = productType.find(
      (pt) => pt.size === size && pt.color === color
    )
    setQuantity(1)
    if (pt && pt.amount) {
      setAmount(pt.amount)
    } else {
      setAmount(0)
    }
  }, [color, size])

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

  const onChangeAmountProduct = (action: 'add' | 'remove') => {
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

  const onClickHandler = () => {
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
        handleClose()
        setNumberOfCart((pre) => pre + 1)
        alert.successToast('Added to cart')
      },
      onError() {
        alert.errorToast('Cant add to cart')
      }
    })
  }

  return (
    <Wrapper>
      <ImgContainer>
        <Image src={product?.mainImage?.url} />
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
          <AmountContainer>
            <ChangeButton onClick={() => onChangeAmountProduct('remove')}>
              <Remove />
            </ChangeButton>
            <Amount>{quantity}</Amount>
            <ChangeButton onClick={() => onChangeAmountProduct('add')}>
              <Add />
            </ChangeButton>
          </AmountContainer>
          <ButtonCustom
            onClick={onClickHandler}
            block={false}
            variant="teal"
            loading={loading}
            type="button"
          >
            ADD TO CART
          </ButtonCustom>
        </AddContainer>
      </InfoContainer>
    </Wrapper>
  )
}

export default CartModal
