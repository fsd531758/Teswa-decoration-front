import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Styles
import './ButtonComponent.styles.css';

// Components

const ButtonComponent = ({
	text = '',
	icon = null,
	link = null,
	type = 'button',
	disabled = false,
	styles = {},
	...props
}) => {
	return (
		<Button
			type={type}
			as={link ? Link : 'button'}
			to={link}
			className={`${props.className ? props.className : ''} ${
				disabled ? 'disabled' : ''
			}`}
			style={{
				...styles.button,
			}}
		>
			{/* Icon */}
			<span
				style={{
					...styles.icon,
				}}
			>
				{icon}
			</span>

			{/* Text */}
			<span
				className='text-uppercase'
				style={{
					...styles.text,
				}}
			>
				{text}
			</span>
		</Button>
	);
};

export default ButtonComponent;
