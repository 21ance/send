import { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { fetchRequest } from "../../helper/functions";
import { useNavigate } from "react-router-dom";

const PostFooter = (props) => {
	const { commentLength, className, loginDetails, reactions, postID } =
		props;
	const navigate = useNavigate();

	const [votes, setVotes] = useState(
		reactions.data.filter((reaction) => reaction.attributes.vote === true)
			.length
	);
	const [myVote, setMyVote] = useState(() => {
		const vote = reactions.data.filter((reaction) => {
			if (loginDetails === null) return;
			return (
				reaction.attributes.users_permissions_user.data.id ===
				loginDetails.user.id
			);
		});
		if (!vote[0]) return null;
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
					connect: [postID],
				},
				users_permissions_user: {
					connect: [loginDetails.user.id],
				},
			},
		};
		const token = `Bearer ${loginDetails.jwt}`;
		fetchRequest(
			"http://localhost:1337/api/reactions",
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
		}
	}

	function updateReaction(vote) {
		const data = {
			data: {
				vote: vote,
				post: {
					connect: [postID],
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
			console.log
		);
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
						setVotes((prev) => prev + 1);
						return createReaction(true);
					}
					if (myVote.vote === false) {
						setMyVote((prev) => ({ ...prev, vote: true }));
						setVotes((prev) => prev + 1);
						return updateReaction(true);
					}
					if (myVote.vote === true) {
						setMyVote((prev) => ({ ...prev, vote: false }));
						setVotes((prev) => prev - 1);
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
				<span className="text-base">{votes}</span>
			</button>
			<div className="flex items-center gap-1">
				<img src="./svg/comment.svg" alt="downvote" width="16px" />
				<span>{commentLength}</span>
			</div>
		</footer>
	);
};

export default PostFooter;
