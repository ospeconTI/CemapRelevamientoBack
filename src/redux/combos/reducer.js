import { GET_SUCCESS, GET_ERROR } from "../combos/actions";

const initialState = {
	entities: null,
	timeStamp: null,
	errorTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
	const newState = {
		...state,
	};

	switch (action.type) {
		case GET_SUCCESS:
			newState.entities = action.payload.receive.value.sort(function (a, b) {
				return a["Id"] > b["Id"] ? 1 : -1;
			});
			newState.timeStamp = new Date().getTime();
			break;
		case GET_ERROR:
			newState.errorTimeStamp = new Date().getTime();
			break;
	}
	return newState;
};
