import React, { useEffect, useRef, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Styles
import './HomePage.styles.css';

// Components
import ButtonComponent from './../../components/ButtonComponent/ButtonComponent';
import MainSliderComponent from './../../components/MainSliderComponent/MainSliderComponent';
import PartnersComponent from './../../components/PartnersComponent/PartnersComponent';
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
									<Col className='subtitle'>{aboutUs.sub_title}</Col>

									{/* Title */}
									<Col className='title text-capitalize'>{aboutUs.title}</Col>
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
			<Container fluid className='services-section overflow-hidden'>
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
							<Col className='title text-capitalize'>{experience.title}</Col>
						</Fade>

						{/* Subtitle & Description Container */}
						<Fade direction='down' delay={20}>
							<Col>
								<Row xs={1} className='g-1 text-center'>
									<Col className='subtitle text-capitalize'>
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
				className='text-bg-dark d-flex justify-content-center align-items-center'
				style={{
					minHeight: '50vh',
				}}
			>
				Products Filter
			</Container>

			{/* Partners */}
			<Container fluid className='partners-section px-0'>
				<Container>
					<PartnersComponent
						direction={lang === 'en' ? 'right' : 'left'}
						isSlider={true}
						sliders={partners}
					/>
				</Container>
			</Container>

			{/* Trending Products Slider */}
			<Container
				fluid
				className='text-bg-warning d-flex justify-content-center align-items-center'
				style={{
					minHeight: '50vh',
				}}
			>
				Trending Products Slider
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
