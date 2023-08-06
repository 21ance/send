import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import PostFooter from "../components/common/PostFooter";
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
		<main className="md:w-[700px]">
			{data.data.map((post) => {
				return (
					<article
						key={post.id}
						className="my-2 bg-white px-7 py-6 flex flex-col gap-4 cursor-pointer"
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
						<PostFooter
							commentLength={post.attributes.comments.data.length}
						/>
					</article>
				);
			})}
		</main>
	);
};

export default Feed;
