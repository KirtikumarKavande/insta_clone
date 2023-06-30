'use client'
import '../styles/globals.css'
import UserContextProvider from '../context/userContextProvider'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from '../store'

function MyApp({ Component, pageProps }) {
  return  <Provider store={store}>  <UserContextProvider> <Toaster/> <Component {...pageProps} /></UserContextProvider></Provider>
}

export default MyApp
