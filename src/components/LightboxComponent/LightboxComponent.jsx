import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// i18n
import { useTranslation } from 'react-i18next';

// LightBox
import Lightbox from 'yet-another-react-lightbox';
import {
	Counter,
	Fullscreen,
	Slideshow,
	Thumbnails,
	Zoom,
} from 'yet-another-react-lightbox/plugins';

// Styles
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';
import './LightboxComponent.styles.css';

// Components

const LightboxComponent = ({
	gallery,
	lightbox,
	setLightbox,
	pathname = '<object>.image',
}) => {
	const { lang } = useParams();
	const { i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	// Refs
	const thumbnailsRef = useRef(null);
	const slideshowRef = useRef(null);
	const fullscreenRef = useRef(null);
	const zoomRef = useRef(null);

	return (
		<Lightbox
			plugins={[Thumbnails, Counter, Slideshow, Fullscreen, Zoom]}
			open={lightbox.isOpen}
			close={() =>
				setLightbox({
					isOpen: !lightbox.isOpen,
					index: 0,
				})
			}
			index={lightbox.index}
			slides={gallery.map((galleryItem, index) => ({
				type: 'image',
				src: pathname.includes('.image')
					? galleryItem.image
					: pathname.includes('.path')
					? galleryItem.path
					: galleryItem,
				alt: `image #${index}`,
				imageFit: 'contain',
			}))}
			counter={{
				style: {
					left: lang === 'en' ? 0 : 'unset',
					right: lang === 'en' ? 'unset' : 0,
					bottom: 0,
					top: 'unset',
				},
			}}
			thumbnails={{
				ref: thumbnailsRef,
				showToggle: true,
				imageFit: 'cover',
			}}
			slideshow={{
				ref: slideshowRef,
				autoplay: false,
				delay: 2000,
			}}
			fullscreen={{ ref: fullscreenRef }}
			zoom={{ ref: zoomRef, scrollToZoom: true }}
			on={{
				click: () => {
					// Thumbnail
					(thumbnailsRef.current?.visible
						? thumbnailsRef.current?.hide
						: thumbnailsRef.current?.show)?.();

					// Slideshow
					(slideshowRef.current?.playing
						? slideshowRef.current?.pause
						: slideshowRef.current?.play)?.();

					// Fullscreen
					fullscreenRef.current?.enter();

					// Zoom
					zoomRef.current?.zoomIn();
				},
			}}
		/>
	);
};

export default LightboxComponent;
