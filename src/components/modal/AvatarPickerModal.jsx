import AvatarPhoto from "../common/AvatarPhoto";
import Modal from "./Modal";

const AvatarPickerModal = (props) => {
	const { setModal, setPhoto } = props;

	return (
		<Modal
			width="fit-content"
			setModal={setModal}
			handleSave={() => setModal(false)}
		>
			<section className="flex gap-4 flex-wrap mb-4">
				<ProfileOption
					src="/public/svg/avatar/maleOne.svg"
					setPhoto={setPhoto}
				/>
				<ProfileOption
					src="/public/svg/avatar/maleTwo.svg"
					setPhoto={setPhoto}
				/>
				<ProfileOption
					src="/public/svg/avatar/maleThree.svg"
					setPhoto={setPhoto}
				/>
				<ProfileOption
					src="/public/svg/avatar/femaleOne.svg"
					setPhoto={setPhoto}
				/>
				<ProfileOption
					src="/public/svg/avatar/femaleTwo.svg"
					setPhoto={setPhoto}
				/>
				<ProfileOption
					src="/public/svg/avatar/femaleThree.svg"
					setPhoto={setPhoto}
				/>
			</section>
		</Modal>
	);
};

const ProfileOption = (props) => {
	const { src, setPhoto } = props;

	return (
		<button
			onClick={() => {
				setPhoto((prev) => ({ ...prev, avatar: src }));
			}}
		>
			<AvatarPhoto src={src} className="w-28" />
		</button>
	);
};

export default AvatarPickerModal;
