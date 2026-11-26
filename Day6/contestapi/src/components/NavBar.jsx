import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function NavBar() {
    const data = useContext(ThemeContext);
    console.log(data);

    return <h1 style={{ color: data.theme }}>I am Nav Bar</h1>
}