import React, { useEffect, useState } from 'react';
import { Container, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import LangComponent from '../LangComponent/LangComponent';
import { REGEX, replacePathVariables } from './../../helpers/general';
import { isMultilingual, routes } from './../../routes/index.routes';
// Images

// Redux
import { useSelector } from 'react-redux';

// Styles
import 'country-flag-icons/3x2/flags.css';
import './NavbarComponent.styles.css';

// Components

const NavbarComponent = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	// Change Displayed Language
	const location = useLocation();
	const navigate = useNavigate();

	// States
	const [isExpanded, setIsExpanded] = useState(false);

	// Redux
	const {
		settings: { logo },
	} = useSelector((state) => state.settingsData);
	const { sections } = useSelector((state) => state.sections);

	// Navbar Handlers
	const toggleNavbar = () => {
		setIsExpanded(!isExpanded);
	};
	const handleClose = () => setIsExpanded(false);

	return (
		<Navbar
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			id='navbar-component'
			bg='light'
			variant='light'
			fixed='top'
			expand='lg'
			expanded={isExpanded}
		>
			<Container>
				{/* Navbar Logo */}
				<Navbar.Brand
					as={NavLink}
					to={routes.home.replace(REGEX, function (matched) {
						return replacePathVariables(matched, {
							lang: lang,
						});
					})}
					onClick={handleClose}
					className='m-0'
				>
					<Image
						fluid
						src={require('./../../assets/images/logos/logo.png') ?? logo}
						alt='company logo'
						className='text-capitalize'
						onError={({ currentTarget }) => {
							currentTarget.onerror = null; // prevents looping
							currentTarget.src = require('./../../assets/images/logos/logo.png');
						}}
					/>
				</Navbar.Brand>

				{/* Navbar Toggler */}
				<Navbar.Toggle
					aria-controls='offcanvasNavbar-expand'
					onClick={toggleNavbar}
				/>

				{/* Navbar Menu */}
				<Navbar.Offcanvas
					lang={lang ?? 'ar'}
					dir={lang === 'en' ? 'ltr' : 'rtl'}
					id='offcanvasNavbar-expand'
					aria-labelledby='offcanvasNavbar-expand'
					placement={lang === 'en' ? 'end' : 'start'}
					className='bg-light'
					restoreFocus={false}
					show={isExpanded}
					onHide={handleClose}
				>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title id='offcanvasNavbarLabel-expand'>
							<Navbar.Brand
								as={NavLink}
								to={routes.home}
								onClick={handleClose}
								className='m-0'
							>
								<Image
									fluid
									src={require('./../../assets/images/logos/logo.png') ?? logo}
									alt='company logo'
									className='text-capitalize'
									onError={({ currentTarget }) => {
										currentTarget.onerror = null; // prevents looping
										currentTarget.src = require('./../../assets/images/logos/logo.png');
									}}
								/>
							</Navbar.Brand>
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav
							className={`${
								lang === 'en' ? 'ms-auto' : 'me-auto'
							} text-uppercase`}
						>
							{/* Home */}
							<Nav.Link
								as={NavLink}
								to={routes.home.replace(REGEX, function (matched) {
									return replacePathVariables(matched, {
										lang: lang,
									});
								})}
								end
								onClick={handleClose}
							>
								{t('words:navbar.home')}
							</Nav.Link>

							{/* About Us */}
							<Nav.Link
								as={NavLink}
								to={routes.about.replace(REGEX, function (matched) {
									return replacePathVariables(matched, {
										lang: lang,
									});
								})}
								onClick={handleClose}
							>
								{t('words:navbar.aboutUs')}
							</Nav.Link>

							{/* Services */}
							<Nav.Link
								as={NavLink}
								to={routes.services.root.replace(REGEX, function (matched) {
									return replacePathVariables(matched, {
										lang: lang,
									});
								})}
								onClick={handleClose}
							>
								{t('words:navbar.services')}
							</Nav.Link>

							{/* Request Quote */}
							<Nav.Link
								as={NavLink}
								to={routes.quoteRequest.replace(REGEX, function (matched) {
									return replacePathVariables(matched, {
										lang: lang,
									});
								})}
								onClick={handleClose}
							>
								{t('words:navbar.quoteRequest')}
							</Nav.Link>

							{/* Contact Us */}
							<Nav.Link
								as={NavLink}
								to={routes.contact.replace(REGEX, function (matched) {
									return replacePathVariables(matched, {
										lang: lang,
									});
								})}
								onClick={handleClose}
							>
								{t('words:navbar.contactUs')}
							</Nav.Link>

							{/* Translate */}
							{isMultilingual && (
								<Navbar.Text
									id='translation'
									role='button'
									className='px-lg-2 d-flex justify-content-start align-items-center text-uppercase'
									onClick={() => {
										handleClose();
										navigate(
											location.pathname.replace(
												`/${lang}`,
												`/${lang === 'en' ? 'ar' : 'en'}`
											)
										);
									}}
									style={{
										fontFamily: lang === 'en' ? 'Cairo' : 'Lato',
										fontWeight: '500',
										letterSpacing: lang !== 'en' ? '1px' : 'normal',
									}}
								>
									<span>
										{lang === 'en' ? (
											<LangComponent lang='ع' />
										) : (
											<LangComponent lang='EN' />
										)}
									</span>
								</Navbar.Text>
							)}
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
};

export default NavbarComponent;
