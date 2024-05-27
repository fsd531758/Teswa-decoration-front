import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleService } from './../../store/reducers/service.reducer';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ServiceDetailsPage.styles.css';

// Components
import ButtonComponent from './../../components/ButtonComponent/ButtonComponent';
import LoadingComponent from './../../components/LoadingComponent/LoadingComponent';
import MetaTagsComponent from './../../components/MetaTagsComponent/MetaTagsComponent';

const ProductDetailsPage = () => {
	// i18next
	const { lang, service_id } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	const location = useLocation();
	// Redux
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			fetchSingleService({
				language: lang ?? 'ar',
				searchParams: { id: service_id },
			})
		);
		// eslint-disable-next-line
	}, [lang, service_id]);
	const { service, isSingleServiceLoading } = useSelector(
		(state) => state.service
	);

	return isSingleServiceLoading ? (
		<LoadingComponent />
	) : (
		<Container
			fluid
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			id='product-details-page'
			className='page px-0'
			style={{
				minHeight: '100vh',
			}}
		>
			{/* MetaData */}
			<MetaTagsComponent pageTitle={t('words:windowTab.productDetails')} />

			{/* Breadcrumb */}

			{/* Content */}
			<Container>
				{/* Back Button */}
				<Row xs={1} className='g-4 mb-5'>
					<Col className='d-flex justify-content-center align-items-center'>
						<ButtonComponent
							text={t('words:buttons.goBack')}
							icon={
								lang === 'en' ? (
									<FaArrowLeft size={20} />
								) : (
									<FaArrowRight size={20} />
								)
							}
							link={`${location.pathname.split('/').slice(0, -2).join('/')}`}
							styles={{
								icon: {
									marginLeft: lang === 'en' ? '0' : '0.5rem',
									marginRight: lang === 'en' ? '0.5rem' : '0',
								},
							}}
						/>
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default ProductDetailsPage;
