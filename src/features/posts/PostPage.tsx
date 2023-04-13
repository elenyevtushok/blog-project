import { useQuery } from '@tanstack/react-query';
import { getOnePostApi } from '../../api/posts-api';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Post } from './dto/Post';

export const PostPage = () => {
	const { id } = useParams();
	console.log('id', id);

	const [currentPost, setCurrentPost] = useState<Post | null>(null);
	const { data: post, isSuccess } = useQuery(['one-post', id], () => getOnePostApi(parseInt(id!)), {
		onSuccess: ((post) => {
			setCurrentPost(post);
			console.log(post)
		})
	});

	return (
		<div className="post-in">
			<h4 data-testid={`post-title-${post?.id}`}>{post?.title}</h4>
			<div className="content-seperator"></div>
			<p className='post-author' data-testid={`post-author-${post?.id}`}>Written by: {post?.userId}</p>
			<p>{currentPost?.body}</p>
		</div>
	)
}
