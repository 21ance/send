import { Link } from "react-router-dom";
import { reloadPage } from "../../helper/functions";
import AvatarPhoto from "../common/AvatarPhoto";

const Header = (props) => {
	const { loginDetails } = props;

	function logOut() {
		localStorage.removeItem("login");
		reloadPage();
	}

	console.log(loginDetails);

	return (
		<header className="flex justify-between items-center px-4 py-2 bg-white w-full ">
			<h1>Logo/text</h1>
			<div className="flex items-center">
				{loginDetails ? (
					<>
						<AvatarPhoto src={loginDetails.user.avatarUrl} />
						<span>{loginDetails.user.username}</span>
						<Link
							to={"/"}
							className="text-[#787C7E]"
							onClick={() => logOut()}
						>
							Logout
						</Link>
					</>
				) : (
					<Link to={"/login"} className="text-[#787C7E]">
						Login
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
