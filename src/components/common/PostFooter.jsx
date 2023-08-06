const PostFooter = (props) => {
	const { commentLength, className } = props;

	return (
		<footer
			className={`flex items-center relative gap-2 ${className}`}
			onClick={(e) => e.stopPropagation()}
		>
			<button>
				<img src="./svg/upvote.svg" alt="upvote" />
			</button>
			<span>Vote</span>
			<button>
				<img src="./svg/downvote.svg" alt="downvote" />
			</button>
			<div className="flex items-center gap-1 absolute right-0 cursor-pointer">
				<img src="./svg/comment.svg" alt="downvote" width="16px" />
				<span>{commentLength}</span>
			</div>
		</footer>
	);
};

export default PostFooter;
