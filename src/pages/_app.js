import '../styles/globals.css'
import UserContextProvider from '../context/userContextProvider'

function MyApp({ Component, pageProps }) {
  return  <UserContextProvider>  <Component {...pageProps} /></UserContextProvider>
}

export default MyApp
