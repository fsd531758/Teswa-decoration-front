import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// Styles
import './LoadingComponent.styles.css';

// Components

const LoadingComponent = () => {
	const { lang } = useParams();

	return (
		<Container
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			id='loading-component'
			fluid
		>
			<Row xs={1}>
				<Col className='d-flex justify-content-center align-items-center w-100'>
					<Image
						fluid
						src={require('./../../assets/images/logos/logo.png')}
						alt='company logo'
						className='text-capitalize animate__animated animate__heartBeat animate__infinite animate__slower'
						style={{
							objectFit: 'contain',
							objectPosition: 'center',
						}}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default LoadingComponent;
