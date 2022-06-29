export const GET = "[combos] GET";

export const GET_SUCCESS = "[combos] GET success";

export const GET_ERROR = "[combos] GET error";

export const get = (options) => ({
	type: GET,
	options: options,
});
