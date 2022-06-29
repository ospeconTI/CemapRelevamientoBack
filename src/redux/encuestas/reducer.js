import { GET_SUCCESS, GET_ERROR, GET_CEMAP_COMBO_OPCION_SUCCESS, GET_CEMAP_COMBO_OPCION_ERROR, PATCH_SUCCESS, PATCH_ERROR, UPDATE_SUCCESS, UPDATE_ERROR, ADD_SUCCESS, ADD_ERROR, ADD_CABECERA_SUCCESS, ADD_CABECERA_ERROR, ADD_DETALLE_SUCCESS, ADD_DETALLE_ERROR, ADD_DETALLE_ACTUALIZAR_SUCCESS, ADD_DETALLE_ACTUALIZAR_ERROR, REMOVE_SUCCESS, REMOVE_ERROR } from "../encuestas/actions";

const initialState = {
	entities: null,
	timeStamp: null,
	removeTimeStamp: null,
	updateTimeStamp: null,
	addTimeStamp: null,
	errorTimeStamp: null,
	commandErrorTimeStamp: null,
	cabecera: {
		entities: {
			cabecera: null,
			detalle: null,
		},
		timeStamp: null,
		errorTimeStamp: null,
	},
	detalle: {
		entities: null,
		timeStamp: null,
		errorTimeStamp: null,
	},
	detalleActualizar: {
		entities: null,
		timeStamp: null,
		errorTimeStamp: null,
	},
	porCemapComboOpcion: {
		entities: null,
		timeStamp: null,
		errorTimeStamp: null,
	},
};

export const reducer = (state = initialState, action) => {
	const newState = {
		...state,
	};

	switch (action.type) {
		case GET_SUCCESS:
			newState.entities = action.payload.receive;
			newState.timeStamp = new Date().getTime();
			break;
		case GET_CEMAP_COMBO_OPCION_SUCCESS:
			newState.porCemapComboOpcion.entities = action.payload.receive.value;
			newState.porCemapComboOpcion.timeStamp = new Date().getTime();
			break;
		case UPDATE_SUCCESS:
			newState.updateTimeStamp = new Date().getTime();
			break;
		case PATCH_SUCCESS:
			newState.updateTimeStamp = new Date().getTime();
			break;
		case REMOVE_SUCCESS:
			newState.removeTimeStamp = new Date().getTime();
			break;
		case ADD_SUCCESS:
			newState.addTimeStamp = new Date().getTime();
			break;
		case ADD_CABECERA_SUCCESS:
			newState.cabecera.entities.cabecera = action.payload.receive.Cabe;
			newState.cabecera.entities.detalle = action.payload.receive.Detalles;
			newState.cabecera.timeStamp = new Date().getTime();
			break;
		case ADD_DETALLE_SUCCESS:
			newState.detalle.entities = action.payload.receive;
			newState.detalle.timeStamp = new Date().getTime();
			break;
		case ADD_DETALLE_ACTUALIZAR_SUCCESS:
			newState.detalleActualizar.entities = action.payload.receive;
			newState.detalleActualizar.timeStamp = new Date().getTime();
			break;
		case GET_ERROR:
			newState.errorTimeStamp = new Date().getTime();
			break;
		case GET_CEMAP_COMBO_OPCION_ERROR:
			newState.porCemapComboOpcion.entities = null;
			newState.porCemapComboOpcion.errorTimeStamp = new Date().getTime();
			break;
		case ADD_CABECERA_ERROR:
			newState.cabecera.entities.cabecera = null;
			newState.cabecera.entities.detalle = null;
			newState.cabecera.errorTimeStamp = new Date().getTime();
			break;
		case ADD_DETALLE_ERROR:
			newState.detalle.entities = null;
			newState.detalle.errorTimeStamp = new Date().getTime();
			break;
		case ADD_DETALLE_ACTUALIZAR_ERROR:
			newState.detalleActualizar.entities = null;
			newState.detalleActualizar.errorTimeStamp = new Date().getTime();
			break;
		case UPDATE_ERROR:
		case REMOVE_ERROR:
		case PATCH_ERROR:
		case ADD_ERROR:
			newState.commandErrorTimeStamp = new Date().getTime();
			break;
	}
	return newState;
};
