import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from './../../helpers/general';

export const fetchHomeData = createAsyncThunk(
	'homeDataSlice/fetchHomeData',
	async (language = 'ar', { rejectWithValue }) => {
		return await axios({
			method: 'GET',
			baseURL: BASE_URL.demo,
			url: '/home',
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

export const homeDataSlice = createSlice({
	initialState: {
		sliders: [],
		aboutUs: {},
		statistics: {},
		separators: [],
		partners: {},
		newsletter: {},
		isHomeDataLoading: true,
	},
	name: 'homeDataSlice',
	reducers: {},
	extraReducers: (builder) => {
		// Pending
		builder.addCase(fetchHomeData.pending, (state, action) => {
			state.isHomeDataLoading = true;
		});

		// Fulfilled
		builder.addCase(fetchHomeData.fulfilled, (state, action) => {
			state.sliders = action.payload.sliders;
			state.aboutUs = action.payload.about_us;
			state.statistics = action.payload.statistics;
			state.separators = [
				action.payload.separator_1,
				action.payload.separator_2,
			];
			state.partners = {
				main: action.payload.partners,
				funding: action.payload.funding_partners,
			};
			state.newsletter = action.payload.newsletter;

			state.isHomeDataLoading = false;
		});

		// Rejected
		builder.addCase(fetchHomeData.rejected, (state, action) => {
			console.log('rejected:', action.payload);
			state.isHomeDataLoading = true;
		});
	},
});

// Actions
// eslint-disable-next-line
export const {} = homeDataSlice.actions;

// Reducer
export default homeDataSlice.reducer;
