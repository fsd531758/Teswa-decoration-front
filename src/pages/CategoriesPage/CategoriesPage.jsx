import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { REGEX, replacePathVariables } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// Redux

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './CategoriesPage.styles.css';

// Components
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';

const CategoriesPage = () => {
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
			href: routes.home.replace(REGEX, function (matched) {
				return replacePathVariables(matched, {
					lang: lang,
				});
			}),
			isActive: false,
		},
		{
			title: t('words:breadcrumb.categories'),
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
			id='categories-page'
			className='page px-0'
			style={{
				minHeight: '100vh',
			}}
		>
			{/* Breadcrumb */}
			<BreadcrumbComponent
				title={t('words:breadcrumb.sectionName')}
				items={breadcrumbItems}
			/>

			{/* Content */}
			<Container>CategoriesPage</Container>
		</Container>
	);
};

export default CategoriesPage;
