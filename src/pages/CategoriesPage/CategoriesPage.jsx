import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';
import { REGEX, replacePathVariables } from './../../helpers/general';
import { routes } from './../../routes/index.routes';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchSectionCategories } from './../../store/reducers/sections.reducer';

// i18next
import { useTranslation } from 'react-i18next';

// Styles
import './CategoriesPage.styles.css';

// Components
import BreadcrumbComponent from './../../components/BreadcrumbComponent/BreadcrumbComponent';
import ButtonComponent from './../../components/ButtonComponent/ButtonComponent';
import CategoryCardComponent from './../../components/CategoryCardComponent/CategoryCardComponent';
import LoadingComponent from './../../components/LoadingComponent/LoadingComponent';
import MetaTagsComponent from './../../components/MetaTagsComponent/MetaTagsComponent';

const CategoriesPage = () => {
	// i18next
	const { lang, section_id } = useParams();
	const { t, i18n } = useTranslation();
	useEffect(() => {
		i18n.changeLanguage(lang ?? 'ar');
		// eslint-disable-next-line
	}, [lang]);

	const location = useLocation();

	const breadcrumbItems = [
		{
			title: t('words:breadcrumb.home'),
			href: routes.home.replace(REGEX, function (matched) {
				return replacePathVariables(matched, {
					lang: lang,
				});
			}),
			isActive: false,
		},
		{
			title: t('words:breadcrumb.categories'),
			href: '',
			isActive: true,
		},
	];

	// Redux
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			fetchSectionCategories({
				language: lang,
				searchParams: { id: section_id },
			})
		);
		// eslint-disable-next-line
	}, [lang, section_id]);

	const {
		sectionCategories: { title, categories },
		isSectionCategoriesLoading,
	} = useSelector((state) => state.sections);

	// Scroll To Top On Initial Render
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [lang]);

	return isSectionCategoriesLoading ? (
		<LoadingComponent />
	) : (
		<Container
			fluid
			lang={lang ?? 'ar'}
			dir={lang === 'en' ? 'ltr' : 'rtl'}
			id='categories-page'
			className='page px-0'
			style={{
				minHeight: '100vh',
			}}
		>
			{/* MetaData */}
			<MetaTagsComponent pageTitle={t('words:windowTab.categories')} />

			{/* Breadcrumb */}
			<BreadcrumbComponent title={title} items={breadcrumbItems} />

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
				<Row className='g-4'>
					{categories.length > 0 ? (
						categories.map((category, index) => (
							<Col key={index} xs={12} md={6} xl={4}>
								<CategoryCardComponent category={category} />
							</Col>
						))
					) : (
						<Col xs={12} className='error'>
							{t('sentences:errors.noData', {
								title: t('words:errors.categories'),
							})}
						</Col>
					)}
				</Row>
			</Container>
		</Container>
	);
};

export default CategoriesPage;
