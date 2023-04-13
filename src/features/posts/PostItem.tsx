import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Post } from './dto/Post'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deletePost } from './postsSlice';
import { selectUserById } from '../users/usersSlice';
import { useEffect, useMemo, useState } from 'react';
import { PostEditModal } from './PostEditModal';
import { loadComments, selectComments, selectCommentsById } from '../comments/commentsSlice';
import { store } from '../../app/store';
import { getCommentsApi } from 'api/comments-api';
import { useQuery } from 'react-query';

export const PostItem = ({ post}: { post: Post }) => {
	const [openEditModal, setOpenEditModal] = useState(false)
	const hideEditModal = () => {
		setOpenEditModal(false)
	}


	const dispatch = useAppDispatch();
	const user = useAppSelector(state => selectUserById(state, post.userId));


	const comments = useAppSelector(selectComments);
	const postComments = useMemo(
		() => comments.filter((comment) => comment.postId === post.id),
		[comments, post.id]
	);
		// .filter(comment => comment.postId === post.id);

	useEffect(() => {
		dispatch(loadComments(post.id));
	}, [dispatch, post.id]);

	return (
		<div className="post-in">
			<h4 data-testid={`post-title-${post.id}`}>{post.title}</h4>
			<div className="content-seperator"></div>
			<p className='post-author' data-testid={`post-author-${post.id}`}>Written by: {user?.name}</p>
			<p>{post.body}</p>
			<ul>{postComments?.map(comment => <li key={comment.id}>{comment.body}</li>)}</ul>
			<div>
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
			</div>
		</div>
	)
}
