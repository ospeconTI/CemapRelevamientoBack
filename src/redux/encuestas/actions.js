export const GET = "[encuestas] GET";
export const GET_CEMAP_COMBO_OPCION = "[encuestas] GET_CEMAP_COMBO_OPCION";
export const ADD = "[encuestas] ADD";
export const ADD_CABECERA = "[encuestas] ADD_CABECERA";
export const ADD_DETALLE = "[encuestas] ADD_DETALLE";
export const ADD_DETALLE_ACTUALIZAR = "[encuestas] ADD_DETALLE_ACTUALIZAR";
export const PATCH = "[encuestas] PATCH";
export const UPDATE = "[encuestas] UPDATE";
export const REMOVE = "[encuestas] REMOVE";

export const GET_SUCCESS = "[encuestas] GET success";
export const GET_CEMAP_COMBO_OPCION_SUCCESS = "[encuestas] GET_CEMAP_COMBO_OPCION success";
export const ADD_SUCCESS = "[encuestas] ADD success";
export const ADD_CABECERA_SUCCESS = "[encuestas] ADD_CABECERA success";
export const ADD_DETALLE_SUCCESS = "[encuestas] ADD_DETALLE success";
export const ADD_DETALLE_ACTUALIZAR_SUCCESS = "[encuestas] ADD_DETALLE_ACTUALIZAR success";
export const PATCH_SUCCESS = "[encuestas] PATCH success";
export const UPDATE_SUCCESS = "[encuestas] UPDATE success";
export const REMOVE_SUCCESS = "[encuestas] REMOVE success";

export const GET_ERROR = "[encuestas] GET error";
export const GET_CEMAP_COMBO_OPCION_ERROR = "[encuestas] GET_CEMAP_COMBO_OPCION error";
export const ADD_ERROR = "[encuestas] ADD error";
export const ADD_CABECERA_ERROR = "[encuestas] ADD_CABECERA error";
export const ADD_DETALLE_ERROR = "[encuestas] ADD_DETALLE error";
export const ADD_DETALLE_ACTUALIZAR_ERROR = "[encuestas] ADD_DETALLE_ACTUALIZAR error";
export const PATCH_ERROR = "[encuestas] PATCH error";
export const UPDATE_ERROR = "[encuestas] UPDATE error";
export const REMOVE_ERROR = "[encuestas] REMOVE error";

export const get = (options) => ({
	type: GET,
	options: options,
});

export const get_Cemap_Combo_Opcion = (IdCemap, IdCombo, IdOpcion) => ({
	type: GET_CEMAP_COMBO_OPCION,
	IdCemap: IdCemap,
	IdCombo: IdCombo,
	IdOpcion: IdOpcion,
});

export const add = (body, token) => ({
	type: ADD,
	body: body,
	token: token,
});

export const addCabecera = (body, token) => ({
	type: ADD_CABECERA,
	body: body,
	token: token,
});

export const addDetalle = (body, token) => ({
	type: ADD_DETALLE,
	body: body,
	token: token,
});

export const addDetalleActualizar = (body, token) => ({
	type: ADD_DETALLE_ACTUALIZAR,
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
