import { useEffect } from "react";
import BoxContainer from "../common/BoxContainer";

const Modal = (props) => {
	const {
		children,
		width,
		handleSave,
		handleCancel,
		className,
		submitText = "Save",
		submitColor = "bg-blue-500 hover:bg-blue-500/80",
		cancelText = "Cancel",
	} = props;

	useEffect(() => {
		function handleEsc(e) {
			if (e.keyCode === 27) {
				handleCancel();
			}
		}
		document.addEventListener("keydown", handleEsc);
		return () => {
			document.removeEventListener("keydown", handleEsc);
		};
	}, []);

	return (
		<section
			className="fixed w-full h-full flex justify-center items-center bg-gray-500/50 font-urbanist z-20"
			onClick={() => handleCancel()}
		>
			<BoxContainer
				width={width}
				handleClick={(e) => e.stopPropagation()}
				className={className}
			>
				{children}
				<footer className="flex gap-2 text-white">
					<ModalButton
						text={cancelText}
						handleClick={() => handleCancel()}
						className="bg-[#787C7E] hover:bg-[#787C7E]/80"
					/>
					<ModalButton
						type="submit"
						text={submitText}
						handleClick={() => handleSave()}
						className={submitColor}
					/>
				</footer>
			</BoxContainer>
		</section>
	);
};

const ModalButton = (props) => {
	const { className, handleClick, text } = props;

	return (
		<button
			className={`${className} px-4 py-2 rounded`}
			onClick={handleClick}
			type="button"
		>
			{text}
		</button>
	);
};

export default Modal;
