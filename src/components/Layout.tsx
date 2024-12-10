import React from "react"
import { Helmet } from "react-helmet-async";
import NavBar from "./NavBar";
interface LayoutProps{
    children: React.ReactNode;
    title: string;
}
const Layout = ({children, title}: LayoutProps) => {
    return(
        <main>
            <Helmet>
                <title>{title} ~ Furmap</title>
            </Helmet>
            <NavBar />
            {children}
        </main>
    )
}

export default Layout;