import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import PostFooter from "../components/common/PostFooter";
import TimePassed from "../components/common/TimePassed";
import BoxContainer from "../components/common/BoxContainer";
import PostBox from "../components/post/PostBox";
import AvatarPhoto from "../components/common/AvatarPhoto";
import { Context } from "../router/RouteManager";

const Feed = (props) => {
	const { postFooter } = useContext(Context);
	const { postFooterData } = postFooter;
	const { feedData, setFeedData, error, loading } = props;
	const [userPosting, setUserPosting] = useState(false);

	// to add loading component
	if (loading || !postFooterData) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<main>
			<PostBox
				userPosting={userPosting}
				setUserPosting={setUserPosting}
				setFeedData={setFeedData}
				feedData={feedData}
			/>
			{feedData
				.map((post, index) => {
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
											post.attributes.users_permissions_user.data
												.attributes.avatarUrl
										}
										className="row-[1/3] self-center"
									/>
									<span className="col-[2/3] font-medium text-sm">
										{
											post.attributes.users_permissions_user.data
												.attributes.username
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
									<p className="truncate max-w-full text-sm">
										{post.attributes.content}
									</p>
								</div>
							</NavLink>
							<PostFooter
								footerData={{
									postID: postFooterData[index].postID,
									reactions: postFooterData[index].reactions,
									commentsLength: postFooterData[index].commentsLength,
								}}
							/>
						</BoxContainer>
					);
				})
				.reverse()}
		</main>
	);
};

export default Feed;
