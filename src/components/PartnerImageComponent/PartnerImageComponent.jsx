import React from 'react';
import { Container, Image } from 'react-bootstrap';

// Styles
import './PartnerImageComponent.styles.css';

const PartnerImageComponent = ({ partnerImage }) => {
	return (
		<Container fluid className='partner-image-component px-0 h-100 w-100'>
			<Image
				src={partnerImage}
				alt='partner image'
				className='d-block text-capitalize w-100 h-100'
				style={{
					objectFit: 'contain',
					objectPosition: 'center',
				}}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null; // prevents looping
					currentTarget.src = require('./../../assets/images/logos/logo.png');
				}}
			/>
		</Container>
	);
};

export default PartnerImageComponent;
