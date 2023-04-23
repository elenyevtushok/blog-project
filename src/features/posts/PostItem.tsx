import { CommentOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Post } from './dto/Post'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deletePost } from './postsSlice';
import { selectUserById } from '../users/usersSlice';
import { useState } from 'react';
import { PostEditModal } from './PostEditModal';
import { Link } from 'react-router-dom';
import { deleteOnePost } from '../../api/posts-api';
import { useQuery } from '@tanstack/react-query';


export const PostItem = ({ post }: { post: Post }) => {
	const [openEditModal, setOpenEditModal] = useState(false)
	const hideEditModal = () => {
		setOpenEditModal(false)
	}

	const dispatch = useAppDispatch();
	const user = useAppSelector(state => selectUserById(state, post.userId));

	const { refetch: deletePostQuery } = useQuery(['deleted-post', post._id], () => deleteOnePost(post._id), {
		enabled: false,
		onSuccess: (() => {
			dispatch(deletePost(post))
		})
	})

	return (
		<div className="post-in">
			<h4 data-testid={`post-title-${post._id}`}>{post.title}</h4>
			<div className="content-seperator"></div>
			<p className='post-author' data-testid={`post-author-${post._id}`}>Author: {user?.name}</p>
			<p>{post.body}</p>
			<div>
				<button onClick={() => deletePostQuery()} className="delete-post-button" data-testid={`post-delete-button-${post._id}`}>
					<DeleteOutlined />
				</button>

				<Link to={`posts/${post._id}`}><button className="edit-post-button"><CommentOutlined /></button>
				</Link>

				<button onClick={() => setOpenEditModal(true)} className="edit-post-button" data-testid={`post-edit-button-${post._id}`}>
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