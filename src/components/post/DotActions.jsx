import { BsThreeDotsVertical } from "react-icons/bs";
import DotDropdown from "./DotDropdown";
import { useEffect } from "react";

const DotActions = (props) => {
	const {
		dotDropdown,
		setDotDropdown,
		post,
		from,
		className,
		postContent,
		setPostContent,
	} = props;

	useEffect(() => {
		function closeDropdown(e) {
			if (e.target.classList.contains("dropdown")) return;
			setDotDropdown(false);
		}
		document.addEventListener("click", (e) => closeDropdown(e));
		return () =>
			document.removeEventListener("click", () => closeDropdown());
	}, []);

	useEffect(() => {
		function handleEsc(e) {
			if (e.keyCode === 27) {
				setDotDropdown(false);
			}
		}
		document.addEventListener("keydown", handleEsc);
		return () => {
			document.removeEventListener("keydown", handleEsc);
		};
	}, []);

	return (
		<div
			className={`${className} absolute`}
			onClick={(e) => e.preventDefault()}
		>
			<span
				className="hover:text-blue-500 cursor-pointer"
				onClick={() => setDotDropdown((prev) => !prev)}
			>
				<BsThreeDotsVertical className="dropdown" />
			</span>
			{dotDropdown && (
				<DotDropdown
					post={post}
					from={from}
					setPostContent={setPostContent}
					postContent={postContent}
				/>
			)}
		</div>
	);
};

export default DotActions;
