const AvatarPhoto = (props) => {
	const { src = "/svg/avatar/maleOne.svg", className } = props;

	return (
		<img
			src={src}
			alt="profile photo"
			width="40px"
			height="40px"
			className={className}
		/>
	);
};

export default AvatarPhoto;
