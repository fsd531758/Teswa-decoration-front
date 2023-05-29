import React, { useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { REGEX, replacePathVariables } from '../../helpers/general';
import { routes } from '../../routes/index.routes';

// Redux
import { useSelector } from 'react-redux';

// i18next
import { useTranslation } from 'react-i18next';
// Styles
import './ServicesPage.styles.css';

// Components
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';
import ServiceCardComponent from './../../components/ServiceCardComponent/ServiceCardComponent';

const ServicesPage = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	const breadcrumbItems = [
		{
			title: t('words:breadcrumb.home'),
			href: routes.home.replace(REGEX, function (matched) {
				return replacePathVariables(matched, {
					lang: lang,
				});
			}),
			isActive: false,
		},
		{
			title: t('words:breadcrumb.services'),
			href: '',
			isActive: true,
		},
	];

	// Redux
	const { services } = useSelector((state) => state.homeData);

	// Scroll To Top On Initial Render
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [lang]);

	return (
		<Container
			fluid
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			id='services-page'
			className='page px-0'
			style={{
				minHeight: '100vh',
			}}
		>
			{/* Breadcrumb */}
			<BreadcrumbComponent
				title={t('words:breadcrumb.services')}
				items={breadcrumbItems}
			/>

			{/* Content */}
			<Container>
				<Row xs={1} sm={2} lg={3} className='g-4'>
					{services.map((service, index) => (
						<Fade key={index} direction='up' delay={40 + index * 100}>
							<Col>
								<ServiceCardComponent service={service} index={index + 1} />
							</Col>
						</Fade>
					))}
				</Row>
			</Container>
		</Container>
	);
};

export default ServicesPage;
