import React, { useEffect } from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ColorComponent.styles.css';

const ColorComponent = ({ color }) => {
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
			className='color-component'
			style={{ '--color': color.hex }}
		>
			<Row className=''>
				{/* Color Preview */}
				<Col xs={2} sm={3} md={2} className='preview'></Col>

				{/* Color Details */}
				<Col xs={10} sm={9} md={10}>
					<Stack>
						<Col
							className='color-title text-capitalize text-limit'
							style={{ '--lines': 1 }}
						>
							{color.title}
						</Col>
						<Col className='hex-code text-uppercase'>{color.hex}</Col>
					</Stack>
				</Col>
			</Row>
		</Container>
	);
};

export default ColorComponent;
