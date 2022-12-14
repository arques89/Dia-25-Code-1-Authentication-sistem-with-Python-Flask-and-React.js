import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/signup.css"

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});

  const handleChange = (event) => {
      //console.log(event.target.value)
    setData({...data , [event.target.name] : event.target.value })
  }

  const handleSubmit = () => {
    fetch(process.env.BACKEND_URL + "/api/signup",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())

  }
  return (
    <>
      <div id="signup" className="text-center mt-5">
        <div className="mb-3">
          <label htmlFor="emailId" className="form-label">
            Email
          </label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            className="form-control"
            id="emailId"
            placeholder="Ingrese su email aqui"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordId" className="form-label">
            Password
          </label>
          <input
          name="password"
          onChange={handleChange}
            type="password"
            className="form-control"
            id="passwordId"
            placeholder="Ingrese su contraseña aqui.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nameId" className="form-label">
            Name
          </label>
          <input
          name="name"
          onChange={handleChange}
            type="text"
            className="form-control"
            id="nameId"
            placeholder="Ingrese su nombre aqui"
          />
        </div>
        <Link to="/login">
        <button onClick={handleSubmit}>Registrar usuario</button>
        </Link>
      </div>
    </>
  );
};