import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../helpers/general';

export const fetchSections = createAsyncThunk(
	'sectionsSlice/fetchSections',
	async ({ language = 'ar', searchParams = {} }, { rejectWithValue }) => {
		return await axios({
			method: 'GET',
			baseURL: BASE_URL.demo,
			url: '/sections',
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

export const fetchSectionCategories = createAsyncThunk(
	'sectionsSlice/fetchSectionCategories',
	async ({ language = 'ar', searchParams = {} }, { rejectWithValue }) => {
		return await axios({
			method: 'GET',
			baseURL: BASE_URL.demo,
			url: `/sections/${searchParams?.id}`,
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

export const sectionsSlice = createSlice({
	initialState: {
		sections: [],
		sectionCategories: {},
		isSectionsLoading: true,
		isSectionCategoriesLoading: true,
	},
	name: 'sectionsSlice',
	reducers: {},
	extraReducers: (builder) => {
		// Pending
		builder.addCase(fetchSections.pending, (state, action) => {
			state.isSectionsLoading = true;
		});
		builder.addCase(fetchSectionCategories.pending, (state, action) => {
			state.isSectionCategoriesLoading = true;
		});

		// Fulfilled
		builder.addCase(fetchSections.fulfilled, (state, action) => {
			state.sections = action.payload;
			state.isSectionsLoading = false;
		});
		builder.addCase(fetchSectionCategories.fulfilled, (state, action) => {
			state.sectionCategories = action.payload;
			state.isSectionCategoriesLoading = false;
		});

		// Rejected
		builder.addCase(fetchSections.rejected, (state, action) => {
			state.isSectionsLoading = true;
			console.log('rejected:', action.payload);
		});
		builder.addCase(fetchSectionCategories.rejected, (state, action) => {
			state.isSectionCategoriesLoading = true;
			console.log('rejected:', action.payload);
		});
	},
});

// Actions
// eslint-disable-next-line
export const {} = sectionsSlice.actions;

// Reducer
export default sectionsSlice.reducer;
