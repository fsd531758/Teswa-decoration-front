import React, { useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './CategoryCardComponent.styles.css';

// Components

const CategoryCardComponent = ({ category }) => {
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
			className='category-card-component'
		>
			<Link
				to={`/${lang}/sections/${category.section.id}/categories/${category.id}`}
			>
				<Card className='h-100'>
					<Card.Img
						fluid='true'
						src={
							category.image ?? require('./../../assets/images/logos/logo.png')
						}
						alt='category card image'
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
					<Card.ImgOverlay className='text-container'>
						<Card.Title className='title text-capitalize'>
							{category.title}
						</Card.Title>
					</Card.ImgOverlay>
				</Card>
			</Link>
		</Container>
	);
};

export default CategoryCardComponent;
