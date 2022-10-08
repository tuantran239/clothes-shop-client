import { useEffect, useState } from 'react'
import { Container, Row, Pagination } from 'react-bootstrap'
import { useQuery, axios } from 'react-hooks-axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ApiUrl from '@App/constants/api'
import Product from '../Product'
import Skeleton from 'react-loading-skeleton'
import { handleUrlFilter } from '@App/utils'

interface PropsType {
  filter: any
  path: string
}

const Products = ({ filter, path }: PropsType) => {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState<any[]>([])
  const [results, setResults] = useState(0)
  const [pages, setPages] = useState<number>(0)
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const search = searchParams.get('search')

  const { queryCallback } = useQuery()
  const [getProducts, { loading }] = queryCallback()

  useEffect(() => {
    navigate(
      handleUrlFilter(path, {
        ...filter,
        page: 1,
        search
      })
    )
    const url = handleUrlFilter(ApiUrl.Product.GET_PRODUCTS, {
      ...filter,
      page: 1,
      search
    })
    getProducts({
      url,
      onCompleted(data) {
        setResults(data.results)
        setProducts(data.products)
        setPages(data.pages)
        setPage(1)
      }
    })
  }, [filter, search])

  useEffect(() => {
    navigate(
      handleUrlFilter(path, {
        ...filter,
        page,
        search
      })
    )
    const url = handleUrlFilter(ApiUrl.Product.GET_PRODUCTS, {
      ...filter,
      page,
      search
    })
    getProducts({
      url,
      onCompleted(data) {
        setResults(data.results)
        setProducts(data.products)
        setPages(data.pages)
        setPage(page)
      }
    })
  }, [page])

  const displayProducts = () => {
    if (products.length > 0) {
      return products.map((item) => <Product item={item} key={item.id} />)
    }
  }

  const onSetPage = (p: number) => {
    setPage(p)
    window.scrollTo(0, 0)
  }

  const displayPaginationItems = () => {
    const arr = []
    for (let i = 0; i < pages; i++) {
      arr.push(i + 1)
    }
    return arr.map((v, k) => {
      return (
        <Pagination.Item
          key={k}
          onClick={() => onSetPage(v)}
          active={page === v}
        >
          {v}
        </Pagination.Item>
      )
    })
  }

  return (
    <Container>
      {loading && <Skeleton count={15} />}
      {!loading && (
        <Row>
          <div>
            <h5>Results: {results}</h5>
          </div>
          {displayProducts()}
          <Pagination className="d-flex justify-content-end">
            <Pagination.Prev />
            {displayPaginationItems()}
            <Pagination.Next />
          </Pagination>
        </Row>
      )}
    </Container>
  )
}

export default Products
