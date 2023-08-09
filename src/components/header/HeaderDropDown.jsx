import { Link } from "react-router-dom";
import BoxContainer from "../common/BoxContainer";
import { AiOutlineProfile, AiOutlineLogout } from "react-icons/ai";
import { MdDarkMode } from "react-icons/md";
import { reloadPage } from "../../helper/functions";

const HeaderDropdown = () => {
	function logOut() {
		localStorage.removeItem("login");
		reloadPage();
	}

	return (
		<BoxContainer
			className="absolute flex flex-col bottom-[-115px] right-[-0.5rem] whitespace-nowrap gap-2"
			width="fit-content"
		>
			<DropdownItem icon={<AiOutlineProfile />} text="Profile" />
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
	const { text, icon, handleClick } = props;
	return (
		<Link
			to={"/"}
			className="flex items-center hover:text-blue-500"
			onClick={handleClick}
		>
			<span className="text-xl">{icon}</span>
			<span>{text}</span>
		</Link>
	);
};

export default HeaderDropdown;
