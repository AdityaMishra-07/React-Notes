import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import User from "../pages/User";
import Singleuser from "../pages/Singleuser";
import Notfound from "../pages/Notfound";
import PrivateRoute from "../pages/PrivateRoute";

export default function AllRoutes() {
    return (
        <div style={{ textAlign: "center" }}>
            <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/user" element={<User />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/user/" element={<PrivateRoute><User /></PrivateRoute>}></Route>
                <Route path="/user/:user_id" element={<PrivateRoute><Singleuser /></PrivateRoute>}></Route>
                <Route path="*" element={<Notfound />}></Route>
            </Routes>
        </div>
    )
}