import React, { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<{
    isAuthenticated: boolean;
    userDataLogged: string;
} | null>(null);

interface AuthProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProps> = ({ children }) => {
const [authState, setAuthState] = useState<{
        isAuthenticated: boolean;
        userDataLogged: string;
    }>({
        isAuthenticated: false,
        userDataLogged: "",
});

  // Validar la sesión
useEffect(() => {
    const validateSession = async () => {
    if (authState.isAuthenticated) return;
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/users/auth/validate", {
                credentials: "include",
            });
            if (response.ok) {
                const data = response.status !== 204 ? await response.json() : null;
                if(data.message !== "not_logged"){
                    setAuthState({
                        isAuthenticated: true,
                        userDataLogged: data || "",
                    });
                }else{
                    setAuthState({
                        isAuthenticated: false,
                        userDataLogged: "",
                    });
                }
            } else {
                setAuthState({
                    isAuthenticated: false,
                    userDataLogged: "",
                });
            }
        } catch (error) {
            console.error("Error durante la validación de sesión", error);
            setAuthState({
                isAuthenticated: false,
                userDataLogged: "",
            });
        }
    
    };

    validateSession();
  }, [authState.isAuthenticated]); // Solo vuelve a validar si cambia el estado de autenticación

    return (
        <AuthContext.Provider value={{ ...authState }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
