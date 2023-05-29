import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Autoplay, Grid } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import 'swiper/css';
import 'swiper/css/grid';
import './CardsSliderComponent.styles.css';

const CardsSliderComponent = ({
	sliders,
	isGridEnabled = false,
	rowsCount = 1,
	isRewindEnabled = false,
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
			<Container lang={lang ?? 'ar'} dir={lang === 'en' ? 'ltr' : 'rtl'} fluid>
				{/* Slider Container */}
				<Row>
					<Col>
						<Swiper
							lang={lang ?? 'ar'}
							dir={lang === 'en' ? 'ltr' : 'rtl'}
							key={lang}
							slidesPerView={1}
							spaceBetween={10}
							grid={{
								enabled: isGridEnabled,
								rows: rowsCount,
								fill: 'row',
							}}
							autoplay={{
								delay: 2000,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
							}}
							rewind={isRewindEnabled}
							loop={!isRewindEnabled}
							breakpoints={{
								576: {
									slidesPerView: 2,
									spaceBetween: 20,
								},
								992: {
									slidesPerView: 3,
									spaceBetween: 30,
								},
							}}
							grabCursor={false}
							modules={[Grid, Autoplay]}
							className='cards-slider-component'
						>
							{sliders.map((slide, index) => (
								// Render slides
								<SwiperSlide key={index} className='slider-container'>
									{slide}
								</SwiperSlide>
							))}
						</Swiper>
					</Col>
				</Row>
			</Container>
		)
	);
};

export default CardsSliderComponent;
