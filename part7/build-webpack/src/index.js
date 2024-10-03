
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'
import './index.css'
import PromisePolyfill from 'promise-polyfill'
//полифил для IE который не поддерживает промисы(axios)
if (!window.Promise) {
    window.Promise = PromisePolyfill
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />)