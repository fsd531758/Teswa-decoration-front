import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ServiceCardComponent.styles.css';

// Components

const ServiceCardComponent = ({ service, index }) => {
	// i18next
	const { lang } = useParams();
	const { i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	return (
		<Container
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			fluid
			className='service-card-component'
		>
			<Link to={`/${lang}/services/${service.id}`}>
				<Card className='h-100'>
					<Card.Img
						fluid='true'
						src={service.image}
						alt='category card image'
						className='text-capitalize w-100 h-100'
						style={{
							objectFit: 'fill',
							objectPosition: 'center',
						}}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null; // prevents looping
							currentTarget.src = require('./../../assets/images/logos/logo.png');
						}}
					/>
					<Card.Body className='text-container'>
						<Card.Title className='title text-capitalize'>
							{service.title}
						</Card.Title>
					</Card.Body>
				</Card>
			</Link>
		</Container>
	);
};

export default ServiceCardComponent;
