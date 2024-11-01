// LOGIN PAGE HERE
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { supabase } from "../../client";
import Layout from "../../components/Layout";

const Login = ({ setToken }: { setToken: (token: any) => void }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  /* async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      setFormData({ email: "", password: "" }); // Limpiar el formulario después de enviarlo
      setToken(data);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  } */

  return (
    <Layout title="Login">
      <h3>Iniciar sesión</h3>
      <form>
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
    </Layout>
  );
};

export default Login;
