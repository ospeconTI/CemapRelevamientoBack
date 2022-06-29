export const GET = "[onBoarding] GET";
export const ADD = "[onBoarding] ADD";
export const PATCH = "[onBoarding] PATCH";
export const UPDATE = "[onBoarding] UPDATE";
export const REMOVE = "[onBoarding] REMOVE";
export const EDIT = "[onBoarding] EDIT";

export const GET_SUCCESS = "[onBoarding] GET success";
export const ADD_SUCCESS = "[onBoarding] ADD success";
export const PATCH_SUCCESS = "[onBoarding] PATCH success";
export const UPDATE_SUCCESS = "[onBoarding] UPDATE success";
export const REMOVE_SUCCESS = "[onBoarding] REMOVE success";

export const GET_ERROR = "[onBoarding] GET error";
export const ADD_ERROR = "[onBoarding] ADD error";
export const PATCH_ERROR = "[onBoarding] PATCH error";
export const UPDATE_ERROR = "[onBoarding] UPDATE error";
export const REMOVE_ERROR = "[onBoarding] REMOVE error";

export const get = (options) => ({
	type: GET,
	options: options,
});

export const add = (body, token) => ({
	type: ADD,
	body: body,
	token: token,
});

export const update = (id, body, token) => ({
	type: UPDATE,
	id: id,
	body: body,
	token: token,
});

export const patch = (id, body, token) => ({
	type: PATCH,
	id: id,
	body: body,
	token: token,
});

export const remove = (id, token) => ({
	type: REMOVE,
	id: id,
	token: token,
});

export const edit = (modo, item) => ({
	type: EDIT,
	item: item || {
		Descripcion: 0,
		Activo: 1,
	},
	modo: modo,
});
