import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { Comment } from './dto/comment';

const commentsAdapter = createEntityAdapter<Comment>({
	selectId: comment => comment.id,
})

export const commentsSlice = createSlice({
	name: 'comments',
	initialState: commentsAdapter.getInitialState,
	reducers: {
		deleteComment(state, action: PayloadAction<Comment>) {
			commentsAdapter.removeOne(state, action.payload.id);
		},
		upsertComments: commentsAdapter.upsertMany,
	},
})

export const {
	selectById: selectCommentsById,
	selectAll: selectComments
} = commentsAdapter.getSelectors((state: RootState) => state.comments);

export const { upsertComments, deleteComment } = commentsSlice.actions
export default commentsSlice.reducer