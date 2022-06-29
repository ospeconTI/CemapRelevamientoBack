import { GET_SUCCESS, GET_ERROR, GETXCEMAP_SUCCESS, GETXCEMAP_ERROR, GETXIDDETALLE_SUCCESS, GETXIDDETALLE_ERROR, PATCH_SUCCESS, PATCH_ERROR, UPDATE_SUCCESS, UPDATE_ERROR, ADD_SUCCESS, ADD_ERROR, REMOVE_SUCCESS, REMOVE_ERROR } from "../detalleImagenes/actions";

const initialState = {
	entities: null,
	timeStamp: null,
	removeTimeStamp: null,
	updateTimeStamp: null,
	addTimeStamp: null,
	errorTimeStamp: null,
	commandErrorTimeStamp: null,
	porCemap: {
		entities: null,
		timeStamp: null,
		errorTimeStamp: null,
	},
	porIdDetalle: {
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
			newState.entities = action.payload.receive.value;
			newState.timeStamp = new Date().getTime();
			break;
		case GETXCEMAP_SUCCESS:
			newState.porCemap.entities = action.payload.receive.value;
			newState.porCemap.timeStamp = new Date().getTime();
			break;
		case GETXIDDETALLE_SUCCESS:
			newState.porIdDetalle.entities = action.payload.receive.value;
			newState.porIdDetalle.timeStamp = new Date().getTime();
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
		case GET_ERROR:
			newState.errorTimeStamp = new Date().getTime();
			break;
		case GETXCEMAP_ERROR:
			newState.porCemap.errorTimeStamp = new Date().getTime();
			newState.porCemap.entities = null;
			break;
		case GETXIDDETALLE_ERROR:
			newState.porIdDetalle.errorTimeStamp = new Date().getTime();
			newState.porIdDetalle.entities = null;
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
