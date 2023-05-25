import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Styles
import './HomePage.styles.css';

// Components
import MainSliderComponent from './../../components/MainSliderComponent/MainSliderComponent';
import PartnersComponent from './../../components/PartnersComponent/PartnersComponent';
import ServiceCardComponent from './../../components/ServiceCardComponent/ServiceCardComponent';

const HomePage = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	// Redux
	const { sliders, aboutUs, services, partners } = useSelector(
		(state) => state.homeData
	);

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
			<Container fluid className='about-section px-0'>
				<Container>
					<Row xs={1} md={2} className='g-4'>
						{/* Title & Subtitle Container */}
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

						{/* Description */}
						<Col
							className='description d-flex flex-column justify-content-center'
							dangerouslySetInnerHTML={{ __html: aboutUs.description }}
						></Col>
					</Row>
				</Container>
			</Container>

			{/* Services */}
			<Container fluid className='services-section'>
				<Container>
					<Row xs={1} sm={2} lg={3} className='g-4'>
						{services
							.filter((_, index) => index < 3)
							.map((service, index) => (
								<Col key={index}>
									<ServiceCardComponent service={service} index={index + 1} />
								</Col>
							))}
					</Row>
				</Container>
			</Container>

			{/* Summary Section */}
			<Container
				fluid
				className='text-bg-light d-flex justify-content-center align-items-center'
				style={{
					minHeight: '50vh',
				}}
			>
				Summary Section
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
