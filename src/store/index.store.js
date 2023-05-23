import { configureStore } from '@reduxjs/toolkit';

// Slices
import aboutDataReducer from './reducers/aboutData.reducer';
import homeDataReducer from './reducers/homeData.reducer';
import sectionsReducer from './reducers/sections.reducer';
import settingsDataReducer from './reducers/settingsData.reducer';

export const store = configureStore({
	reducer: {
		homeData: homeDataReducer,
		sections: sectionsReducer,
		aboutData: aboutDataReducer,
		settingsData: settingsDataReducer,
	},

	devTools: true,
});
