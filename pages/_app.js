import Layout from "../components/layout/layout";
import '../global.css'

export default function MyApp({ Component, pageProps }) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>

     
    )
  }