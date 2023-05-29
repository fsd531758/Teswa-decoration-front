import { configureStore } from '@reduxjs/toolkit';

// Slices
import aboutDataReducer from './reducers/aboutData.reducer';
import categoriesReducer from './reducers/categories.reducer';
import homeDataReducer from './reducers/homeData.reducer';
import productsReducer from './reducers/products.reducer';
import sectionsReducer from './reducers/sections.reducer';
import settingsDataReducer from './reducers/settingsData.reducer';

export const store = configureStore({
	reducer: {
		homeData: homeDataReducer,
		sections: sectionsReducer,
		categories: categoriesReducer,
		products: productsReducer,
		aboutData: aboutDataReducer,
		settingsData: settingsDataReducer,
	},

	devTools: true,
});
