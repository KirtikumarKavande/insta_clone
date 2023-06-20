'use client'
import '../styles/globals.css'
import UserContextProvider from '../context/userContextProvider'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return  <UserContextProvider> <Toaster/> <Component {...pageProps} /></UserContextProvider>
}

export default MyApp
