const ResponsiveTextArea = (props) => {
	const { rows = 5, placeholder, value, onChange } = props;

	return (
		<textarea
			rows={rows}
			className="bg-[#F6F7F8] resize-none p-2 border-[1px] focus:outline-none focus:ring-0 focus:border-blue-500 w-full rounded"
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
