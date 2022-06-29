/** @format */

import { applyMiddleware, createStore, compose } from "redux";
import { logger } from "redux-logger";
import { rootReducer as reducers } from "./reducers";
import { middleware as autorizacion } from "./autorizacion/middleware";
import { middleware as ui } from "./ui/middleware";
import { middleware as api } from "./api/middleware";
import { middleware as rest } from "./rest/middleware";
import { middleware as route } from "./routing/middleware";
import { middleware as usuarios } from "./usuarios/middleware";
import { middleware as mail } from "./mail/middleware";

import { middleware as table } from "./table/middleware";
import { middleware as cemaps } from "./cemaps/middleware";
import { middleware as onBoarding } from "./onBoarding/middleware";
import { middleware as combos } from "./combos/middleware";
import { middleware as encuestas } from "./encuestas/middleware";
import { middleware as geolocalizacion } from "./geolocalizacion/middleware";
import { middleware as detalleImagenes } from "./detalleImagenes/middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let mdw = [api, rest, ...ui, ...route, ...autorizacion, ...mail, ...usuarios, ...table, ...cemaps, ...onBoarding, ...combos, ...encuestas, ...geolocalizacion, ...detalleImagenes];

if (process.env.NODE_ENV !== "production") {
	mdw = [...mdw, logger];
}

const initialData = {};

export const store = createStore(reducers, initialData, composeEnhancers(applyMiddleware(...mdw)));
