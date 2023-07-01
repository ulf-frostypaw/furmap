import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Map from './pages/map';
import Register from "./pages/forms/register";
import Login from "./pages/forms/login";
import Info from "./pages/info";
import Discord from "./pages/extra/discord";
import Geo from "./pages/extra/geo";
import Root from './root';
import Confirm from './confirm';

import './index.scss';
import './app.css'
import Layout from './components/Layout';

const Router = () =>{
	const [token, setToken] = useState(null);

	if (token) {
	  sessionStorage.setItem('token', JSON.stringify(token));
	}

	useEffect(() => {
	  const storedToken = sessionStorage.getItem('token');

	  if (storedToken !== null) {
	    let data = JSON.parse(storedToken);
	    setToken(data);
	  }
	}, []);

	return(
		<BrowserRouter>
			<>
				<Routes>
					<Route path='/' element={<Map />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login setToken={setToken} />} />


					<Route path='/info' element={<Info />} />
					<Route path='/discord' element={<Discord />} />
					<Route path='/geo' element={<Geo />} />			
				</Routes>
			</>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
);
