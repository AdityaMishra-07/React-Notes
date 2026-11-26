import { Link, NavLink } from "react-router-dom";

export default function Nav() {

    const Links = [
        { path: "/home", title: "Home" },
        { path: "/about", title: "About" },
        { path: "/contact", title: "Contact" },
        { path: "/login", title: "Login" },
        { path: "/user", title: "User" },
    ];

    const ActiveStyle = { TextDecoration: "none", color: "red" }
    const InActiveStyle = { TextDecoration: "none", color: "blue" };


    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>

            {/* Method: 1 */}
            {/* <Link to={"/home"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/contact"}>Contact</Link>
            <Link to={"/login"}>LogIn</Link>
            <Link to={"/user"}>User</Link> */}

            {/* Method: 2 */}
            {/* {Links.map(({ path, title }) => (
                <Link to={path}>{title}</Link>
            ))} */}

            {/* Method: 3 */}
            {/* Nav Link give the speacial power to return call back fuction */}
            {Links.map(({ path, title }) => (
                <NavLink key={path}
                    style={({ isActive }) => {
                        return isActive ? ActiveStyle : InActiveStyle;
                    }}
                    to={path}>{title}</NavLink>
            ))}
        </div>
    )
}