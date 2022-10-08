import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import { RecoilRoot } from 'recoil'
import { AxiosProvider } from 'react-hooks-axios'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


import 'react-phone-number-input/style.css'
import 'react-slideshow-image/dist/styles.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-photo-view/dist/react-photo-view.css'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL || ''

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

const stripePromise = loadStripe(
  (process.env.REACT_APP_STRIPE_PUBLIC as string) || ''
)

root.render(
  <Router>
    <RecoilRoot>
      <AxiosProvider axios={axios}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </AxiosProvider>
    </RecoilRoot>
  </Router>
)
