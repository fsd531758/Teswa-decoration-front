import React, { useEffect } from 'react';
import { Container, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// i18next
import { useTranslation } from 'react-i18next';

// Images
import WhatsappIcon from './../../assets/images/logos/whatsapp.png';

// Styles
import './WhatsappIconComponent.styles.css';

// Components

const WhatsappIconComponent = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	// Redux
	const {
		settings: { whatsapp },
	} = useSelector((state) => state.settingsData);

	return (
		<OverlayTrigger
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			placement={lang === 'en' ? 'left' : 'right'}
			trigger={['hover', 'focus']}
			overlay={
				<Tooltip id='whatsapp-tooltip' className='text-capitalize text-nowrap'>
					{t('sentences:contactUsThroughWhatsapp')}
				</Tooltip>
			}
		>
			<Container
				fluid
				lang={lang ?? 'ar'}
				dir={lang === 'en' ? 'ltr' : 'rtl'}
				id='whatsapp-icon-component'
				className='p-0 animate__animated animate__rollIn animate__delay-1s'
				style={{
					'--animate-delay': '1',
				}}
			>
				<a
					href={`https://wa.me/${whatsapp}`}
					target='_blank'
					rel='noreferrer'
					className='d-block'
				>
					<Image
						fluid
						src={WhatsappIcon}
						alt='whatsapp icon'
						className='text-capitalize'
					/>
				</a>
			</Container>
		</OverlayTrigger>
	);
};

export default WhatsappIconComponent;
