import React, { useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { REGEX, replacePathVariables } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettingsData } from './../../store/reducers/settingsData.reducer';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './NotFoundPage.styles.css';

// Components
import ButtonComponent from './../../components/ButtonComponent/ButtonComponent';
import LoadingComponent from './../../components/LoadingComponent/LoadingComponent';

const NotFoundPage = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	// Redux
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchSettingsData(lang));
		// eslint-disable-next-line
	}, [lang]);

	const {
		settings: { logo },
		isSettingsLoading,
	} = useSelector((state) => state.settingsData);

	return isSettingsLoading ? (
		<LoadingComponent />
	) : (
		<Container
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			id='not-found-page'
			fluid
			className='text-center d-flex align-items-center text-bg-dark'
		>
			<Container className='my-auto'>
				<Row xs={1} className='g-4'>
					<Col className='align-middle animate__animated animate__fadeInDown'>
						{/* 404 Image */}
						<Image
							fluid
							src={logo}
							alt='not found page'
							className='image text-capitalize'
							onError={({ currentTarget }) => {
								currentTarget.onerror = null; // prevents looping
								currentTarget.src = require('./../../assets/images/logos/logo.png');
							}}
						/>
					</Col>

					<Col className='text-container d-flex flex-column justify-content-center align-items-center p-5 animate__animated animate__fadeInUp'>
						{/* Main Text */}
						<h1 className='display-1 m-0 p-0'>
							{t('sentences:errors.codes.404')}
						</h1>
						<h2 className='display-6 mb-4'>{t('sentences:errors.404')}</h2>

						{/* Redirect Button To Home */}
						<ButtonComponent
							text={t('words:buttons.goHome')}
							link={routes.home.replace(REGEX, function (matched) {
								return replacePathVariables(matched, {
									lang: lang,
								});
							})}
							className='button'
							styles={{
								button: {
									width: 'fit-content',
								},
							}}
						/>
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default NotFoundPage;
