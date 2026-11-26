import Nav from "./components/Nav";
import Body from "./components/Body";
import Button from "./components/Button";

import { useContext } from "react";
import { Theme } from "./context/Theme";

function App() {
  const { theme, toggleTheme } = useContext(Theme);
  return (
    <div
      style={{
        width: "600px",
        margin: "auto",
        textAlign: "center",
        padding: "30px",
        color: theme == "light" ? "white" : "black",
        backgroundColor: theme == "light" ? "black" : "white",
      }}>
      <Nav />
      <Body />
      <Button btnText={theme} onClick={toggleTheme} />
    </div>
  )
}

export default App;
