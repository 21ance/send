import { useContext, useEffect, useState } from "react";
import { Context } from "../../router/RouteManager";
import ResponsiveTextArea from "../common/ResponsiveTextArea";

const EditPostModal = () => {
	const { modal } = useContext(Context);
	const { modalConfig, setModalConfig } = modal;

	return (
		<div>
			<span>Title:</span>
			<input
				type="text"
				placeholder="Title"
				className="rounded px-4 py-2 w-full border-[1px] focus:outline-none focus:ring-0 focus:border-blue-500 bg-[#F6F7F8]"
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
			<ResponsiveTextArea
				placeholder={"Text (optional)?"}
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
			/>
		</div>
	);
};

export default EditPostModal;
