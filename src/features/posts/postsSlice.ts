import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { PageRequest, Post } from './dto/Post';
import { RootState } from '../../app/store';
import { getPostsApi } from '../../api/posts-api';


const postsAdapter = createEntityAdapter<Post>({
	selectId: post => post._id,
})

const DEFAULT_PAGE_SIZE = 10;

export const loadMorePosts = createAsyncThunk.withTypes<{ state: RootState }>()(
	'posts/loadPage',
	async (page: number) => {
		const request: PageRequest = {
			page: page,
			size: DEFAULT_PAGE_SIZE
		}
		return await getPostsApi(request);
	}
);

export const postsSlice = createSlice({
	name: 'posts',
	initialState: postsAdapter.getInitialState,
	reducers: {
		deletePost(state, action: PayloadAction<Post>) {
			postsAdapter.removeOne(state, action.payload._id);
		},
		updatePost: postsAdapter.updateOne
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadMorePosts.fulfilled, (state, action) => {
				postsAdapter.addMany(state, action.payload)
			})
	},
})

export const {
	selectById: selectPostById,
	selectAll: selectPosts
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const { deletePost, updatePost } = postsSlice.actions
export default postsSlice.reducer