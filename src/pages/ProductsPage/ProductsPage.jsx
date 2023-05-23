import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { REGEX, replacePathVariables } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// Redux

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ProductsPage.styles.css';

// Components
import BreadcrumbComponent from '../../components/BreadcrumbComponent/BreadcrumbComponent';

const ProductsPage = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	const section = { id: 1 };

	const products = [];

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
			href: routes.sections.single.replace(REGEX, function (matched) {
				return replacePathVariables(matched, {
					lang: lang,
					section_id: section.id,
				});
			}),
			isActive: false,
		},
		{
			title: t('words:breadcrumb.products'),
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
			id='products-page'
			className='page px-0'
			style={{
				minHeight: '100vh',
			}}
		>
			{/* Breadcrumb */}
			<BreadcrumbComponent
				title={t('words:breadcrumb.categoryName')}
				items={breadcrumbItems}
			/>

			{/* Content */}
			<Container>
				<Row xs={1} className='g-4'>
					{products.length > 0 ? (
						products.map((product, index) => (
							<Col key={index}>{product.title}</Col>
						))
					) : (
						<Col className='error '>
							{t('sentences:errors.noData', {
								title: t('words:errors.products'),
							})}
						</Col>
					)}
				</Row>
			</Container>
		</Container>
	);
};

export default ProductsPage;
