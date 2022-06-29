import { SEND_SUCCESS, SEND_ERROR } from "./actions";

const initialState = {
	sendTimeStamp: null,
	sendErrorTimeStamp: null,
};

export const reducer = (state = initialState, action) => {
	const newState = {
		...state,
	};

	switch (action.type) {
		case SEND_SUCCESS:
			newState.sendTimeStamp = new Date().getTime();
			break;
		case SEND_ERROR:
			newState.sendErrorTimeStamp = new Date().getTime();
			break;
	}
	return newState;
};
