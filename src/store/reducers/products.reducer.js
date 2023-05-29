import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../helpers/general';

export const fetchProducts = createAsyncThunk(
	'productsSlice/fetchProducts',
	async (language = 'ar', { rejectWithValue }) => {
		return await axios({
			method: 'GET',
			baseURL: BASE_URL.demo,
			url: '/products',
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

export const productsSlice = createSlice({
	initialState: {
		products: [],
		isProductsLoading: true,
	},
	name: 'productsSlice',
	reducers: {},
	extraReducers: (builder) => {
		// Pending
		builder.addCase(fetchProducts.pending, (state, action) => {
			state.isProductsLoading = true;
		});

		// Fulfilled
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.products = action.payload;
			state.isProductsLoading = false;
		});

		// Rejected
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.isProductsLoading = true;
			console.log('rejected:', action.payload);
		});
	},
});

// Actions
// eslint-disable-next-line
export const {} = productsSlice.actions;

// Reducer
export default productsSlice.reducer;
