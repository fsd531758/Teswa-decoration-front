import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';
import { REGEX, replacePathVariables } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleCategory } from './../../store/reducers/categories.reducer';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ProductsPage.styles.css';

// Components
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';
import ButtonComponent from './../../components/ButtonComponent/ButtonComponent';
import LoadingComponent from './../../components/LoadingComponent/LoadingComponent';
import ProductCardComponent from './../../components/ProductCardComponent/ProductCardComponent';

const ProductsPage = () => {
	// i18next
	const { lang, section_id, category_id } = useParams();
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
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			fetchSingleCategory({
				language: lang ?? 'ar',
				searchParams: { id: category_id },
			})
		);
		// eslint-disable-next-line
	}, [lang, section_id, category_id]);
	const { category, isSingleCategoryLoading } = useSelector(
		(state) => state.categories
	);

	// Scroll To Top On Initial Render
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [lang]);

	// const products = [
	// 	{
	// 		id: 1,
	// 		title: lang === 'en' ? 'product 1' : 'المنتج 1',
	// 		price: 100,
	// 		image: ProductImage,
	// 		short_description:
	// 			lang === 'en'
	// 				? '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore ad tempore nam magnam similique, dignissimos recusandae modi</p>'
	// 				: '<p>هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل ، هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل</p>',
	// 		category: {
	// 			id: 1,
	// 			title: lang === 'en' ? 'category 1' : 'الفئة 1',
	// 			section: {
	// 				id: 1,
	// 				title: lang === 'en' ? 'section 1' : 'القسم 1',
	// 			},
	// 		},
	// 	},
	// 	{
	// 		id: 2,
	// 		title: lang === 'en' ? 'product 2' : 'المنتج 2',
	// 		price: 100,
	// 		image: ProductImage,
	// 		short_description:
	// 			lang === 'en'
	// 				? '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore ad tempore nam magnam similique, dignissimos recusandae modi</p>'
	// 				: '<p>هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل ، هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل</p>',
	// 		category: {
	// 			id: 2,
	// 			title: lang === 'en' ? 'category 2' : 'الفئة 2',
	// 			section: {
	// 				id: 2,
	// 				title: lang === 'en' ? 'section 2' : 'القسم 2',
	// 			},
	// 		},
	// 	},
	// 	{
	// 		id: 3,
	// 		title: lang === 'en' ? 'product 3' : 'المنتج 3',
	// 		price: 100,
	// 		image: ProductImage,
	// 		short_description:
	// 			lang === 'en'
	// 				? '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore ad tempore nam magnam similique, dignissimos recusandae modi</p>'
	// 				: '<p>هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل ، هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل</p>',
	// 		category: {
	// 			id: 2,
	// 			title: lang === 'en' ? 'category 2' : 'الفئة 2',
	// 			section: {
	// 				id: 3,
	// 				title: lang === 'en' ? 'section 3' : 'القسم 3',
	// 			},
	// 		},
	// 	},
	// 	{
	// 		id: 4,
	// 		title: lang === 'en' ? 'product 4' : 'المنتج 4',
	// 		price: 100,
	// 		image: ProductImage,
	// 		short_description:
	// 			lang === 'en'
	// 				? '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore ad tempore nam magnam similique, dignissimos recusandae modi</p>'
	// 				: '<p>هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل ، هذا وصف قصير عن المنتج سيتم تعديله عند موافقة العميل</p>',
	// 		category: {
	// 			id: 1,
	// 			title: lang === 'en' ? 'category 1' : 'الفئة 1',
	// 			section: {
	// 				id: 3,
	// 				title: lang === 'en' ? 'section 3' : 'القسم 3',
	// 			},
	// 		},
	// 	},
	// ];

	return isSingleCategoryLoading ? (
		<LoadingComponent />
	) : (
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
			<BreadcrumbComponent title={category.title} items={breadcrumbItems} />

			{/* Content */}
			<Container>
				{/* Back Button */}
				<Row xs={1} className='g-4 mb-5'>
					<Col className='d-flex justify-content-center align-items-center'>
						<ButtonComponent
							text={t('words:buttons.goBack')}
							icon={
								lang === 'en' ? (
									<FaArrowLeft size={20} />
								) : (
									<FaArrowRight size={20} />
								)
							}
							link={`${location.pathname.split('/').slice(0, -2).join('/')}`}
							styles={{
								icon: {
									marginLeft: lang === 'en' ? '0' : '0.5rem',
									marginRight: lang === 'en' ? '0.5rem' : '0',
								},
							}}
						/>
					</Col>
				</Row>

				<Row className='g-4'>
					{category.products.length > 0 ? (
						category.products.map((product, index) => (
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
