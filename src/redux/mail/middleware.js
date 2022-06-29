import { SEND, SEND_SUCCESS, SEND_ERROR } from "./actions";

import { showSpinner, hideSpinner } from "../api/actions";

export const send =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === SEND) {
			dispatch(showSpinner());
			var mail = action.mail;
			var subject = action.subjet;
			var cuerpo = action.body;
			fetch("https://www.uocra.net/MailUocra/odata/SendMail", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					MailDTO: {
						Subject: subject,
						Body: cuerpo,
						Mails: mail,
					},
				}),
			})
				.then((response) => {
					return response;
				})
				.then((respuesta) => {
					dispatch(hideSpinner());
					if (respuesta && respuesta.ok) {
						dispatch({
							type: SEND_SUCCESS,
						});
					} else {
						dispatch({
							type: SEND_ERROR,
						});
					}
				})
				.catch((error) => {
					dispatch(hideSpinner());
					dispatch({
						type: SEND_ERROR,
					});
				});
		}
	};

export const processGet =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === SEND_SUCCESS) {
		}
	};

export const processError =
	({ dispatch }) =>
	(next) =>
	(action) => {
		next(action);
		if (action.type === SEND_ERROR) {
		}
	};

export const middleware = [send, processGet, processError];
