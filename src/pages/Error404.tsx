import Layout from "../components/Layout"

const Error404 = () =>{
    return(
        <Layout title="Error 404 - Page not found">
            <div className="container text-center">
                <img src={import.meta.env.VITE_APP_URL + "/images/geo-error404.webp"} alt="" />
            </div>
        </Layout>
    )
}

export default Error404