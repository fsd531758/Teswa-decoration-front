import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../helpers/general';

export const fetchSections = createAsyncThunk(
	'sectionsSlice/fetchSections',
	async ({ language = 'ar', searchParams = {} }, { rejectWithValue }) => {
		return await axios({
			method: 'GET',
			baseURL: BASE_URL.demo,
			url: '/projects',
			params: {
				id: searchParams?.id,
			},
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
		isSectionsLoading: true,
	},
	name: 'sectionsSlice',
	reducers: {},
	extraReducers: (builder) => {
		// Pending
		builder.addCase(fetchSections.pending, (state, action) => {
			state.isSectionsLoading = true;
		});

		// Fulfilled
		builder.addCase(fetchSections.fulfilled, (state, action) => {
			state.sections = action.payload;
			state.isSectionsLoading = false;
		});

		// Rejected
		builder.addCase(fetchSections.rejected, (state, action) => {
			state.isSectionsLoading = true;
			console.log('rejected:', action.payload);
		});
	},
});

// Actions
// eslint-disable-next-line
export const {} = sectionsSlice.actions;

// Reducer
export default sectionsSlice.reducer;
