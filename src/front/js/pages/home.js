import React, { useContext, useEffect , useState } from "react";
import { Context } from "../store/appContext";

import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Home = () => {

  return (
    <>
      <div className="text-center mt-5">
        <h1>Page Home</h1>
        <img src={rigoImageUrl} />
      </div>
    </>
  );
};
