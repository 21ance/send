import { Link } from "react-router-dom";

const Error404 = () => {
	return (
		<main className="flex flex-col justify-center h-[calc(100vh-50px)] gap-4 dark:text-slate-200">
			<h1 className="text-4xl">404: Page does not exist</h1>
			<Link to={"/"} className="hover:text-blue-500">
				Redirect to homepage
			</Link>
		</main>
	);
};

export default Error404;
