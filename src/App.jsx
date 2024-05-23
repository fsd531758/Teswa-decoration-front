import React, { useEffect } from 'react';
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useParams,
} from 'react-router-dom';

// Routes
import { isMultilingual, routes } from './routes/index.routes';

// Pages
import MainTemplatePage from './pages/_MainTemplatePage/MainTemplatePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import QuoteRequestPage from './pages/QuoteRequestPage/QuoteRequestPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
const App = () => {
	// Scroll To Top On Initial Render and location change
	let location = useLocation();
	const { lang } = useParams();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [lang, location]);

	return (
		<>
			{/* Available Routes */}
			<Routes>
				{/* Home Page */}
				{isMultilingual ? (
					<Route path='/' element={<Navigate to={routes.fallback} />} />
				) : (
					<>
						<Route path='/ar' element={<Navigate to={routes.fallback} />} />
						<Route path='/en' element={<Navigate to={routes.fallback} />} />
					</>
				)}
				<Route
					exact
					path={routes.home}
					element={
						<MainTemplatePage>
							<HomePage />
						</MainTemplatePage>
					}
				/>

				{/* About Page */}
				<Route
					path={routes.about}
					element={
						<MainTemplatePage>
							<AboutPage />
						</MainTemplatePage>
					}
				/>

				{/* Contact Page */}
				<Route
					path={routes.contact}
					element={
						<MainTemplatePage>
							<ContactPage />
						</MainTemplatePage>
					}
				/>

				{/* Quote Request Page */}
				<Route
					path={routes.quoteRequest}
					element={
						<MainTemplatePage>
							<QuoteRequestPage />
						</MainTemplatePage>
					}
				/>

				{/* Services Page */}
				<Route
					path={routes.services.root}
					element={
						<MainTemplatePage>
							<ServicesPage />
						</MainTemplatePage>
					}
				/>

				{/* Not Found Page: Error 404 */}
				<Route path={routes.notFound} element={<NotFoundPage />} />
			</Routes>
		</>
	);
};

export default App;
