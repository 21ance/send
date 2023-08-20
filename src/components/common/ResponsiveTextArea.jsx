const ResponsiveTextArea = (props) => {
	const { rows = 5, placeholder, value, onChange } = props;

	return (
		<textarea
			rows={rows}
			className="bg-[#F6F7F8] px-4 py-2 resize-none p-2 border-[1px] focus:outline-none focus:ring-0 focus:border-blue-500 w-full rounded dark:bg-slate-800 dark:border-slate-700 dark:focus:border-blue-500"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			onInput={(e) => {
				e.target.style.height = "auto";
				e.target.style.height = e.target.scrollHeight + "px";
			}}
		/>
	);
};

export default ResponsiveTextArea;
