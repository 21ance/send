const AvatarPhoto = (props) => {
	const { src, className } = props;

	return (
		<img
			src={src}
			alt="profile photo"
			width="40px"
			className={className}
		/>
	);
};

export default AvatarPhoto;
