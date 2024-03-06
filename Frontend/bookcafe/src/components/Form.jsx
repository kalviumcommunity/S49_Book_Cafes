import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import './Form.css'

function Form() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSub = (info) => {
    console.log(info);
    setSuccess(true);
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit(onSub)}>
        <div>
          {success && <p className="success">Registration Successful</p>}
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
      </form>
    </div>
  );
}

export default Form;
