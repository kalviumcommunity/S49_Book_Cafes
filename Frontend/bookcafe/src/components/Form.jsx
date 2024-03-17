import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Form.css'
import axios from 'axios'

function Form() {
  const [success, setSuccess] = useState(false);
  const [inputValue, setInputValue] = useState({})
  const [check, setCheck] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    axios.get("http://localhost:3000/auth", {
  headers: {
    Authorization: `Bearer ${getCookie('token')}`, // Include the JWT token from the cookie
  },
});

  },[])

  const onSub = async(info) => {
    try {
      const {firstname, lastname, email, password} = info
      const response = await axios.post(
        "http://localhost:3000/auth",{firstname, lastname, email, password},
        {
            headers: {
                "abc":"anything",
            }
        });
      const token = response.data.token;
      document.cookie = `token=${token}; path='/;'`;
      console.log("User data added:", response.data);
      console.log(info);
      console.log(getCookie('token'))
      setInputValue(info);
      Object.entries(info).forEach(([key, value])=>{
        document.cookie = `${key}=`+ encodeURIComponent(value)
      })
    
      setSuccess(true);
      setTimeout(()=>{
          navigate("/")
      },3000)
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  function getCookie(cookieName) {
    const cookies = document.cookie.split(';'); // Split the cookie string into an array
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // Remove any leading/trailing whitespace
      // Check if the cookie starts with the name we're looking for
      if (cookie.startsWith(cookieName + '=')) {
        // Return the value of the cookie
        return decodeURIComponent(cookie.substring(cookieName.length + 1));
      }
    }
    return null;
  }

  useEffect(()=>{
    const cookiefirstname = getCookie('firstname') 
    if(cookiefirstname){
      setCheck(true)
    }
  },[])

  const cookiefirstname = getCookie('firstname') 
  const cookielastname = getCookie('lastname')
  const cookieemail = getCookie('email')
  const cookiepassword = getCookie('password')
  console.log(cookiefirstname, cookieemail, cookielastname, cookiepassword)
  
  return (
    <div className="main">
      {!check?<form onSubmit={handleSubmit(onSub)}>
        <div>
          {success && <p className="success">Registration Successful, Loding...</p>}
        </div>

        <div className="input-element">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            {...register("firstname", {
              required: true,
            })}
          />
          {errors.firstname && errors.firstname.type === "required" && (
            <p className="error-msg">First Name is required</p>
          )}
        </div>

        <div className="input-element">
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            {...register("lastname", {
              required: true,
            })}
          />
          {errors.lastname && errors.lastname.type === "required" && (
            <p className="error-msg">Last Name is required</p>
          )}
        </div>

        <div className="input-element">
          <input
            type="text"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /@/,
                message: "Email is not valid",
              },
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="error-msg">Email is required</p>
          )}
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        <div className="input-element">
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              maxLength: 20,
              minLength: 5,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="error-msg">Password is required.</p>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <p className="error-msg">Password should have atmost 20 digits.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="error-msg">Password should msut have min of 5 digits.</p>
          )}
        </div>
        <div className="input-element registerbtn">
          <label></label>
          <button className="register" type="submit">
            Register
          </button>
        </div>
      </form>:<div><button onClick={()=>{
           document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
           document.cookie = "lastname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
           document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
           document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
       
           // Reset check state to false
           setCheck(false);
      }}>Log out</button></div>}
      
    </div>
  );
}

export default Form;
