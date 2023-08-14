import { Link } from "react-router-dom";
import AvatarPhoto from "../common/AvatarPhoto";
import { BiChevronDown } from "react-icons/bi";
import HeaderDropdown from "./HeaderDropDown";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../router/RouteManager";

const Header = () => {
	const { login } = useContext(Context);
	const { loginDetails } = login;

	const [dropdown, setDropdown] = useState(false);

	useEffect(() => {
		function closeDropdown(e) {
			if (e.target.classList.contains("dropdown")) return;
			setDropdown(false);
		}

		document.addEventListener("click", (e) => closeDropdown(e));
		return () =>
			document.removeEventListener("click", () => closeDropdown());
	}, []);

	useEffect(() => {
		function handleEsc(e) {
			if (e.keyCode === 27) {
				setDropdown(false);
			}
		}

		document.addEventListener("keydown", handleEsc);
		return () => {
			document.removeEventListener("keydown", handleEsc);
		};
	}, []);

	return (
		<header className="flex justify-between items-center px-4 py-2 bg-white w-full ">
			<Link to={"/"}>
				<img src="/png/icon.png" alt="send logo" />
			</Link>
			<div>
				{loginDetails ? (
					<div
						className="flex items-center cursor-pointer relative dropdown"
						onClick={() => setDropdown((prev) => !prev)}
					>
						<AvatarPhoto
							src={loginDetails.user.avatarUrl}
							className="w-[32px] mr-1 dropdown"
						/>
						<small className="hover:text-blue-500 flex items-center dropdown">
							{loginDetails.user.username}
							<BiChevronDown />
						</small>
						{dropdown && <HeaderDropdown loginDetails={loginDetails} />}
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
