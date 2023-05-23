import AOS from 'aos';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Fonts
import '@fontsource/cairo';
import '@fontsource/lato';

// Styles
import 'animate.css';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'normalize.css';
import 'react-phone-number-input/style.css';
import './index.css';
import './styles/PhoneInputComponent.styles.css';

// i18next
import './i18n';

// Redux
import { Provider } from 'react-redux';
import { store } from './store/index.store';

// Components
import App from './App';
import LoadingComponent from './components/LoadingComponent/LoadingComponent';

// AOS Setup
AOS.init({
	duration: 1000,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Suspense fallback={<LoadingComponent />}>
				<App />
			</Suspense>
		</Provider>
	</React.StrictMode>
);
