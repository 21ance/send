import AvatarPhoto from "../common/AvatarPhoto";
import Modal from "./Modal";

const AvatarPickerModal = (props) => {
	const { setModal, handleClick, handleSave, handleCancel } = props;

	const avatarList = [
		"/svg/avatar/maleOne.svg",
		"/svg/avatar/maleTwo.svg",
		"/svg/avatar/maleThree.svg",
		"/svg/avatar/femaleOne.svg",
		"/svg/avatar/femaleTwo.svg",
		"/svg/avatar/femaleThree.svg",
	];

	return (
		<Modal
			width="fit-content"
			setModal={setModal}
			handleSave={handleSave}
			handleCancel={handleCancel}
		>
			<section className="flex gap-4 flex-wrap mb-4">
				{avatarList.map((avatar, index) => {
					return (
						<button onClick={() => handleClick(avatar)} key={index}>
							<AvatarPhoto src={avatar} className="w-28" />
						</button>
					);
				})}
			</section>
		</Modal>
	);
};

export default AvatarPickerModal;
