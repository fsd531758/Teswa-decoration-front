import React, { useEffect } from 'react';
import { Badge, Card, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ProductCardComponent.styles.css';

// Components

const ProductCardComponent = ({ product }) => {
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
			className='product-card-component overflow-hidden'
		>
			<Link
				to={`/${lang}/sections/${product.category.section.id}/categories/${product.category.id}/products/${product.id}`}
			>
				<Card className='h-100 overflow-hidden'>
					<Card.Img
						fluid='true'
						src={
							product.image ?? require('./../../assets/images/logos/logo.png')
						}
						alt='product card image'
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
					<Card.ImgOverlay className='text-container d-flex flex-column justify-content-end'>
						{/* Title */}
						{product.title && (
							<Card.Title
								className='title text-capitalize text-limit'
								style={{ '--lines': 1 }}
							>
								{product.title}
							</Card.Title>
						)}

						{/* Short Description */}
						{product.short_description && (
							<Card.Text
								className='short-description text-capitalize text-limit'
								style={{ '--lines': 2 }}
								dangerouslySetInnerHTML={{ __html: product.short_description }}
							></Card.Text>
						)}

						{product.price && (
							<Card.Text className='price'>
								<Badge bg='primary'>
									{new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'ar-EG', {
										style: 'currency',
										currency: 'SAR',
										maximumFractionDigits: 0,
									}).format(product.price)}
								</Badge>
							</Card.Text>
						)}
					</Card.ImgOverlay>
				</Card>
			</Link>
		</Container>
	);
};

export default ProductCardComponent;
