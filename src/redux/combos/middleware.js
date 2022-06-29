import { GET, GET_SUCCESS, GET_ERROR } from "../combos/actions";
import { fetchOData } from "../../libs/fetchOData";

export const get =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET) {
			fetchOData(dispatch, "https://www.uocra.net/RelevamientoCemaps/Combo?$expand=Opciones", GET_SUCCESS, GET_ERROR);
		}
	};

export const processError =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === GET_ERROR) {
		}
	};

export const middleware = [get, processError];
