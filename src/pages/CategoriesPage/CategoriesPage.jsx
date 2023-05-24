import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { REGEX, replacePathVariables } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// Images
import CategoryImage from './../../assets/images/logos/logo.png';

// Redux

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './CategoriesPage.styles.css';

// Components
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';
import CategoryCardComponent from './../../components/CategoryCardComponent/CategoryCardComponent';

const CategoriesPage = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	const location = useLocation();

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

	const categories = [
		{
			id: 1,
			title: lang === 'en' ? 'category 1' : 'الفئة 1',
			image: CategoryImage,
			section: {
				id: 1,
				title: lang === 'en' ? 'section 1' : 'القسم 1',
			},
		},
		{
			id: 2,
			title: lang === 'en' ? 'category 2' : 'الفئة 2',
			image: CategoryImage,
			section: {
				id: 1,
				title: lang === 'en' ? 'section 1' : 'القسم 1',
			},
		},
		{
			id: 3,
			title: lang === 'en' ? 'category 3' : 'الفئة 3',
			image: CategoryImage,
			section: {
				id: 2,
				title: lang === 'en' ? 'section 2' : 'القسم 2',
			},
		},
		{
			id: 4,
			title: lang === 'en' ? 'category 4' : 'الفئة 4',
			image: CategoryImage,
			section: {
				id: 3,
				title: lang === 'en' ? 'section 3' : 'القسم 3',
			},
		},
		{
			id: 5,
			title: lang === 'en' ? 'category 5' : 'الفئة 5',
			image: CategoryImage,
			section: {
				id: 2,
				title: lang === 'en' ? 'section 2' : 'القسم 2',
			},
		},
	];

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
			<Container>
				<Row className='g-4'>
					{categories.length > 0 ? (
						categories.map((category, index) => (
							<Col key={index} xs={12} md={6} xl={4}>
								<CategoryCardComponent category={category} />
							</Col>
						))
					) : (
						<Col xs={12} className='error'>
							{t('sentences:errors.noData', {
								title: t('words:errors.categories'),
							})}
						</Col>
					)}
				</Row>
			</Container>
		</Container>
	);
};

export default CategoriesPage;
