import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
	const { className } = props;
	const navigate = useNavigate();

	return (
		<button
			className={`${className} flex items-center gap-1 hover:text-blue-500 mb-2`}
			onClick={() => navigate(-1)}
		>
			<span className="text-xl">
				<BiArrowBack />
			</span>
			Back
		</button>
	);
};

export default BackButton;
