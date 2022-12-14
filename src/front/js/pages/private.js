import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {

  const [user, setUser]=useState({})
	let navigate = useNavigate();
	useEffect(() => {
		get_Token()
	}, [])
	// retrieve token form localStorage
	;
	const get_Token=()=>{
    let token = localStorage.getItem('jwt-token')
		if(!token){
      navigate("/")
		}else{
      const response= 
			fetch(process.env.BACKEND_URL +"/api/private", {
        method: 'GET',
        headers: { 
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+token // ⬅⬅⬅ authorization token
        } 
			}).then((response)=>{
        if(!response.ok) throw Error("There was a problem in the login request")
        
				else if(response.status === 403){
          throw Error("Missing or invalid token")
          
				}else{
          return response.json()
				}
			}).then((response)=>{
        
        return setUser(response) 
			})

      
		}
	
	
	}

  return (
    <>
      <div className="text-center mt-5">
        <h1>Page Private: {user.email}</h1>
      </div>
    </>
  );
};
