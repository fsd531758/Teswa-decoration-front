import React, { useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import 'swiper/css';
import './PartnersComponent.styles.css';

// Components
import PartnerImageComponent from './../PartnerImageComponent/PartnerImageComponent';

const PartnersComponent = ({
	sliders = [],
	direction = '',
	title = '',
	isSlider = false,
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
			<Container
				lang={lang ?? 'ar'}
				dir={lang === 'en' ? 'ltr' : 'rtl'} // // crashes within <Marquee></Marquee>
				fluid
				className='partners-slider-component'
			>
				<Row xs={1} className='g-4'>
					{/* Section Title */}
					{title && (
						<Fade direction='down' delay={10}>
							<Col className='title text-capitalize text-center'>{title}</Col>
						</Fade>
					)}

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
										<PartnerImageComponent partnerImage={slide.image} />
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
										<PartnerImageComponent partnerImage={slide.image} />
									</Col>
								))}
							</Row>
						)}
					</Col>
				</Row>
			</Container>
		)
	);
};

export default PartnersComponent;
