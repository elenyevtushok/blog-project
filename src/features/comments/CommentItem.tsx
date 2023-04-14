import { useAppDispatch } from '../../app/hooks';
import { Comment } from './dto/comment';


export const CommentItem = ({ comment }: { comment: Comment }) => {
	// const [openEditModal, setOpenEditModal] = useState(false)
	// const hideEditModal = () => {
	// 	setOpenEditModal(false)
	// }

	const dispatch = useAppDispatch();

	// useQuery({
	// 	queryKey: ['comments', post.id],
	// 	queryFn: () => getCommentsApi(post.id),
	// 	onSuccess: ((comments) => {
	// 		dispatch(upsertComments(comments))
	// 	})
	// })


	// const comments = useAppSelector(selectComments);
	// const postComments = useMemo(
	// 	() => comments.filter((comment) => comment.postId === post.id),
	// 	[comments, post.id]
	// );

	return (
		<div className="comment-in">
			<h4 data-testid={`comment-author-${comment.id}`}>{comment.email}</h4>
			<div className="content-seperator"></div>
			<p className='comment-author' data-testid={`comment-name-${comment.id}`}>{comment.name}</p>
			<p>{comment.body}</p>
			{/* <div>
				<button onClick={() => dispatch(deletePost(post))} className="delete-post-button" data-testid={`post-delete-button-${post.id}`}>
					<DeleteOutlined />
				</button>
				<button onClick={() => setOpenEditModal(true)} className="edit-post-button" data-testid={`post-edit-button-${post.id}`}>
					<FormOutlined />
				</button>
				<PostEditModal
					open={openEditModal}
					closeModal={hideEditModal}
					post={post}
				/>
			</div> */}
		</div>
	)
}