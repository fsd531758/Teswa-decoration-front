export const isMultilingual = true;

export const routes = {
	fallback: isMultilingual ? '/ar' : '/',
	notFound: isMultilingual ? '/:lang/*' : '/*',

	home: isMultilingual ? '/:lang' : '/',

	about: isMultilingual ? '/:lang/about-us' : '/about-us',

	contact: isMultilingual ? '/:lang/contact-us' : '/contact-us',

	quoteRequest: isMultilingual ? '/:lang/quote-request' : '/quote-request',

	services: {
		root: isMultilingual ? '/:lang/services' : '/services',

		// ! NOT USED AT ALL
		// single: isMultilingual
		// 	? '/:lang/services/:service_id'
		// 	: '/services/:service_id',
	},

	sections: {
		// ! NOT USED AT ALL
		// root: isMultilingual ? '/:lang/sections' : '/sections',

		single: isMultilingual
			? '/:lang/sections/:section_id'
			: '/sections/:section_id',
	},

	categories: {
		// ! USE (sections.single) INSTEAD
		// root: isMultilingual
		// 	? '/:lang/sections/:section_id/categories'
		// 	: '/sections/:section_id/categories',

		single: isMultilingual
			? '/:lang/sections/:section_id/categories/:category_id'
			: '/sections/:section_id/categories/:category_id',
	},

	products: {
		// ! USE (categories.single) INSTEAD
		// root: isMultilingual
		// 	? '/:lang/sections/:section_id/categories/:category_id/products'
		// 	: '/sections/:section_id/categories/:category_id/products',

		single: isMultilingual
			? '/:lang/sections/:section_id/categories/:category_id/products/:product_id'
			: '/sections/:section_id/categories/:category_id/products/:product_id',
	},
};
