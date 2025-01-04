import React, { createContext, ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext<{ isAuthenticated: boolean } | null>(
    null
);

interface AuthProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProps> = ({ children }) => {
const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Validar la sesión
useEffect(() => {
    const validateSession = async () => {
        try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/users/auth/validate", {
            credentials: "include", // Incluye cookies
        });

            if (response.ok) {
                const data = await response.json();
                console.log(JSON.stringify(jwtDecode(data.token)))
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }

        } catch (error) {
        console.error("error_invalid_session", error);
        setIsAuthenticated(false);
        }
    };

validateSession();
}, []);

  // Redirige si no hay sesión
if (!isAuthenticated) {
    return <p>Redireccionando a la página de login...</p>;
}

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
