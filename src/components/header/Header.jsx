import { Link } from "react-router-dom";
import { reloadPage } from "../../helper/functions";
import AvatarPhoto from "../common/AvatarPhoto";
import { BiChevronDown } from "react-icons/bi";

const Header = (props) => {
	const { loginDetails } = props;

	function logOut() {
		localStorage.removeItem("login");
		reloadPage();
	}

	return (
		<header className="flex justify-between px-4 py-2 bg-white w-full ">
			<Link to={"/"}>
				<img src="/public/png/icon.png" alt="send logo" />
			</Link>

			<div>
				{loginDetails ? (
					<Link
						to={"/"}
						onClick={() => logOut()}
						className="flex items-center"
					>
						<AvatarPhoto
							src={loginDetails.user.avatarUrl}
							className="w-[32px] mr-1"
						/>
						<small>{loginDetails.user.username}</small>
						<BiChevronDown />
					</Link>
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
