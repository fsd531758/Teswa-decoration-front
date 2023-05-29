import React, { useEffect, useRef, useState } from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import { Col, Container, Image, Nav, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Styles
import './HomePage.styles.css';

// Components
import ButtonComponent from './../../components/ButtonComponent/ButtonComponent';
import CardsSliderComponent from './../../components/CardsSliderComponent/CardsSliderComponent';
import MainSliderComponent from './../../components/MainSliderComponent/MainSliderComponent';
import PartnersComponent from './../../components/PartnersComponent/PartnersComponent';
import ProductCardComponent from './../../components/ProductCardComponent/ProductCardComponent';
import ProgressBarComponent from './../../components/ProgressBarComponent/ProgressBarComponent';
import ServiceCardComponent from './../../components/ServiceCardComponent/ServiceCardComponent';

const HomePage = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	// Animate Progress Bars
	const progressContainerRef = useRef();
	const [isFull, setIsFull] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			window.addEventListener('scroll', () => {
				const rectBoundary =
					progressContainerRef?.current?.getBoundingClientRect();

				if (rectBoundary?.top < 600 && rectBoundary?.bottom > 300 && !isFull) {
					setIsFull(true);
				} else {
					setIsFull(false);
				}
			});
		}, 100);
		// eslint-disable-next-line
	}, []);

	// Redux
	const { sliders, aboutUs, services, experience, experienceData, partners } =
		useSelector((state) => state.homeData);
	const { categories } = useSelector((state) => state.categories);
	const { products } = useSelector((state) => state.products);

	// Products Filter
	const [activeCategory, setActiveCategory] = useState({
		id: -1,
		title: t('words:allCategories'),
	});
	const [filteredProducts, setFilteredProducts] = useState(products);
	const filterByCategory = (selectedKey) => {
		if (+selectedKey === -1) {
			return products;
		} else {
			return products.filter(
				(product) => +product.category.id === +selectedKey
			);
		}
	};

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
			<Container fluid className='px-0'>
				<MainSliderComponent sliders={sliders} />
			</Container>

			{/* About Section */}
			<Container fluid className='about-section px-0 overflow-hidden'>
				<Container>
					<Row xs={1} md={2} className='g-4'>
						{/* Title & Subtitle Container */}
						<Fade direction={lang === 'en' ? 'left' : 'right'} delay={20}>
							<Col>
								<Row
									xs={1}
									className='d-flex flex-column justify-content-center align-items-center'
								>
									{/* Subtitle */}
									<Col className='section-subtitle'>{aboutUs.sub_title}</Col>

									{/* Title */}
									<Col className='section-title'>{aboutUs.title}</Col>
								</Row>
							</Col>
						</Fade>

						{/* Description */}
						<Fade direction={lang === 'en' ? 'right' : 'left'} delay={20}>
							<Col
								className='description d-flex flex-column justify-content-center'
								dangerouslySetInnerHTML={{ __html: aboutUs.description }}
							></Col>
						</Fade>
					</Row>
				</Container>
			</Container>

			{/* Services */}
			<Container fluid className='services-section px-0 overflow-hidden'>
				<Container>
					<Row xs={1} sm={2} lg={3} className='g-4'>
						{services
							.filter((_, index) => index < 3)
							.map((service, index) => (
								<Fade key={index} direction='up' delay={40 + index * 100}>
									<Col>
										<ServiceCardComponent service={service} index={index + 1} />
									</Col>
								</Fade>
							))}
					</Row>
				</Container>
			</Container>

			{/* Experience Section */}
			<Container
				fluid
				className='experience-section px-0 position-relative overflow-hidden'
			>
				<Container>
					{/* Text Container */}
					<Row xs={1} md={2} className='text-container mb-4 g-4'>
						{/* Title */}
						<Fade direction={lang === 'en' ? 'left' : 'right'} delay={20}>
							<Col className='section-title'>{experience.title}</Col>
						</Fade>

						{/* Subtitle & Description Container */}
						<Fade direction='down' delay={20}>
							<Col>
								<Row xs={1} className='g-1 text-center'>
									<Col className='section-subtitle text-capitalize'>
										{experience.sub_title}
									</Col>
									<Col
										className='description text-capitalize'
										dangerouslySetInnerHTML={{ __html: experience.description }}
									></Col>
								</Row>
							</Col>
						</Fade>
					</Row>

					{/* Progress & Image Container */}
					<Row xs={1} md={2} className='g-4'>
						{/* Progress Bars Container */}
						<Col
							ref={progressContainerRef}
							className='progress-container d-flex flex-column justify-content-center'
						>
							{/* Progress Bars */}
							<Row xs={1} className='g-4 mb-4'>
								{experienceData.map((experience, index) => (
									<Col key={index} className='mb-1'>
										<ProgressBarComponent
											content={experience}
											isFull={isFull}
										/>
									</Col>
								))}
							</Row>

							{/* View More Button */}
							<Row className='g-4'>
								<Col>
									<ButtonComponent
										text={t('words:buttons.learnMore')}
										link={`/${lang}/about-us`}
										styles={{
											button: {
												'--btn-text-color': 'rgba(var(--action-color), 1)',
											},
										}}
									/>
								</Col>
							</Row>
						</Col>

						{/* Image Container */}
						<Fade delay={100}>
							<Col className='image-container'>
								<Image
									fluid
									src={experience.image}
									alt='experience section image'
									className='text-capitalize w-100 h-100'
									style={{
										objectFit: 'contain',
										objectPosition: 'center',
									}}
									onError={({ currentTarget }) => {
										currentTarget.onerror = null; // prevents looping
										currentTarget.src = require('./../../assets/images/logos/logo.png');
									}}
								/>
							</Col>
						</Fade>
					</Row>
				</Container>
			</Container>

			{/* Products Filter */}
			<Container
				fluid
				className='products-filter-section px-0 overflow-hidden'
				style={{ minHeight: '50vh' }}
			>
				<Container>
					<Row xs={1} className='g-4'>
						{/* Section Title */}
						<Fade direction='down' delay={60}>
							<Col className='section-title'>
								{t('sentences:pages.productsFilter')}
							</Col>
						</Fade>

						{/* Categories Filter */}
						<Fade direction='up' delay={60}>
							<Col className='categories-filter'>
								<Nav
									activeKey={activeCategory.id}
									onSelect={(selectedKey) => {
										setActiveCategory(() => {
											if (+selectedKey === -1) {
												return { id: -1, title: t('words:allCategories') };
											} else {
												return categories.filter(
													(category) => +category.id === +selectedKey
												)[0];
											}
										});
										setFilteredProducts(null);
										setTimeout(() => {
											setFilteredProducts(filterByCategory(selectedKey));
										}, 100);
									}}
								>
									<Nav.Item>
										<Nav.Link eventKey={-1} className='text-capitalize'>
											{t('words:allCategories')}
										</Nav.Link>
									</Nav.Item>

									{categories.map((category, index) => (
										<Nav.Item key={index}>
											<Nav.Link
												eventKey={category.id}
												className='text-capitalize'
											>
												{category.title}
											</Nav.Link>
										</Nav.Item>
									))}
								</Nav>
							</Col>
						</Fade>
					</Row>

					{/* Filtered Products */}
					{filteredProducts && (
						<>
							<Fade delay={100}>
								<Row
									xs={1}
									md={filteredProducts.length > 0 ? 2 : 1}
									lg={
										filteredProducts.length > 0
											? activeCategory.title === t('words:allCategories')
												? 3
												: 2
											: 1
									}
									className='g-4 overflow-hidden'
								>
									{filteredProducts.length > 0 ? (
										+activeCategory.id === -1 ? (
											<Col xs={12} md={12} lg={12}>
												<CardsSliderComponent
													sliders={filteredProducts.map((product, index) => (
														<ProductCardComponent
															key={index}
															product={product}
														/>
													))}
													isGridEnabled={true}
													rowsCount={2}
													isRewindEnabled={true}
												/>
											</Col>
										) : (
											filteredProducts
												.filter((_, index) => index < 4)
												.map((product, index) => (
													<Fade key={index} direction='up' delay={index * 100}>
														<Col>
															<ProductCardComponent product={product} />
														</Col>
													</Fade>
												))
										)
									) : (
										<Fade direction='up' delay={20}>
											<Col xs={12} className='error'>
												{t('sentences:errors.noData', {
													title: t('words:errors.products'),
												})}
											</Col>
										</Fade>
									)}
								</Row>
							</Fade>

							{/* See More Button */}
							{activeCategory.id !== -1 && filteredProducts.length > 4 && (
								<Row className='mt-5'>
									<Zoom delay={100}>
										<Col className='d-flex justify-content-center align-items-center'>
											<ButtonComponent
												text={t('words:buttons.viewMore')}
												link={`/sections/${activeCategory.section?.id}/categories/${activeCategory.id}`}
											/>
										</Col>
									</Zoom>
								</Row>
							)}
						</>
					)}
				</Container>
			</Container>

			{/* Partners */}
			<Container fluid className='partners-section px-0 overflow-hidden'>
				<Container>
					<Fade delay={100}>
						<PartnersComponent
							direction={lang === 'en' ? 'right' : 'left'}
							isSlider={true}
							sliders={partners}
						/>
					</Fade>
				</Container>
			</Container>

			{/* Trending Products Slider */}
			<Container
				fluid
				className='trending-products-section position-relative px-0 overflow-hidden'
			>
				<Container>
					<Row xs={1} className='g-4'>
						{/* Title & Subtitle Container */}
						<Col className='header-container'>
							<Row
								xs={1}
								className='d-flex flex-column justify-content-center align-items-center overflow-hidden'
							>
								{/* Subtitle */}
								<Fade direction='down' delay={40}>
									<Col className='section-subtitle text-center'>
										{t('sentences:pages.trendingProducts.subtitle')}
									</Col>
								</Fade>

								{/* Title */}
								<Fade direction='up' delay={40}>
									<Col className='section-title text-center'>
										{t('sentences:pages.trendingProducts.title')}
									</Col>
								</Fade>
							</Row>
						</Col>

						{/* Trending Products */}
						<Col className='products-container'>
							<Fade delay={100}>
								<CardsSliderComponent
									sliders={products.map((product, index) => (
										<ProductCardComponent key={index} product={product} />
									))}
								/>
							</Fade>
						</Col>
					</Row>
				</Container>
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
