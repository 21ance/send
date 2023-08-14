import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import TimePassed from "../components/common/TimePassed";
import PostFooter from "../components/common/PostFooter";
import BoxContainer from "../components/common/BoxContainer";
import CommentBox from "../components/post/CommentBox";
import AvatarPhoto from "../components/common/AvatarPhoto";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Context } from "../router/RouteManager";

const PostPage = () => {
	const { postFooter } = useContext(Context);
	const { postFooterData } = postFooter;

	const { postID } = useParams();
	const { loading, error, data } = useFetch(
		`http://localhost:1337/api/posts/${postID}?populate=deep,3`
	);
	const [postContent, setPostContent] = useState(false);

	useEffect(() => {
		if (!data) return;
		if (data.data === null) return setPostContent(false);

		setPostContent({
			post: data.data,
			OP: data.data.attributes.users_permissions_user.data,
			comments: data.data.attributes.comments.data,
			reactions: data.data.attributes.reactions,
		});
	}, [data]);

	// to add loading component
	if (loading || !postFooterData) return <p>Loading...</p>;
	if (error || !postContent) return <p>Error...</p>;

	return (
		<>
			<BoxContainer className="my-2">
				<TimePassed
					text={`Posted by ${postContent.OP.attributes.username}`}
					currentTime={postContent.post.attributes.publishedAt}
					className="text-[#787C7E]"
				/>
				<h1 className="font-bold text-lg">
					{postContent.post.attributes.title}
				</h1>
				<ReactMarkdown
					className="max-w-full text-sm whitespace-pre-wrap mb-2"
					children={postContent.post.attributes.content}
				/>
				<PostFooter
					footerData={{
						postID: postContent.post.id,
						reactions: postContent.reactions.data,
						commentsLength: postContent.comments.length,
					}}
				/>
			</BoxContainer>
			<CommentBox
				postContent={postContent}
				setPostContent={setPostContent}
			/>
			{postContent.comments.length === 0 ? (
				<h2 className="text-center">no comments yet</h2>
			) : (
				postContent.comments
					.map((comment) => {
						return (
							<BoxContainer
								key={comment.id}
								className="my-1 grid grid-cols-[auto,1fr] gap-x-2 gap-y-4"
							>
								<AvatarPhoto
									src={comment.attributes.user.data.attributes.avatarUrl}
								/>
								<span className="flex items-center gap-2">
									{`${comment.attributes.user.data.attributes.username} `}
									<TimePassed
										currentTime={comment.attributes.publishedAt}
									/>
								</span>
								<ReactMarkdown
									className="max-w-full text-sm whitespace-pre-wrap col-[1/-1]"
									children={comment.attributes.content}
								/>
							</BoxContainer>
						);
					})
					.reverse()
			)}
		</>
	);
};

export default PostPage;
