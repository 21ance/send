import { useParams } from "react-router-dom";
import BoxContainer from "../components/common/BoxContainer";
import useFetch from "../hooks/useFetch";
import { convertDateTime } from "../helper/functions";
import AvatarPhoto from "../components/common/AvatarPhoto";
import { useContext, useEffect } from "react";
import { Context } from "../router/RouteManager";
import PostDetails from "../components/post/PostDetails";
import BackButton from "../components/common/BackButton";

const Profile = () => {
	const { login, postFooter } = useContext(Context);
	// const { loginDetails } = login;
	const { postFooterData } = postFooter;

	const { userID } = useParams();
	const { loading, error, data } = useFetch(
		`http://localhost:1337/api/users/${userID}?populate=deep,4`
	);

	useEffect(() => {
		document.title = "Send | Profile";
	}, []);

	// to add loading component
	if (loading || !postFooterData) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<>
			<BoxContainer className="flex flex-col items-center">
				<BackButton className="self-start" />
				<AvatarPhoto src={data.avatarUrl} className="w-40" />
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
							/>
						);
					})
					.reverse()}
			</BoxContainer>
		</>
	);
};

export default Profile;
