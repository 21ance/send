const BoxContainer = (props) => {
	const {
		className = "",
		children,
		handleClick,
		width = " w-screen md:w-[700px]",
	} = props;

	return (
		<div
			className={`px-4 py-2 bg-white border-[1px] rounded ${width} ${className} dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200`}
			onClick={handleClick}
		>
			{children}
		</div>
	);
};

export default BoxContainer;
