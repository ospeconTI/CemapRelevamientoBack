import { GET_SUCCESS, GET_ERROR, GETTABLE_SUCCESS, GETTABLE_ERROR, PATCH_SUCCESS, PATCH_ERROR, UPDATE_SUCCESS, UPDATE_ERROR, ADD_SUCCESS, ADD_ERROR, REMOVE_SUCCESS, REMOVE_ERROR, EDIT, SET } from "../cemaps/actions";

const initialState = {
	entities: null,
	timeStamp: null,
	removeTimeStamp: null,
	updateTimeStamp: null,
	addTimeStamp: null,
	errorTimeStamp: null,
	commandErrorTimeStamp: null,
	editTimeStamp: null,
	table: {
		entities: null,
		count: 0,
		timeStamp: null,
	},
};

export const reducer = (state = initialState, action) => {
	const newState = {
		...state,
	};

	switch (action.type) {
		case SET:
			newState.entities = action.cemaps;
			newState.timeStamp = new Date().getTime();
			break;
		case GET_SUCCESS:
			newState.entities = action.payload.receive.value;
			newState.timeStamp = new Date().getTime();
			break;
		case GETTABLE_SUCCESS:
			newState.table.entities = action.payload.receive.value;
			newState.table.count = action.payload.receive["@odata.count"];
			newState.table.timeStamp = new Date().getTime();
			break;
		case EDIT:
			newState.editTimeStamp = new Date().getTime();
			newState.entities.currentItem = action.item;
			newState.modo = action.modo;
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
		case GETTABLE_ERROR:
			newState.table.entities = null;
			newState.table.count = 0;
			newState.table.timeStamp = new Date().getTime();
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
