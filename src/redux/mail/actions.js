export const SEND = "[mail] SEND";

export const SEND_SUCCESS = "[mail] SEND success";

export const SEND_ERROR = "[mail] SEND error";

export const send = (subjet, body, mail) => ({
	type: SEND,
	subjet: subjet,
	body: body,
	mail: mail,
});
