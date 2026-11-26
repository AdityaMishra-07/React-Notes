import { createContext, useState } from "react";

export const Auth = createContext();

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(false);
    const login = () => {
        setAuth(true);
    };
    const logout = () => {
        setAuth(false);
    };

    return (
        <Auth.Provider value={{ auth, login, logout }}>{children}</Auth.Provider>
    )
}