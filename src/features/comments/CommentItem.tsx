import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { deleteComment } from './commentsSlice';
import { Comment } from './dto/comment';


export const CommentItem = ({ comment }: { comment: Comment }) => {

	const dispatch = useAppDispatch();

	return (
		<div className="comment-in">
			<h4 data-testid={`comment-author-${comment.id}`}>{comment.email}</h4>
			<div className="content-seperator"></div>
			<p className='comment-author' data-testid={`comment-name-${comment.id}`}>{comment.name}</p>
			<p>{comment.body}</p>
			<div>
				<button onClick={() => dispatch(deleteComment(comment))} className="delete-post-button" data-testid={`comment-delete-button-${comment.id}`}>
					<DeleteOutlined />
				</button>
			</div>
		</div>
	)
}