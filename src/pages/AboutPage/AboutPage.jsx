import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { routes } from './../../routes/index.routes';

// Redux

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './AboutPage.styles.css';

// Components
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';

const AboutPage = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	const breadcrumbItems = [
		{
			title: t('words:breadcrumb.home'),
			href: routes.home,
			isActive: false,
		},
		{
			title: t('words:breadcrumb.aboutUs'),
			href: '',
			isActive: true,
		},
	];

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
			fluid
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			id='about-us-page'
			className='page px-0'
			style={{
				minHeight: '100vh',
			}}
		>
			{/* Breadcrumb */}
			<BreadcrumbComponent
				title={t('words:breadcrumb.aboutUs')}
				items={breadcrumbItems}
			/>

			{/* Content */}
			<Container>AboutPage</Container>
		</Container>
	);
};

export default AboutPage;
