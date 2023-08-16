import { BsThreeDotsVertical } from "react-icons/bs";
import BoxContainer from "../common/BoxContainer";
import { copyToClipboard } from "../../helper/functions";

const DotActions = (props) => {
	const { dotDropdown, setDotDropdown, post, loginDetails } = props;

	return (
		<div className="absolute right-[-10px] ml-4">
			<span
				className="hover:text-blue-500 cursor-pointer"
				onClick={() => setDotDropdown((prev) => !prev)}
			>
				<BsThreeDotsVertical className="dropdown" />
			</span>
			{dotDropdown && (
				<DotDropdown post={post} loginDetails={loginDetails} />
			)}
		</div>
	);
};

const DotDropdown = (props) => {
	const { post, loginDetails } = props;

	let myPost;
	if (!loginDetails) {
		myPost === false;
	} else if (typeof post.attributes === "undefined") {
		myPost = post.users_permissions_user.id === loginDetails.user.id;
	} else {
		myPost =
			post.attributes.users_permissions_user.data.id ===
			loginDetails.user.id;
	}

	return (
		<>
			<BoxContainer
				width="w-[100px]"
				className="flex flex-col absolute items-start ml-[-80px]"
			>
				{myPost && (
					<>
						<button className="hover:text-blue-500">Edit</button>
						<button className="hover:text-blue-500">Delete</button>
					</>
				)}
				<button
					className="hover:text-blue-500"
					onClick={() =>
						copyToClipboard(`http://localhost:5173/#/posts/${post.id}`)
					}
				>
					Copy link
				</button>
			</BoxContainer>
		</>
	);
};

export default DotActions;
