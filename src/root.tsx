import { Link, Outlet, useNavigate } from "react-router-dom";
import markerSmall from '/src/images/marker_small.png';

const Root = () => {
	const token = sessionStorage.getItem('token');
	const navigate = useNavigate()
	function handleLogout(e){
		e.preventDefault()
		sessionStorage.removeItem('token');
		navigate('/login')
	}
	return (
		<>
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
					{token ? <Link to="#" onClick={handleLogout} className="btn">Cerrar sesión</Link> : <Link to="/register" className="btn">Register</Link> }
					
				</nav>
			</header>

			<main style={{ position: "relative" }}>
				<Outlet />
			</main>
		</>
	);
};

export default Root;
