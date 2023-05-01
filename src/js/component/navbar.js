import React from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			
				<span className="navbar-brand mb-0 h1 ms-5">
					<img className="logo-image" src="https://cdn-icons-png.flaticon.com/512/4951/4951182.png"/></span>

			<div className="ml-auto">
				<Link to="/contact">
					<button className="btn btn-primary me-5">Contacts</button>
				</Link>
			</div>
		</nav>
	);
};
