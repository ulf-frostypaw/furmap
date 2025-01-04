/* import { createContext, useState } from "react";

export const AuthContext = createContext();

interface AuthProps = {
    children: ReactNode;
}
const AuthProvider = ({children} : AuthProps) => {
    const [user, setUser] = useState(null);

    return(
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider */