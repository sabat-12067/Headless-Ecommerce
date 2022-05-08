import '../styles/globals.css'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import store from '../store'

function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}>
    <Layout>
      <Component {...pageProps} /> 
    </Layout>
    </Provider>
  )   
}

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default MyApp
