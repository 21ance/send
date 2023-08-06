import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import TimePassed from "../components/common/TimePassed";
import Vote from "../components/common/Vote";

const Post = () => {
	const { postID } = useParams();
	const { loading, error, data } = useFetch(
		`http://localhost:1337/api/posts/${postID}?populate=deep,3`
	);
	const [postContent, setPostContent] = useState(false);

	useEffect(() => {
		if (!data) return;
		console.log(data);
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
		<main className="px-4 py-2">
			{console.log(postContent)}
			<TimePassed
				text={`Posted by ${postContent.OP.username}`}
				currentTime={postContent.post.publishedAt}
			/>
			<h1 className="font-bold text-lg">{postContent.post.title}</h1>
			<p>{postContent.post.content}</p>
			<Vote />
			<div>
				{postContent.comments.length === 0 ? (
					<h2>no comments yet</h2>
				) : (
					<span>{postContent.comments.length} comments</span>
				)}
			</div>
		</main>
	);
};

export default Post;
