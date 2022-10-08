import React, { Fragment } from 'react'
import Announcement from '@App/components/Announcement'
import Categories from '@App/components/Categories'
import Footer from '@App/components/Footer'
import Navbar from '@App/components/Navbar'
import Newsletter from '@App/components/Newsletter'
import Slider from '@App/components/Slider'

const Home = () => {
  return (
    <Fragment>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Newsletter />
      <Footer />
    </Fragment>
  )
}

export default Home
