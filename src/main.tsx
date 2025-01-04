import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'leaflet/dist/leaflet.css'

// === [PAGES] ===
import Map from "./pages/Map";
import User from "./pages/profile/User";
import Error404 from "./pages/Error404";
import About from "./pages/About";
import RegisterForm from "./pages/auth/RegisterForm";

import AuthProvider from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={'/map'} />} />
            <Route path="/register" element={<RegisterForm />} />

            <Route path="/map" element={<Map />} />
            <Route path="/profile/:username" element={<User />} />
            <Route path="/about" element={<About />} />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
