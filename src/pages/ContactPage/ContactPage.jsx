import React, { useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fixGoogleMaps } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// Redux
import { useSelector } from 'react-redux';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ContactPage.styles.css';

// Components
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';
import ContactFormComponent from './../../components/ContactFormComponent/ContactFormComponent';
import ContactInfoComponent from './../../components/ContactInfoComponent/ContactInfoComponent';
import MetaTagsComponent from './../../components/MetaTagsComponent/MetaTagsComponent';

const ContactPage = () => {
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
			href: routes.home,
			isActive: false,
		},
		{
			title: t('words:breadcrumb.contactUs'),
			href: '',
			isActive: true,
		},
	];

	// Redux
	const {
		settings: { map },
	} = useSelector((state) => state.settingsData);

	return (
		<Container
			fluid
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			id='contact-us-page'
			className='page px-0'
			style={{
				minHeight: '100vh',
			}}
		>
			{/* MetaData */}
			<MetaTagsComponent pageTitle={t('words:windowTab.contactUs')} />

			{/* Breadcrumb */}
			<BreadcrumbComponent
				title={t('words:breadcrumb.contactUs')}
				items={breadcrumbItems}
			/>

			{/* Content */}
			<Container>
				<Row xs={1} md={2} className='g-4'>
					{/* Contact Form Container */}
					<Col className='form-container d-flex flex-column'>
						<Fade direction='down' delay={40}>
							<Col className='section-title'>{t('words:contactUs')}</Col>
						</Fade>

						{/* Contact Form */}
						<ContactFormComponent />
					</Col>

					{/* Contact Details Container */}
					<Col className='info-container d-flex flex-column'>
						<Fade direction='down' delay={40}>
							<Col className='section-title'>{t('words:contactInfo')}</Col>
						</Fade>

						{/* Contact Details */}
						<ContactInfoComponent />
					</Col>
				</Row>

				{/* Map */}
				<Row xs={1} className='mt-4 g-3 overflow-hidden'>
					<Fade direction='down' delay='30'>
						<Col
							dangerouslySetInnerHTML={{
								__html: fixGoogleMaps(map),
							}}
						></Col>
					</Fade>
				</Row>
			</Container>
		</Container>
	);
};

export default ContactPage;
