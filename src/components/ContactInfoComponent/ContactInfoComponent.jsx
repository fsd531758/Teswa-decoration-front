import React, { useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
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
import { useParams } from 'react-router-dom';
import { checkURL } from './../../helpers/general';

// Redux
import { useSelector } from 'react-redux';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ContactInfoComponent.styles.css';

// Components
import IconTextComponent from './../../components/IconTextComponent/IconTextComponent';

const ContactInfoComponent = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	const ICON = { SIZE: 24 };

	// Redux
	const {
		settings: { address },
		contacts: { mobiles, telephones, emails, socials },
	} = useSelector((state) => state.settingsData);

	return (
		<Container
			fluid
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			className='contact-info-component px-0'
		>
			<Row xs={1} className='overflow-hidden'>
				{/* Address */}
				<Fade direction={lang === 'en' ? 'left' : 'right'} delay={40}>
					<Col>
						<IconTextComponent
							icon={<MdOutlineLocationOn />}
							text={address}
							isCentered={false}
							styles={{
								container: {
									'--size': ICON.SIZE,
									marginBottom: '0.5rem',
								},
							}}
						/>
					</Col>
				</Fade>

				{/* Telephones */}
				{telephones.length > 0 && (
					<Fade direction={lang === 'en' ? 'left' : 'right'} delay={40}>
						<Row xs={1} sm={2} md={1} lg={2}>
							{telephones.map((telephone, index) => (
								<Col key={index}>
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
												<a href={`tel:${telephone.contact}`}>
													{telephone.contact}
												</a>
											</Container>
										}
										isCentered={false}
										styles={{
											container: {
												'--size': ICON.SIZE,
												marginBottom: '0.5rem',
											},
										}}
									/>
								</Col>
							))}
						</Row>
					</Fade>
				)}

				{/* Phones */}
				{mobiles.length > 0 && (
					<Fade direction={lang === 'en' ? 'left' : 'right'} delay={40}>
						<Row xs={1} sm={2} md={1} lg={2}>
							{mobiles.map((mobile, index) => (
								<Col key={index}>
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
												<a href={`tel:${mobile.contact}`}>{mobile.contact}</a>
											</Container>
										}
										isCentered={false}
										styles={{
											container: {
												'--size': ICON.SIZE,
												marginBottom: '0.5rem',
											},
										}}
									/>
								</Col>
							))}
						</Row>
					</Fade>
				)}

				{/* Emails */}
				{emails.length > 0 && (
					<Fade direction={lang === 'en' ? 'left' : 'right'} delay={40}>
						<Row xs={1} sm={2} md={1} lg={2}>
							{emails.map((email, index) => (
								<Col key={index}>
									<IconTextComponent
										icon={<BsEnvelope />}
										text={
											<Container fluid key={index} className='value p-0'>
												<a href={`mailto:${email.contact}`}>{email.contact}</a>
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
					</Fade>
				)}

				{/* Socials */}
				{socials.length > 0 && (
					<Fade direction='down' delay={40}>
						<Col
							xs={12}
							as={ListGroup}
							horizontal
							className='social-accounts d-flex align-items-center justify-content-center px-0 pt-4'
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
					</Fade>
				)}
			</Row>
		</Container>
	);
};

export default ContactInfoComponent;
