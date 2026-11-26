import { useContext } from "react";
import { Theme } from "../context/Theme";


export default function Button({ btnText, onClick }) {
    const { theme } = useContext(Theme);
    return (
        <>
            <button
                style={{
                    color: theme == "light" ? "white" : "black",
                    backgroundColor: theme == "light" ? "black" : "white",
                    padding: "10px 25px",
                    border: `2px solid ${theme == "light" ? "white" : "black"}`,
                }}
                onClick={onClick}
            >
                {btnText}
            </button>
        </>
    )
}