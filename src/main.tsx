import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Map from './map';
import Register from "./register";
import Login from "./login";
import Info from "./info";
import Discord from "./discord";
import Geo from "./geo";
import Root from './root';
import Confirm from './confirm';

import './app.css'

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
					<Route path='/' element={<Root />} />
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
