const Vote = () => {
	return (
		<div className="text-base flex gap-2">
			<button>
				<img src="./svg/upvote.svg" alt="upvote" />
			</button>
			<span>Vote</span>
			<button>
				<img src="./svg/downvote.svg" alt="downvote" />
			</button>
		</div>
	);
};

export default Vote;
