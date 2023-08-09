import { useState } from "react";
import BoxContainer from "../common/BoxContainer";
import PostButton from "./PostButton";
import { fetchRequest } from "../../helper/functions";
import { Link } from "react-router-dom";

const CommentBox = (props) => {
	const { loginDetails, postContent, setPostContent } = props;
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
			"http://localhost:1337/api/comments",
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

		setCommentForm("");
	}

	return (
		<>
			{loginDetails ? (
				<BoxContainer>
					<small>Comment as {loginDetails.user.username}</small>
					<form>
						<textarea
							rows="5"
							className="resize-none p-2 border-[1px] focus:outline-none focus:ring-0 focus:border-blue-500 w-full rounded"
							placeholder="What are your thoughts?"
							value={commentForm}
							onChange={(e) => setCommentForm(e.target.value)}
						/>
						<footer className="flex gap-2">
							<PostButton
								text="Comment"
								type="submit"
								className="bg-blue-500 text-white hover:bg-blue-500/80"
								onClick={(e) => {
									e.preventDefault();
									createComment();
								}}
							/>
							<PostButton
								text="Clear"
								className="border-[#787C7E]"
								onClick={() => setCommentForm("")}
							/>
						</footer>
					</form>
				</BoxContainer>
			) : (
				<BoxContainer>
					<Link to={"/login"}>
						<small className="hover:text-blue-500">
							Login your account to comment
						</small>
					</Link>
				</BoxContainer>
			)}
		</>
	);
};

export default CommentBox;
