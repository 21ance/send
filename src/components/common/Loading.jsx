import BoxContainer from "./BoxContainer";
let arr = [0, 1, 2];

const Loading = () => {
	return (
		<div className="flex gap-4 my-2">
			<main className="flex flex-col gap-2">
				{arr.map((item) => {
					return (
						<BoxContainer
							key={item}
							className="h-[250px] flex flex-col gap-2 animate-pulse"
						>
							<BoxContainer width="max-w-full" className="h-10" />
							<BoxContainer width="max-w-full" className="h-40" />
						</BoxContainer>
					);
				})}
			</main>
			<aside>
				<BoxContainer
					width="lg:w-[400px]"
					className="h-80 hidden lg:flex flex-col gap-2 animate-pulse"
				>
					<BoxContainer width="max-w-full" className="h-8" />
					<BoxContainer width="max-w-full" className="h-20" />
					<BoxContainer width="max-w-full" />
					<BoxContainer width="max-w-full" />
				</BoxContainer>
			</aside>
		</div>
	);
};

export default Loading;
