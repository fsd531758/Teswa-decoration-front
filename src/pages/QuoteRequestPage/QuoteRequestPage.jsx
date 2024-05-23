import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { REGEX, replacePathVariables } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// Redux
import { useSelector } from 'react-redux';

// i18next
import { useTranslation } from 'react-i18next';
// Styles
import './QuoteRequestPage.styles.css';

// Components
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';
import MetaTagsComponent from './../../components/MetaTagsComponent/MetaTagsComponent';
import QuoteFormComponent from './../../components/QuoteFormComponent/QuoteFormComponent';

const QuoteRequestPage = () => {
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
			title: t('words:breadcrumb.quoteRequest'),
			href: '',
			isActive: true,
		},
	];

	// Redux
	const { quotation } = useSelector((state) => state.homeData);

	return (
		<Container
			fluid
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			id='quote-request-page'
			className='page px-0'
			style={{
				minHeight: '100vh',
			}}
		>
			{/* MetaData */}
			<MetaTagsComponent pageTitle={t('words:windowTab.quoteRequest')} />

			{/* Breadcrumb */}
			<BreadcrumbComponent
				title={t('words:breadcrumb.quoteRequest')}
				items={breadcrumbItems}
			/>

			{/* Content */}
			<Container>
				<Row xs={1} md={2} className='g-4'>
					{/* Page Title & Description */}
					<Col
						className='text-container'
						style={{
							'--bg-image': `url(${quotation.image})`,
						}}
					>
						<Row
							xs={1}
							className='h-100 text-center d-flex flex-column justify-content-center align-items-center'
						>
							{/* Title */}
							<Col className='section-title text-capitalize'>
								{quotation.title}
							</Col>

							{/* Description */}
							<Col
								className='description text-capitalize'
								dangerouslySetInnerHTML={{ __html: quotation.description }}
							></Col>
						</Row>
					</Col>

					{/* Quote Form */}
					<Col>
						<QuoteFormComponent />
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default QuoteRequestPage;
