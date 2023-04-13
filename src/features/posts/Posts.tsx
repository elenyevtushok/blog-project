import { Row, Col } from 'antd';
import { PostItem } from './PostItem';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loadMorePosts, selectPosts } from './postsSlice';
import { store } from '../../app/store';
import { loadUsers } from '../users/usersSlice';
import { useEffect, useMemo, useState } from 'react';

const FIRST_PAGE = 1;

store.dispatch(loadMorePosts(FIRST_PAGE))
store.dispatch(loadUsers())



export const Posts = () => {
	const [page, setPage] = useState(FIRST_PAGE);
	const posts = useAppSelector(selectPosts);
	const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	store.dispatch(loadMorePosts(FIRST_PAGE));
	// 	store.dispatch(loadUsers());
	// }, []);

	const handleLoadMore = () => {
		setPage(prevPage => prevPage + 1)
		dispatch(loadMorePosts(page+1))
	}

	// const memoizedPosts = useMemo(() => posts, [posts]);

	return (
		<div className='all-posts'>
			{
				(posts.length > 0) &&
				(
					<>
						<Row>{posts?.map(post => {
							return (
								<Col key={post.id} xs={{ span: 16 }} sm={{ span: 18 }} md={{ span: 18 }} lg={{ span: 20 }} xl={{ span: 22 }} className='post'>
									<PostItem key={post.id} post={post} />
								</Col>
							)
						})}
						</Row>
						<button className="load-more-button" data-testid="load-more-button" onClick={()=>handleLoadMore()}>Load more posts</button>
					</>
				)
			}
		</div>
	)
}
