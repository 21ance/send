import { useParams } from "react-router-dom";
import BoxContainer from "../components/common/BoxContainer";
import useFetch from "../hooks/useFetch";
import { convertDateTime } from "../helper/functions";
import AvatarPhoto from "../components/common/AvatarPhoto";

const Profile = () => {
	const { userID } = useParams();
	const { loading, error, data } = useFetch(
		`http://localhost:1337/api/users/${userID}?populate=deep,3`
	);

	console.log(data);

	// to add loading component
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<BoxContainer className="flex flex-col items-center">
			<AvatarPhoto src={data.avatarUrl} className="w-40" />
			<h1 className="mt-2">@{data.username}</h1>
			<small>{convertDateTime(data.createdAt)}</small>
		</BoxContainer>
	);
};

export default Profile;
