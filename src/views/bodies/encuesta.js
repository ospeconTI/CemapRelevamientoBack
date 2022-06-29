/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { SVGS } from "../../../assets/icons/svgs";
import { goTo } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { showWarning, showMsgBox } from "../../redux/ui/actions";
import { gridLayout } from "../css/gridLayout";
import { dmdButton } from "../css/dmdButton";
import { dmdInput } from "../css/dmdInput";
import { dmdSelect } from "../css/dmdSelect";
import { dmdBuscar } from "../css/dmdBuscar";

import { dmdBusquedaComponent } from "../componentes/busqueda/dmdBusqueda";

import { cargar as getGeolocalizacion } from "../../redux/geolocalizacion/actions";

import { add as addEncuestas, addCabecera as addEncuenstaCabecera, addDetalleActualizar as addEncuestaDetalleActualizar } from "../../redux/encuestas/actions";

import { fotoScreen } from "./foto";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const DATOS_ENCUESTAS = "encuestas.addTimeStamp";
const ERROR_ENCUESTAS = "encuestas.commandErrorTimeStamp";

const CABECERA_OK = "encuestas.cabecera.timeStamp";
const CABECERA_ERROR = "encuestas.cabecera.errorTimeStamp";

const DETALLE_OK = "encuestas.detalleActualizar.timeStamp";
const DETALLE_ERROR = "encuestas.detalleActualizar.errorTimeStamp";

const SELECCIONA_CEMAP_MSGBOX = "ui.msgbox.aceptarTimeStamp";

