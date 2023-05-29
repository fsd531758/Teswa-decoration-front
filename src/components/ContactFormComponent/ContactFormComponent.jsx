import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import {
	Col,
	Container,
	FormGroup,
	FormLabel,
	FormText,
	Row,
	Spinner,
} from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { BASE_URL } from './../../helpers/general';

// Redux

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './ContactFormComponent.styles.css';

// Components
import ButtonComponent from './../../components/ButtonComponent/ButtonComponent';

const ContactFormComponent = () => {
	// i18next
	const { lang } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

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
				// reset form fields
				resetForm(true);

				displayToast(response.status, response.data.message);
			})
			.catch((error) => {
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
			})
			.finally(() => {
				// reset submitting
				setSubmitting(false);
			});
	};

	return (
		<Container
			fluid
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			className='contact-form-component px-0'
		>
			<Row xs={1}>
				<Col className='d-flex justify-content-center align-items-center'>
					<Formik
						initialValues={{
							fname: '',
							lname: '',
							email: '',
							phone: '',
							message: '',
						}}
						validationSchema={contactSchema}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							setSubmitting(true);
							submitContactForm(values, setSubmitting, resetForm, lang);
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
							setFieldValue,
						}) => (
							<Form
								onSubmit={(event) => {
									event.preventDefault();
									handleSubmit();
								}}
							>
								<Row xs={1} sm={2} md={1} lg={2} className='overflow-hidden'>
									{/* First Name */}
									<Fade direction={lang === 'en' ? 'left' : 'right'} delay={20}>
										<FormGroup as={Col}>
											<FormLabel
												htmlFor='first_name'
												className='text-capitalize'
											>
												{t('words:labels.firstName')}
											</FormLabel>
											<Field
												id='first_name'
												type='text'
												innerRef={firstNameRef}
												placeholder={t('words:placeholders.firstName')}
												autoComplete='off'
												name='fname'
												onChange={(event) => {
													handleChange(event);
												}}
												onBlur={handleBlur}
												value={values.fname}
												className={`form-control text-capitalize ${
													touched.fname && errors.fname ? 'is-invalid' : ''
												}`}
											/>
											<ErrorMessage
												component='div'
												name='fname'
												className='invalid-feedback'
											/>
										</FormGroup>
									</Fade>

									{/* Last Name */}
									<Fade direction={lang === 'en' ? 'right' : 'left'} delay={20}>
										<FormGroup
											as={Col}
											className={`mb-3 animate__animated ${
												lang === 'en'
													? 'animate__fadeInRight'
													: 'animate__fadeInLeft'
											} animate__delay-1s`}
											style={{
												'--animate-delay': '0.5s',
											}}
										>
											<FormLabel
												htmlFor='last_name'
												className='text-capitalize'
											>
												{t('words:labels.lastName')}
											</FormLabel>
											<Field
												id='last_name'
												type='text'
												innerRef={lastNameRef}
												placeholder={t('words:placeholders.lastName')}
												autoComplete='off'
												name='lname'
												onChange={(event) => {
													handleChange(event);
												}}
												onBlur={handleBlur}
												value={values.lname}
												className={`form-control text-capitalize ${
													touched.lname && errors.lname ? 'is-invalid' : ''
												}`}
											/>
											<ErrorMessage
												component='div'
												name='lname'
												className='invalid-feedback'
											/>
										</FormGroup>
									</Fade>

									{/* Email */}
									<Fade direction={lang === 'en' ? 'left' : 'right'} delay={40}>
										<FormGroup
											as={Col}
											className={`mb-3 animate__animated ${
												lang === 'en'
													? 'animate__fadeInLeft'
													: 'animate__fadeInRight'
											} animate__delay-1s`}
											style={{
												'--animate-delay': '0.75s',
											}}
										>
											<FormLabel htmlFor='email' className='text-capitalize'>
												{t('words:labels.email')}
											</FormLabel>
											<Field
												id='email'
												type='email'
												innerRef={emailRef}
												placeholder='mail@domain.com'
												autoComplete='off'
												name='email'
												onChange={(event) => {
													handleChange(event);
												}}
												onBlur={handleBlur}
												value={values.email}
												className={`form-control ${
													touched.email && errors.email ? 'is-invalid' : ''
												}`}
											/>
											<ErrorMessage
												component='div'
												name='email'
												className='invalid-feedback'
											/>
										</FormGroup>
									</Fade>

									{/* Mobile Number */}
									<Fade direction={lang === 'en' ? 'right' : 'left'} delay={40}>
										<FormGroup
											as={Col}
											className={`mb-3 animate__animated ${
												lang === 'en'
													? 'animate__fadeInRight'
													: 'animate__fadeInLeft'
											} animate__delay-1s`}
											style={{
												'--animate-delay': '0.75s',
											}}
										>
											<FormLabel htmlFor='phone' className='text-capitalize'>
												{t('words:labels.phone')}
											</FormLabel>
											<Field name='phone' innerRef={phoneRef}>
												{(field, form, meta) => (
													<>
														<PhoneInput
															{...field}
															id='phone'
															dir='ltr'
															ref={phoneRef}
															placeholder='56 123 0620'
															defaultCountry='SA'
															autoComplete='off'
															onChange={(event) => {
																setFieldValue('phone', event);
															}}
															onBlur={handleBlur}
															value={values.phone}
															className={`${
																field.meta.touched && field.meta.error
																	? 'is-invalid'
																	: ''
															}`}
														/>
														{field.meta.error && (
															<Container fluid className='invalid-feedback p-0'>
																{field.meta.error}
															</Container>
														)}
													</>
												)}
											</Field>
										</FormGroup>
									</Fade>
								</Row>

								<Row xs={1} className='overflow-hidden'>
									{/* Message */}
									<Fade direction='down' delay={60}>
										<FormGroup
											as={Col}
											className={`mb-3 position-relative animate__animated ${
												lang === 'en'
													? 'animate__fadeInLeft'
													: 'animate__fadeInRight'
											} animate__delay-1s`}
											style={{
												'--animate-delay': '1s',
											}}
										>
											<FormLabel htmlFor='message' className='text-capitalize'>
												{t('words:labels.message')}
											</FormLabel>
											<Field
												id='message'
												as='textarea'
												innerRef={messageRef}
												rows={8}
												style={{
													resize: 'none',
												}}
												placeholder={t('words:placeholders.message')}
												autoComplete='off'
												name='message'
												onChange={(event) => {
													handleChange(event);
												}}
												onBlur={handleBlur}
												value={values.message}
												className={`form-control text-capitalize ${
													touched.message && errors.message ? 'is-invalid' : ''
												}`}
											/>
											<FormText className='text-muted'>
												<span className={`${lang === 'en' ? 'me-1' : 'ms-1'}`}>
													{new Intl.NumberFormat(
														lang === 'en' ? 'en-US' : 'ar-EG',
														{}
													).format(values.message.length)}
												</span>
												<span>
													{t('words:hints.message.length', {
														max: new Intl.NumberFormat(
															lang === 'en' ? 'en-US' : 'ar-EG',
															{}
														).format(500),
													})}
												</span>
											</FormText>
											<ErrorMessage
												component='div'
												name='message'
												className='invalid-feedback'
											/>
										</FormGroup>
									</Fade>
								</Row>

								{/* Submit Form */}
								<Zoom delay={80}>
									<FormGroup
										className='d-flex justify-content-center mt-3 animate__animated animate__zoomIn animate__delay-1s'
										style={{
											'--animate-delay': '1.25s',
										}}
									>
										<ButtonComponent
											text={
												isSubmitting
													? t('words:buttons.sending')
													: t('words:buttons.submitMessage')
											}
											icon={
												isSubmitting ? (
													<Spinner
														animation='grow'
														variant='dark'
														size='sm'
														className={`${lang === 'en' ? 'me-2' : 'ms-2'}`}
													/>
												) : (
													<></>
												)
											}
											type='submit'
											disabled={isSubmitting ? true : false}
										/>
									</FormGroup>
								</Zoom>
							</Form>
						)}
					</Formik>
				</Col>
			</Row>
		</Container>
	);
};

export default ContactFormComponent;
