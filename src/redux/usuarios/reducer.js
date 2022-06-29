import { GET_SUCCESS, GET_ERROR, PATCH_SUCCESS, PATCH_ERROR, UPDATE_SUCCESS, UPDATE_ERROR, ADD_SUCCESS, ADD_ERROR, REMOVE_SUCCESS, REMOVE_ERROR, USUARIO, USUARIO_ESTA_SUCCESS, USUARIO_ESTA_ERROR } from "../usuarios/actions";

const initialState = {
	entities: null,
	timeStamp: null,
	removeTimeStamp: null,
	updateTimeStamp: null,
	addTimeStamp: null,
	errorTimeStamp: null,
	commandErrorTimeStamp: null,
	usuario: null,
	usuarioTimeStamp: null,
	entityUsuarioEsta: null,
	usuarioEstaTimeStamp: null,
	usuarioEstaErrorTimeStamp: null,
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
		case USUARIO_ESTA_SUCCESS:
			newState.usuarioEstaTimeStamp = new Date().getTime();
			newState.entityUsuarioEsta = action.payload.receive.value;
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
		case USUARIO_ESTA_ERROR:
			newState.entityUsuarioEsta = null;
			newState.usuarioEstaErrorTimeStamp = new Date().getTime();
			break;
		case UPDATE_ERROR || REMOVE_ERROR || PATCH_ERROR || ADD_ERROR:
			newState.commandErrorTimeStamp = new Date().getTime();
			break;
		case USUARIO:
			newState.usuario = action.registro;
			newState.usuarioTimeStamp = new Date().getTime();
			break;
	}
	return newState;
};
