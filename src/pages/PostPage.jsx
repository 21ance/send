import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import TimePassed from "../components/common/TimePassed";
import PostFooter from "../components/common/PostFooter";
import BoxContainer from "../components/common/BoxContainer";
import CommentBox from "../components/post/CommentBox";
import AvatarPhoto from "../components/common/AvatarPhoto";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Context } from "../router/RouteManager";
import BackButton from "../components/common/BackButton";
import DotActions from "../components/post/DotActions";
import Loading from "../components/common/Loading";

const PostPage = () => {
	const { postFooter } = useContext(Context);
	const { postFooterData } = postFooter;
	const { postID } = useParams();
	const { loading, error, data } = useFetch(
		`${import.meta.env.VITE_BASE_URL}/api/posts/${postID}?populate=deep,3`
	);
	const [postContent, setPostContent] = useState(false);
	const [dotDropdown, setDotDropdown] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Send | User Post";
	}, []);

	useEffect(() => {
		if (!data) return;
		if (data.data === null) return navigate("*");

		setPostContent({
			post: data.data,
			OP: data.data.attributes.users_permissions_user.data,
			comments: data.data.attributes.comments.data,
			reactions: data.data.attributes.reactions,
		});
	}, [data]);

	if (loading || !postFooterData || !postContent) return <Loading />;
	if (error) return navigate("*");

	return (
		<>
			<BoxContainer className="my-2 relative">
				<DotActions
					dotDropdown={dotDropdown}
					setDotDropdown={setDotDropdown}
					post={data.data}
					className="right-[10px]"
					postContent={postContent}
					setPostContent={setPostContent}
				/>
				<BackButton />
				<TimePassed
					text={`Posted by ${postContent.OP.attributes.username}`}
					currentTime={postContent.post.attributes.publishedAt}
					className="text-[#787C7E] block"
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
							<BoxContainer key={comment.id} className="my-1">
								<Link
									to={`/profile/${comment.attributes.user.data.id}`}
									className="hover:text-blue-500 flex gap-2 items-center"
								>
									<AvatarPhoto
										src={comment.attributes.user.data.attributes.avatarUrl}
									/>
									<span className="flex items-center gap-2">
										{`${comment.attributes.user.data.attributes.username} `}
									</span>
									<TimePassed
										currentTime={comment.attributes.publishedAt}
									/>
								</Link>
								<ReactMarkdown
									className="max-w-full text-sm whitespace-pre-wrap col-[1/-1] mt-2"
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
