import { useContext, useState } from "react";
import BoxContainer from "../common/BoxContainer";
import PostButton from "./PostButton";
import { fetchRequest } from "../../helper/functions";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../router/RouteManager";
import ResponsiveTextArea from "../common/ResponsiveTextArea";

const CommentBox = (props) => {
	const { postContent, setPostContent } = props;
	const { login, postFooter } = useContext(Context);
	const { loginDetails } = login;
	const { setPostFooterData } = postFooter;
	const params = useParams();

	const [commentForm, setCommentForm] = useState();

	function createComment() {
		if (commentForm === "") return console.log("content empty");

		const data = {
			data: {
				content: commentForm,
				post: {
					connect: [postContent.post.id],
				},
				user: {
					connect: [loginDetails.user.id],
				},
			},
		};
		const token = `Bearer ${loginDetails.jwt}`;
		fetchRequest(
			`${import.meta.env.VITE_BASE_URL}/api/comments`,
			"POST",
			data,
			token,
			appendData,
			false
		);

		function appendData(data) {
			const newComment = data;
			newComment.attributes.user = {
				data: {
					id: loginDetails.user.id,
					attributes: {
						username: loginDetails.user.username,
						avatarUrl: loginDetails.user.avatarUrl,
					},
				},
			};
			setPostContent((prev) => ({
				...prev,
				comments: [...prev.comments, newComment],
			}));
		}

		setPostFooterData((prev) => {
			const newState = prev.map((post) => {
				if (post.postID === Number(params.postID)) {
					return { ...post, commentsLength: post.commentsLength + 1 };
				}
				return post;
			});
			return newState;
		});

		setCommentForm("");
	}

	return (
		<>
			{loginDetails ? (
				<BoxContainer>
					<small>Comment as {loginDetails.user.username}</small>
					<form>
						<ResponsiveTextArea
							placeholder={"What are your thoughts?"}
							value={commentForm}
							onChange={(e) => setCommentForm(e.target.value)}
						/>
						<footer className="flex gap-2">
							<PostButton
								text="Comment"
								type="submit"
								className="bg-blue-500 text-white hover:bg-blue-500/80 dark:border-slate-700"
								onClick={(e) => {
									e.preventDefault();
									createComment();
								}}
							/>
							<PostButton
								text="Clear"
								className="border-[#787C7E] dark:border-slate-700"
								onClick={() => setCommentForm("")}
							/>
						</footer>
					</form>
				</BoxContainer>
			) : (
				<BoxContainer>
					<Link to={"/login"}>
						<small className="hover:text-blue-500 ">
							Login your account to comment
						</small>
					</Link>
				</BoxContainer>
			)}
		</>
	);
};

export default CommentBox;
