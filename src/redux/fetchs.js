/** @format */

import { ODataEntity, ODataFetchFactory } from "@brunomon/odata-fetch-factory";
import { fetchFactory } from "../libs/fetchFactory";

let webApiLogin = SERVICE_URL_LOGIN + "/api/Autorizacion";

const webApiUsuariosOdata = SERVICE_URL_LOGIN;

const webApiEncuestas = "https://www.uocra.net/RelevamientoCemaps";
const webApiEncuestasOdata = "https://www.uocra.net/RelevamientoCemaps";
const webApiDetalleImagenesOdata = "https://www.uocra.net/RelevamientoCemaps";

const usuarioOdata = ODataFetchFactory({
	fetch: fetch,
	domain: webApiUsuariosOdata,
});

const encuestasOdata = ODataFetchFactory({
	fetch: fetch,
	domain: webApiEncuestasOdata,
});

const detalleImagenesOdata = ODataFetchFactory({
	fetch: fetch,
	domain: webApiDetalleImagenesOdata,
});

export const loginFetch = fetchFactory(webApiLogin, "login");
export const logonFetch = fetchFactory(webApiLogin, "logon_complete");
export const recuperoFetch = fetchFactory(webApiLogin, "recupero_complete");
export const activacionFetch = fetchFactory(webApiLogin, "activation");
export const renovacionFetch = fetchFactory(webApiLogin, "renovacion");
export const updateProfileFetch = fetchFactory(webApiLogin, "updateProfile");
export const usuarioOdataFetch = ODataEntity(usuarioOdata, "UsuarioQuery");

export const EncuestasCabeceraDetalle = fetchFactory(webApiEncuestas, "Encuestas");
export const EncuestasOdataCabeceraDetalle = ODataEntity(encuestasOdata, "GrabarEncuesta");
export const EncuestasOdataCabecera = ODataEntity(encuestasOdata, "GrabarCabecera");
export const EncuestasOdataDetalle = ODataEntity(encuestasOdata, "Detalle");
export const EncuestasOdataDetalleActualizar = ODataEntity(encuestasOdata, "GrabarDetalle");

export const EncuestasDetalleImagenes = fetchFactory(webApiDetalleImagenesOdata, "DetalleImagenes");
export const EncuestasOdataDetalleImagenes = ODataEntity(detalleImagenesOdata, "DetalleImagenes");

//let webApiRendiciones = SERVICE_URL;
//let webApi = SERVICE_URL + "/api";

// const rendicionesOdataFactory = ODataFetchFactory({
// 	fetch: fetch,
// 	domain: webApiRendiciones,
// });

// export const loginFetch = fetchFactory(webApi, "Login");
// export const logonFetch = ODataEntity(rendicionesOdataFactory, "Logon");
// export const cambiarPasswordFetch = ODataEntity(rendicionesOdataFactory, "CambiarPassword");
// export const recuperoFetch = ODataEntity(rendicionesOdataFactory, "RecuperoPassword");

// export const rendicionesFetch = ODataEntity(rendicionesOdataFactory, "Rendiciones");
// export const configuracionFetch = ODataEntity(rendicionesOdataFactory, "UsuariosPerfiles");

// export const conciliacionFetch = ODataEntity(rendicionesOdataFactory, "Conciliar");
// export const desconciliacionFetch = ODataEntity(rendicionesOdataFactory, "DesConciliar");
