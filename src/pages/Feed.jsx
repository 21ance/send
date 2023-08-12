import { NavLink } from "react-router-dom";
import { useState } from "react";
import PostFooter from "../components/common/PostFooter";
import TimePassed from "../components/common/TimePassed";
import BoxContainer from "../components/common/BoxContainer";
import PostBox from "../components/post/PostBox";
import AvatarPhoto from "../components/common/AvatarPhoto";

const Feed = (props) => {
	const { loginDetails, loading, error, data } = props;
	const [userPosting, setUserPosting] = useState(false);

	// to add loading component
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<main>
			<PostBox
				userPosting={userPosting}
				setUserPosting={setUserPosting}
				loginDetails={loginDetails}
			/>

			{data.data.map((post) => {
				return (
					<BoxContainer
						className="my-2 px-7 py-6 hover:border-[#787C7E] duration-200"
						key={post.id}
					>
						<NavLink
							to={`/profile/${post.attributes.users_permissions_user.data.id}`}
							className="hover:text-blue-500"
						>
							<header className="grid grid-cols-[auto,1fr] gap-x-2">
								<AvatarPhoto
									src={
										post.attributes.users_permissions_user.data.attributes
											.avatarUrl
									}
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
						</NavLink>
						<NavLink to={`/posts/${post.id}`}>
							<div className="my-4 hover:text-blue-500">
								<h2 className="font-bold block">
									{post.attributes.title}
								</h2>
								<p className="truncate max-w-[65ch] text-sm">
									{post.attributes.content}
								</p>
							</div>
						</NavLink>
						<PostFooter
							commentLength={post.attributes.comments.data.length}
							loginDetails={loginDetails}
							reactions={post.attributes.reactions}
							postID={post.id}
						/>
					</BoxContainer>
				);
			})}
		</main>
	);
};

export default Feed;
