import React, { useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
	Autoplay,
	EffectCreative,
	EffectFade,
	Navigation,
	Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './MainSliderComponent.styles.css';

// Components

const MainSliderComponent = ({
	sliders,
	swipeEffect = 'fade',
	hasPagination = false,
	hasNavigation = false,
}) => {
	// i18next
	const { lang } = useParams();
	const { i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	return (
		sliders.length > 0 && (
			<Swiper
				lang={lang ?? 'ar'}
				dir={lang === 'en' ? 'ltr' : 'rtl'}
				key={lang}
				slidesPerView={1}
				spaceBetween={0}
				loop={true}
				autoplay={{
					delay: 8000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				grabCursor={true}
				effect={swipeEffect}
				creativeEffect={{
					prev: {
						shadow: true,
						translate: ['-120%', 0, -500],
					},
					next: {
						shadow: true,
						translate: ['120%', 0, -500],
					},
				}}
				pagination={{
					enabled: hasPagination,
					dynamicBullets: hasPagination,
				}}
				navigation={hasNavigation}
				modules={[Navigation, Pagination, Autoplay, EffectFade, EffectCreative]}
				className='main-slider-component'
			>
				{sliders.map((slide, index) => (
					// Render slides
					<SwiperSlide key={index} className='slider-container'>
						{/* Slider Image */}
						<Image
							fluid
							key={slide}
							src={slide.image}
							alt='slider image'
							className='text-capitalize w-100 h-100'
							style={{
								objectFit: 'cover',
								objectPosition: 'center',
							}}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null; // prevents looping
								currentTarget.src = require('./../../assets/images/logos/logo.png');
							}}
						/>

						{/* Slider Text */}
						{(slide.sub_title || slide.title || slide.description) && (
							<Container className='slider-text overflow-hidden'>
								<Row
									xs={1}
									className='text-container g-1 d-flex flex-column justify-content-center align-items-center'
								>
									{/* Subtitle */}
									{slide.sub_title && (
										<Col
											className='subtitle text-uppercase animate__animated animate__fadeInUp animate__delay-1s'
											style={{
												'--animate-delay': '0.5s',
											}}
										>
											{slide.sub_title}
										</Col>
									)}

									{/* Main Title */}
									{slide.title && (
										<Col
											className='title text-capitalize animate__animated animate__fadeInUp animate__delay-1s'
											style={{
												'--animate-delay': '0.75s',
											}}
										>
											{slide.title}
										</Col>
									)}

									{/* Main Description */}
									{slide.description && (
										<Col
											dangerouslySetInnerHTML={{ __html: slide.description }}
											className='description text-capitalize animate__animated animate__fadeInUp animate__delay-1s'
											style={{
												'--animate-delay': '1s',
											}}
										></Col>
									)}
								</Row>
							</Container>
						)}
					</SwiperSlide>
				))}
			</Swiper>
		)
	);
};

export default MainSliderComponent;
