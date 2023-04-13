import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { Comment, CommentRequest } from './dto/comment';
import { getCommentsApi } from '../../api/comments-api';

const commentsAdapter = createEntityAdapter<Comment>({
	selectId: comment => comment.id,
})

export const loadComments = createAsyncThunk.withTypes<{ state: RootState }>()(
	'comments/loadComments',
	async (postId: number) => {
		const request: CommentRequest = {
			postId: postId,
		}
		return await getCommentsApi(request);
	}
);

export const commentsSlice = createSlice({
	name: 'comments',
	initialState: commentsAdapter.getInitialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadComments.fulfilled, (state, action) => {
				commentsAdapter.upsertMany(state, action.payload)
			})
	},
})

export const {
	selectById: selectCommentsById,
	selectAll: selectComments
} = commentsAdapter.getSelectors((state: RootState) => state.comments);

// export const selectCommentsIds = createSelector(
// 	selectComments,
// 	(comments:Comment[]) => comments.filter((comment) => comment.)
// )

export default commentsSlice.reducer