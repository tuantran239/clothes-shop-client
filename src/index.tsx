import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import { RecoilRoot } from 'recoil'
import { AxiosProvider } from 'react-hooks-axios'

import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:5000'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = createRoot(rootElement)

root.render(
  <Router>
    <RecoilRoot>
      <AxiosProvider axios={axios}>
        <App />
      </AxiosProvider>
    </RecoilRoot>
  </Router>
)
