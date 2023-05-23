import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// Styles
import './IconTextComponent.styles.css';

// Components

const IconTextComponent = ({
	icon,
	text,
	label = null,
	isCapitalized = true,
	isCentered = true,
	styles = {},
	...props
}) => {
	const { lang } = useParams();

	return (
		<Container
			fluid
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			className={`icon-text p-0 d-flex ${
				isCentered ? 'align-items-center' : ''
			} py-1`}
			style={{
				...styles.container,
			}}
			{...props}
		>
			{/* Icon */}
			<Container
				fluid
				className={`icon p-0 ${lang === 'en' ? 'me-2' : 'ms-2'}`}
				style={{
					...styles.icon,
				}}
			>
				{icon}
			</Container>

			{/* Main Label */}
			{label && (
				<Container
					fluid
					className={`p-0 ${isCapitalized ? 'text-capitalize' : ''} ${
						lang === 'en' ? 'ps-1' : 'pe-1'
					}`}
					style={{
						...styles.label,
						minWidth: '8rem',
						fontWeight: '500',
					}}
				>{`${label}:`}</Container>
			)}

			{/* Main Text */}
			<Container
				fluid
				className={`text-value p-0 ${isCapitalized ? 'text-capitalize' : ''}`}
				style={{
					...styles.text,
				}}
			>
				{text}
			</Container>
		</Container>
	);
};

export default IconTextComponent;
