
// 1. Loading and Error state: - useEffect Hook - 1[After Render Method ]

import { useState } from "react";

export default function Loading() {
    const [posts, setPosts] = useState([]);
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(false);

    const getData = () => {
        const url = "https://jsonplaceholder.typicode.com/posts?_limit=10";
        return fetch(url).then((res) => res.json())
    };

    const fetchDataAndUpdate = async () => {
        try {
            setLoad(true);
            const data = await getData();
            console.log(data);
            setPosts(data);
            setLoad(false);
        } catch (error) {
            setErr(true);
            setLoad(false);
            console.log(error, error.message);
        };

        if (load) {
            return <h1>Loading...</h1>;
        }
        if (err) {
            return <h1>Something went Wrong...</h1>
        }
    }


  return (
    <div>
          <h1>Todo Add using Api Request</h1>
          <button onClick={fetchDataAndUpdate}> Get Todo</button> 
          {posts.map((el) => (
        <div  style={{ border: "1px solid red", margin: "20px" }}>
          <>
            <h3>ID: {el.id}</h3>
            <p> Title: {el.title}</p>
            <h6> Body: {el.body}</h6>
          </>
        </div>
      ))}
    </div>
  );
}