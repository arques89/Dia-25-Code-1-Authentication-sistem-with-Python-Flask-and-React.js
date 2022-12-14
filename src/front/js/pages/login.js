import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/login.css"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate();
  

  const handleLogin = () => {
    fetch(process.env.BACKEND_URL + "/api/login",{
        method: "POST",
        body: JSON.stringify(),
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then((response) => {
      const data = response
      localStorage.setItem("jwt-token", data.token);
      navigate("/private") 

      return data
    })
  }
  return (
    <>
      <div id="login" className="text-center mt-5">
        <div className="mb-3">
          <label htmlFor="emailId" className="form-label">
            Email
          </label>
          <input
            name="email"
            onChange={(e)=>{setEmail(e.target.value)}}
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
          onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            className="form-control"
            id="passwordId"
            placeholder="Ingrese su contraseña aqui.com"
          />
        </div>
        <button onClick={handleLogin}>Access</button>
      </div>
    </>
  );
};