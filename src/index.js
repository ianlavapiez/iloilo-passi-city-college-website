import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './css/icon-font.css'
import 'antd/dist/antd.css'

import App from './App'

const rootElement = document.getElementById('root')

let render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    rootElement
  )
}

if (module.hot) {
  module.hot.accept('./App', () => {
    setTimeout(render)
  })
}
