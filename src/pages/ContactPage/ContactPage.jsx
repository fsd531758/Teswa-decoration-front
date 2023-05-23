import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { BASE_URL } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// Redux

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ContactPage.styles.css';

// Components
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';

const ContactPage = () => {
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
			title: t('words:breadcrumb.contactUs'),
			href: '',
			isActive: true,
		},
	];

	// Redux

	// Refs
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const emailRef = useRef(null);
	const phoneRef = useRef(null);
	const messageRef = useRef(null);

	// Schema
	const contactSchema = object().shape({
		fname: string()
			.min(2, t('validations:firstName.min', { min: 2 }))
			.max(100, t('validations:firstName.max', { max: 100 }))
			.required(t('validations:firstName.required')),
		lname: string()
			.min(2, t('validations:lastName.min', { min: 2 }))
			.max(100, t('validations:lastName.max', { max: 100 }))
			.required(t('validations:lastName.required')),
		email: string()
			.email(t('validations:email.format'))
			.required(t('validations:email.required')),
		phone: string()
			.min(6, t('validations:phone.min', { min: 6 }))
			.matches(/^[0-9+]+/, t('validations:phone.format'))
			.required(t('validations:phone.required')),
		message: string()
			.min(2, t('validations:message.min', { min: 2 }))
			.max(500, t('validations:message.max', { max: 500 }))
			.required(t('validations:message.required')),
	});

	// Handle Form Errors
	const displayErrors = (fieldName) => {
		switch (fieldName) {
			case 'fname':
				firstNameRef.current.classList.add('is-invalid');
				break;

			case 'lname':
				lastNameRef.current.classList.add('is-invalid');
				break;

			case 'email':
				emailRef.current.classList.add('is-invalid');
				break;

			case 'phone':
				phoneRef.current.classList.add('is-invalid');
				break;

			case 'message':
				messageRef.current.classList.add('is-invalid');
				break;

			default:
				break;
		}
	};

	// Display Form Errors
	const displayToast = (statusCode, message) => {
		switch (statusCode) {
			case 200:
				toast.success(message, {
					toastId: message,
				});
				break;
			case 400:
				toast.error(message, {
					toastId: message,
				});
				break;
			default:
				toast.error(t('sentences:errors.default'));
				break;
		}
	};

	const submitContactForm = async (
		values,
		setSubmitting,
		resetForm,
		language = 'ar'
	) => {
		axios({
			method: 'POST',
			baseURL: BASE_URL.demo,
			url: '/contact',
			data: {
				fname: values.fname,
				lname: values.lname,
				email: values.email,
				phone: values.phone,
				message: values.message,
			},
			headers: { locale: language, 'Content-Type': 'multipart/form-data' },
		})
			.then((response) => {
				// reset submitting
				setSubmitting(false);
				resetForm(true);

				displayToast(response.status, response.data.message);
			})
			.catch((error) => {
				// reset submitting
				setSubmitting(false);
				if (error.response.data.data !== {}) {
					Object.keys(error.response.data.data).forEach((key) => {
						displayErrors(key);
						displayToast(
							error.response.status,
							error.response.data.data[key][0]
						);
					});
				} else {
					displayToast(error.response.status, error.response.data.message);
				}
			});
	};

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
			id='contact-us-page'
			className='page px-0'
			style={{
				minHeight: '100vh',
			}}
		>
			{/* Breadcrumb */}
			<BreadcrumbComponent
				title={t('words:breadcrumb.contactUs')}
				items={breadcrumbItems}
			/>

			{/* Content */}
			<Container>ContactPage</Container>
		</Container>
	);
};

export default ContactPage;
