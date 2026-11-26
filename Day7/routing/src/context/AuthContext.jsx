import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState(false);
    const login = () => {
        setAuth(true);
    };
    const logout = () => {
        setAuth(false);
    };
// here we share data to all children so AuthContext is a Parrent and .Provider is medium to share
    return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>
}

// .Provider is a React component created automatically by React.createContext() that broadcasts
// data to all nested child components inside it.
