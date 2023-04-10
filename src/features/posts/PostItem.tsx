import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Post } from './dto/Post'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deletePost } from './postsSlice';
import { selectUserById } from '../users/usersSlice';
import { useState } from 'react';
import { PostEditModal } from './PostEditModal';

export const PostItem = ({ post: post }: { post: Post }) => {
	const [openEditModal, setOpenEditModal] = useState(false)
	const hideEditModal = () => {
		setOpenEditModal(false)
	}

	const dispatch = useAppDispatch();
	const user = useAppSelector(state => selectUserById(state, post.userId));

	return (
		<div className="post-in">
			<h4 data-testid={`post-title-${post.id}`}>{post.title}</h4>
			<div className="content-seperator"></div>
			<p className='post-author' data-testid={`post-author-${post.id}`}>Written by: {user?.name}</p>
			<p>{post.body}</p>
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
