import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function CreatedBy() {
  const [loginApi, setLoginApi] = useState([]);
  const [reviewApi, setreviewApi] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth");
        setLoginApi(response.data);
        console.log("login data",response.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userData");
        const data = response.data
        const filteredData = data.filter(item => item.User === selected);
        console.log("review data",data)
        setreviewApi(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [selected]);

  const handleSelect = (e)=>{
    setSelected(prevSelected => e.target.value);
  }

  return (
    <div>
      <select name="users" id="users" onChange={handleSelect}>
        {loginApi.map((item) => (
          <option key={item._id} value={item.firstname}>
            {item.firstname}
          </option>
        ))}
      </select>
      <div>{reviewApi && reviewApi.map((item)=>{
       return(
        <div key={item._id}>
            <h3>{item.Cafename}</h3>
            <h3>{item.Rating}</h3>
            <h3>{item.Review}</h3>
        </div>
       )
      })}</div>
    </div>
  );
}

export default CreatedBy;
