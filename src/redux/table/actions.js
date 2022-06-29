export const GET = "[table] GET";
export const GETTABLE = "[table] GETTABLE";
export const ADD = "[table] ADD";
export const PATCH = "[table] PATCH";
export const UPDATE = "[table] UPDATE";
export const REMOVE = "[table] REMOVE";
export const EDIT = "[table] EDIT";

export const GET_SUCCESS = "[table] GET success";
export const GETTABLE_SUCCESS = "[table] GETTABLE success";
export const ADD_SUCCESS = "[table] ADD success";
export const PATCH_SUCCESS = "[table] PATCH success";
export const UPDATE_SUCCESS = "[table] UPDATE success";
export const REMOVE_SUCCESS = "[table] REMOVE success";

export const GET_ERROR = "[table] GET error";
export const GETTABLE_ERROR = "[table] GETTABLE error";
export const ADD_ERROR = "[table] ADD error";
export const PATCH_ERROR = "[table] PATCH error";
export const UPDATE_ERROR = "[table] UPDATE error";
export const REMOVE_ERROR = "[table] REMOVE error";

export const get = (options) => ({
	type: GET,
	options: options,
	success: GET_SUCCESS,
	error: GET_ERROR,
});

export const getTable = (options) => ({
	type: GETTABLE,
	options: options,
	success: GETTABLE_SUCCESS,
	error: GETTABLE_ERROR,
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
