import React, {useState} from 'react'
import { supabase } from "../../client";
import Layout from '../../components/Layout'

const Register = () => {
	const [FormData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	})
	//console.log(FormData)
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
	  setFormData(prevFormData => ({
	    ...prevFormData,
	    [event.target.name]: event.target.value
	  }));
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault()
		try{
			const { data, error } = await supabase.auth.signUp(
			  {
			    email: FormData.email,
			    password: FormData.password,
			    options: {
			      data: {
			        name: FormData.name,
			      }
			    }
			  }
			)
			alert("Revisa el correo de verificación que te hemos enviado.");
		}catch(error){
			alert(error)
		}
	}
	return(
		<Layout title="Register">
			<h3>Crear cuenta</h3>
			<form method="post" onSubmit={handleSubmit}>
				<input
					placeholder="Name"
					name="name"
					type="text"
					onChange={handleChange}
				/>
				<input
					placeholder="Correo electronico"
					name="email"
					type="emal"
					onChange={handleChange}
				/>
				<input
					placeholder="Contraseña"
					name="password"
					type="password"
					onChange={handleChange}
				/>
				<button type="submit">Crear cuenta</button>
			</form>
		</Layout>
	);
};

export default Register;
