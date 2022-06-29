/** @format */

import { ALL_BODY, HEADER_BODY_FOOT, BODY_FOOT, HEADER_BODY, SLIDER_HEADER_BODY } from "./layouts";

export const screenLayuts = {
	splash: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	sesion: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	loginInicial: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	activacion: {
		small: HEADER_BODY,
		medium: HEADER_BODY,
		large: HEADER_BODY,
	},
	activacionInicial: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	registroMensaje: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	claveCambio: {
		small: HEADER_BODY,
		medium: HEADER_BODY,
		large: HEADER_BODY,
	},
	claveCambioInicial: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	claveCambioMensaje: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	claveRecuperar: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	claveRecuperarMensaje: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	onBoarding: {
		small: ALL_BODY,
		medium: ALL_BODY,
		large: ALL_BODY,
	},
	inicial: {
		small: HEADER_BODY,
		medium: HEADER_BODY,
		large: HEADER_BODY,
	},
	estadoCemap: {
		small: HEADER_BODY,
		medium: HEADER_BODY,
		large: HEADER_BODY,
	},
	galeria: {
		small: HEADER_BODY,
		medium: HEADER_BODY,
		large: HEADER_BODY,
	},
	galeria1: {
		small: HEADER_BODY,
		medium: HEADER_BODY,
		large: HEADER_BODY,
	},
	galeriaPorCemap: {
		small: HEADER_BODY,
		medium: HEADER_BODY,
		large: HEADER_BODY,
	},
	firma: {
		small: HEADER_BODY,
		medium: HEADER_BODY,
		large: HEADER_BODY,
	},
};

export const getLayout = (state) => {
	if (!state.screen.layouts[state.ui.media.size]) throw "no hay un layout definido en el state para media-size:" + state.ui.media.size;
	let layout = state.screen.layouts[state.ui.media.size];
	if (state.screen.layouts[state.ui.media.size][state.ui.media.orientation]) {
		layout = state.screen.layouts[state.ui.media.size][state.ui.media.orientation];
	}
	return layout;
};

export const isInLayout = (state, area) => {
	return getLayout(state).areas.find((a) => a == area);
};
