import { showSpinner, hideSpinner } from "../redux/api/actions";

export const fetchJSON = (dispatch, url, successAction, errorAction) => {
	dispatch(showSpinner());
	var myHeaders = new Headers();
	myHeaders.append("pragma", "no-cache");
	myHeaders.append("cache-control", "no-cache");
	var myInit = {
		method: "GET",
		headers: myHeaders,
	};
	fetch("/json/" + url, myInit)
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
