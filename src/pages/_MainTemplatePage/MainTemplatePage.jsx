import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { isMultilingual } from '../../routes/index.routes';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutData } from '../../store/reducers/aboutData.reducer';
import { fetchCategories } from '../../store/reducers/categories.reducer';
import { fetchHomeData } from '../../store/reducers/homeData.reducer';
import { fetchProducts } from '../../store/reducers/products.reducer';
import { fetchSections } from '../../store/reducers/sections.reducer';
import {
	fetchContactsData,
	fetchSettingsData,
} from '../../store/reducers/settingsData.reducer';

// Styles
import 'react-toastify/dist/ReactToastify.css';

// Components
import FooterComponent from './../../components/FooterComponent/FooterComponent';
import GoToTopComponent from './../../components/GoToTopComponent/GoToTopComponent';
import LoadingComponent from './../../components/LoadingComponent/LoadingComponent';
import MetaTagsComponent from './../../components/MetaTagsComponent/MetaTagsComponent';
import NavbarComponent from './../../components/NavbarComponent/NavbarComponent';
import WhatsappIconComponent from './../../components/WhatsappIconComponent/WhatsappIconComponent';
const MainTemplatePage = ({ children }) => {
	// Handle Language Change
	const { lang } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		isMultilingual &&
			navigate(
				`${location.pathname.replace(
					`/${lang}`,
					lang === 'en' ? '/en' : '/ar'
				)}`
			);
		// eslint-disable-next-line
	}, [lang]);

	// Redux
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchHomeData(lang ?? 'ar'));
		dispatch(fetchAboutData(lang ?? 'ar'));
		dispatch(fetchSections({ language: lang ?? 'ar', searchParams: {} }));
		dispatch(fetchCategories({ language: lang ?? 'ar', searchParams: {} }));
		dispatch(fetchProducts({ language: lang ?? 'ar', searchParams: {} }));
		dispatch(fetchSettingsData(lang ?? 'ar'));
		dispatch(fetchContactsData(lang ?? 'ar'));
		// eslint-disable-next-line
	}, [lang]);

	const {
		isSettingsLoading,
		isContactsLoading,
		settings: { whatsapp },
	} = useSelector((state) => state.settingsData);
	const { isHomeDataLoading } = useSelector((state) => state.homeData);
	const { isSectionsLoading } = useSelector((state) => state.sections);
	const { isCategoriesLoading } = useSelector((state) => state.categories);
	const { isProductsLoading } = useSelector((state) => state.products);
	const { isAboutDataLoading } = useSelector((state) => state.aboutData);

	return isSettingsLoading ||
		isContactsLoading ||
		isHomeDataLoading ||
		isAboutDataLoading ||
		isSectionsLoading ||
		isCategoriesLoading ||
		isProductsLoading ? (
		<LoadingComponent />
	) : (
		<>
			{/* Meta Tags */}
			<MetaTagsComponent />

			{/* Page Navbar */}
			<NavbarComponent />

			{/* Current Page Content */}
			{children}

			{/* Page Footer */}
			<FooterComponent />

			{/* Whatsapp Icon */}
			{whatsapp == null || whatsapp == '' ? <></> : <WhatsappIconComponent />}

			{/* Go To Top Button */}
			<GoToTopComponent />

			{/* Toast Messages */}
			<ToastContainer
				position='top-right'
				autoClose={6000}
				newestOnTop
				pauseOnHover
				rtl={lang === 'en' ? false : true}
			/>
		</>
	);
};

export default MainTemplatePage;
