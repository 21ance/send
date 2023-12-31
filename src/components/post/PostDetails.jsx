import { NavLink, useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();

	return (
		<NavLink to={`/posts/${post.id}`}>
			<BoxContainer
				className="my-2 px-7 py-6 hover:border-[#787C7E] duration-200 dark:hover:border-slate-400"
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
					<div
						onClick={(e) => {
							e.preventDefault();
							from === "profile"
								? navigate(`/posts/${post.id}`)
								: navigate(
										`/profile/${post.attributes.users_permissions_user.data.id}`
								  );
						}}
						className={
							(from == "profile"
								? ""
								: "hover:underline-offset-2 hover:underline cursor-pointer dark:hover:decoration-slate-400") +
							" grid grid-cols-[auto,1fr] gap-x-2 w-fit"
						}
					>
						{loginDetails ? (
							<AvatarPhoto
								src={
									from === "profile"
										? profileAvatar
										: post.attributes.users_permissions_user.data.id ===
										  loginDetails.user.id
										? loginDetails.user.avatarUrl
										: post.attributes.users_permissions_user.data
												.attributes.avatarUrl
								}
								className="row-[1/3] self-center"
							/>
						) : (
							<AvatarPhoto
								src={
									from === "profile"
										? post.users_permissions_user.avatarUrl
										: post.attributes.users_permissions_user.data
												.attributes.avatarUrl
								}
								className="row-[1/3] self-center"
							/>
						)}
						<span className="col-[2/3] font-medium text-sm dark:text-slate-200">
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
					</div>
				</header>
				<div className="py-4">
					<h2 className="font-bold block dark:text-slate-200">
						{from === "profile" ? post.title : post.attributes.title}
					</h2>
					<p className="truncate max-w-full text-sm dark:text-slate-400">
						{from === "profile" ? post.content : post.attributes.content}
					</p>
				</div>
				<PostFooter footerData={footerData} from={from} />
			</BoxContainer>
		</NavLink>
	);
};

export default PostDetails;
