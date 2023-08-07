const BoxContainer = (props) => {
	const { className, children, onClick } = props;

	return (
		<div
			className={`px-4 py-2 bg-white border-[1px] rounded ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default BoxContainer;
