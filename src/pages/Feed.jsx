import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

const Feed = () => {
	const { loading, error, data } = useFetch(
		"http://localhost:1337/api/posts?sort[0]=id:desc&populate=deep,3"
	);

	function calculateTimePassed(currentDate, pastDate) {
		const compare = currentDate.diff(pastDate, [
			"years",
			"months",
			"days",
			"hours",
		]);

		const diff = compare.values;

		if (diff.years === 1) {
			return `${diff.years} year ago`;
		} else if (diff.years > 1) {
			return `${diff.years} years ago`;
		}

		if (diff.months === 1) {
			return `${diff.months} month ago`;
		} else if (diff.months > 1) {
			return `${diff.months} months ago`;
		}

		if (diff.days === 1) {
			return `${diff.days} day ago`;
		} else if (diff.days > 1) {
			return `${diff.days} days ago`;
		}

		if (diff.hours === 1) {
			return `${parseInt(diff.hours)} hour ago`;
		} else if (diff.hours > 1) {
			return `${parseInt(diff.hours)} hours ago`;
		}
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<main className=" bg-gray-100 min-h-screen font-roboto">
			{data.data.map((post) => {
				return (
					<article
						key={post.id}
						className="mb-4 bg-white px-7 py-6 flex flex-col gap-4"
					>
						<header className="grid grid-cols-[auto,1fr] gap-x-2">
							<img
								src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
								alt="profile"
								width="40px"
								className="row-[1/3] self-center"
							/>
							<span className="col-[2/3] font-medium">
								{
									post.attributes.users_permissions_user.data.attributes
										.username
								}
							</span>
							<small className="col-[2/3]">
								{calculateTimePassed(
									DateTime.fromISO(new Date().toJSON()),
									DateTime.fromISO(post.attributes.publishedAt)
								)}
							</small>
						</header>
						<h2 className="font-bold block text-lg">
							{post.attributes.title}
						</h2>
						<p className="truncate max-w-[65ch] mt-[-1rem]">
							{post.attributes.content}
						</p>
						<footer className="flex items-center text-xl font-thin gap-2 relative">
							<button>
								<img src="./svg/upvote.svg" alt="upvote" />
							</button>
							<small>Vote</small>
							<button>
								<img src="./svg/downvote.svg" alt="downvote" />
							</button>
							<div className="flex items-center gap-1 absolute right-0 cursor-pointer">
								<img src="./svg/comment.svg" alt="downvote" width="16px" />
								<small>
									{post.attributes.comments.data.length === 1
										? post.attributes.comments.data.length + " comment"
										: post.attributes.comments.data.length + " comments"}
								</small>
							</div>
						</footer>
					</article>
				);
			})}
		</main>
	);
};

export default Feed;
