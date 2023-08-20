import { Link, useNavigate } from "react-router-dom";
import BoxContainer from "../common/BoxContainer";
import {
	AiOutlineProfile,
	AiOutlineLogout,
	AiOutlineHome,
} from "react-icons/ai";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useContext } from "react";
import { Context } from "../../router/RouteManager";

const HeaderDropdown = () => {
	const { login, mode } = useContext(Context);
	const { loginDetails } = login;
	const { darkMode, setDarkMode } = mode;
	const navigate = useNavigate();

	function logOut() {
		localStorage.removeItem("login");
		navigate("/");
		navigate(0);
	}

	return (
		<BoxContainer
			className="absolute flex flex-col bottom-[-150px] right-[-0.5rem] whitespace-nowrap gap-2 z-10 dark:bg-slate-900"
			width="w-[150px]"
		>
			<DropdownItem icon={<AiOutlineHome />} text="Home" link={`/`} />
			<DropdownItem
				icon={<AiOutlineProfile />}
				text="Profile"
				link={`/profile/${loginDetails.user.id}`}
			/>
			<DropdownItem
				icon={darkMode ? <MdDarkMode /> : <MdOutlineLightMode />}
				text={darkMode ? "Dark Mode" : "Light Mode"}
				handleClick={() => setDarkMode((prevMode) => !prevMode)}
			/>

			<DropdownItem
				icon={<AiOutlineLogout />}
				text="Logout"
				handleClick={() => logOut()}
			/>
		</BoxContainer>
	);
};

const DropdownItem = (props) => {
	const { text, icon, handleClick, link = "#" } = props;
	return (
		<Link
			to={link}
			className="flex items-center hover:text-blue-500 dark:hover:text-blue-500 dark:text-slate-200"
			onClick={handleClick}
		>
			<span className="text-xl">{icon}</span>
			<span>{text}</span>
		</Link>
	);
};

export default HeaderDropdown;
