const PostButton = (props) => {
	const { text, className = "", onClick, type = "button" } = props;

	return (
		<button
			type={type}
			className={`${className} px-4 py-1 rounded-full border-[1px]`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default PostButton;
