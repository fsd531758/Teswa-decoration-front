import React, { useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import 'swiper/css';
import './PartnersComponent.styles.css';

// Components

const PartnersComponent = ({ sliders, direction, title, isSlider }) => {
	// i18next
	const { lang } = useParams();
	const { i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	return (
		sliders.length > 0 && (
			<Container
				lang={lang ?? 'ar'}
				dir={lang === 'en' ? 'ltr' : 'rtl'} // // crashes within <Marquee></Marquee>
				fluid
				className='partners-slider-component'
			>
				<Row xs={1} className='g-4'>
					{/* Section Title */}
					<Fade direction='down' delay={10}>
						<Col className='title text-capitalize text-center'>{title}</Col>
					</Fade>

					{/* Main Content */}
					<Col>
						{isSlider ? (
							<Swiper
								lang={lang ?? 'ar'}
								dir={lang === 'en' ? 'ltr' : 'rtl'}
								key={lang}
								slidesPerView={1}
								spaceBetween={10}
								autoplay={{
									delay: 1000,
									disableOnInteraction: false,
									pauseOnMouseEnter: true,
								}}
								loop={true}
								breakpoints={{
									576: {
										slidesPerView: 2,
										spaceBetween: 20,
									},
									992: {
										slidesPerView: 3,
										spaceBetween: 30,
									},
									1200: {
										slidesPerView: 4,
										spaceBetween: 40,
									},
								}}
								grabCursor={true}
								modules={[Autoplay]}
								className='partners-slider-container'
							>
								{sliders.map((slide, index) => (
									<SwiperSlide
										key={index}
										className='d-flex justify-content-center align-items-center'
									>
										<Image
											src={slide.image}
											alt='partner image'
											className='text-capitalize mx-5 w-100 h-100'
											style={{
												objectFit: 'contain',
												objectPosition: 'center',
											}}
											onError={({ currentTarget }) => {
												currentTarget.onerror = null; // prevents looping
												currentTarget.src = require('./../../assets/images/logos/logo.png');
											}}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						) : (
							<Row xs={2} md={4} className='g-4'>
								{sliders.map((slide, index) => (
									<Col
										key={index}
										className='partners-cards-container d-flex justify-content-center align-items-center'
									>
										<Image
											fluid
											src={slide.image}
											alt='partner image'
											className='text-capitalize mx-5 w-100 h-100'
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
								))}
							</Row>
						)}
						{/* <Marquee
							direction={direction}
							gradient={true}
							gradientColor={[248, 251, 253]}
							gradientWidth={100}
							pauseOnHover={true}
							speed={100}
							className='partners-container overflow-hidden'
						>
							{sliders.map((slide, index) => (
								<Image
									fluid
									key={index}
									src={slide.image}
									alt='slider image'
									className='text-capitalize mx-5 w-100 h-100'
									style={{
										objectFit: 'contain',
										objectPosition: 'center',
									}}
									onError={({ currentTarget }) => {
										currentTarget.onerror = null; // prevents looping
										currentTarget.src = require('./../../assets/images/logos/logo.png');
									}}
								/>
							))}
							{sliders.map((slide, index) => (
								<Image
									fluid
									key={index}
									src={slide.image}
									alt='slider image'
									className='text-capitalize mx-5 w-100 h-100'
									style={{
										objectFit: 'contain',
										objectPosition: 'center',
									}}
									onError={({ currentTarget }) => {
										currentTarget.onerror = null; // prevents looping
										currentTarget.src = require('./../../assets/images/logos/logo.png');
									}}
								/>
							))}
						</Marquee> */}
					</Col>
				</Row>
			</Container>
		)
	);
};

export default PartnersComponent;
