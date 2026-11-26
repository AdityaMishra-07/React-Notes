import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Singleuser() {
    const val = useParams();
    console.log(val);

    const [user, setUser] = useState({});
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(false);

    const getData = () => {
        return fetch(`https://reqres.in/api/users/${val.user_id}`, {
            headers: {
                "x-api-key": "reqres-free-v1",
            },
        }).then((res) => res.json());
    };

    const fetchandGetUser = async () => {
        try {
            setLoad(true);
            const data = await getData();
            console.log(data.data);
            setUser(data);
            setLoad(false);
        } catch (error) {
            setErr(true);
            setLoad(false);
            console.log(error);
        }
    }
    useEffect(() => {
        fetchandGetUser();
    }, []);

    if (load) {
        return <h1>Loading...</h1>
    }
    if (err) {
        return <h1>Something Went Wrong...</h1>
    }

    return (
        <div
            key={user?.data?.id}
            style={{ border: "1px solid red", marginTop: "20px", marginBottom: "20px" }}>
            <br />
            <img src={user?.data?.avatar} alt="" />
            <h3>Name: {user?.data?.first_name} {user?.data?.last_name}</h3>
            <h4>Id:{user?.data?.id}</h4>
            <h5>Email: {user?.data?.email}</h5>

            <h3>Title: {user?.support?.text}</h3>
            <hr />
            <h4>Body </h4>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, libero dolore obcaecati laborum in delectus nesciunt ratione quibusdam rerum nulla quasi odit autem fugit expedita velit est labore esse earum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, pariatur beatae dolorum iure nobis quasi unde dignissimos excepturi libero expedita officia molestiae quibusdam voluptatibus veritatis sequi inventore doloremque commodi necessitatibus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, libero dolore obcaecati laborum in delectus nesciunt ratione quibusdam rerum nulla quasi odit autem fugit expedita velit est labore esse earum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, pariatur beatae dolorum iure nobis quasi unde dignissimos excepturi libero expedita officia molestiae quibusdam voluptatibus veritatis sequi inventore doloremque commodi necessitatibus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, libero dolore obcaecati laborum in delectus nesciunt ratione quibusdam rerum nulla quasi odit autem fugit expedita velit est labore esse earum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, pariatur beatae dolorum iure nobis quasi unde dignissimos excepturi libero expedita officia molestiae quibusdam voluptatibus veritatis sequi inventore doloremque commodi necessitatibus.
            </p>
            <br />
        </div>
    )
}