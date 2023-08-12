import { Link } from "react-router-dom";
import BoxContainer from "../common/BoxContainer";
import {
	AiOutlineProfile,
	AiOutlineLogout,
	AiOutlineHome,
} from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import { reloadPage } from "../../helper/functions";

const HeaderDropdown = (props) => {
	const { loginDetails } = props;

	function logOut() {
		localStorage.removeItem("login");
		reloadPage();
	}

	return (
		<BoxContainer
			className="absolute flex flex-col bottom-[-150px] right-[-0.5rem] whitespace-nowrap gap-2"
			width="w-[150px]"
		>
			<DropdownItem icon={<AiOutlineHome />} text="Home" link={`/`} />
			<DropdownItem
				icon={<AiOutlineProfile />}
				text="Profile"
				link={`/profile/${loginDetails.user.id}`}
			/>
			<DropdownItem icon={<MdDarkMode />} text="Dark Mode" />
			<DropdownItem
				icon={<AiOutlineLogout />}
				text="Logout"
				handleClick={() => logOut()}
			/>
		</BoxContainer>
	);
};

const DropdownItem = (props) => {
	const { text, icon, handleClick, link = "/" } = props;
	return (
		<Link
			to={link}
			className="flex items-center hover:text-blue-500"
			onClick={handleClick}
		>
			<span className="text-xl">{icon}</span>
			<span>{text}</span>
		</Link>
	);
};

export default HeaderDropdown;
