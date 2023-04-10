import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { User } from './dto/User';
import { RootState } from '../../app/store';
import { getUsersApi } from '../../api/users-api';

const usersAdapter = createEntityAdapter<User>({
	selectId: user => user.id,
})

export const loadUsers = createAsyncThunk(
	'users/loadUsers',
	async () => {
		return await getUsersApi();
	}
);

export const usersSlice = createSlice({
	name: 'users',
	initialState: usersAdapter.getInitialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadUsers.fulfilled, (state, action) => {	
				usersAdapter.upsertMany(state, action.payload)
			})
	},
})

export const {
	selectById: selectUserById,
} = usersAdapter.getSelectors((state: RootState) => state.users)

export default usersSlice.reducer