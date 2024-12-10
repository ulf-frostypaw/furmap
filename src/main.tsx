import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// === [PAGES] ===
import Map from "./pages/Map";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={'/map'} />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
