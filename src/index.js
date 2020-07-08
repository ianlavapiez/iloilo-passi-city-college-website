import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from './redux/store'

import './css/icon-font.css'
import 'antd/dist/antd.css'

import App from './App'

const store = configureStore()
const rootElement = document.getElementById('root')

let render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    rootElement
  )
}

if (module.hot) {
  module.hot.accept('./App', () => {
    setTimeout(render)
  })
}

store.firebaseAuthIsReady.then(() => {
  render()
})
