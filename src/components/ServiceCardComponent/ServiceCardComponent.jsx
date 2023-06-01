import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

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
			<Card className='service-card-container'>
				<Card.Body className='text-center'>
					{/* Icon */}
					<Card.Subtitle className={`icon ${service.icon}`}></Card.Subtitle>

					{/* Title */}
					<Card.Title className='title text-limit' style={{ '--lines': 1 }}>
						{service.title}
					</Card.Title>

					{/* Description */}
					<Card.Text
						className='description text-limit'
						style={{ '--lines': 3 }}
						dangerouslySetInnerHTML={{ __html: service.description }}
					></Card.Text>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default ServiceCardComponent;
