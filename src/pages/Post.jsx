import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import TimePassed from "../components/common/TimePassed";
import PostFooter from "../components/common/PostFooter";

const Post = () => {
	const { postID } = useParams();
	const { loading, error, data } = useFetch(
		`http://localhost:1337/api/posts/${postID}?populate=deep,3`
	);
	const [postContent, setPostContent] = useState(false);

	useEffect(() => {
		if (!data) return;
		setPostContent({
			post: data.data.attributes,
			OP: data.data.attributes.users_permissions_user.data.attributes,
			comments: data.data.attributes.comments.data,
		});
	}, [data]);

	// to add loading component
	if (loading || !postContent) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<>
			<main className="px-4 py-2 bg-white my-2">
				<TimePassed
					text={`Posted by ${postContent.OP.username}`}
					currentTime={postContent.post.publishedAt}
				/>
				<h1 className="font-bold text-lg">{postContent.post.title}</h1>
				<p>{postContent.post.content}</p>
				<PostFooter
					commentLength={postContent.comments.length}
					className="mt-4"
				/>
			</main>
			{postContent.comments.length === 0 ? (
				<h2>no comments yet</h2>
			) : (
				postContent.comments
					.map((comment) => {
						console.log(comment);
						return (
							<div key={comment.id} className="px-4 py-2 my-1 bg-white">
								<span className="flex items-center gap-2">
									{`${comment.attributes.user.data.attributes.username} `}
									<TimePassed
										currentTime={comment.attributes.publishedAt}
									/>
								</span>
								<p>{comment.attributes.content}</p>
							</div>
						);
					})
					.reverse()
			)}
		</>
	);
};

export default Post;
