import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import TimePassed from "../components/common/TimePassed";
import PostFooter from "../components/common/PostFooter";
import BoxContainer from "../components/common/BoxContainer";

const PostDetails = (props) => {
	const { loginDetails } = props;

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
			<BoxContainer className="my-2 md:w-[700px]">
				<TimePassed
					text={`Posted by ${postContent.OP.username}`}
					currentTime={postContent.post.publishedAt}
					className="text-[#787C7E]"
				/>
				<h1 className="font-bold text-lg">{postContent.post.title}</h1>
				<p>{postContent.post.content}</p>
				<PostFooter
					commentLength={postContent.comments.length}
					className="mt-4"
					loginDetails={loginDetails}
					reactions={data.data.attributes.reactions}
					postID={data.data.id}
				/>
			</BoxContainer>
			{postContent.comments.length === 0 ? (
				<h2>no comments yet</h2>
			) : (
				postContent.comments
					.map((comment) => {
						return (
							<BoxContainer key={comment.id} className="md:w-[700px] my-1">
								<span className="flex items-center gap-2">
									{`${comment.attributes.user.data.attributes.username} `}
									<TimePassed
										currentTime={comment.attributes.publishedAt}
									/>
								</span>
								<p>{comment.attributes.content}</p>
							</BoxContainer>
						);
					})
					.reverse()
			)}
		</>
	);
};

export default PostDetails;
