import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const { auth, login, logout } = useContext(AuthContext);
    return (
        <>
            <h1>Log IN Page</h1>
            <h2>Auth: {auth ? "Yes" : "NO"}</h2>
            <button onClick={login} disabled={auth}>Log In</button>
            <hr />
            <button onClick={logout} disabled={!auth}>Log out</button>
        </>
    )
}