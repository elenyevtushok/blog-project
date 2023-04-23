import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/hooks';
import { deleteComment } from './commentsSlice';
import { CommentDto } from '../comments/dto/Comment';
import { useQuery } from '@tanstack/react-query';
import { deleteOneComment } from '../../api/comments-api';


export const CommentItem = ({ comment }: { comment: CommentDto }) => {

	const dispatch = useAppDispatch();
	const { refetch: deleteCommentQuery } = useQuery(['deleted-comment', comment._id], () => deleteOneComment(comment._id), {
		enabled: false,
		onSuccess: (() => {
			dispatch(deleteComment(comment))
		})
	})

	return (
		<div className="comment-in">
			<h4 data-testid={`comment-author-${comment._id}`}>{comment.email}</h4>
			<div className="content-seperator"></div>
			<p className='comment-author' data-testid={`comment-name-${comment._id}`}>{comment.name}</p>
			<p>{comment.body}</p>
			<div>
				<button onClick={() => deleteCommentQuery()} className="delete-post-button" data-testid={`comment-delete-button-${comment._id}`}>
					<DeleteOutlined />
				</button>
			</div>
		</div>
	)
}