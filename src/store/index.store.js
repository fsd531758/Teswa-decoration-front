import { configureStore } from '@reduxjs/toolkit';

// Slices
import aboutDataReducer from './reducers/aboutData.reducer';
import homeDataReducer from './reducers/homeData.reducer';
import productsReducer from './reducers/products.reducer';
import servicesReducer from './reducers/service.reducer';
import settingsDataReducer from './reducers/settingsData.reducer';

export const store = configureStore({
	reducer: {
		homeData: homeDataReducer,
		products: productsReducer,
		aboutData: aboutDataReducer,
		settingsData: settingsDataReducer,
		service: servicesReducer,
	},

	devTools: false,
});
