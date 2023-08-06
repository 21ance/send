import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Vote from "../components/common/Vote";
import TimePassed from "../components/common/TimePassed";

const Feed = () => {
	const { loading, error, data } = useFetch(
		"http://localhost:1337/api/posts?sort[0]=id:desc&populate=deep,3"
	);
	const navigate = useNavigate();

	function openPost(postID) {
		navigate(`/posts/${postID}`);
	}

	// to add loading component
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<main className=" bg-gray-100 min-h-screen font-roboto">
			{data.data.map((post) => {
				return (
					<article
						key={post.id}
						className="mb-2 bg-white px-7 py-6 flex flex-col gap-4"
						onClick={(e) => {
							openPost(post.id);
						}}
					>
						<header className="grid grid-cols-[auto,1fr] gap-x-2">
							<img
								src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
								alt="profile"
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
						<footer
							className="flex items-center relative"
							onClick={(e) => e.stopPropagation()}
						>
							<Vote />
							<div className="flex items-center gap-1 absolute right-0 cursor-pointer">
								<img src="./svg/comment.svg" alt="downvote" width="16px" />
								<span>
									{post.attributes.comments.data.length === 1
										? post.attributes.comments.data.length + " comment"
										: post.attributes.comments.data.length + " comments"}
								</span>
							</div>
						</footer>
					</article>
				);
			})}
		</main>
	);
};

export default Feed;
