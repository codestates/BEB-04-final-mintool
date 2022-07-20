import { AppWrapper } from "../context/state"
import Layout from "../components/layout/layout";
import '../global.css'


export default function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>


  )
}