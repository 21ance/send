import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "../components/header/Header";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Post from "../pages/Post";
import { useState } from "react";

const RouteManager = () => {
	const [loginDetails, setLoginDetails] = useState(
		JSON.parse(localStorage.getItem("login"))
	);

	return (
		<HashRouter>
			<Header
				loginDetails={loginDetails}
				setLoginDetails={setLoginDetails}
			/>
			<Routes>
				<Route path="/" element={<Feed />} />
				<Route
					path="/login"
					element={
						<Login
							loginDetails={loginDetails}
							setLoginDetails={setLoginDetails}
						/>
					}
				/>
				<Route
					path="/register"
					element={
						<Register
							loginDetails={loginDetails}
							setLoginDetails={setLoginDetails}
						/>
					}
				/>
				<Route path="/posts/:postID" element={<Post />} />
			</Routes>
		</HashRouter>
	);
};

export default RouteManager;
