import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from './../../helpers/general';

export const fetchAboutData = createAsyncThunk(
	'aboutDataSlice/fetchAboutData',
	async (language = 'ar', { rejectWithValue }) => {
		return await axios({
			method: 'GET',
			baseURL: BASE_URL.demo,
			url: '/about',
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

export const aboutDataSlice = createSlice({
	initialState: {
		sliders: [],
		aboutUs: {},
		mission: {},
		vision: {},
		message: {},
		isAboutDataLoading: true,
	},
	name: 'aboutDataSlice',
	reducers: {},
	extraReducers: (builder) => {
		// Pending
		builder.addCase(fetchAboutData.pending, (state, action) => {
			state.isAboutDataLoading = true;
		});

		// Fulfilled
		builder.addCase(fetchAboutData.fulfilled, (state, action) => {
			state.sliders = action.payload.about_sliders;
			state.aboutUs = action.payload.about_us;
			state.mission = action.payload.mission;
			state.vision = action.payload.vision;
			state.message = action.payload.message;
			state.isAboutDataLoading = false;
		});

		// Rejected
		builder.addCase(fetchAboutData.rejected, (state, action) => {
			console.log('rejected:', action.payload);
			state.isAboutDataLoading = true;
		});
	},
});

// Actions
// eslint-disable-next-line
export const {} = aboutDataSlice.actions;

// Reducer
export default aboutDataSlice.reducer;
