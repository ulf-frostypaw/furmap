import { Link } from "react-router-dom"
import Layout from "../components/Layout"

function About(){
    return(
        <Layout title="About">
            <div className="container mx-auto">
                <article>
                    <section className="mt-4">
                        <h1>About Furmap <small style={{fontSize: "1rem"}}><i>furmap.xyz</i></small></h1>
                        <p>
                            Furmap is the spiritual successor to<strong> Furrymap.net</strong>, designed to be intuitive and offer similar features.
                            <br />
                            Our goal is to create a world map 📍 that represents the vibrant furry community.
                            <br />
                            Unlike other apps, Furmap provides a global view of all furries around the world 🗺️.
                        </p>
                    <p>
                        Join us and connect with other members of the community!
                    </p>
                    </section>
                    <section className="mt-4">
                        <h2>Features</h2>
                        <ul>
                            <li>World map of all the furries! 🦊</li>
                            <li>Individual profiles 👤</li>
                            <li>Profile pictures! 🖼️</li>
                            <li>Descriptions 🖊️</li>
                            <li>Social media information & contact 👥</li>
                            <li>Easy profile modifications 🔏</li>
                        </ul>
                    </section>
                    <section className="mt-4">
                        <h2>Contact</h2>
                        <p>If you need any help, information or have a feature request, you can find my contact information via <a href="mailto:">webmaster@furmap.xyz</a></p>
                    </section>
                    <section className="mt-4">
                        <h2>Links</h2>
                        <ul>
                            <li><Link to={import.meta.env.VITE_APP_URL + "/tos"}>Terms of service</Link></li>
                            <li><Link to={import.meta.env.VITE_APP_URL + "/privacy"}>Privacy Policy</Link></li>
                        </ul>
                    </section>
                </article>
            </div>
        </Layout>
    )
}
export default About