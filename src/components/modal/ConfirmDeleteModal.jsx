const ConfirmDeleteModal = (props) => {
	const { post } = props;

	return (
		<div>
			<p>This post will be deleted permanently:</p>
			<span className="font-bold text-lg pb-4 pt-2 block">{post}</span>
		</div>
	);
};

export default ConfirmDeleteModal;
