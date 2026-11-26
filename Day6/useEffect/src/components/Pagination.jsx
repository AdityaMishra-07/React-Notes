import { useState, useEffect } from "react";

export default function Pagination() {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);

  const handleClick = (value) => {
    setPage((prevPage) => prevPage + value);
  };

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      try {
        setLoad(true);
        setErr(false);

        const url = `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        console.log(data);
        setPosts(data);
      } catch (error) {
        setErr(true);
        console.log(error, error.message);
      } finally {
        setLoad(false);
      }
    };

    fetchDataAndUpdate();
  }, [page]);

  if (load) {
    return <h1>Loading...</h1>;
  }

  if (err) {
    return <h1>Something went wrong! Please try again.</h1>;
  }

  return (
    <div className="App">
      <h1>Todo Add Using API request</h1>
      <hr />

      <h1>{count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Inc
      </button>

      <hr />

      {posts.map((el) => (
        <div
          key={el.id}
          style={{ border: "1px solid red", margin: "20px" }}
        >
          <h3>ID: {el.id}</h3>
          <p>Title: {el.title}</p>
          <h6>Body: {el.body}</h6>
        </div>
      ))}

      <button
        disabled={page === 1}
        onClick={() => handleClick(-1)}
      >
        Previous
      </button>

      <button disabled>{page}</button>

      <button
        disabled={page === 10}
        onClick={() => handleClick(1)}
      >
        Next
      </button>
    </div>
  );
}