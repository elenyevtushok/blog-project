import { useQuery } from '@tanstack/react-query';
import { getOnePostApi } from '../../api/posts-api';
import React, { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Post } from './dto/Post';
import { getCommentsApi } from '../../api/comments-api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { upsertComments, selectComments } from '../../features/comments/commentsSlice';
import { Row, Col } from 'antd';
import { CommentItem } from '../../features/comments/CommentItem';
import { selectUserById } from '../../features/users/usersSlice';
import { ArrowLeftOutlined } from '@ant-design/icons';


export const PostPage = () => {

	const { id } = useParams();

	const [currentPost, setCurrentPost] = useState<Post | null>(null);
	const { data: post } = useQuery(['one-post', id], () => getOnePostApi(parseInt(id!)), {
		onSuccess: ((post) => {
			setCurrentPost(post);
			console.log(post)
		})
	});

	const dispatch = useAppDispatch();
	const user = useAppSelector(state => selectUserById(state, post?.userId || 0));



	useQuery({
		queryKey: ['comments', id],
		queryFn: () => getCommentsApi(parseInt(id!)),
		onSuccess: ((comments) => {
			dispatch(upsertComments(comments))
		})
	})


	const comments = useAppSelector(selectComments);
	const postComments = useMemo(
		() => comments.filter((comment) => comment.postId === parseInt(id!)),
		[comments, id]
	);

	return (
		<>
			<header className='header-post-details'>
				<Link className='header-post-details-link' to={'/'}><ArrowLeftOutlined /> All posts</Link>
			</header>
			<main>
				<div className='content-title'>
					<div className="content-seperator"></div>
					<h1>Post Details</h1>
					<div className="content-seperator"></div>
				</div>
				<div className="post">
					<div className="post-in">
						<h4 data-testid={`post-title-${post?.id}`}>{post?.title}</h4>
						<div className="content-seperator"></div>
						<p className='post-author' data-testid={`post-author-${post?.id}`}>Written by: {user?.name}</p>
						<p>{currentPost?.body}</p>
					</div>
					<div className='content-title'>
						<div className="content-seperator"></div>
						<h1>Comments</h1>
						<div className="content-seperator"></div>
					</div>
					<div className='all-comments'>
						<Row>{postComments?.map(comment => {
							return (
								<Col key={comment.id} xs={{ span: 16 }} sm={{ span: 18 }} md={{ span: 18 }} lg={{ span: 20 }} xl={{ span: 22 }} className='comment'>
									<CommentItem key={comment.id} comment={comment} />
								</Col>
							)
						})}
						</Row>
					</div>
				</div>
			</main>
		</>
	)
}


