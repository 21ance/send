import { useContext, useEffect, useState } from "react";
import { fetchRequest } from "../../helper/functions";
import BoxContainer from "../common/BoxContainer";
import PostButton from "./PostButton";
import { Link } from "react-router-dom";
import AvatarPhoto from "../common/AvatarPhoto";
import { Context } from "../../router/RouteManager";
import ResponsiveTextArea from "../common/ResponsiveTextArea";

const PostBox = (props) => {
	const { userPosting, setUserPosting } = props;
	const { login, postFooter, feed } = useContext(Context);
	const { loginDetails } = login;
	const { setPostFooterData } = postFooter;
	const { setFeedData } = feed;
	const [error, setError] = useState(false);
	const [postForm, setPostForm] = useState({
		title: "",
		content: "",
	});

	useEffect(() => {
		function handleEsc(e) {
			if (e.keyCode === 27) {
				setUserPosting(false);
			}
		}

		document.addEventListener("keydown", handleEsc);
		return () => {
			document.removeEventListener("keydown", handleEsc);
		};
	}, []);

	function showPostForm() {
		if (!loginDetails) return setError("Login your account to post");
		setUserPosting(true);
	}

	function createPost() {
		if (postForm.title === "") return console.log("title empty");

		const data = {
			data: {
				title: postForm.title,
				content: postForm.content,
				users_permissions_user: {
					connect: [loginDetails.user.id],
				},
			},
		};
		const token = `Bearer ${loginDetails.jwt}`;
		fetchRequest(
			`${import.meta.env.VITE_BASE_URL}/api/posts?populate=deep,3`,
			"POST",
			data,
			token,
			appendData
		);

		function appendData(data) {
			const newPost = data.data;
			setFeedData((prev) => {
				return [newPost, ...prev];
			});

			setPostFooterData((prev) => {
				return [
					...prev,
					{
						commentsLength: 0,
						reactions: newPost.attributes.reactions.data,
						postID: newPost.id,
					},
				];
			});
		}

		setPostForm({
			title: "",
			content: "",
		});
		setUserPosting(false);
	}

	return (
		<>
			{!userPosting ? (
				<BoxContainer className="flex gap-2 my-2">
					{loginDetails ? (
						<AvatarPhoto src={loginDetails.user.avatarUrl} />
					) : (
						<AvatarPhoto />
					)}
					<input
						type="text"
						placeholder="Create Post"
						className="bg-[#F6F7F8] rounded pl-4 w-full focus:outline-none focus:ring-0 focus:border-blue-500 hover:border-blue-500 border-[1px] duration-200 dark:bg-slate-800 dark:border-slate-700"
						onClick={() => showPostForm()}
						key={1}
					/>
				</BoxContainer>
			) : (
				<BoxContainer className="my-2">
					<form className="flex flex-col gap-1">
						<small>Post as {loginDetails.user.username}</small>
						<input
							type="text"
							placeholder="Title"
							className="bg-[#F6F7F8] rounded px-4 py-2 w-full border-[1px] focus:outline-none focus:ring-0 focus:border-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:focus:border-blue-500"
							value={postForm.title}
							autoFocus={true}
							onChange={(e) => {
								setPostForm((prev) => ({
									...prev,
									title: e.target.value,
								}));
							}}
						/>
						<ResponsiveTextArea
							placeholder={"Text (optional)"}
							value={postForm.content}
							onChange={(e) => {
								setPostForm((prev) => ({
									...prev,
									content: e.target.value,
								}));
							}}
						/>
						<footer className="flex flex-row-reverse gap-2 mt-2 justify-start">
							<PostButton
								type="submit"
								text="Post"
								className="bg-blue-500 text-white hover:bg-blue-500/80 dark:border-slate-700"
								onClick={(e) => {
									e.preventDefault();
									createPost();
								}}
							/>
							<PostButton
								text="Save Draft"
								className="border-[#787C7E] dark:border-slate-700"
								onClick={() => setUserPosting(false)}
							/>
						</footer>
					</form>
				</BoxContainer>
			)}
			{error && (
				<Link to={"/login"}>
					<small className="text-red-500 hover:text-blue-500">
						{error}
					</small>
				</Link>
			)}
		</>
	);
};

export default PostBox;
