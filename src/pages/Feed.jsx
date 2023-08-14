import { useContext, useState } from "react";
import PostBox from "../components/post/PostBox";
import { Context } from "../router/RouteManager";
import PostDetails from "../components/post/PostDetails";

const Feed = (props) => {
	const { postFooter } = useContext(Context);
	const { postFooterData } = postFooter;
	const { feedData, setFeedData, error, loading } = props;
	const [userPosting, setUserPosting] = useState(false);

	// to add loading component
	if (loading || !postFooterData) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	return (
		<main>
			<PostBox
				userPosting={userPosting}
				setUserPosting={setUserPosting}
				setFeedData={setFeedData}
				feedData={feedData}
			/>
			{feedData
				.map((post, index) => {
					return (
						<PostDetails
							key={post.id}
							post={post}
							footerData={{
								postID: postFooterData[index].postID,
								reactions: postFooterData[index].reactions,
								commentsLength: postFooterData[index].commentsLength,
							}}
						/>
					);
				})
				.reverse()}
		</main>
	);
};

export default Feed;
