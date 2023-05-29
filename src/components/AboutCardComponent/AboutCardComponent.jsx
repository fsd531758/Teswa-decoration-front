import React, { useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './AboutCardComponent.styles.css';

const AboutCardComponent = ({ content, index }) => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	return (
		<Container
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			fluid
			className='about-card-component'
		>
			<Container>
				<Row xs={1} md={2} className='about-card-container overflow-hidden'>
					{/* Image */}
					<Col className='image-container overflow-hidden'>
						<Image
							fluid
							src={content.image}
							alt='about card image'
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
					</Col>

					{/* Text Container */}
					<Col className='text-container d-flex flex-column justify-content-center align-items-center'>
						<Row xs={1} className='text-center'>
							{/* Title */}
							<Col className='title text-capitalize'>{content.title}</Col>

							{/* Description */}
							<Col
								className='description text-capitalize'
								dangerouslySetInnerHTML={{ __html: content.description }}
							></Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default AboutCardComponent;
