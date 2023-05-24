import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { REGEX, replacePathVariables } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// Images
import ProductImage from './../../assets/images/logos/logo.png';

// Redux

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ProductsPage.styles.css';

// Components
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';
import ProductCardComponent from './../../components/ProductCardComponent/ProductCardComponent';

const ProductsPage = () => {
	// i18next
	const { lang, section_id } = useParams();
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
			href: routes.sections.single.replace(REGEX, function (matched) {
				return replacePathVariables(matched, {
					lang: lang,
					section_id: section_id,
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

	const products = [
		{
			id: 1,
			title: lang === 'en' ? 'product 1' : 'المنتج 1',
			price: 100,
			image: ProductImage,
			shortDescription:
				lang === 'en'
					? '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore ad tempore nam magnam similique, dignissimos recusandae modi</p>'
					: '<p>هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل ، هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل</p>',
			section: {
				id: 1,
				title: lang === 'en' ? 'section 1' : 'القسم 1',
			},
			category: {
				id: 1,
				title: lang === 'en' ? 'category 1' : 'الفئة 1',
			},
		},
		{
			id: 2,
			title: lang === 'en' ? 'product 2' : 'المنتج 2',
			price: 100,
			image: ProductImage,
			shortDescription:
				lang === 'en'
					? '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore ad tempore nam magnam similique, dignissimos recusandae modi</p>'
					: '<p>هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل ، هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل</p>',
			section: {
				id: 2,
				title: lang === 'en' ? 'section 2' : 'القسم 2',
			},
			category: {
				id: 2,
				title: lang === 'en' ? 'category 2' : 'الفئة 2',
			},
		},
		{
			id: 3,
			title: lang === 'en' ? 'product 3' : 'المنتج 3',
			price: 100,
			image: ProductImage,
			shortDescription:
				lang === 'en'
					? '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore ad tempore nam magnam similique, dignissimos recusandae modi</p>'
					: '<p>هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل ، هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل</p>',
			section: {
				id: 3,
				title: lang === 'en' ? 'section 3' : 'القسم 3',
			},
			category: {
				id: 2,
				title: lang === 'en' ? 'category 2' : 'الفئة 2',
			},
		},
		{
			id: 4,
			title: lang === 'en' ? 'product 4' : 'المنتج 4',
			price: 100,
			image: ProductImage,
			shortDescription:
				lang === 'en'
					? '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore ad tempore nam magnam similique, dignissimos recusandae modi</p>'
					: '<p>هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل ، هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل</p>',
			section: {
				id: 3,
				title: lang === 'en' ? 'section 3' : 'القسم 3',
			},
			category: {
				id: 1,
				title: lang === 'en' ? 'category 1' : 'الفئة 1',
			},
		},
	];

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
				<Row className='g-4'>
					{products.length > 0 ? (
						products.map((product, index) => (
							<Col key={index} xs={12} md={6} xl={4}>
								<ProductCardComponent product={product} />
							</Col>
						))
					) : (
						<Col xs={12} className='error'>
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
