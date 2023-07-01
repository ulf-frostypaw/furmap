import { Link, useNavigate } from "react-router-dom";
import markerSmall from '/src/images/marker_small.png';
import {Helmet} from "react-helmet";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ children, title }: LayoutProps) =>{

	const token = sessionStorage.getItem('token');
	const navigate = useNavigate()
	function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
		e.preventDefault()
		sessionStorage.removeItem('token');
		navigate('/login')
	}

	return(
		<div className="main">
		<Helmet>
			<title>{title} - Furmap</title>
		</Helmet>
			<header>
				<nav>
					<ul>
						<li>
							<Link to="/">
								<img src={markerSmall} alt={"Furnet's Marker image"}></img>
								<h1>Furmap</h1>
							</Link>
						</li>
						<li>
							<Link to="/">Map</Link>
						</li>
						<li>
							<Link to="/info">Info</Link>
						</li>
						<li>
							<Link to="/discord">Discord</Link>
						</li>
						<li>
							<Link to={"https://twitter.com/furmap_"} target="_blank">Twitter</Link>
						</li>
					</ul>

					<ul>
						{token ? (
					    	<li><Link to="#" onClick={handleLogout} className="btn">Cerrar sesión</Link></li>
						) : (
							<>
								<li><Link to="/register" className="btn">Register</Link></li>
							    <li><Link to="/login" className="btn">Login</Link></li>
						    </>
						)}
					</ul>

				</nav>
			</header>
			<div className="container">
				{children}
			</div>
		</div>
	);
}

export default Layout;