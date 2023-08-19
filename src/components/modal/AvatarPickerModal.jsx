import AvatarPhoto from "../common/AvatarPhoto";

const AvatarPickerModal = (props) => {
	const { handleClick } = props;

	const avatarList = [
		"./svg/avatar/maleOne.svg",
		"./svg/avatar/maleTwo.svg",
		"./svg/avatar/maleThree.svg",
		"./svg/avatar/femaleOne.svg",
		"./svg/avatar/femaleTwo.svg",
		"./svg/avatar/femaleThree.svg",
	];

	return (
		<section className="flex gap-4 flex-wrap mb-4 justify-center">
			{avatarList.map((avatar, index) => {
				return (
					<button onClick={() => handleClick(avatar)} key={index}>
						<AvatarPhoto src={avatar} className="w-20 md:w-28" />
					</button>
				);
			})}
		</section>
	);
};

export default AvatarPickerModal;
