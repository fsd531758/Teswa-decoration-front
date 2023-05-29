import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../helpers/general';

export const fetchCategories = createAsyncThunk(
	'categoriesSlice/fetchCategories',
	async (language = 'ar', { rejectWithValue }) => {
		return await axios({
			method: 'GET',
			baseURL: BASE_URL.demo,
			url: '/categories',
			headers: {
				locale: language,
			},
		})
			.then((response) => {
				return response.data.data;
			})
			.catch((error) => rejectWithValue(error.message));
	}
);

export const categoriesSlice = createSlice({
	initialState: {
		categories: [],
		isCategoriesLoading: true,
	},
	name: 'categoriesSlice',
	reducers: {},
	extraReducers: (builder) => {
		// Pending
		builder.addCase(fetchCategories.pending, (state, action) => {
			state.isCategoriesLoading = true;
		});

		// Fulfilled
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.categories = action.payload;
			state.isCategoriesLoading = false;
		});

		// Rejected
		builder.addCase(fetchCategories.rejected, (state, action) => {
			state.isCategoriesLoading = true;
			console.log('rejected:', action.payload);
		});
	},
});

// Actions
// eslint-disable-next-line
export const {} = categoriesSlice.actions;

// Reducer
export default categoriesSlice.reducer;
