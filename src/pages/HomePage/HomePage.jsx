import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

// Redux

// Styles
import './HomePage.styles.css';

// Components

const HomePage = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	// Redux

	// Scroll To Top On Initial Render
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [lang]);

	return (
		<Container
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			fluid
			id='home-page'
			className='page overflow-hidden'
		>
			{/* Main Slider */}
			<Container
				fluid
				className='text-bg-danger d-flex justify-content-center align-items-center'
				style={{
					minHeight: '50vh',
				}}
			>
				Main Slider
			</Container>

			{/* About Section */}
			<Container
				fluid
				className='text-bg-primary d-flex justify-content-center align-items-center'
				style={{
					minHeight: '50vh',
				}}
			>
				About Section
			</Container>

			{/* Services */}
			<Container
				fluid
				className='text-bg-secondary d-flex justify-content-center align-items-center'
				style={{
					minHeight: '50vh',
				}}
			>
				Services
			</Container>

			{/* Summary Section */}
			<Container
				fluid
				className='text-bg-light d-flex justify-content-center align-items-center'
				style={{
					minHeight: '50vh',
				}}
			>
				Summary Section
			</Container>

			{/* Products Filter */}
			<Container
				fluid
				className='text-bg-dark d-flex justify-content-center align-items-center'
				style={{
					minHeight: '50vh',
				}}
			>
				Products Filter
			</Container>

			{/* Partners */}
			<Container
				fluid
				className='text-bg-primary d-flex justify-content-center align-items-center'
				style={{
					minHeight: '50vh',
				}}
			>
				Partners
			</Container>

			{/* Trending Products Slider */}
			<Container
				fluid
				className='text-bg-warning d-flex justify-content-center align-items-center'
				style={{
					minHeight: '50vh',
				}}
			>
				Trending Products Slider
			</Container>

			{/* Contact Section */}
			<Container
				fluid
				className='text-bg-success d-flex justify-content-center align-items-center'
				style={{
					minHeight: '50vh',
				}}
			>
				Contact Section
			</Container>
		</Container>
	);
};

export default HomePage;
