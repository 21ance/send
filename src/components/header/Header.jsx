import { Link } from "react-router-dom";
import AvatarPhoto from "../common/AvatarPhoto";
import { BiChevronDown } from "react-icons/bi";
import HeaderDropdown from "./HeaderDropDown";
import { useState } from "react";

const Header = (props) => {
	const { loginDetails } = props;
	const [dropdown, setDropdown] = useState(false);

	return (
		<header className="flex justify-between px-4 py-2 bg-white w-full ">
			<Link to={"/"}>
				<img src="/public/png/icon.png" alt="send logo" />
			</Link>

			<div>
				{loginDetails ? (
					<div
						className="flex items-center cursor-pointer relative "
						onClick={() => setDropdown((prev) => !prev)}
					>
						<AvatarPhoto
							src={loginDetails.user.avatarUrl}
							className="w-[32px] mr-1"
						/>
						<small className="hover:text-blue-500 flex items-center">
							{loginDetails.user.username}
							<BiChevronDown />
						</small>
						{dropdown && <HeaderDropdown />}
					</div>
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
