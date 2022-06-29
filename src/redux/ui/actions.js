/** @format */

//Oculta o muestra spinner
export const SHOW_SPINNER = "[ui] show spinner";
export const HIDE_SPINNER = "[ui] hide spinner";

//oculta o muestra ventana de error
export const SHOW_ERROR = "[ui] show error";
export const HIDE_ERROR = "[ui] hide error";

//define el tamaño,forma orientacion de la UI
export const CAPTURE_MEDIA = "[ui] capture media";
export const SET_MEDIA = "[ui] set media";
export const SET_MEDIA_ORIENTATION = "[ui] set media orientation";

export const SELECTION = "[ui] selection";

export const STEP = "[ui] step";

//oculta o muestra ventana de error
export const SHOW_WARNING = "[ui] show warning";
export const HIDE_WARNING = "[ui] hide warning";

export const SHOW_MSGBOX = "[ui] show msgbox";
export const ACEPTAR_MSGBOX = "[ui] aceptar msgbox";

export const MAPA_CLICK = "[ui] mapa click";

export const IDIOMA = "[ui] IDIOMA";

export const DISPOSITIVO = "[ui] dispositivo";

export const showSpinner = () => ({
	type: SHOW_SPINNER,
});
export const hideSpinner = () => ({
	type: HIDE_SPINNER,
});

export const showError = (message) => ({
	type: SHOW_ERROR,
	message: message,
});
export const hideError = () => ({
	type: HIDE_ERROR,
});
export const showWarning = (titulo = "", subTitulo = "", backgroundColor = "fondoInformacion", timeOut = 1500) => ({
	type: SHOW_WARNING,
	titulo: titulo,
	subTitulo: subTitulo,
	backgroundColor: backgroundColor,
	timeOut: timeOut,
});
export const hideWarning = () => ({
	type: HIDE_WARNING,
});

export const showMsgBox = (accion = "", leyenda = "", titulo = "Atencion!", botonTextoAceptar = "Aceptar", botonTextoCancelar = "Cancelar", fondoColor = "#F5F5F5", tituloColor = "#425067", leyendaColor = "#5E5C5C", botonColor = "#7F3E3F") => ({
	type: SHOW_MSGBOX,
	accion: accion,
	leyenda: leyenda,
	titulo: titulo,
	fondoColor: fondoColor,
	tituloColor: tituloColor,
	leyendaColor: leyendaColor,
	botonColor: botonColor,
	botonTextoAceptar: botonTextoAceptar,
	botonTextoCancelar: botonTextoCancelar,
});
export const aceptarMsgBox = () => ({
	type: ACEPTAR_MSGBOX,
});

export const captureMedia = () => ({
	type: CAPTURE_MEDIA,
});
export const setMedia = (size) => ({
	type: SET_MEDIA,
	size: size,
});

export const setMediaOrientation = (orientation) => ({
	type: SET_MEDIA_ORIENTATION,
	orientation: orientation,
});

export const selection = (option) => ({
	type: SELECTION,
	option: option,
});

export const setStep = (step) => ({
	type: STEP,
	step: step,
});

export const mapaClick = (feature, event) => ({
	type: MAPA_CLICK,
	feature: feature,
	event: event,
});
export const idioma = () => ({
	type: IDIOMA,
});

export const dispositivo = (device) => ({
	type: DISPOSITIVO,
	device: device,
});
