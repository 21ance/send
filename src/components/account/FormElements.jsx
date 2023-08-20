const FormInput = (props) => {
	const { type, placeholder, value, onChange, label = false } = props;

	return (
		<>
			{label !== false && <span className="mb-[-1rem]">{label}:</span>}
			<input
				type={type}
				placeholder={placeholder}
				className="bg-[#F7F8F9] rounded-lg border-[1px] border-[#DADADA] py-2 px-4 placeholder:text-[#8391A1] focus:outline-[#1E232C] font-sans dark:text-slate-800"
				value={value}
				onChange={onChange}
			/>
		</>
	);
};

const FormSubmit = (props) => {
	const { onClick, text } = props;

	return (
		<button
			type="submit"
			className="bg-blue-500 hover:bg-blue-500/80 rounded-lg h-[56px] text-white mt-6"
			onClick={onClick}
		>
			{text}
		</button>
	);
};

const FormError = (props) => {
	const { text } = props;
	return <span className="text-red-500 text-sm mt-[-0.5rem]">{text}</span>;
};

export { FormInput, FormSubmit, FormError };
