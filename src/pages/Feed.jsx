import { useContext, useEffect, useState } from "react";
import PostBox from "../components/post/PostBox";
import { Context } from "../router/RouteManager";
import PostDetails from "../components/post/PostDetails";

const Feed = (props) => {
	const { postFooter, feed } = useContext(Context);
	const { postFooterData } = postFooter;
	const { feedData } = feed;
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
			<PostBox userPosting={userPosting} setUserPosting={setUserPosting} />
			{feedData.map((post, index) => {
				let footerData;
				postFooterData.map((footData) => {
					if (footData.postID === post.id) {
						return (footerData = {
							postID: footData.postID,
							reactions: footData.reactions,
							commentsLength: footData.commentsLength,
						});
					}
				});
				return (
					<PostDetails key={post.id} post={post} footerData={footerData} />
				);
			})}
		</main>
	);
};

export default Feed;
