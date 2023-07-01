// LOGIN PAGE HERE
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "./client";

const Login = ({setToken}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      if (error) throw error;
	      setFormData({ email: '', password: '' }); // Limpiar el formulario después de enviarlo
	      setToken(data)
	      navigate('/');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Correo electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          placeholder="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </>
  );
};

export default Login;
