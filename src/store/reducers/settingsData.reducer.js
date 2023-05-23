import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from './../../helpers/general';

// Settings Data
export const fetchSettingsData = createAsyncThunk(
	'settingsDataSlice/fetchSettingsData',
	async (language = 'ar', { rejectWithValue }) => {
		return await axios({
			method: 'GET',
			baseURL: BASE_URL.demo,
			url: '/setting',
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

// Contacts Data
export const fetchContactsData = createAsyncThunk(
	'settingsDataSlice/fetchContactsData',
	async (language = 'ar', { rejectWithValue }) => {
		return await axios({
			method: 'GET',
			baseURL: BASE_URL.demo,
			url: '/contacts',
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

export const settingsDataSlice = createSlice({
	name: 'settingsDataSlice',
	initialState: {
		settings: {},
		contacts: {},
		isSettingsLoading: true,
		isContactsLoading: true,
	},
	reducers: {},
	extraReducers: (builder) => {
		// Pending - Settings Data
		builder.addCase(fetchSettingsData.pending, (state, action) => {
			state.isSettingsLoading = true;
		});

		// Pending - Contacts Data
		builder.addCase(fetchContactsData.pending, (state, action) => {
			state.isContactsLoading = true;
		});

		// Fulfilled - Settings Data
		builder.addCase(fetchSettingsData.fulfilled, (state, action) => {
			state.settings = action.payload;
			state.isSettingsLoading = false;
		});

		// Fulfilled - Contacts Data
		builder.addCase(fetchContactsData.fulfilled, (state, action) => {
			state.contacts = action.payload.contacts;
			state.isContactsLoading = false;
		});

		// Rejected - Settings Data
		builder.addCase(fetchSettingsData.rejected, (state, action) => {
			console.log('rejected - settings:', action.payload);
			state.isSettingsLoading = true;
		});

		// Rejected - Contacts Data
		builder.addCase(fetchContactsData.rejected, (state, action) => {
			console.log('rejected - contacts:', action.payload);
			state.isContactsLoading = true;
		});
	},
});

// Actions
// eslint-disable-next-line
export const {} = settingsDataSlice.actions;

// Reducer
export default settingsDataSlice.reducer;
