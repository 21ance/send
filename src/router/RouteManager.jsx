import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "../components/header/Header";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import Profile from "../pages/Profile";
import { useEffect, useState, createContext } from "react";
import useFetch from "../hooks/useFetch";

export const Context = createContext();

const RouteManager = () => {
	const [loginDetails, setLoginDetails] = useState(
		JSON.parse(localStorage.getItem("login"))
	);
	// initial fetch for feed page
	// lifted here not to re-render feed page on back
	const { loading, error, data } = useFetch(
		"http://localhost:1337/api/posts?populate=deep,3"
	);
	const [postFooterData, setPostFooterData] = useState(null);

	useEffect(() => {
		if (!data) return;
		setPostFooterData(() => {
			let dataArray = [];
			data.data.map((feed, index) => {
				dataArray.push({
					index: index,
					commentsLength: feed.attributes.comments.data.length,
					reactions: feed.attributes.reactions.data,
					postID: feed.id,
				});
			});
			return dataArray;
		});
	}, [data]);

	return (
		<Context.Provider
			value={{
				login: { loginDetails, setLoginDetails },
				postFooter: { postFooterData, setPostFooterData },
			}}
		>
			<HashRouter>
				<Header />
				<Routes>
					<Route
						path="/"
						element={
							<Feed
								fetchResult={{
									loading: loading,
									error: error,
									data: data,
								}}
							/>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/posts/:postID" element={<PostDetails />} />
					<Route path="/profile/:userID" element={<Profile />} />
				</Routes>
			</HashRouter>
		</Context.Provider>
	);
};

export default RouteManager;
