import React from 'react';
import { Container } from 'react-bootstrap';

const LangComponent = ({ lang }) => {
	return (
		<Container>
			<div>{lang}</div>
		</Container>
	);
};

export default LangComponent;
