import React, { useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { routes } from './../../routes/index.routes';

// Redux
import { useSelector } from 'react-redux';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './AboutPage.styles.css';

// Components
import AboutCardComponent from './../../components/AboutCardComponent/AboutCardComponent';
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';
import MetaTagsComponent from './../../components/MetaTagsComponent/MetaTagsComponent';

const AboutPage = () => {
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
			title: t('words:breadcrumb.aboutUs'),
			href: '',
			isActive: true,
		},
	];

	// Redux
	const { aboutUs, mission, vision, message } = useSelector(
		(state) => state.aboutData
	);

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
			id='about-us-page'
			className='page px-0'
			style={{
				minHeight: '100vh',
			}}
		>
			{/* MetaData */}
			<MetaTagsComponent pageTitle={t('words:windowTab.aboutUs')} />

			{/* Breadcrumb */}
			<BreadcrumbComponent
				title={t('words:breadcrumb.aboutUs')}
				items={breadcrumbItems}
			/>

			{/* Content */}
			<Container>
				<Row xs={1} className='g-5 overflow-hidden'>
					{/* About Us */}
					<Col className='card-container'>
						<Fade direction={lang === 'en' ? 'left' : 'right'} delay={20}>
							<AboutCardComponent content={aboutUs} />
						</Fade>
					</Col>

					{/* Mission */}
					<Col className='card-container'>
						<Fade direction={lang === 'en' ? 'right' : 'left'} delay={40}>
							<AboutCardComponent content={mission} />
						</Fade>
					</Col>

					{/* Vision */}
					<Col className='card-container'>
						<Fade direction={lang === 'en' ? 'left' : 'right'} delay={60}>
							<AboutCardComponent content={vision} />
						</Fade>
					</Col>

					{/* Message */}
					<Col className='card-container'>
						<Fade direction={lang === 'en' ? 'right' : 'left'} delay={80}>
							<AboutCardComponent content={message} />
						</Fade>
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default AboutPage;
