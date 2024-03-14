import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import UpdateEntity from "./UpdateEntity";

const apiLink = "http://localhost:3000/userData";

function Favourites() {
  const [api, setApi] = useState([]);
  const [editedData, setEditedData] = useState({
    Cafename: "",
    Rating: "",
    Review: "",
  });

  useEffect(() => {
    axios
      .get(apiLink)
      .then((res) => setApi(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiLink}/${id}`);
      setApi(api.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

//   const handleConsole = ()=>{
//     console.log("yoooo")
//   }

  return (
    <div>
      <div>
        {api &&
          api.map((item) => {
            return (
              <div key={item._id}>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>{item.Cafename}</div>
                  <div>{item.Rating}</div>
                  <div>{item.Review}</div>
                  <div>{item._id}</div>
                </div>
                <div>
                  <button key={item._id}>
                    <Link to={`/edit/${item._id}`}>Edit</Link>
                  </button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Favourites;
