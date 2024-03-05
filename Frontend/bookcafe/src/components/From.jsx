import React, { useState } from "react";
import axios from "axios";

const UserInputForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    favBook: "",
  });
  const [apiResponse, setApiResponse] = useState(null);
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
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
      console.error("Error adding user data:", error);
      setApiResponse(null);
      setErr(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Book:
          <input
            type="text"
            name="favBook"
            value={formData.favBook}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {formData && (
        <div>
          <p>{JSON.stringify(apiResponse)}</p>
        </div>
      )}

      {err && <div>{err}</div>}
    </div>
  );
};

export default UserInputForm;
