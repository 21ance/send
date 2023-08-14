import { NavLink } from "react-router-dom";
import BoxContainer from "../common/BoxContainer";
import AvatarPhoto from "../common/AvatarPhoto";
import PostFooter from "../common/PostFooter";
import TimePassed from "../common/TimePassed";

const PostDetails = (props) => {
	const { post, footerData, from, width } = props;

	return (
		<BoxContainer
			className="my-2 px-7 py-6 hover:border-[#787C7E] duration-200"
			width={width}
		>
			<NavLink
				to={
					from === "profile"
						? `/profile/${post.users_permissions_user.id}`
						: `/profile/${post.attributes.users_permissions_user.data.id}`
				}
				className="hover:text-blue-500"
			>
				<header className="grid grid-cols-[auto,1fr] gap-x-2">
					<AvatarPhoto
						src={
							from === "profile"
								? post.users_permissions_user.avatarUrl
								: post.attributes.users_permissions_user.data.attributes
										.avatarUrl
						}
						className="row-[1/3] self-center"
					/>
					<span className="col-[2/3] font-medium text-sm">
						{from === "profile"
							? post.users_permissions_user.username
							: post.attributes.users_permissions_user.data.attributes
									.username}
					</span>
					<TimePassed
						currentTime={
							from === "profile"
								? post.publishedAt
								: post.attributes.publishedAt
						}
					/>
				</header>
			</NavLink>
			<NavLink to={`/posts/${post.id}`}>
				<div className="py-4 hover:text-blue-500">
					<h2 className="font-bold block">
						{from === "profile" ? post.title : post.attributes.title}
					</h2>
					<p className="truncate max-w-full text-sm">
						{from === "profile" ? post.content : post.attributes.content}
					</p>
				</div>
			</NavLink>
			<PostFooter footerData={footerData} from={from} />
		</BoxContainer>
	);
};

export default PostDetails;
