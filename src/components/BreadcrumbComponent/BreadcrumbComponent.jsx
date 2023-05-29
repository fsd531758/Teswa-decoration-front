import React, { useEffect } from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './BreadcrumbComponent.styles.css';

const BreadcrumbComponent = ({
	title,
	items,
	animationType = 'animate__fadeInDown',
}) => {
	// i18next
	const { lang } = useParams();
	const { i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	// Redux
	const {
		settings: { breadcrumb },
	} = useSelector((state) => state.settingsData);

	return (
		<Container
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			fluid
			id='breadcrumb-component'
			className='mb-5'
			style={{
				'--image-url': `url(${
					breadcrumb ?? require('./../../assets/images/logos/logo.png')
				})`,
			}}
		>
			<Container
				style={{
					padding: '120px 0 80px',
				}}
			>
				<Breadcrumb
					className={`animate__animated ${animationType}`}
					style={{
						marginBottom: '40px',
						fontWeight: '500',
					}}
				>
					{items.map((item, index) => (
						<Link
							to={item.href}
							// target='_top'
							className={`breadcrumb-item text-capitalize ${
								item.isActive ? 'active' : ''
							}`}
							key={`${item.title}-${index}`}
						>
							{item.title}
						</Link>
					))}
				</Breadcrumb>

				<h1
					className={`page-title m-0 p-0 text-capitalize animate__animated ${animationType} animate__delay-1s`}
					style={{
						'--animate-delay': '0.5s',
					}}
				>
					{title}
				</h1>
			</Container>
		</Container>
	);
};

export default BreadcrumbComponent;
