import { useParams } from "react-router-dom";
import BoxContainer from "../components/common/BoxContainer";
import useFetch from "../hooks/useFetch";
import { convertDateTime, fetchRequest } from "../helper/functions";
import AvatarPhoto from "../components/common/AvatarPhoto";
import { useContext, useEffect, useState } from "react";
import { Context } from "../router/RouteManager";
import PostDetails from "../components/post/PostDetails";
import BackButton from "../components/common/BackButton";
import AvatarPickerModal from "../components/modal/AvatarPickerModal";

const Profile = () => {
	const { login, postFooter } = useContext(Context);
	const { loginDetails, setLoginDetails } = login;
	const { postFooterData } = postFooter;
	const { userID } = useParams();
	const [modal, setModal] = useState(false);
	const [profile, setProfile] = useState({
		avatar: "",
		previewAvatar: "",
	});

	const { loading, error, data } = useFetch(
		`http://localhost:1337/api/users/${userID}?populate=deep,4`
	);

	useEffect(() => {
		document.title = "Send | Profile";
	}, []);

	useEffect(() => {
		if (!data) return;
		setProfile({ avatar: data.avatarUrl, previewAvatar: "" });
	}, [data]);

	function previewProfile(src) {
		setProfile((prev) => ({
			...prev,
			previewAvatar: src,
		}));
	}

	function cancelUpdateProfile() {
		setProfile((prev) => ({
			...prev,
			previewAvatar: "",
		}));
		setModal(false);
	}

	function updateProfile() {
		const body = {
			avatarUrl: profile.previewAvatar,
		};

		const token = `Bearer ${loginDetails.jwt}`;
		fetchRequest(
			`http://localhost:1337/api/users/${loginDetails.user.id}`,
			"PUT",
			body,
			token
		);

		setProfile((prev) => ({ ...prev, avatar: profile.previewAvatar }));
		setLoginDetails((prev) => {
			const newState = {
				...prev,
				user: { ...prev.user, avatarUrl: profile.previewAvatar },
			};
			localStorage.setItem("login", JSON.stringify(newState));
			return newState;
		});
		cancelUpdateProfile();
	}

	// to add loading component
	if (loading || !postFooterData) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<>
			<BoxContainer className="flex flex-col items-center relative">
				{loginDetails && loginDetails.user.id === data.id && (
					<button
						className="absolute right-0 top-0 px-4 py-2 hover:text-blue-500"
						onClick={() => setModal(true)}
					>
						Update
					</button>
				)}
				<BackButton className="self-start" />
				<AvatarPhoto
					src={
						profile.previewAvatar ? profile.previewAvatar : profile.avatar
					}
					className="w-40"
				/>
				<h1 className="mt-2">@{data.username}</h1>
				<small>{convertDateTime(data.createdAt)}</small>
			</BoxContainer>
			<BoxContainer>
				<h2>{data.posts.length === 0 ? "No posts yet" : "Posts"}</h2>
				{data.posts
					.map((post) => {
						return (
							<PostDetails
								key={post.id}
								post={post}
								footerData={{
									postID: post.id,
									reactions: post.reactions,
									commentsLength: post.comments.length,
								}}
								width="w-max-full"
								from="profile"
								profileAvatar={profile.avatar}
							/>
						);
					})
					.reverse()}
			</BoxContainer>
			{modal && (
				<AvatarPickerModal
					setModal={setModal}
					handleClick={previewProfile}
					handleCancel={cancelUpdateProfile}
					handleSave={updateProfile}
				/>
			)}
		</>
	);
};

export default Profile;
