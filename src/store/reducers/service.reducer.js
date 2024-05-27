import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../helpers/general';

export const fetchSingleService = createAsyncThunk(
	'servicesSlice/fetchSingleService',
	async ({ language = 'ar', searchParams = {} }, { rejectWithValue }) => {
		return await axios({
			method: 'GET',
			baseURL: BASE_URL.demo,
			url: `/services/${searchParams?.id}`,
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

export const servicesSlice = createSlice({
	initialState: {
		service: {},
		isSingleServiceLoading: true,
	},
	name: 'servicesSlice',
	reducers: {},
	extraReducers: (builder) => {
		// Pending

		builder.addCase(fetchSingleService.pending, (state, action) => {
			state.isSingleServiceLoading = true;
		});

		// Fulfilled

		builder.addCase(fetchSingleService.fulfilled, (state, action) => {
			state.service = action.payload;
			state.isSingleServiceLoading = false;
		});

		// Rejected

		builder.addCase(fetchSingleService.rejected, (state, action) => {
			state.isSingleServiceLoading = true;
			console.log('rejected:', action.payload);
		});
	},
});

// Actions
// eslint-disable-next-line
export const {} = servicesSlice.actions;

// Reducer
export default servicesSlice.reducer;
