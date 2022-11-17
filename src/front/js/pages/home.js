import React, { useContext, useEffect , useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({});

  // useEffect(() => {
   
  // }, []);
  const handleChange = (event) => {
      //console.log(event.target.value)
    setData({...data , [event.target.name] : event.target.value })
  }

  const handleSubmit = () => {
    fetch("https://3001-arques89-dia25code1auth-z5esuw4du1s.ws-eu74.gitpod.io/api/signup",{
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
      <div className="text-center mt-5">
        <div className="mb-3">
          <label for="emailId" className="form-label">
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
          <label for="passwordId" className="form-label">
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
          <label for="nameId" className="form-label">
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
        <button onClick={handleSubmit}>Registrar usuario</button>
      </div>
    </>
  );
};
