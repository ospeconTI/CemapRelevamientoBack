import { GET, GET_SUCCESS, GET_ERROR, ADD, ADD_SUCCESS, ADD_ERROR, UPDATE, UPDATE_SUCCESS, UPDATE_ERROR, PATCH, PATCH_SUCCESS, PATCH_ERROR, REMOVE, REMOVE_SUCCESS, REMOVE_ERROR, USUARIO_ESTA, USUARIO_ESTA_SUCCESS, USUARIO_ESTA_ERROR } from "../usuarios/actions";

import { RESTAdd, RESTDelete, RESTUpdate, RESTPatch } from "../rest/actions";

import { apiRequest } from "../api/actions";
import { fetchJSON } from "../../libs/fetchJSON";
import { fetchOData } from "../../libs/fetchOData";

export const get =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET) {
			//fetchJSON(dispatch, "usuarios.txt", GET_SUCCESS, GET_ERROR);
			fetchOData(dispatch, "https://www.uocra.net/RelevamientoCemaps/Usuarios?", GET_SUCCESS, GET_ERROR);
		}
	};

export const usuarioEsta =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === USUARIO_ESTA) {
			//fetchJSON(dispatch, "usuarios.txt", GET_SUCCESS, GET_ERROR);
			fetchOData(dispatch, "https://www.uocra.net/RelevamientoCemaps/Usuarios?$filter=Usuario eq '" + action.usuario + "' and Password eq '" + action.password + "'", USUARIO_ESTA_SUCCESS, USUARIO_ESTA_ERROR);
		}
	};

export const add =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD) {
			dispatch(RESTAdd(usuarioFetch, action.body, ADD_SUCCESS, ADD_ERROR, action.token));
		}
	};

export const update =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === UPDATE) {
			dispatch(RESTUpdate(usuarioFetch, action.id, action.body, UPADTE_SUCCESS, UPDATE_ERROR, action.token));
		}
	};

export const patch =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === PATCH) {
			dispatch(RESTPatch(usuarioFetch, action.id, action.body, PATCH_SUCCESS, PATCH_ERROR, action.token));
		}
	};

export const remove =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === REMOVE) {
			dispatch(RESTDelete(usuarioFetch, action.id, REMOVE_SUCCESS, REMOVE_ERROR, action.token));
		}
	};

export const processGet =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET_SUCCESS) {
		}
	};

export const processComand =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD_SUCCESS || action.type === UPDATE_SUCCESS || action.type === REMOVE_SUCCESS || action.type === PATCH_SUCCESS || action.type == USUARIO_ESTA_SUCCESS) {
		}
	};

export const processError =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET_ERROR || action.type === ADD_ERROR || action.type === UPDATE_ERROR || action.type === REMOVE_ERROR || action.type === PATCH_ERROR || action.type == USUARIO_ESTA_ERROR) {
		}
	};

export const middleware = [get, add, update, patch, remove, processGet, processComand, processError, usuarioEsta];
