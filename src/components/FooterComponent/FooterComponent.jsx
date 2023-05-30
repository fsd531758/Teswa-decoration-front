import React, { useEffect } from 'react';
import { Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { BsEnvelope, BsPhone } from 'react-icons/bs';
import {
	FaFacebookF,
	FaGlobe,
	FaInstagram,
	FaLinkedinIn,
	FaPinterest,
	FaTwitter,
	FaYoutube,
} from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { REGEX, checkURL, replacePathVariables } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// i18n
import { useTranslation } from 'react-i18next';

// Styles
import './FooterComponent.styles.css';

// Components
import IconTextComponent from './../IconTextComponent/IconTextComponent';

const FooterComponent = () => {
	// i18n
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');

		// eslint-disable-next-line
	}, [lang]);

	// Redux
	const {
		settings: {
			logo,
			white_logo,
			footer_img,
			footer_description,
			address,
			copyrights,
		},
		contacts: { mobiles, telephones, emails, socials },
	} = useSelector((state) => state.settingsData);

	// Constants
	const ICON = { SIZE: 24 };

	return (
		<>
			<Container
				lang={lang ?? 'ar'}
				dir={lang === 'en' ? 'ltr' : 'rtl'}
				as='footer'
				id='footer-component'
				fluid
				className='position-relative'
				style={{ '--bg-image': `url(${footer_img})` }}
			>
				<Container
					fluid='md'
					className='position-relative text-white'
					style={{
						zIndex: '10',
					}}
				>
					{
						<>
							<Row xs={1} className='justify-content-center g-4'>
								<Col>
									<Row className='g-4'>
										{/* Company Info */}
										<Col
											xs={12}
											sm={6}
											md={5}
											lg={4}
											className='overflow-hidden'
										>
											<Row xs={1} className='g-3'>
												{/* Company Logo */}
												<Col className='d-flex'>
													<Link
														to={routes.home.replace(REGEX, function (matched) {
															return replacePathVariables(matched, {
																lang: lang,
															});
														})}
														target='_top'
														style={{
															textDecoration: 'none',
														}}
														onClick={() =>
															window.scrollTo({
																top: 0,
																left: 0,
																behavior: 'smooth',
															})
														}
													>
														<Image
															fluid
															src={
																require('./../../assets/images/logos/logo.png') ??
																white_logo ??
																logo
															}
															alt='company logo'
															className='logo text-capitalize w-100'
															style={{
																objectFit: 'cover',
																objectPosition: 'center',
															}}
															onError={({ currentTarget }) => {
																currentTarget.onerror = null; // prevents looping
																currentTarget.src = require('./../../assets/images/logos/logo.png');
															}}
														/>
													</Link>
												</Col>

												{/* Footer Description */}
												<Col
													className='description'
													dangerouslySetInnerHTML={{
														__html: footer_description,
													}}
												></Col>
											</Row>
										</Col>

										{/* Important Links */}
										<Col
											xs={12}
											sm={6}
											md={3}
											lg={4}
											className='overflow-hidden'
										>
											<Row xs={1} className='g-3'>
												<Col
													className='title fw-bold text-capitalize'
													style={{
														fontSize: '18px',
													}}
												>
													{t('words:footer.headers.links')}
												</Col>
												<Row xs={1} as='ul' className='pt-2'>
													{/* Quote Request */}
													<Col as='li'>
														<Link
															as='li'
															to={routes.quoteRequest.replace(
																REGEX,
																function (matched) {
																	return replacePathVariables(matched, {
																		lang: lang,
																	});
																}
															)}
															className='text-capitalize d-block'
															onClick={() =>
																window.scrollTo({
																	top: 0,
																	left: 0,
																	behavior: 'smooth',
																})
															}
														>
															{t('words:footer.quoteRequest')}
														</Link>
													</Col>

													{/* About Us */}
													<Col as='li'>
														<Link
															as='li'
															to={routes.about.replace(
																REGEX,
																function (matched) {
																	return replacePathVariables(matched, {
																		lang: lang,
																	});
																}
															)}
															className='text-capitalize d-block'
															onClick={() =>
																window.scrollTo({
																	top: 0,
																	left: 0,
																	behavior: 'smooth',
																})
															}
														>
															{t('words:footer.aboutUs')}
														</Link>
													</Col>

													{/* Contact Us */}
													<Col as='li'>
														<Link
															as='li'
															to={routes.contact.replace(
																REGEX,
																function (matched) {
																	return replacePathVariables(matched, {
																		lang: lang,
																	});
																}
															)}
															className='text-capitalize d-block'
															onClick={() =>
																window.scrollTo({
																	top: 0,
																	left: 0,
																	behavior: 'smooth',
																})
															}
														>
															{t('words:footer.contactUs')}
														</Link>
													</Col>
												</Row>
											</Row>
										</Col>

										{/* Contact Info */}
										<Col
											xs={12}
											sm={6}
											md={4}
											lg={4}
											className='overflow-hidden'
										>
											<Row xs={1} className='g-2 contact-info'>
												{/* Contacts */}
												<Col className='overflow-hidden'>
													<Row xs={1} className='g-3'>
														<Col
															className='title fw-bold text-capitalize'
															style={{
																fontSize: '18px',
															}}
														>
															{t('words:footer.headers.contactUs')}
														</Col>
														<Col>
															<Row as='ul' className='g-1'>
																{/* Address */}
																<Col xs={12} as='li'>
																	<IconTextComponent
																		icon={<MdOutlineLocationOn />}
																		text={address}
																		isCentered={false}
																		styles={{
																			container: {
																				'--size': ICON.SIZE,
																			},
																		}}
																	/>
																</Col>

																{/* Telephones */}
																{telephones.length > 0 &&
																	telephones.map((telephone, index) => (
																		<Col key={index} xs={12} as='li'>
																			<IconTextComponent
																				icon={<FiPhoneCall />}
																				text={
																					<Container
																						fluid
																						className='value p-0'
																						style={{
																							direction: 'ltr',
																						}}
																					>
																						<a
																							href={`tel:${telephone.contact}`}
																						>
																							{telephone.contact}
																						</a>
																					</Container>
																				}
																				isCentered={false}
																				styles={{
																					container: {
																						'--size': ICON.SIZE,
																					},
																				}}
																			/>
																		</Col>
																	))}

																{/* Phones */}
																{mobiles.length > 0 &&
																	mobiles.map((mobile, index) => (
																		<Col key={index} xs={12} as='li'>
																			<IconTextComponent
																				icon={<BsPhone />}
																				text={
																					<Container
																						fluid
																						className='value p-0'
																						style={{
																							direction: 'ltr',
																						}}
																					>
																						<a href={`tel:${mobile.contact}`}>
																							{mobile.contact}
																						</a>
																					</Container>
																				}
																				isCentered={false}
																				styles={{
																					container: {
																						'--size': ICON.SIZE,
																					},
																				}}
																			/>
																		</Col>
																	))}

																{/* Emails */}
																{emails.length > 0 &&
																	emails.map((email, index) => (
																		<Col key={index} xs={12} as='li'>
																			<IconTextComponent
																				icon={<BsEnvelope />}
																				text={
																					<Container
																						fluid
																						className='value p-0'
																					>
																						<a href={`mailto:${email.contact}`}>
																							{email.contact}
																						</a>
																					</Container>
																				}
																				isCentered={false}
																				isCapitalized={false}
																				styles={{
																					container: {
																						'--size': ICON.SIZE,
																					},
																				}}
																			/>
																		</Col>
																	))}
															</Row>
														</Col>
													</Row>
												</Col>
											</Row>
										</Col>
									</Row>
								</Col>

								<Col>
									<Row xs={1} className='g-2 h-100'>
										{/* Social Media Accounts */}
										<Col
											as={ListGroup}
											horizontal
											className='social-accounts d-flex align-items-center justify-content-center px-0'
										>
											{socials.map((social, index) => (
												<ListGroup.Item
													key={index}
													as='a'
													href={checkURL(social.contact)}
													target='_blank'
													style={{
														'--icon-color': social.contact.includes('facebook')
															? '#1877f2'
															: social.contact.includes('twitter')
															? '#1da1f2'
															: social.contact.includes('linkedin')
															? '#0077b5'
															: social.contact.includes('instagram')
															? '#f56040'
															: social.contact.includes('youtube')
															? '#ff0000'
															: social.contact.includes('pinterest')
															? '#e60023'
															: '#34bf49',
													}}
												>
													{social.contact.includes('facebook') ? (
														<FaFacebookF size={20} />
													) : social.contact.includes('twitter') ? (
														<FaTwitter size={20} />
													) : social.contact.includes('linkedin') ? (
														<FaLinkedinIn size={20} />
													) : social.contact.includes('instagram') ? (
														<FaInstagram size={20} />
													) : social.contact.includes('youtube') ? (
														<FaYoutube size={20} />
													) : social.contact.includes('pinterest') ? (
														<FaPinterest size={20} />
													) : (
														<FaGlobe size={20} />
													)}
												</ListGroup.Item>
											))}
										</Col>

										{/* Copyrights */}
										<Col
											className='display-6 d-flex align-items-center justify-content-center'
											style={{
												fontSize: '0.8rem',
											}}
										>
											{copyrights}
										</Col>
									</Row>
								</Col>
							</Row>
						</>
					}
				</Container>
			</Container>

			{/* Company Signature */}
			<Container
				lang={lang ?? 'ar'}
				dir={lang === 'en' ? 'ltr' : 'rtl'}
				fluid
				className='company-signature'
			>
				<Row>
					<Col className='p-3 py-2 m-0 bg-dark text-white text-center align-middle'>
						<p
							className='m-0 fw-lighter text-capitalize'
							style={{
								fontSize: '0.8rem',
							}}
						>
							{t('words:copyrights.developed')}
							<a
								href='https://marwan.tech/ar/service-request'
								target='_blank'
								rel='noreferrer'
								className='fw-light'
							>
								{t('words:copyrights.company')}
							</a>
						</p>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default FooterComponent;
