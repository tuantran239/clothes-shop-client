import React, { Fragment, useEffect, useState } from 'react'
import { useQuery } from 'react-hooks-axios'
import Announcement from '@App/components/Announcement'
import Navbar from '@App/components/Navbar'
import { ApiUrl } from '@App/constants'
import TableItems from './TableItems'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'

const MyOders = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [toggle, setToggle] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)

  const { queryCallback } = useQuery()
  const [getMyOrders, { loading }] = queryCallback(ApiUrl.Order.MY_ORDERS)

  useEffect(() => {
    getMyOrders({
      onCompleted(data) {
        setRefreshing(false)
        setOrders(data.orders)
      },
      onError() {
        setRefreshing(false)
      }
    })
  }, [toggle])

  const displayOrdersCollapsible = () => {
    if (orders.length > 0) {
      return orders.map((order) => {
        return (
          <TableItems
            key={order?.OrderID}
            order={order}
            onRemoveOrder={onRemoveOrder}
          />
        )
      })
    }
  }

  const onRemoveOrder = (OrderID: any) => {
    let clone = [...orders]
    clone = clone.filter((c) => c.OrderID !== OrderID)
    setOrders([...clone])
  }

  return (
    <Fragment>
      <Navbar />
      <Announcement />
      <Container className="mt-5 mb-5">
        <Row>
          <Col xl={8} lg={8} className="mx-auto">
            <Button
              className="btn btn-teal"
              onClick={() => {
                setToggle(!toggle)
                setRefreshing(true)
              }}
              disabled={refreshing}
            >
              Refresh
            </Button>
            {loading && <Skeleton count={20} />}
            {!loading && displayOrdersCollapsible()}
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default MyOders
