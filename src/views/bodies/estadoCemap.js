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
import { dmdGridBase } from "../componentes/grid/js/dmdGridBase";
import { dmdGrid } from "../componentes/grid/css/dmdGrid";
import { dmdGridThemeNormal } from "../componentes/grid/css/dmdGridThemeNormal";

import { dmdBusquedaComponent } from "../componentes/busqueda/dmdBusqueda";

import { cargar as getGeolocalizacion } from "../../redux/geolocalizacion/actions";

import { add as addEncuestas, addCabecera as addEncuenstaCabecera, addDetalleActualizar as addEncuestaDetalleActualizar } from "../../redux/encuestas/actions";
import { get_Cemap_Combo_Opcion as getEncuestasPorCemapComboOpcion } from "../../redux/encuestas/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const DATOS_ENCUESTAS = "encuestas.porCemapComboOpcion.timeStamp";
const ERROR_ENCUESTAS = "encuestas.porCemapComboOpcion.errorTimeStamp";

export class estadoCemapScreen extends dmdGridBase(connect(store, DATOS_ENCUESTAS, ERROR_ENCUESTAS, MEDIA_CHANGE, SCREEN)(LitElement)) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";

		this.dataSource = [];
		this.grid = [];

		this.config = [
			{ nombre: "Nombre", titulo: "Cemap", tipo: "texto", valorTodos: "TODOS" },
			{ nombre: "Codigo", titulo: "Codigo", tipo: "texto", valorTodos: "0000" },
		];
		this.cemapSeleccionado = {};
		this.relevamientoSeleccionado = null;
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
			${dmdGrid}
			${dmdGridThemeNormal}
			${dmdInput}
			:host {
				display: grid;
				position: relative;
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
				width: 50vw;
				height: max-content;
				justify-self: center;
				margin-top: 3rem;
				align-items: center;
				justify-items: center;
				border-radius: 1rem;
			}
			:host(:not([media-size="large"])) #seleccion {
				width: 90%;
			}

			#seleccioncemap {
				padding: 2rem 0;
				width: 90%;
				height: max-content;
			}
			#cuerpo {
				display: none;
				background-color: transparent;
				width: 95%;
				justify-self: center;
				overflow-y: auto;
				height: 80vh;
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
			.divLinea {
				width: 100%;
				height: 1px;
				background-color: var(--ColorPrimario);
				margin: 2vh 0 1.5vh 0;
			}
			*[apagado] {
				display: none;
			}
			.dmd-grid {
				height: 75vh;
				min-height: 20rem;
				width: 100%;
				padding-top: 1rem;
			}
			.dmd-grid-datos-titulos,
			.dmd-grid-datos-registros {
				grid-template-columns: 18rem 20rem 12rem 8rem 8rem;
			}
		`;
	}
	get _cemap() {
		return this.shadowRoot.querySelector("#cemap");
	}
	firstUpdated() {
		super.firstUpdated();
		this.shadowRoot.getElementById("cemapBusqueda")._itemSeleccionado = this.itemSeleccionado.bind(this);
		this.grid = this.dataSource;
	}

	willUpdate(changedProperties) {
		if (changedProperties.has("hidden")) {
			if (this.hidden && this.shadowRoot.getElementById("seleccion")) {
			}
		}
	}
	render() {
		if (true) {
			return html`
				<div id="velo"></div>
				<div id="titulo">Ver los CEMAPS</div>
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
						<div class="dmd-select" helper>
							<label>Opcion</label>
							<select id="opcion">
								${store.getState().combos.entities
									? store
											.getState()
											.combos.entities.sort(function (a, b) {
												return a["Id"] > b["Id"] ? 1 : -1;
											})
											.map((opt, index) => {
												if (index == 0) {
													return html`<option value="0" selected>Sin opcion</option>
														<option value="${opt.Id}">${opt.Label.substring(0, 30)}</option>`;
												} else {
													return html`<option value="${opt.Id}">${opt.Label.substring(0, 30)}</option>`;
												}
											})
									: ""}
							</select>
							<div></div>
							<span></span>
						</div>
						<div class="dmd-select" helper>
							<label>Valoracion</label>
							<select id="valoracion">
								${store.getState().combos.entities
									? store
											.getState()
											.combos.entities[0].Opciones.sort(function (a, b) {
												return a["Id"] > b["Id"] ? 1 : -1;
											})
											.map((opt, index) => {
												if (index == 0) {
													return html`<option value="0" selected>Sin opcion</option>`;
												} else {
													return html`<option value="${opt.Orden}">${opt.Caption.substring(0, 30)}</option>`;
												}
											})
									: ""}
							</select>
							<div></div>
							<span></span>
						</div>
						<div class="grid column" style="padding-top:2vh;">
							<button class="dmd-button miBoton" normal bordeRedondo @click="${this.cancelar}">Cancelar</button>
							<button class="dmd-button miBoton" normal bordeRedondo @click="${this.seleccionarCemap}">Aceptar</button>
						</div>
					</div>
				</div>
				<div id="cuerpo" class="row">
					<div id="cuerpoDatos">
						<div class="dmd-grid dmd-grid-theme-normal">
							<div class="dmd-grid-velo" hidden></div>
							<div class="dmd-grid-cabecera">
								<div @click=${this._menuOcultarDmdGrid}>${SVGS["MENU"]}</div>
								<label>Encuestas</label>
								<div class="dmd-grid-cabecera-find">
									<input class="dmd-grid-cabecera-find-input" hidden type="text" autocomplete="off" value="" />
									<buscar class="dmd-grid-cabecera-find-buscar">${SVGS["SEARCH"]}</buscar>
									<cerrar class="dmd-grid-cabecera-find-cerrar" hidden>${SVGS["CLOSE"]}</cerrar>
								</div>
							</div>

							<div class="dmd-grid-cuerpo">
								<div class="dmd-grid-menu">
									<div @click=${this._menuAmpliarDmdGrid}>${SVGS["FLECHARIGTH"]}<label style="display:none"></label></div>
									<div @click=${this.volver}>${SVGS["BACK"]}<label style="display:none">Seleccion</label></div>
									<div @click=${this.galeria}>${SVGS["IMAGE"]}<label style="display:none">Fotos</label></div>
									<div view @click=${this._registroFormDmdGrid}>${SVGS["VER"]}<label style="display:none">Visualizar</label></div>
								</div>
								<div class="dmd-grid-datos">
									<div class="dmd-grid-datos-titulos">
										<div .campo=${"Cemap"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Cemap</label></div>
										<div .campo=${"ComboCaption"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Opcion</label></div>
										<div .campo=${"OpcionCaption"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Valoracion</label></div>
										<div .campo=${"Usuario"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Usuario</label></div>
										<div .campo=${"Fecha"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Fecha</label></div>
									</div>
									${this.grid.map((item, index) => {
										return html`
											<div class="dmd-grid-datos-registros" .index=${index} .item=${item} @click=${this._seleccionarRegistroDmdGrid}>
												<div class="dmd-grid-datos-registro" style="text-align:left">${item.Cemap}</div>
												<div class="dmd-grid-datos-registro" style="text-align:left">${item.ComboCaption}</div>
												<div class="dmd-grid-datos-registro" style="text-align:left">${item.OpcionCaption}</div>
												<div class="dmd-grid-datos-registro" style="text-align:center">${item.Usuario}</div>
												<div class="dmd-grid-datos-registro" tipo="fecha" style="text-align:center">${new Date(item.Fecha).toLocaleDateString("fr-FR")}</div>
											</div>
										`;
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
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
	_itemSeleccionado(e) {
		let r = 0;
	}
	_seleccionarRegistroDmdGrid(e) {
		super._seleccionarRegistroDmdGrid(e);
		this.relevamientoSeleccionado = e.currentTarget.item;
		let rr = 0;
	}
	seleccionarCemap() {
		let cemap = this.shadowRoot.getElementById("cemap");
		let opcion = this.shadowRoot.getElementById("opcion");
		let valoracion = this.shadowRoot.getElementById("valoracion");
		let vCemap = 0;
		let vOpcioin = 0;
		let vValoracion = 0;
		let ok = true;
		if (cemap.value != "TODOS" && cemap.value != "") {
			vCemap = Number(this.cemapSeleccionado.Id);
		}
		if (opcion.value != "0") {
			vOpcioin = Number(opcion.value);
		}
		if (valoracion.value != "0") {
			vValoracion = Number(valoracion.value);
		}
		if (ok) {
			store.dispatch(getEncuestasPorCemapComboOpcion(vCemap, vOpcioin, vValoracion));
		}
	}
	cemapsVer() {
		var cemapBusqueda = this.shadowRoot.getElementById("cemapBusqueda");
		if (this._cemap.value == "") {
			cemapBusqueda._estadoInicial();
		}
		cemapBusqueda.hidden = false;
	}
	galeria() {
		if (this.relevamientoSeleccionado) {
			let manager = document.getElementById("manager");
			let galeria = manager.shadowRoot.getElementById("galeria");
			galeria.opcion = { tipo: "IdDetalle", variable: this.relevamientoSeleccionado.IdDetalle };
			store.dispatch(goTo("galeria"));
		}
	}
	atras() {
		store.dispatch(goHistoryPrev());
	}
	volver() {
		this.shadowRoot.getElementById("titulo").innerHTML = "Ver los CEMAPS";
		this.shadowRoot.getElementById("seleccion").style.display = "grid";
		this.shadowRoot.getElementById("cuerpo").style.display = "none";
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			let hiddenAntrior = this.hidden;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-estadoCemap-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				if (hiddenAntrior != this.hidden) {
					this.shadowRoot.getElementById("titulo").innerHTML = "Ver los CEMAPS";
				} else if (name == SCREEN) {
					//this.shadowRoot.getElementById("titulo").innerHTML = "Ver los CEMAPS";
					//this.shadowRoot.getElementById("seleccion").style.display = "grid";
					//this.shadowRoot.getElementById("cuerpo").style.display = "none";
				}
			}
		}
		if (name == DATOS_ENCUESTAS) {
			this.dataSource = [];
			state.encuestas.porCemapComboOpcion.entities.map((item, index) => {
				let nGrid = {
					IdCemap: item.Cabecera.IdCemap,
					Cemap: this.buscaCemapPorId(item.Cabecera.IdCemap),
					IdCombo: item.IdCombo,
					IdDetalle: item.Id,
					ComboCaption: item.Combo.Label,
					OpcionCaption: item.Opciones.Caption,
					Usuario: item.Cabecera.Usuario,
					Fecha: item.Cabecera.Fecha,
				};
				this.dataSource.push(nGrid);
			});
			this._buscarDmdGrid();
			this.shadowRoot.getElementById("seleccion").style.display = "none";
			this.shadowRoot.getElementById("cuerpo").style.display = "grid";
			//store.dispatch(showWarning("Todo Ok!!!!", "", "fondoOk", 4000));
		}
		if (name == ERROR_ENCUESTAS) {
			store.dispatch(showWarning("Error!!!!", "Verifique su conexion de datos y reintente", "fondoError", 4000));
		}
	}
	buscaCemapPorId(IdCemap) {
		let nombre = "";
		for (let cemap of store.getState().cemaps.entities) {
			if (cemap.Id == IdCemap) {
				return cemap.Nombre;
			}
		}
		return "";
	}
	cancelar() {
		[].forEach.call(this.shadowRoot.querySelectorAll("Select"), (element) => {
			element.value = "0";
		});
		this.update();
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
window.customElements.define("estado-cemap-screen", estadoCemapScreen);
