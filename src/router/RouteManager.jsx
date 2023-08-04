import { Routes, Route, HashRouter } from "react-router-dom";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import Register from "../pages/Register";

const RouteManager = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Feed />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</HashRouter>
	);
};

export default RouteManager;
