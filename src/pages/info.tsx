import { Link } from 'react-router-dom';
import Layout from '../components/Layout'
const Info = () => {
	return (
		<Layout title="Info">
			<div className="container">
			<h1>Info</h1>
			<p>Renacimiento de Furmap</p>
			<p>Este es el renacimiento de Furmap en su versión de codigo abierto. Será el sucesor de Furmap y FurryMap. The original website can be found here: <Link to={"https://furmap.net"}>furmap.net</Link>. Se está trabajando en las caracateristicas de la antigua versión.</p>
			</div>
		</Layout>
	);
};

export default Info;
