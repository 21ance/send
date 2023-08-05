const AccountElement = (props) => {
	const { heading, children } = props;

	return (
		<main className="px-8 font-urbanist flex flex-col justify-center mt-20">
			<h1 className="text-3xl font-bold min-w-[auto] max-w-[16ch] py-8">
				{heading}
			</h1>
			{children}
		</main>
	);
};

export default AccountElement;
