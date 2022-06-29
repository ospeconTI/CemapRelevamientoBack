import { GET, GET_SUCCESS, GET_ERROR, GETXCEMAP, GETXCEMAP_SUCCESS, GETXCEMAP_ERROR, GETXIDDETALLE, GETXIDDETALLE_SUCCESS, GETIDDETALLE_ERROR, ADD, ADD_SUCCESS, ADD_ERROR, UPDATE, UPDATE_SUCCESS, UPDATE_ERROR, PATCH, PATCH_SUCCESS, PATCH_ERROR, REMOVE, REMOVE_SUCCESS, REMOVE_ERROR, GETXIDDETALLE_ERROR } from "../detalleImagenes/actions";

import { RESTAdd, RESTDelete, RESTUpdate, RESTPatch } from "../rest/actions";

import { apiRequest, apiAction } from "../api/actions";

import { EncuestasOdataDetalleImagenes } from "../fetchs";
import { fetchOData } from "../../libs/fetchOData";

export const get =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET) {
			let sele = "";
			if (action.options) {
				sele = "https://www.uocra.net/RelevamientoCemaps/odata/DetalleImagenes?$filter=" + action.options + "&$orderby=Id desc";
			} else {
				sele = "https://www.uocra.net/RelevamientoCemaps/odata/DetalleImagenes?$orderby=Id desc";
			}
			fetchOData(dispatch, sele, GET_SUCCESS, GET_ERROR);
			//dispatch(apiRequest(EncuestasOdataDetalleImagenes, action.options, GET_SUCCESS, GET_ERROR));
		}
	};
export const getXCemap =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GETXCEMAP) {
			//dispatch(apiRequest(EncuestasOdataDetalleImagenes, action.options, GET_SUCCESS, GET_ERROR));
			//let sele = "https://www.uocra.net/RelevamientoCemaps/odata/DetalleImagenes?$select=Foto&$expand=Detalle($select=IdCabecera;$expand=Cabecera($select=Id;$filter=IdCemap%20eq%20" + action.IdCemap + "))";
			let sele = "https://www.uocra.net/RelevamientoCemaps/odata/DetalleImagenes?$select=Id,IdDetalle,Foto&$expand=Detalle($select=IdCabecera;$expand=Cabecera,Combo,Opciones)&$filter=Detalle/Cabecera/IdCemap eq " + action.IdCemap + "&$orderby=Detalle/Combo/Id, Id";
			fetchOData(dispatch, sele, GETXCEMAP_SUCCESS, GETXCEMAP_ERROR);
		}
	};

export const getXIdDetalle =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GETXIDDETALLE) {
			let sele = "https://www.uocra.net/RelevamientoCemaps/odata/DetalleImagenes?$select=Id,IdDetalle,Foto&$expand=Detalle($select=IdCabecera;$expand=Cabecera,Combo,Opciones)&$filter=IdDetalle eq " + action.IdDetalle + "&$orderby=Id desc";
			fetchOData(dispatch, sele, GETXIDDETALLE_SUCCESS, GETXIDDETALLE_ERROR);
		}
	};

export const add =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD) {
			//			dispatch(RESTAdd(EncuestasOdataDetalleImagenes, action.body, ADD_SUCCESS, ADD_ERROR, action.token));
			dispatch(apiAction(EncuestasOdataDetalleImagenes, action.body, null, null, ADD_SUCCESS, ADD_ERROR));
		}
	};

export const update =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === UPDATE) {
			dispatch(RESTUpdate(EncuestasOdataDetalleImagenes, action.id, action.body, UPADTE_SUCCESS, UPDATE_ERROR, action.token));
		}
	};

export const patch =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === PATCH) {
			dispatch(RESTPatch(EncuestasOdataDetalleImagenes, action.id, action.body, PATCH_SUCCESS, PATCH_ERROR, action.token));
		}
	};

export const remove =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === REMOVE) {
			dispatch(RESTDelete(EncuestasOdataDetalleImagenes, action.id, REMOVE_SUCCESS, REMOVE_ERROR, action.token));
		}
	};

export const processGet =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET_SUCCESS || action.type === GETXCEMAP_SUCCESS || action.type === GETXIDDETALLE_SUCCESS) {
		}
	};

export const processComand =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD_SUCCESS || action.type === UPDATE_SUCCESS || action.type === REMOVE_SUCCESS || action.type === PATCH_SUCCESS) {
		}
	};

export const processError =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET_ERROR || action.type === GETXCEMAP_ERROR || action.type === GETXIDDETALLE_ERROR || action.type === ADD_ERROR || action.type === UPDATE_ERROR || action.type === REMOVE_ERROR || action.type === PATCH_ERROR) {
		}
	};

export const middleware = [get, getXCemap, getXIdDetalle, add, update, patch, remove, processGet, processComand, processError];
