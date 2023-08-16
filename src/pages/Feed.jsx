import { useContext, useEffect, useState } from "react";
import PostBox from "../components/post/PostBox";
import { Context } from "../router/RouteManager";
import PostDetails from "../components/post/PostDetails";

const Feed = (props) => {
	const { postFooter, feed } = useContext(Context);
	const { postFooterData } = postFooter;
	const { feedData, setFeedData } = feed;
	const { error, loading } = props;
	const [userPosting, setUserPosting] = useState(false);

	useEffect(() => {
		document.title = "Send | Feed";
	}, []);

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
			{feedData.map((post, index) => {
				return (
					<PostDetails
						key={post.id}
						post={post}
						footerData={{
							// postID: post.id,
							// reactions: post.attributes.reactions.data,
							// commentsLength: post.attributes.comments.data.length,
							// to check
							postID: postFooterData[index].postID,
							reactions: postFooterData[index].reactions,
							commentsLength: postFooterData[index].commentsLength,
						}}
					/>
				);
			})}
		</main>
	);
};

export default Feed;
