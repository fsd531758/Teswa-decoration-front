import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

const MetaTagsComponent = ({ pageTitle = '' }) => {
	const { lang } = useParams();

	// Redux
	const {
		settings: {
			meta_title,
			meta_description,
			logo,
			meta_keywords,
			website_title,
			favicon,
		},
	} = useSelector((state) => state.settingsData);

	return (
		<HelmetProvider>
			<Helmet
				htmlAttributes={{
					lang: lang ?? 'ar',
					// dir: lang === 'en' ? 'ltr' : 'rtl',    // // crashes within <Marquee></Marquee>
				}}
			>
				{/* Open Graph Meta Tags */}
				<meta property='og:title' content={meta_title} />
				<meta property='og:description' content={meta_description} />
				<meta property='og:image' content={logo} />

				{/* Meta Tags */}
				<meta name='title' content={meta_title} />
				<meta name='description' content={meta_description} />
				<meta name='keywords' content={meta_keywords} />

				{/* Tab Title */}
				<title>
					{pageTitle ? `${pageTitle} | ${website_title}` : `${website_title}`}
				</title>

				{/* Favicon */}
				<link
					rel='shortcut icon'
					href={require('./../../assets/images/logos/logo.png') ?? favicon}
				/>
			</Helmet>
		</HelmetProvider>
	);
};

export default MetaTagsComponent;
