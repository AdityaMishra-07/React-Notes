import { createContext, useState } from "react";

export const Theme = createContext();

export default function ThemeProvider(props) {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme(theme == "dark" ? "light" : "dark")
    }
    console.log(theme);

    return (
        <Theme.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </Theme.Provider>
    );
}