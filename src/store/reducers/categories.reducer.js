import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../helpers/general';

export const fetchCategories = createAsyncThunk(
	'categoriesSlice/fetchCategories',
	async ({ language = 'ar', searchParams = {} }, { rejectWithValue }) => {
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

export const fetchSingleCategory = createAsyncThunk(
	'categoriesSlice/fetchSingleCategory',
	async ({ language = 'ar', searchParams = {} }, { rejectWithValue }) => {
		return await axios({
			method: 'GET',
			baseURL: BASE_URL.demo,
			url: `/categories/${searchParams?.id}`,
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
		category: {},
		isCategoriesLoading: true,
		isSingleCategoryLoading: true,
	},
	name: 'categoriesSlice',
	reducers: {},
	extraReducers: (builder) => {
		// Pending
		builder.addCase(fetchCategories.pending, (state, action) => {
			state.isCategoriesLoading = true;
		});
		builder.addCase(fetchSingleCategory.pending, (state, action) => {
			state.isSingleCategoryLoading = true;
		});

		// Fulfilled
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.categories = action.payload;
			state.isCategoriesLoading = false;
		});
		builder.addCase(fetchSingleCategory.fulfilled, (state, action) => {
			state.category = action.payload;
			state.isSingleCategoryLoading = false;
		});

		// Rejected
		builder.addCase(fetchCategories.rejected, (state, action) => {
			state.isCategoriesLoading = true;
			console.log('rejected:', action.payload);
		});
		builder.addCase(fetchSingleCategory.rejected, (state, action) => {
			state.isSingleCategoryLoading = true;
			console.log('rejected:', action.payload);
		});
	},
});

// Actions
// eslint-disable-next-line
export const {} = categoriesSlice.actions;

// Reducer
export default categoriesSlice.reducer;
