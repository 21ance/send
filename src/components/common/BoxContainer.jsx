const BoxContainer = (props) => {
	const {
		className = "",
		children,
		handleClick,
		width = " w-screen md:w-[700px]",
	} = props;

	return (
		<div
			className={`px-4 py-2 bg-white border-[1px] rounded ${width} ${className}`}
			onClick={handleClick}
		>
			{children}
		</div>
	);
};

export default BoxContainer;
