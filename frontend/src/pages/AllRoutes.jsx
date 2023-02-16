import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import Signup from "./Signup";
import Login from "./Login";

const AllRoutes = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/create-post' element={<CreatePost />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/login' element={<Login />} />
				<Route path='*' element={<h1>404 Not Found</h1>} />
			</Routes>
		</div>
	);
};

export default AllRoutes;
