import TopAppbar from "../appbar/TopAppbar";
import Footer from "../Footer/Footer";
import Head from 'next/head'

export default function Layout({children}) {
    return (
        <>
        <Head>
        <title>Mintool</title>
      </Head>
            <TopAppbar/>
                <main className="container">
                    {children}
                    </main>
            <Footer />
        </>
    )
}