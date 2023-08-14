import { Routes, Route, HashRouter } from "react-router-dom";
import Header from "../components/header/Header";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostPage from "../pages/PostPage";
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
	const [feedData, setFeedData] = useState(null);
	const [postFooterData, setPostFooterData] = useState(null);

	useEffect(() => {
		if (!data) return;
		setPostFooterData(() => {
			let dataArray = [];
			data.data.map((feed) => {
				dataArray.push({
					commentsLength: feed.attributes.comments.data.length,
					reactions: feed.attributes.reactions.data,
					postID: feed.id,
				});
			});
			return dataArray;
		});
		setFeedData(data.data);
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
								feedData={feedData}
								setFeedData={setFeedData}
								error={error}
								loading={loading}
							/>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/posts/:postID" element={<PostPage />} />
					<Route path="/profile/:userID" element={<Profile />} />
				</Routes>
			</HashRouter>
		</Context.Provider>
	);
};

export default RouteManager;
