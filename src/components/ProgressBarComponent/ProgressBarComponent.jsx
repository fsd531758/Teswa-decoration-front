import React, { useEffect } from 'react';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ProgressBarComponent.styles.css';

const ProgressBarComponent = ({ content, isFull = false }) => {
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
			className='progress-bar-component px-0'
		>
			<Row xs={1} className='g-1'>
				{/* Title */}
				{content.title && <Col className='title'>{content.title}</Col>}

				{/* Value */}
				<Col>
					<ProgressBar
						now={isFull ? content.number : 0}
						label={`${isFull ? content.number : 0}%`}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default ProgressBarComponent;
