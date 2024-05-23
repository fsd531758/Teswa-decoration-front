// Backend Base URL
export const BASE_URL = {
	demo: 'http://localhost:8000/api',
	local: 'https://art-ad.com/back/api',
};

// Replace IDs found within URL
export const REGEX = new RegExp(
	':lang|:section_id|:category_id|:product_id|service_id',
	'gim'
);
export const replacePathVariables = (matched, data) => {
	let result = '';
	switch (matched) {
		case ':lang':
			result = data.lang;
			break;
		case ':section_id':
			result = data.section_id;
			break;
		case ':category_id':
			result = data.category_id;
			break;
		case ':product_id':
			result = data.product_id;
			break;
		case ':service_id':
			result = data.service_id;
			break;
		default:
			result = 'modify_general_file_within_helpers_directory';
	}

	return result;
};

// Check URLs entered via CKEditor
export const checkURL = (urlLink) => {
	return urlLink.includes('http://') || urlLink.includes('https://')
		? urlLink
		: `https://${urlLink}`;
};

// Modify Google Maps URL
export const fixGoogleMaps = (urlLink) => {
	return urlLink.replace('www.google.com', 'maps-api-ssl.google.com');
};

// Trim empty content entered via CKEditor
export const trimEmptyTags = (htmlText, tag = 'p') => {
	const re = new RegExp(`<${tag}>&nbsp;</${tag}>`, 'gi');

	return htmlText.replace(re, '');
};
