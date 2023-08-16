import { NavLink } from "react-router-dom";
import BoxContainer from "../common/BoxContainer";
import AvatarPhoto from "../common/AvatarPhoto";
import PostFooter from "../common/PostFooter";
import TimePassed from "../common/TimePassed";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../router/RouteManager";
import DotActions from "./DotActions";

const PostDetails = (props) => {
	const { post, footerData, from, width, profileAvatar } = props;
	const { login } = useContext(Context);
	const { loginDetails } = login;
	const [dotDropdown, setDotDropdown] = useState(false);

	return (
		<BoxContainer
			className="my-2 px-7 py-6 hover:border-[#787C7E] duration-200"
			width={width}
		>
			<header className="relative">
				<DotActions
					dotDropdown={dotDropdown}
					setDotDropdown={setDotDropdown}
					post={post}
					from={from}
					className="right-[-10px] ml-4"
				/>
				<NavLink
					to={
						from === "profile"
							? ``
							: `/profile/${post.attributes.users_permissions_user.data.id}`
					}
					className={
						(from == "profile"
							? "cursor-default"
							: "hover:text-blue-500") +
						" grid grid-cols-[auto,1fr] gap-x-2 w-fit"
					}
					onClick={(e) => {
						if (from === "profile") {
							e.preventDefault();
						}
					}}
				>
					{loginDetails ? (
						<AvatarPhoto
							src={
								from === "profile"
									? profileAvatar
									: post.attributes.users_permissions_user.data.id ===
									  loginDetails.user.id
									? loginDetails.user.avatarUrl
									: post.attributes.users_permissions_user.data.attributes
											.avatarUrl
							}
							className="row-[1/3] self-center"
						/>
					) : (
						<AvatarPhoto
							src={
								from === "profile"
									? post.users_permissions_user.avatarUrl
									: post.attributes.users_permissions_user.data.attributes
											.avatarUrl
							}
							className="row-[1/3] self-center"
						/>
					)}
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
				</NavLink>
			</header>
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
