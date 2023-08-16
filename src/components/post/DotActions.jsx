import { BsThreeDotsVertical } from "react-icons/bs";
import BoxContainer from "../common/BoxContainer";
import { copyToClipboard, fetchRequest } from "../../helper/functions";
import { Context } from "../../router/RouteManager";
import { useContext, useEffect } from "react";
import ConfirmDeleteModal from "../modal/ConfirmDeleteModal";
import { useNavigate } from "react-router-dom";

const DotActions = (props) => {
	const { dotDropdown, setDotDropdown, post, from } = props;

	return (
		<div className="absolute right-[-10px] ml-4">
			<span
				className="hover:text-blue-500 cursor-pointer"
				onClick={() => setDotDropdown((prev) => !prev)}
			>
				<BsThreeDotsVertical className="dropdown" />
			</span>
			{dotDropdown && <DotDropdown post={post} from={from} />}
		</div>
	);
};

const DotDropdown = (props) => {
	const { post, from } = props;
	const { login, modal } = useContext(Context);
	const { loginDetails } = login;
	const { setModalConfig } = modal;
	const navigate = useNavigate();

	useEffect(() => {
		setModalConfig((prev) => ({
			...prev,
			handleCancel: closeModal,
			width: "max-w-fit",
		}));
	}, []);

	function closeModal() {
		setModalConfig((prev) => ({ ...prev, active: false }));
	}

	function deletePost() {
		const token = `Bearer ${loginDetails.jwt}`;
		fetchRequest(
			`http://localhost:1337/api/posts/${post.id}`,
			"DELETE",
			"",
			token,
			refreshPage()
		);
		function refreshPage() {
			navigate(0);
		}
	}

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
				className="flex flex-col absolute items-start ml-[-80px] font-urbanist"
			>
				{myPost && (
					<>
						<button className="hover:text-blue-500">Edit</button>
						<button
							className="hover:text-blue-500"
							onClick={() =>
								setModalConfig((prev) => ({
									...prev,
									active: true,
									children: (
										<ConfirmDeleteModal
											post={
												from === "profile"
													? post.title
													: post.attributes.title
											}
										/>
									),
									submitText: "Delete",
									submitColor: "bg-red-500 hover:bg-red-500/80",
									handleSave: deletePost,
								}))
							}
						>
							Delete
						</button>
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
