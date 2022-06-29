/** @format */

import { SHOW_SPINNER, HIDE_SPINNER, SHOW_ERROR, HIDE_ERROR, SET_MEDIA, SET_MEDIA_ORIENTATION, SELECTION, VELO, VER_PANTALLA_LOGIN, VER_PANTALLA_MIEMBRO, VER_PANTALLA_CAMBIO_CLAVE, VER_PANTALLA_PASES, VER_PANTALLA_CAMBIO_ADMINISTRADOR, VER_PANTALLA_CAMBIO_NOMBRE_CUENTA, VER_PANTALLA_USUARIO_ASIGNAR, SHOW_WARNING, HIDE_WARNING, STEP, MAPA_CLICK, IDIOMA, DISPOSITIVO, SHOW_MSGBOX, ACEPTAR_MSGBOX } from "./actions";

const initialState = {
	spinner: {
		loading: 0,
	},
	error: {
		message: "",
		timestamp: null,
	},
	media: {
		size: "large",
		orientation: "landscape",
		timeStamp: null,
	},
	menu: {
		timeStamp: null,
		option: "",
	},
	dispositivo: null,
	warning: {
		titulo: "",
		subTitulo: "",
		backgroundColor: "fondoInformacion",
		timeStamp: null,
		hidden: true,
		tineOut: 1500,
	},
	mapa: {
		feature: null,
		event: null,
		timeStamp: null,
	},
	msgbox: {
		visible: false,
		timeStamp: null,
		aceptarAccion: "",
		leyenda: "",
		titulo: "",
		fondoColor: "",
		tituloColor: "",
		leyendaColor: "",
		botonColor: "",
		botonTextoAceptar: "",
		botonTextoCancelar: "",
		aceptarTimeStamp: null,
	},
	loginOk: false,
	steps: {
		step: 1,
	},
	idioma: "ES",
};

export const reducer = (state = initialState, action) => {
	const newState = {
		...state,
	};

	switch (action.type) {
		case SHOW_SPINNER:
			newState.spinner.loading += 1;
			break;
		case HIDE_SPINNER:
			newState.spinner.loading -= 1;
			break;
		case SHOW_ERROR:
			newState.error.timeStamp = new Date().getTime();
			newState.error.messages = action.message;
			break;
		case HIDE_ERROR:
			newState.error.timeStamp = new Date().getTime();
			newState.error.messages = null;
			break;
		case SET_MEDIA:
			newState.media.size = action.size;
			newState.media.timeStamp = new Date().getTime();
			break;
		case SET_MEDIA_ORIENTATION:
			newState.media.orientation = action.orientation;
			newState.media.timeStamp = new Date().getTime();
			break;
		case SELECTION:
			newState.menu.timeStamp = new Date().getTime();
			newState.menu.option = action.option;
			break;
		case SHOW_WARNING:
			newState.warning.timeStamp = new Date().getTime();
			newState.warning.titulo = action.titulo;
			newState.warning.subTitulo = action.subTitulo;
			newState.warning.backgroundColor = action.backgroundColor;
			newState.warning.hidden = false;
			newState.warning.timeOut = action.timeOut;
			break;
		case HIDE_WARNING:
			newState.warning.timeStamp = new Date().getTime();
			newState.warning.titulo = "";
			newState.warning.subTitulo = "";
			newState.warning.hidden = true;
			newState.warning.timeOut = 1500;
			break;
		case MAPA_CLICK:
			newState.mapa.feature = action.feature;
			newState.mapa.event = action.event;
			newState.mapa.timeStamp = new Date().getTime();
			break;
		case SHOW_MSGBOX:
			newState.msgbox.visible = !state.msgbox.visible;
			newState.msgbox.timeStamp = new Date().getTime();
			if (newState.msgbox.visible) {
				newState.msgbox.aceptarAccion = action.accion;
				newState.msgbox.titulo = action.titulo;
				newState.msgbox.leyenda = action.leyenda;
				newState.msgbox.fondoColor = action.fondoColor;
				newState.msgbox.tituloColor = action.tituloColor;
				newState.msgbox.leyendaColor = action.leyendaColor;
				newState.msgbox.botonColor = action.botonColor;
				newState.msgbox.botonTextoAceptar = action.botonTextoAceptar;
				newState.msgbox.botonTextoCancelar = action.botonTextoCancelar;
			}
			break;
		case ACEPTAR_MSGBOX:
			newState.msgbox.aceptarTimeStamp = new Date().getTime();
			break;
		case STEP:
			newState.steps.step = action.step;
			break;
		case IDIOMA:
			let myIdioma = (navigator.language || navigator.userLanguage).split("-")[0].toUpperCase();
			if (myIdioma != "ES") myIdioma = "ES";
			newState.idioma = myIdioma;
			break;
		case DISPOSITIVO:
			newState.dispositivo = action.device;
			break;
	}
	return newState;
};
