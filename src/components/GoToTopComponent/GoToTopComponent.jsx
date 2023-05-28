import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FaAngleDoubleUp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './GoToTopComponent.styles.css';

// Components
import ButtonComponent from './../ButtonComponent/ButtonComponent';

const GoToTopComponent = () => {
	// i18next
	const { lang } = useParams();
	const { i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	// States
	const [showScrollToTop, setShowScrollToTop] = useState(false);

	// Manipulate Visibility
	window.addEventListener('scroll', () => {
		window.scrollY > 20 * 16 // NUMBER * 1rem
			? setShowScrollToTop(true)
			: setShowScrollToTop(false);
	});

	return (
		<Container
			fluid
			id='go-to-top'
			className='p-0'
			style={{
				opacity: showScrollToTop ? '1' : '0',
				pointerEvents: showScrollToTop ? 'all' : 'none',
			}}
			onClick={() =>
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: 'smooth',
				})
			}
		>
			<ButtonComponent icon={<FaAngleDoubleUp size={20} />} />
		</Container>
	);
};

export default GoToTopComponent;
