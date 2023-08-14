import { useContext, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { fetchRequest } from "../../helper/functions";
import { useNavigate } from "react-router-dom";
import { Context } from "../../router/RouteManager";

const PostFooter = (props) => {
	const { login, postFooter } = useContext(Context);
	const { loginDetails } = login;
	const { postFooterData, setPostFooterData } = postFooter;
	const { className, footerData, from = "default" } = props;
	const navigate = useNavigate();

	const [myVote, setMyVote] = useState(() => {
		const vote = footerData.reactions.filter((reaction) => {
			if (loginDetails === null) return;
			if (from !== "default")
				return reaction.users_permissions_user.id === loginDetails.user.id;
			return (
				reaction.attributes.users_permissions_user.data.id ===
				loginDetails.user.id
			);
		});
		if (!vote[0]) return null;
		if (from !== "default")
			return {
				vote: vote[0].vote,
				id: vote[0].id,
			};
		return {
			vote: vote[0].attributes.vote,
			id: vote[0].id,
		};
	});

	function createReaction(vote) {
		const data = {
			data: {
				vote: vote,
				post: {
					connect: [footerData.postID],
				},
				users_permissions_user: {
					connect: [loginDetails.user.id],
				},
			},
		};
		const token = `Bearer ${loginDetails.jwt}`;
		fetchRequest(
			"http://localhost:1337/api/reactions?populate=deep,3",
			"POST",
			data,
			token,
			updateState
		);

		function updateState(data) {
			setMyVote((prev) => ({
				...prev,
				vote: data.data.attributes.vote,
				id: data.data.id,
			}));

			setPostFooterData((prev) => {
				const newState = prev.map((obj) => {
					if (footerData.postID === obj.postID) {
						return {
							...obj,
							reactions: [...obj.reactions, data.data],
							test: "lance",
						};
					}
					return obj;
				});
				return newState;
			});
		}
	}

	function updateReaction(vote) {
		const data = {
			data: {
				vote: vote,
				post: {
					connect: [footerData.postID],
				},
				users_permissions_user: {
					connect: [loginDetails.user.id],
				},
			},
		};

		const token = `Bearer ${loginDetails.jwt}`;
		fetchRequest(
			`http://localhost:1337/api/reactions/${myVote.id}`,
			"PUT",
			data,
			token,
			updateState
		);

		function updateState(data) {
			setPostFooterData((prev) => {
				const newState = prev.map((obj) => {
					return {
						...obj,
						reactions: obj.reactions.map((reaction) => {
							if (reaction.id === data.data.id) {
								return {
									...reaction,
									attributes: {
										...reaction.attributes,
										vote: data.data.attributes.vote,
									},
									test: "lance",
								};
							}
							return reaction;
						}),
					};
				});
				return newState;
			});
		}
	}

	return (
		<footer
			className={`flex items-center relative gap-4 ${className}`}
			onClick={(e) => e.stopPropagation()}
		>
			<button
				className="text-xl flex items-center gap-1"
				onClick={() => {
					if (loginDetails === null) return navigate("/login");
					if (myVote === null) {
						setMyVote(true);
						return createReaction(true);
					}
					if (myVote.vote === false) {
						setMyVote((prev) => ({ ...prev, vote: true }));
						return updateReaction(true);
					}
					if (myVote.vote === true) {
						setMyVote((prev) => ({ ...prev, vote: false }));
						return updateReaction(false);
					}
				}}
			>
				{myVote === null || myVote.vote === false ? (
					<span className="hover:text-blue-500">
						<AiOutlineLike />
					</span>
				) : (
					<span className="text-blue-500">
						<AiFillLike />
					</span>
				)}
				<span className="text-base">
					{postFooterData
						.filter((data) => {
							return footerData.postID === data.postID;
						})
						.map((obj) => {
							return obj.reactions.filter((likes) => {
								return likes.attributes.vote === true;
							}).length;
						})}
				</span>
			</button>
			<div className="flex items-center gap-1">
				<img src="./svg/comment.svg" alt="downvote" width="16px" />
				<span>{footerData.commentsLength}</span>
			</div>
		</footer>
	);
};

export default PostFooter;
