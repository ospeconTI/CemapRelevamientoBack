/** @format */

import { reducer as uiReducer } from "./ui/reducer";
import { reducer as screenReducer } from "./screens/reducer";
import { reducer as routingReducer } from "./routing/reducer";
import { reducer as apiReducer } from "./api/reducer";
import { reducer as autorizacionReducer } from "./autorizacion/reducer";
import { reducer as mailReducer } from "./mail/reducer";

import { reducer as usuariosReducer } from "./usuarios/reducer";

import { reducer as tableReducer } from "./table/reducer";
import { reducer as cemapsReducer } from "./cemaps/reducer";
import { reducer as onBoardingReducer } from "./onBoarding/reducer";
import { reducer as combosReducer } from "./combos/reducer";
import { reducer as encuestasReducer } from "./encuestas/reducer";
import { reducer as geolocalizacionReducer } from "./geolocalizacion/reducer";
import { reducer as detalleImagenesReducer } from "./detalleImagenes/reducer";

export const rootReducer = (state = {}, action) => {
	const presentacionesEstadosRed = state.presentacionesEstados;
	return {
		autorizacion: autorizacionReducer(state.autorizacion, action),
		api: apiReducer(state.api, action),
		ui: uiReducer(state.ui, action),
		screen: screenReducer(state.screen, action),
		routing: routingReducer(state.routing, action),
		mail: mailReducer(state.mail, action),
		onBoarding: onBoardingReducer(state.onBoarding, action),

		usuarios: usuariosReducer(state.usuarios, action),

		geolocalizacion: geolocalizacionReducer(state.geolocalizacion, action),
		table: tableReducer(state.table, action),
		cemaps: cemapsReducer(state.cemaps, action),
		combos: combosReducer(state.combos, action),
		encuestas: encuestasReducer(state.encuestas, action),
		detalleImagenes: detalleImagenesReducer(state.detalleImagenes, action),
	};
};
