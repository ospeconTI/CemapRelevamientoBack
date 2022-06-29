export const GET = "[detalleImagenes] GET";
export const GETXCEMAP = "[detalleImagenes] GETXCEMAP";
export const GETXIDDETALLE = "[detalleImagenes] GETXIDDETALLE";
export const ADD = "[detalleImagenes] ADD";
export const PATCH = "[detalleImagenes] PATCH";
export const UPDATE = "[detalleImagenes] UPDATE";
export const REMOVE = "[detalleImagenes] REMOVE";

export const GET_SUCCESS = "[detalleImagenes] GET success";
export const GETXCEMAP_SUCCESS = "[detalleImagenes] GETXCEMAP success";
export const GETXIDDETALLE_SUCCESS = "[detalleImagenes] GETXIDDETALLE success";
export const ADD_SUCCESS = "[detalleImagenes] ADD success";
export const PATCH_SUCCESS = "[detalleImagenes] PATCH success";
export const UPDATE_SUCCESS = "[detalleImagenes] UPDATE success";
export const REMOVE_SUCCESS = "[detalleImagenes] REMOVE success";

export const GET_ERROR = "[detalleImagenes] GET error";
export const GETXCEMAP_ERROR = "[detalleImagenes] GETXCEMAP error";
export const GETXIDDETALLE_ERROR = "[detalleImagenes] GETXIDDETALLE error";
export const ADD_ERROR = "[detalleImagenes] ADD error";
export const PATCH_ERROR = "[detalleImagenes] PATCH error";
export const UPDATE_ERROR = "[detalleImagenes] UPDATE error";
export const REMOVE_ERROR = "[detalleImagenes] REMOVE error";

export const get = (options) => ({
	type: GET,
	options: options,
});

export const getXCemap = (IdCemap) => ({
	type: GETXCEMAP,
	IdCemap: IdCemap,
});

export const getXIdDetalle = (IdDetalle) => ({
	type: GETXIDDETALLE,
	IdDetalle: IdDetalle,
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
