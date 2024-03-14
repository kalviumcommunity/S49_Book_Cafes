import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const apiLink = "http://localhost:3000/userData";

function UpdateEntity() {
  const { keyId } = useParams();
  const navigate = useNavigate();
  const [updatedData, setUpdatedData] = useState({
    Cafename: "",
    Rating: "",
    Review: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiLink);
        const filteredData = response.data.filter((item) => item._id === keyId);
        // console.log(filteredData, "2", filteredData[0].Cafename);
        setUpdatedData({
          Cafename: filteredData[0].Cafename,
          Rating: filteredData[0].Rating,
          Review: filteredData[0].Review,
        });
        // console.log(updatedData, "l");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  const handleUpdate = async () => {
    try {
      console.log(updatedData);
      await axios.put(`http://localhost:3000/userData/${keyId}`, {Cafename:updatedData.Cafename,Rating:updatedData.Rating,Review:updatedData.Review});
      navigate("/favourites");
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div>
      <div key={keyId}>
        <label>
          Cafename:
          <input
            type="text"
            name="Cafename"
            value={updatedData.Cafename}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, Cafename: e.target.value })
            }
          />
          Rating:
          <input
            type="number"
            name="Rating"
            value={updatedData.Rating}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, Rating: e.target.value })
            }
          />
          Review:
          <input
            type="text"
            name="Review"
            value={updatedData.Review}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, Review: e.target.value })
            }
          />
        </label>
        <button onClick={() => handleUpdate()}>Update</button>
      </div>
    </div>
  );
}

export default UpdateEntity;
