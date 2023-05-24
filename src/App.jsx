import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// Routes
import { isMultilingual, routes } from './routes/index.routes';

// Pages
import AboutPage from './pages/AboutPage/AboutPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import ContactPage from './pages/ContactPage/ContactPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import QuoteRequestPage from './pages/QuoteRequestPage/QuoteRequestPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import MainTemplatePage from './pages/_MainTemplatePage/MainTemplatePage';

const App = () => {
	return (
		<BrowserRouter>
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

				{/* Section Details Page - Categories Page */}
				<Route
					path={routes.sections.single}
					element={
						<MainTemplatePage>
							<CategoriesPage />
						</MainTemplatePage>
					}
				/>

				{/* Category Details Page - Products Page */}
				<Route
					path={routes.categories.single}
					element={
						<MainTemplatePage>
							<ProductsPage />
						</MainTemplatePage>
					}
				/>

				{/* Product Details Page */}
				<Route
					path={routes.products.single}
					element={
						<MainTemplatePage>
							<ProductDetailsPage />
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
		</BrowserRouter>
	);
};

export default App;
