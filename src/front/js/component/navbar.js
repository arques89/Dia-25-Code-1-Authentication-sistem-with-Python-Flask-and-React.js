import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../../styles/navbar.css"


export const Navbar = () => {

	let navigate = useNavigate();
	const logOut=()=>{
		localStorage.removeItem('jwt-token');
		navigate(-1);
		

	}

		let token = localStorage.getItem('jwt-token')
		if(!token){
			
			return (
				<nav className="navbar navbar-light bg-light ">
					<div className="container-fluid">
					
						<Link to="/signup">
							<span className="navbar-brand mb-0 h1">Signup</span>
						</Link>
						<Link to="/">
							<span className="navbar-brand mb-0 h1">Home</span>
						</Link>
						<Link to="/login">
							<span className="navbar-brand mb-0 h1">Login</span>
						</Link>
						
					</div>
				</nav>
			);

		}else{

			return (
				<nav className="navbar navbar-light bg-light ">
					<div className="container-fluid">
					
						
							<span className="navbar-brand mb-0 h1">Private</span>
						
	
						<Link to="/login">
							<span className="navbar-brand mb-0 h1" onClick={logOut}>Logout</span>
						</Link>
						
					</div>
				</nav>
			);
		}

};