export class encuestaScreen extends connect(store, DETALLE_OK, DETALLE_ERROR, CABECERA_OK, CABECERA_ERROR, SELECCIONA_CEMAP_MSGBOX, DATOS_ENCUESTAS, ERROR_ENCUESTAS, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";

		this.comboComunes = [1, 2, 3, 4, 5, 6, 7, 8];
		this.boton = null;

		this.config = [
			{ nombre: "Nombre", titulo: "Cemap", tipo: "texto", valorTodos: "" },
			{ nombre: "Codigo", titulo: "Codigo", tipo: "texto", valorTodos: "" },
		];
		this.cemapSeleccionado = {};
		this.estilosDmdBusqueda = css`
			.dmd-busqueda {
				width: 90%;
				height: 80%;
			}
			:host([media-size="large"]) .dmd-busqueda {
				width: 40%;
				height: 80%;
			}
			.dmd-busqueda-datos-titulos,
			.dmd-busqueda-datos-registros {
				grid-template-columns: 16rem 6rem !important;
				justify-content: center;
			}
			.dmd-busqueda-cabecera label:before {
				content: "Cemaps";
			}
			.dmd-busqueda-datos-registro[campo="Documento"] {
				text-align: right;
			}
			.dmd-busqueda-datos-registro[campo="Fecha"] {
				text-align: center;
			}
		`;
	}

	static get styles() {
		return css`
			${dmdButton}
			${dmdInput}
			${dmdSelect}
			${gridLayout}
			${dmdBuscar}
			:host {
				display: grid;
				position: relative;
				overflow-y: auto;
				padding: 0 !important;
				align-content: flex-start;
				background-color: var(--color-fondo);
			}
			:host([hidden]) {
				display: none;
			}
			::-webkit-scrollbar {
				width: 0;
				background: transparent;
			}
			#titulo {
				display: grid;
				background-color: var(--color-gris);
				color: var(--color-negro);
				width: 100%;
				height: 8vh;
				font-size: 3vh;
				font-weight: bolder;
				justify-content: center;
				align-content: center;
			}
			#seleccion {
				display: grid;
				background-color: white;
				width: 90%;
				height: max-content;
				justify-self: center;
				margin-top: 3rem;
				align-items: center;
				justify-items: center;
				border-radius: 1rem;
			}
			#seleccioncemap {
				padding: 2rem 0;
				width: 90%;
				height: max-content;
			}
			#cuerpo {
				display: none;
				background-color: transparent;
				width: 85%;
				justify-self: center;
				overflow-y: auto;
				height: 100%;
				align-content: flex-start;
			}
			#cuerpoDatos {
				display: grid;
				grid-gap: 0;
			}
			#velo {
				display: none;
				position: absolute;
				top: 1;
				left: 1;
				width: 100%;
				height: 100%;
				background-color: black;
				opacity: 0.5;
				z-index: 99;
			}
			.texto {
				font-size: 2vh !important;
				font-weight: var(--font-label-weight);
				font-style: italic;
			}
			.miBoton {
				align-self: center;
				width: 100%;
			}
			.btnFoto {
				margin-top: 0.5rem;
				justify-self: center;
				margin-bottom: 0.2rem;
			}

			.divLinea {
				width: 100%;
				height: 1px;
				background-color: var(--ColorPrimario);
				margin: 2vh 0 1.5vh 0;
			}
			*[apagado] {
				display: none;
			}
		`;
	}
	get _cemap() {
		return this.shadowRoot.querySelector("#cemap");
	}
	firstUpdated() {
		super.firstUpdated();
		this.shadowRoot.getElementById("cemapBusqueda")._itemSeleccionado = this.itemSeleccionado.bind(this);
	}

	willUpdate(changedProperties) {
		if (changedProperties.has("hidden")) {
			if (this.hidden && this.shadowRoot.getElementById("seleccion")) {
				this.shadowRoot.getElementById("seleccion").style.display = "grid";
				this.shadowRoot.getElementById("cuerpo").style.display = "none";
			}
		}
	}
	render() {
		if (true) {
			return html`
				<div id="velo"></div>
				<div id="titulo">Relevamiento CEMAPS</div>
				<div id="seleccion">
					<div id="seleccioncemap">
						<div class="dmd-buscar" helper>
							<img
								@click="${this.cemapsVer}"
								tabindex="1"
								src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xNS41IDE0aC0uNzlsLS4yOC0uMjdDMTUuNDEgMTIuNTkgMTYgMTEuMTEgMTYgOS41IDE2IDUuOTEgMTMuMDkgMyA5LjUgM1MzIDUuOTEgMyA5LjUgNS45MSAxNiA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0eiIvPjwvc3ZnPg=="
							/>
							<label>Cemap</label>
							<input type="text" id="cemap" @click="${this.cemapsVer}" autocomplete="off" placeholder="Seleccione Opcion" value="" readonly />
							<div>Debe seleccionar un Cemap</div>
							<span>Seleccione un cemap</span>
							${SVGS["INFO"]}
						</div>
						<div class="grid column" style="padding-top:2vh;">
							<button class="dmd-button miBoton" normal bordeRedondo @click="${this.cancelar}">Cancelar</button>
							<button class="dmd-button miBoton" normal bordeRedondo @click="${this.seleccionarCemap}">Aceptar</button>
						</div>
					</div>
				</div>
				<div id="cuerpo" class="row">
					<div id="cuerpoDatos">
						${store.getState().combos.entities
							? this.comboComunes.map((combo, index) => {
									let posicion = this.retoPos(store.getState().combos.entities, combo);
									let cab = store.getState().combos.entities[posicion];
									return this.retoSelect(posicion, cab, store.getState().combos.entities[posicion].Opciones, 0);
							  })
							: ""}
						<div class="grid column" style="padding-top:2vh;">
							<button class="dmd-button miBoton" normal bordeRedondo @click="${this.cancelar}">Cancelar</button>
							<button class="dmd-button miBoton" normal bordeRedondo @click="${this.iniciar}">Aceptar</button>
						</div>
						<div style="padding:4rem;"></div>
					</div>
				</div>
				<foto-screen id="foto" hidden></foto-screen>
				<dmd-busqueda-component hidden .dataSource=${store.getState().cemaps.entities} .estilos=${this.estilosDmdBusqueda} .config=${this.config} id="cemapBusqueda"> </dmd-busqueda-component>
			`;
		} else {
			if (this.current == "lista") {
				return html`<msgnoconeccion-component @click="${this.atras}" texto="Haga click volver" style="cursor:pointer"></msgnoconeccion-component>; `;
			}
		}
	}
	itemSeleccionado(e) {
		if (e.currentTarget.item && e.currentTarget.item.Nombre) {
			this._cemap.value = e.currentTarget.item.Nombre;
		} else {
			this._cemap.value = e.currentTarget.item;
		}
		this.shadowRoot.getElementById("cemapBusqueda").hidden = true;
		this.cemapSeleccionado = e.currentTarget.item;
	}

	seleccionarCemap() {
		if (this.shadowRoot.getElementById("cemap").value != "") {
			//store.dispatch(showMsgBox("CONFIRMACEMAP", "Selecciono el CEMAP <b>" + this.cemapSeleccionado.Nombre + ".</b><br>Es el correcto?"));
			let envio = {
				cabecera: {
					Longitud: store.getState().geolocalizacion.longitud,
					Latitud: store.getState().geolocalizacion.latitud,
					IdCemap: this.cemapSeleccionado.Id,
					Usuario: store.getState().usuarios.usuario,
				},
			};
			store.dispatch(addEncuenstaCabecera(envio, null));
		}
	}
	cemapsVer() {
		var cemapBusqueda = this.shadowRoot.getElementById("cemapBusqueda");
		if (this._cemap.value == "") {
			cemapBusqueda._estadoInicial();
		}
		cemapBusqueda.hidden = false;
	}

	retoPos(vector, id) {
		for (var d = 0, iLen = vector.length; d < iLen; d++) {
			if (vector[d].Id == id) {
				return d;
			}
		}
		return -1;
	}

	retoSelect(posicion, cab, vector, valorActual) {
		return html`
			<div class="dmd-select" helper>
				<label>${cab.Label}</label>
				<select id="Combo${posicion}" @change="${this.cambiaCombo}" .boton="boton${posicion}" .item="${{ IdDetalle: 0, IdOpcion: vector[0].Id, IdCombo: vector[0].IdCombo, Valor: vector[0].Valor }}">
					${vector
						.sort(function (a, b) {
							return a["Valor"] > b["Valor"] ? 1 : -1;
						})
						.map((opt, index) => {
							if (valorActual == 0 && index == 0) {
								return html`<option value="0" disabled selected hidden>Seleccione opcion</option>`;
							} else {
								return html`<option value="${opt.Valor}" ?selected=${opt.Valor == valorActual}>${opt.Caption}</option>`;
							}
						})}
				</select>
				<div></div>
				<span></span>
			</div>
			<button id="boton${posicion}" btnselect disabled style="margin-bottom:1.5rem;" class="dmd-button miBoton" normal bordeRedondo @click="${this.tomarFoto}" .iddetalle="${0}">FOTOS</button>
			<div class="divLinea"></div>
		`;
	}
	cambiaCombo(e) {
		let botonId = e.currentTarget.boton;
		this.boton = this.shadowRoot.querySelector("#" + botonId);

		let envio = {
			IdCabecera: store.getState().encuestas.cabecera.entities.cabecera.Id,
			IdCombo: e.currentTarget.item.IdCombo,
			IdOpcion: e.currentTarget.value,
		};
		store.dispatch(addEncuestaDetalleActualizar(envio, null));
		this.shadowRoot.querySelector("#velo").style.display = "grid";
	}
	tomarFoto(e) {
		let foto = this.shadowRoot.querySelector("#foto");
		foto.iddetalle = e.currentTarget.iddetalle;
		foto.hidden = false;
	}
	atras() {
		store.dispatch(goHistoryPrev());
	}

	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			let hiddenAntrior = this.hidden;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-encuesta-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				if (hiddenAntrior != this.hidden) {
					this.shadowRoot.getElementById("titulo").innerHTML = "Relevamiento CEMAPS";
				} else if (name == SCREEN) {
					this.shadowRoot.getElementById("titulo").innerHTML = "Relevamiento CEMAPS";
					this.shadowRoot.getElementById("seleccion").style.display = "grid";
					this.shadowRoot.getElementById("cuerpo").style.display = "none";
				}
				if (state.geolocalizacion.latitud == 0 || state.geolocalizacion.longitud == 0) {
					store.dispatch(showWarning("Geolocalizacion!", "No tiene cargada su localizacion. Continua?", "fondoError", 3000));
				}
			}
		}
		if (name == DATOS_ENCUESTAS) {
			[].forEach.call(this.shadowRoot.querySelectorAll("[errorSelect]"), (element) => {
				element.removeAttribute("errorSelect");
			});
			[].forEach.call(this.shadowRoot.querySelectorAll("Select"), (element) => {
				element.value = "0";
			});
			this.update();
			store.dispatch(showWarning("Registro Guardado", "Registro guardado correctamente", "fondoOk", 4000));
			store.dispatch(goTo("main"));
		}
		if (name == ERROR_ENCUESTAS) {
			store.dispatch(showWarning("Registro No Guardado", "Verifique su conexion de datos y reintente", "fondoError", 4000));
		}
		// if (name == SELECCIONA_CEMAP_MSGBOX && state.ui.msgbox.aceptarAccion == "CONFIRMACEMAP") {
		// 	let envio = {
		// 		cabecera: {
		// 			Longitud: state.geolocalizacion.longitud,
		// 			Latitud: state.geolocalizacion.latitud,
		// 			IdCemap: this.cemapSeleccionado.Id,
		// 			Usuario: state.usuarios.usuario,
		// 		},
		// 	};
		// 	store.dispatch(addEncuenstaCabecera(envio, null));
		// }
		if (name == CABECERA_OK) {
			[].forEach.call(this.shadowRoot.querySelectorAll("Select"), (element) => {
				element.value = 0;
				let posicion = this.retoPos(state.combos.entities, element.item.IdCombo);
				element.item.IdOpcion = state.combos.entities[posicion].Opciones[0].Id;
				element.item.Valor = 0;
			});
			[].forEach.call(this.shadowRoot.querySelectorAll("button[btnselect]"), (element) => {
				element.disabled = true;
			});

			if (state.encuestas.cabecera.entities.detalle.length > 0) {
				for (const element of state.encuestas.cabecera.entities.detalle) {
					let posicion = this.retoPos(state.combos.entities, element.IdCombo);
					if (posicion >= 0) {
						let combo = this.shadowRoot.getElementById("Combo" + posicion);
						combo.item.IdOpcion = element.IdOpcion;
						for (const opt of state.combos.entities[posicion].Opciones) {
							if (opt.Id == element.IdOpcion) {
								combo.item.Valor = opt.Valor;
								combo.value = opt.Valor;
								let boton = this.shadowRoot.querySelector("#" + combo.boton);
								boton.iddetalle = element.Id;
								boton.removeAttribute("disabled");
							}
						}
					}
				}
			}
			this.shadowRoot.getElementById("seleccion").style.display = "none";
			this.shadowRoot.getElementById("cuerpo").style.display = "grid";
			this.shadowRoot.getElementById("titulo").innerHTML = "CEMAP, " + this.cemapSeleccionado.Nombre;
		}
		if (name == CABECERA_ERROR) {
			store.dispatch(showWarning("ERROR DE GRABACION", "Verifique su conexino de datos, intente nuevamente", "fondoAmarillo", 4000));
		}
		if (name == DETALLE_OK) {
			this.boton.removeAttribute("disabled");
			this.shadowRoot.querySelector("#velo").style.display = "none";
			this.boton.iddetalle = state.encuestas.detalleActualizar.entities.Id;
		}
		if (name == DETALLE_ERROR) {
			store.dispatch(showWarning("ERROR DE GRABACION", "Verifique su conexino de datos, intente nuevamente", "fondoAmarillo", 4000));
			this.shadowRoot.querySelector("#velo").style.display = "none";
		}
	}

	cancelar() {
		[].forEach.call(this.shadowRoot.querySelectorAll("Select"), (element) => {
			element.value = "0";
		});
		this.update();
		store.dispatch(goTo("inicial"));
	}

	validaSelect(selects) {
		var reto = true;
		for (let i = 0; i < selects.length; i++) {
			var sel = this.shadowRoot.querySelector("#Combo" + this.retoPos(store.getState().combos.entities, selects[i]));
			var valor = 0;
			var options = sel && sel.options;
			for (var d = 0, iLen = options.length; d < iLen; d++) {
				var opt = options[d];
				if (opt.selected) {
					valor = valor + parseInt(opt.value);
				}
			}
			if (valor == 0) {
				sel.setAttribute("errorSelect", "");
				reto = false;
			}
		}
		return reto;
	}

	iniciar() {
		[].forEach.call(this.shadowRoot.querySelectorAll("[errorSelect]"), (element) => {
			element.removeAttribute("errorSelect");
		});
		var ok = true;
		ok = this.validaSelect(this.comboComunes);

		store.dispatch(showWarning("Finalizar!", "Recuerde contestar toda la encuesta y guardar las fotos necesarias.", "fondoInformacion", 3000));
		store.dispatch(goTo("inicial"));
	}

	static get properties() {
		return {
			mediaSize: {
				type: String,
				reflect: true,
				attribute: "media-size",
			},
			layout: {
				type: String,
				reflect: true,
			},
			hidden: {
				type: Boolean,
				reflect: true,
			},
			area: {
				type: String,
			},
			current: {
				type: String,
				reflect: true,
			},
		};
	}
}
window.customElements.define("encuesta-screen", encuestaScreen);
