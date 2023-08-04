import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Feed = () => {
	const { loading, error, data } = useFetch(
		"http://localhost:1337/api/posts?sort[0]=id:desc&populate=deep,3"
	);
	const navigate = useNavigate();

	// to remove, feed should be viewable even for logged out user
	useEffect(() => {
		if (JSON.parse(!localStorage.getItem("login"))) {
			navigate("/login");
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<main>
			{data.data.map((post) => {
				return (
					<div key={post.id} className=" mb-12">
						<h2>
							{
								post.attributes.users_permissions_user.data.attributes
									.username
							}
						</h2>
						<small>{post.attributes.publishedAt}</small>
						<p>{post.attributes.content}</p>
						<div>
							<span className="block mt-2">Comments:</span>
							{post.attributes.comments.data.length === 0 && (
								<span>no comments yet</span>
							)}

							{post.attributes.comments.data.map((comment) => {
								return (
									<div key={comment.id}>
										<span>
											{comment.attributes.user.data.attributes.username}:{" "}
										</span>
										<p className="inline">{comment.attributes.content}</p>
									</div>
								);
							})}
						</div>
					</div>
				);
			})}
		</main>
	);
};

export default Feed;
