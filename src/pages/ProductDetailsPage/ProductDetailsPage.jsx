import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Badge, Col, Container, Image, Row } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';
import { REGEX, replacePathVariables } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from './../../store/reducers/products.reducer';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ProductDetailsPage.styles.css';

// Components
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';
import ButtonComponent from './../../components/ButtonComponent/ButtonComponent';
import LightboxComponent from './../../components/LightboxComponent/LightboxComponent';
import LoadingComponent from './../../components/LoadingComponent/LoadingComponent';

const ProductDetailsPage = () => {
	// i18next
	const { lang, section_id, category_id, product_id } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	const location = useLocation();

	const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

	// Redux
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			fetchSingleProduct({
				language: lang ?? 'ar',
				searchParams: { id: product_id },
			})
		);
		// eslint-disable-next-line
	}, [lang, section_id, category_id, product_id]);
	const { product, isSingleProductLoading } = useSelector(
		(state) => state.products
	);

	// Breadcrumb State
	const [breadcrumbItems, setBreadcrumbItems] = useState([]);
	useEffect(() => {
		setBreadcrumbItems([
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
				title: product?.category?.section?.title ?? '',
				href: routes.sections.single.replace(REGEX, function (matched) {
					return replacePathVariables(matched, {
						lang: lang,
						section_id: section_id,
					});
				}),
				isActive: false,
			},
			{
				title: product?.category?.title ?? '',
				href: routes.categories.single.replace(REGEX, function (matched) {
					return replacePathVariables(matched, {
						lang: lang,
						section_id: section_id,
						category_id: category_id,
					});
				}),
				isActive: false,
			},
			{
				title: t('words:breadcrumb.productDetails'),
				href: '',
				isActive: true,
			},
		]);
		// eslint-disable-next-line
	}, [lang, product]);

	// Scroll To Top On Initial Render
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [lang]);

	return isSingleProductLoading ? (
		<LoadingComponent />
	) : (
		<Container
			fluid
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			id='product-details-page'
			className='page px-0'
			style={{
				minHeight: '100vh',
			}}
		>
			{/* Breadcrumb */}
			<BreadcrumbComponent title={product.title} items={breadcrumbItems} />

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

				<Row xs={1} md={2} className='g-4'>
					{/* Images Slider */}
					<Col className='images-container'>
						<Row
							xs={
								product.images.filter((image, _) => image !== null).length >= 2
									? 2
									: 1
							}
						>
							{product.images
								.filter((_, index) => index < 4)
								.map(
									(image, index) =>
										image && (
											<Col key={index} className='image-container'>
												<Fade delay={`${index * 30}`}>
													<Container
														fluid
														className='image overflow-hidden position-relative w-100 p-0'
													>
														<Image
															fluid
															src={image.path ?? image}
															alt='product thumbnail'
															className='text-capitalize w-100 h-100'
															style={{
																objectFit: 'contain',
																objectPosition: 'center',
															}}
															onError={({ currentTarget }) => {
																currentTarget.onerror = null; // prevents looping
																currentTarget.src = require('./../../assets/images/logos/logo.png');
															}}
															onClick={() =>
																setLightbox({
																	isOpen: true,
																	index: index,
																})
															}
														/>
													</Container>
												</Fade>
											</Col>
										)
								)}

							{/* Lightbox Container */}
							<LightboxComponent
								gallery={product.images}
								pathname={'<object>.path'}
								lightbox={lightbox}
								setLightbox={setLightbox}
							/>
						</Row>
					</Col>

					{/* Text Container */}
					<Col className='text-container overflow-hidden'>
						<Row xs={1} className='g-4'>
							{/* Title */}
							<Fade direction={lang === 'en' ? 'left' : 'right'} delay={20}>
								<Col className='title position-relative text-capitalize'>
									{product.title}
								</Col>
							</Fade>

							{/* Price */}
							<Fade direction={lang === 'en' ? 'left' : 'right'} delay={40}>
								<Col className='price'>
									<Badge bg='primary'>
										{new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'ar-EG', {
											style: 'currency',
											currency: 'SAR',
											maximumFractionDigits: 0,
										}).format(product.price)}
									</Badge>
								</Col>
							</Fade>

							{/* Short Description */}
							<Fade direction={lang === 'en' ? 'left' : 'right'} delay={60}>
								<Col
									className='short-description'
									dangerouslySetInnerHTML={{
										__html: product.short_description,
									}}
								></Col>
							</Fade>

							{/* Description */}
							<Fade direction={lang === 'en' ? 'left' : 'right'} delay={80}>
								<Col
									className='description'
									dangerouslySetInnerHTML={{ __html: product.description }}
								></Col>
							</Fade>
						</Row>
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default ProductDetailsPage;
