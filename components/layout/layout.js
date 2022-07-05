import TopAppbar from "../appbar/TopAppbar";
import Footer from "../Footer/Footer";

export default function Layout({children}) {
    return (
        <>
            <TopAppbar/>
                <main>{children}</main>
            <Footer />
        </>
    )
}