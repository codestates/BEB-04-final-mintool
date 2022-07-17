import TopAppbar from "../appbar/TopAppbar";
import Footer from "../Footer/Footer";

export default function Layout({children}) {
    return (
        <>
            <TopAppbar/>
                <main className="container">{children}</main>
            <Footer />
        </>
    )
}