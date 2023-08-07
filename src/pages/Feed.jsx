import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PostFooter from "../components/common/PostFooter";
import TimePassed from "../components/common/TimePassed";
import BoxContainer from "../components/common/BoxContainer";
import { fetchRequest, reloadPage } from "../helper/functions";

const Feed = (props) => {
	const { loginDetails } = props;
	const { loading, error, data } = useFetch(
		"http://localhost:1337/api/posts?sort[0]=id:desc&populate=deep,3"
	);
	const navigate = useNavigate();
	const [userPosting, setUserPosting] = useState(false);

	function openPost(postID) {
		navigate(`/posts/${postID}`);
	}

	// to add loading component
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<main className="md:w-[700px]">
			<PostBox
				userPosting={userPosting}
				setUserPosting={setUserPosting}
				loginDetails={loginDetails}
			/>

			{data.data.map((post) => {
				return (
					<BoxContainer
						key={post.id}
						className="my-2 px-7 py-6 flex flex-col gap-4 cursor-pointer hover:border-[#787C7E] duration-200"
						onClick={(e) => {
							openPost(post.id);
						}}
					>
						<header className="grid grid-cols-[auto,1fr] gap-x-2">
							<img
								src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
								alt="profile picture"
								width="40px"
								className="row-[1/3] self-center"
							/>
							<span className="col-[2/3] font-medium text-sm">
								{
									post.attributes.users_permissions_user.data.attributes
										.username
								}
							</span>
							<TimePassed currentTime={post.attributes.publishedAt} />
						</header>
						<h2 className="font-bold block">{post.attributes.title}</h2>
						<p className="truncate max-w-[65ch] mt-[-1rem] text-sm">
							{post.attributes.content}
						</p>
						<PostFooter
							commentLength={post.attributes.comments.data.length}
						/>
					</BoxContainer>
				);
			})}
		</main>
	);
};

const PostBox = (props) => {
	const { userPosting, setUserPosting, loginDetails } = props;
	const [error, setError] = useState(false);
	const [postForm, setPostForm] = useState({
		title: "",
		content: "",
	});

	function showPostForm() {
		if (!loginDetails) return setError("Please login before posting");
		setUserPosting(true);
	}

	function postRequest() {
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
		fetchRequest("http://localhost:1337/api/posts", "POST", data, token);
		reloadPage();
	}

	return (
		<>
			{!userPosting ? (
				<BoxContainer className="flex gap-2 my-2">
					<img
						src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
						alt="profile picture"
						width="40px"
					/>
					<input
						type="text"
						placeholder="Create Post"
						className="bg-[#F6F7F8] rounded pl-4 w-full focus:outline-none focus:ring-0 focus:border-blue-500 hover:border-blue-500 border-[1px] duration-200"
						onClick={() => showPostForm()}
						key={1}
					/>
				</BoxContainer>
			) : (
				<BoxContainer className="my-2 flex flex-col gap-1">
					<small>Post as {loginDetails.user.username}</small>
					<input
						type="text"
						placeholder="Title"
						className="bg-[#F6F7F8] rounded px-4 py-2 w-full border-[1px] focus:outline-none focus:ring-0 focus:border-blue-500"
						value={postForm.title}
						onChange={(e) => {
							setPostForm((prev) => ({
								...prev,
								title: e.target.value,
							}));
						}}
					/>
					<textarea
						rows="4"
						className="bg-[#F6F7F8] rounded px-4 py-2 w-full resize-none border-[1px] focus:outline-none focus:ring-0 focus:border-blue-500"
						placeholder="Text (optional)"
						value={postForm.content}
						onChange={(e) => {
							setPostForm((prev) => ({
								...prev,
								content: e.target.value,
							}));
						}}
					></textarea>
					<footer className="flex gap-2 mt-2 justify-end">
						<PostButton
							text="Save Draft"
							className="border-[#787C7E]"
							onClick={() => setUserPosting(false)}
						></PostButton>
						<PostButton
							text="Post"
							className="bg-[#787C7E] text-white hover:bg-[#787C7E]/80"
							onClick={() => postRequest()}
						></PostButton>
					</footer>
				</BoxContainer>
			)}
			{error && <small className="text-red-500">{error}</small>}
		</>
	);
};

const PostButton = (props) => {
	const { text, className, onClick } = props;

	return (
		<button
			className={`${className} px-4 py-1 rounded-full border-[1px]`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Feed;
