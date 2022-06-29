import { showSpinner, hideSpinner } from "../redux/api/actions";

export const fetchOData = (dispatch, url, successAction, errorAction) => {
	dispatch(showSpinner());
	var myHeaders = new Headers();
	myHeaders.append("pragma", "no-cache");
	myHeaders.append("cache-control", "no-cache");
	myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8080");
	myHeaders.append("Access-Control-Allow-Methods", "GET");
	myHeaders.append("Access-Control-Allow-Headers", "Content-Type, Authorization");
	myHeaders.append("Access-Control-Allow-Credentials", "false");
	var myInit = {
		method: "GET",
		headers: myHeaders,
	};
	fetch(url, myInit)
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			dispatch(hideSpinner());
			dispatch({
				type: successAction,
				payload: {
					send: 1,
					receive: json,
				},
			});
		})
		.catch((error) => {
			dispatch(hideSpinner());
			dispatch({
				type: errorAction,
			});
		});
};
