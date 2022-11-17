import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
	actions.getSignup();
  }, []);

  return (
    <>
    <div className="text-center mt-5">
      <div className="mb-3">
        <label for="emailId" className="form-label">
          Email
        </label>
        <input
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
          type="text"
          className="form-control"
          id="nameId"
          placeholder="Ingrese su nombre aqui"
        />
      </div>
    </div>
    </>
  );
};
