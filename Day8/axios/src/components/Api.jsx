import axios from "axios";
import { useState } from "react";
export default function Api() {
    const [arr, setArr] = useState([]);
  // it is same like fetch but fetch is javascript part but is best from fetch
  // because it not need to use .then  angin .then beacuse it already convert data into json it provide additional information about data
  // https://jsonplaceholder.typicode.com/posts

    // Get method
    
    axios.get("http://localhost:3000/cities")
      .then((response)=> {
        //   console.log(response.data);
          setArr(response.data);
      })
      .catch(err => (err));

  // 1. query parameter
//   axios.get("http://localhost:3000/cities?id=1")
//       .then((response)=> {
//           console.log(response.data);
//           setArr(response.data);
//       })
//       .catch(err => (err));

  // 2. params
//   axios
//     .get("http://localhost:8080/cities/", {
//       params: {
//         id: 1,
//       },
//     })
//     .then((data) => console.log(data))
//     .catch((err) => err);

  // // POST method
  // // 1. post request
  // axios.post("http://localhost:8080/posts", {
  //     "id": "07",
  //     "title": "Aditya",
  //     "views": 100
  // })
  //     .then(data => console.log(data))
  //     .catch(err => (err));

  // // 2. POST request config

  // axios({
  //     method: "get",
  //     url: "http://localhost:3000/posts",
  //     data: {
  //         firstName: 'Fred',
  //         lastName: 'Flintstone'
  //     }
  // })
  // .then(data => console.log(data))
  // .catch(err => (err));

  return (
    <>
      <h1>API calling...</h1>
      {arr.map((data) => (
        <div id="data.id">
              name: {data.name}, <br />
              population: {data.name}, <br />
              country: {data.name},<br />
              id:{data.id},<br />
              <br />
              <hr />
          </div>
          
      ))}
    </>
  );
}
