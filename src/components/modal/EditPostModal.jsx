import { useContext, useEffect, useState } from "react";
import { Context } from "../../router/RouteManager";

const EditPostModal = (props) => {
	const { modal } = useContext(Context);
	const { modalConfig, setModalConfig } = modal;
	return (
		<div>
			<span>Title:</span>
			<input
				type="text"
				placeholder="Title"
				className="bg-[#F6F7F8] rounded px-4 py-2 w-full border-[1px] focus:outline-none focus:ring-0 focus:border-blue-500"
				value={modalConfig.form.title}
				autoFocus={true}
				onChange={(e) => {
					setModalConfig((prev) => {
						const newState = {
							...prev,
							form: {
								...prev.form,
								title: e.target.value,
							},
						};
						return newState;
					});
				}}
			/>
			<span>Content:</span>
			<textarea
				rows="4"
				className="bg-[#F6F7F8] rounded px-4 py-2 w-full resize-none border-[1px] focus:outline-none focus:ring-0 focus:border-blue-500"
				placeholder="Text (optional)"
				value={modalConfig.form.content}
				onChange={(e) => {
					setModalConfig((prev) => ({
						...prev,
						form: {
							...prev.form,
							content: e.target.value,
						},
					}));
				}}
			></textarea>
		</div>
	);
};

export default EditPostModal;
