import { GET, GET_SUCCESS, GET_ERROR, GET_CEMAP_COMBO_OPCION, GET_CEMAP_COMBO_OPCION_SUCCESS, GET_CEMAP_COMBO_OPCION_ERROR, ADD, ADD_SUCCESS, ADD_ERROR, ADD_CABECERA, ADD_CABECERA_SUCCESS, ADD_CABECERA_ERROR, ADD_DETALLE, ADD_DETALLE_SUCCESS, ADD_DETALLE_ERROR, ADD_DETALLE_ACTUALIZAR, ADD_DETALLE_ACTUALIZAR_SUCCESS, ADD_DETALLE_ACTUALIZAR_ERROR, UPDATE, UPDATE_SUCCESS, UPDATE_ERROR, PATCH, PATCH_SUCCESS, PATCH_ERROR, REMOVE, REMOVE_SUCCESS, REMOVE_ERROR } from "../encuestas/actions";

import { RESTAdd, RESTDelete, RESTUpdate, RESTPatch } from "../rest/actions";

import { apiRequest, apiAction } from "../api/actions";

import { EncuestasOdataCabeceraDetalle, EncuestasOdataCabecera, EncuestasOdataDetalle, EncuestasOdataDetalleActualizar, EncuestasCabeceraDetalle } from "../fetchs";
import { fetchOData } from "../../libs/fetchOData";

export const get =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET) {
			dispatch(apiRequest(EncuestasOdataCabeceraDetalle, action.options, GET_SUCCESS, GET_ERROR));
		}
	};

export const get_Cemap_Combo_Opcion =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET_CEMAP_COMBO_OPCION) {
			let filtro = "";
			if (Number(action.IdCemap) > 0) {
				filtro = "&$filter=";
				filtro = filtro + "Cabecera/IdCemap eq " + Number(action.IdCemap);
			}
			if (Number(action.IdCombo) > 0) {
				if (filtro.length > 0) {
					filtro = filtro + " and ";
				} else {
					filtro = "&$filter=";
				}
				filtro = filtro + " IdCombo eq " + Number(action.IdCombo);
			}
			if (Number(action.IdOpcion) > 0) {
				if (filtro.length > 0) {
					filtro = filtro + " and ";
				} else {
					filtro = "&$filter=";
				}
				filtro = filtro + " Opciones/Orden eq " + Number(action.IdOpcion);
			}
			let sele = "https://www.uocra.net/RelevamientoCemaps/odata/Detalle?$expand=Cabecera,Opciones,Combo" + filtro + " &$orderby=Cabecera/IdCemap,IdCombo,Opciones/Orden";
			fetchOData(dispatch, sele, GET_CEMAP_COMBO_OPCION_SUCCESS, GET_CEMAP_COMBO_OPCION_ERROR);
		}
	};

export const add =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD) {
			//			dispatch(RESTAdd(EncuestasOdataCabeceraDetalle, action.body, ADD_SUCCESS, ADD_ERROR, action.token));
			dispatch(apiAction(EncuestasOdataCabeceraDetalle, action.body, null, null, ADD_SUCCESS, ADD_ERROR));
		}
	};

export const addCabecera =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD_CABECERA) {
			//			dispatch(RESTAdd(EncuestasOdataCabeceraDetalle, action.body, ADD_SUCCESS, ADD_ERROR, action.token));
			dispatch(apiAction(EncuestasOdataCabecera, action.body, null, null, ADD_CABECERA_SUCCESS, ADD_CABECERA_ERROR));
		}
	};

export const addDetalle =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD_DETALLE) {
			//			dispatch(RESTAdd(EncuestasOdataCabeceraDetalle, action.body, ADD_SUCCESS, ADD_ERROR, action.token));
			dispatch(apiAction(EncuestasOdataDetalle, action.body, null, null, ADD_DETALLE_SUCCESS, ADD_DETALLE_ERROR));
		}
	};

export const addDetalleActualizar =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD_DETALLE_ACTUALIZAR) {
			//			dispatch(RESTAdd(EncuestasOdataCabeceraDetalle, action.body, ADD_SUCCESS, ADD_ERROR, action.token));
			dispatch(apiAction(EncuestasOdataDetalleActualizar, action.body, null, null, ADD_DETALLE_ACTUALIZAR_SUCCESS, ADD_DETALLE_ACTUALIZAR_ERROR));
		}
	};

export const update =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === UPDATE) {
			dispatch(RESTUpdate(EncuestasOdataCabeceraDetalle, action.id, action.body, UPADTE_SUCCESS, UPDATE_ERROR, action.token));
		}
	};

export const patch =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === PATCH) {
			dispatch(RESTPatch(EncuestasOdataCabeceraDetalle, action.id, action.body, PATCH_SUCCESS, PATCH_ERROR, action.token));
		}
	};

export const remove =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === REMOVE) {
			dispatch(RESTDelete(EncuestasOdataCabeceraDetalle, action.id, REMOVE_SUCCESS, REMOVE_ERROR, action.token));
		}
	};

export const processGet =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET_SUCCESS || action.type === GET_CEMAP_COMBO_OPCION_SUCCESS) {
		}
	};

export const processComand =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === ADD_SUCCESS || action.type === ADD_CABECERA_SUCCESS || action.type === ADD_DETALLE_SUCCESS || action.type === UPDATE_SUCCESS || action.type === REMOVE_SUCCESS || action.type === PATCH_SUCCESS) {
		}
	};

export const processError =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET_ERROR || action.type === GET_CEMAP_COMBO_OPCION_ERROR || action.type === ADD_ERROR || action.type === ADD_CABECERA_ERROR || action.type === ADD_DETALLE_ERROR || action.type === UPDATE_ERROR || action.type === REMOVE_ERROR || action.type === PATCH_ERROR) {
		}
	};

export const middleware = [get, get_Cemap_Combo_Opcion, add, addCabecera, addDetalle, addDetalleActualizar, update, patch, remove, processGet, processComand, processError];
