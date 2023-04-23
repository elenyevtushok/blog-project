import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { CommentDto } from '../comments/dto/Comment';

const commentsAdapter = createEntityAdapter<CommentDto>({
	selectId: comment => comment._id,
})

export const commentsSlice = createSlice({
	name: 'comments',
	initialState: commentsAdapter.getInitialState,
	reducers: {
		deleteComment(state, action: PayloadAction<CommentDto>) {
			commentsAdapter.removeOne(state, action.payload._id);
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