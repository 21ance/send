import { NavLink, useParams } from "react-router-dom";
import BoxContainer from "../components/common/BoxContainer";
import useFetch from "../hooks/useFetch";
import { convertDateTime } from "../helper/functions";
import AvatarPhoto from "../components/common/AvatarPhoto";
import TimePassed from "../components/common/TimePassed";
import PostFooter from "../components/common/PostFooter";

const Profile = (props) => {
	const { loginDetails, setPostFooterData, postFooterData } = props;

	const { userID } = useParams();
	const { loading, error, data } = useFetch(
		`http://localhost:1337/api/users/${userID}?populate=deep,4`
	);

	// to add loading component
	if (loading || !postFooterData) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<>
			<BoxContainer className="flex flex-col items-center">
				<AvatarPhoto src={data.avatarUrl} className="w-40" />
				<h1 className="mt-2">@{data.username}</h1>
				<small>{convertDateTime(data.createdAt)}</small>
			</BoxContainer>
			<BoxContainer>
				<h2>Posts</h2>
				{data.posts
					.map((post) => {
						return (
							<BoxContainer
								className="my-2 px-7 py-6 hover:border-[#787C7E] duration-200"
								key={post.id}
								width="w-full"
							>
								<NavLink
									to={`/profile/${post.users_permissions_user.id}`}
									className="hover:text-blue-500"
								>
									<header className="grid grid-cols-[auto,1fr] gap-x-2">
										<AvatarPhoto
											src={post.users_permissions_user.avatarUrl}
											className="row-[1/3] self-center"
										/>
										<span className="col-[2/3] font-medium text-sm">
											{post.users_permissions_user.username}
										</span>
										<TimePassed currentTime={post.publishedAt} />
									</header>
								</NavLink>
								<NavLink to={`/posts/${post.id}`}>
									<div className="my-4 hover:text-blue-500">
										<h2 className="font-bold block">{post.title}</h2>
										<p className="truncate max-w-[65ch] text-sm">
											{post.content}
										</p>
									</div>
								</NavLink>
								<PostFooter
									postFooterData={postFooterData}
									setPostFooterData={setPostFooterData}
									loginDetails={loginDetails}
									footerData={{
										postID: post.id,
										reactions: post.reactions,
										commentsLength: post.comments.length,
									}}
									from={post}
								/>
							</BoxContainer>
						);
					})
					.reverse()}
			</BoxContainer>
		</>
	);
};

export default Profile;
