import { BsThreeDotsVertical } from "react-icons/bs";
import DotDropdown from "./DotDropdown";

const DotActions = (props) => {
	const { dotDropdown, setDotDropdown, post, from } = props;

	return (
		<div className="absolute right-[-10px] ml-4">
			<span
				className="hover:text-blue-500 cursor-pointer"
				onClick={() => setDotDropdown((prev) => !prev)}
			>
				<BsThreeDotsVertical className="dropdown" />
			</span>
			{dotDropdown && <DotDropdown post={post} from={from} />}
		</div>
	);
};

export default DotActions;
