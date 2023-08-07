import { Link } from "react-router-dom";
import { reloadPage } from "../../helper/functions";

const Header = (props) => {
	const { loginDetails, setLoginDetails } = props;

	function logOut() {
		localStorage.removeItem("login");
		reloadPage();
	}

	return (
		<header className="flex justify-between items-center px-4 py-2 bg-white w-full ">
			<h1>Logo/text</h1>
			<div className="flex items-center">
				{loginDetails ? (
					<>
						<img
							src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"
							alt="profile"
							width="40px"
						/>
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
