import { useContext } from "react";
import Button from "./Button";
import { Auth } from "../context/Auth";
export default function Nav() {
    const { auth, login, logout } = useContext(Auth);
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0px 20px",
                alignItems: "center",
            }}
        >
            <h1>Logo</h1>
            <h2>Auth: {auth ? "Yes" : "No"}</h2>
            <div style={{ display: "flex", gap: "20px" }}>
                <Button btnText={"LogIn"} onClick={login} />
                <Button btnText={"LogOut"} onClick={logout} />
            </div>
        </div>
    );
}