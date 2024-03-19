import React, { useState } from "react"; 
import axios from "axios";
import { useEffect } from "react";


const Review = () => {
  const [formData, setFormData] = useState({
    Cafename: "",
    Rating: "",
    Review: "",
    User: "" 
  });
  const [apiResponse, setApiResponse] = useState(null);
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    const uniqueUserName = localStorage.getItem('firstNameCookie')
    console.log("localStorage: ",uniqueUserName)
    if (uniqueUserName!==null) {
      setFormData({...formData, User: uniqueUserName});
    }
  },[])
  
  console.log(formData.User)
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:3000/userData",formData,
        {
            headers: {
                "abc":"anything",
            }
        });
      console.log("User data added:", response.data);
      setApiResponse(response.data);
      setErr(null);
    } catch (error) {
      console.error(error.response.data.error);
      setApiResponse(null);
      setErr(err);
    }
  };

  const uniqueUserName = localStorage.getItem('firstNameCookie')

  return (
    <div>{uniqueUserName !== null?(<form onSubmit={handleSubmit}>
          <label>
            Cafe-Name:
            <input
              type="text"
              name="Cafename"
              value={formData.Cafename}
              onChange={handleChange}
            />
          </label>
          <label>
            Rating:
            <input
              type="number"
              name="Rating"
              value={formData.Rating}
              onChange={handleChange}
            />
          </label>
          <label>
            Review:
            <input
              type="text"
              name="Review"
              value={formData.Review}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>)
    :(
      <h1>Please login</h1>
    )}
      

      {formData && (
        <div>
          <p>{JSON.stringify(apiResponse)}</p>
        </div>
      )}

      {err && <div>{err}</div>}
    </div>
  );
};

export default Review;
