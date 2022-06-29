/** @format */
import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { SVGS } from "../../../../assets/icons/svgs";
import { showWarning } from "../../../redux/ui/actions";

import { dmdBusquedaOdataBase } from "./js/dmdBusquedaOdataBase";
import { dmdBusquedaOdata } from "./css/dmdBusquedaOdata";
import { dmdBusquedaOdataThemeNormal } from "./css/dmdBusquedaOdataThemeNormal";

import { dmdBuscar } from "../../css/dmdBuscar";
import { dmdButton } from "../../css/dmdButton";

import { get as getTableOdata } from "../../../redux/tableOdata/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const TABLE = "tableOdata.timeStamp";
const TABLE_ERROR = "tableOdata.errorTimeStamp";

export class dmdBusquedaOdataComponent extends dmdBusquedaOdataBase(connect(store, TABLE, TABLE_ERROR, MEDIA_CHANGE, SCREEN)(LitElement)) {
	constructor() {
		super();
		this.area = "body";
		this.current = "";
		this.dataSource = [];
		this.grid = [];
		this.config = [];
		this.estilos = css``;
		this.filasPorPagina = 4;
		this.totalRegistros = 0;
		this.paginaActual = 0;
	}
	firstUpdated() {
		super.firstUpdated();
	}
	willUpdate(changedProperties) {
		if (changedProperties.has("dataSource")) {
			this.grid = this.dataSource;
		}
		if (changedProperties.has("estadoInicial")) {
			this._estadoInicial();
		}
	}
	static get styles() {
		return css`
			${dmdBusquedaOdata}
			${dmdBusquedaOdataThemeNormal}
			${dmdBuscar}
			${dmdButton}
			
			:host {
				display: grid;
				position: fixed;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				background-color: rgba(0, 0, 0, 0.2);
				justify-items: center;
				align-items: center;
				z-index: 100;
				transition: all 0.8s ease-in-out;
			}
			:host([hidden]) {
				top: 52vh;
				left: 52vw;
				bottom: 49vh;
				right: 49vw;
				z-index: -1;
				transition: all 0.8s ease-in-out;
			}
		`;
	}

	render() {
		return html`
			<style>
				${this.estilos}
			</style>
			<div class="dmd-busqueda-odata dmd-busqueda-odata-theme-normal">
				<div class="dmd-busqueda-odata-cabecera">
					<label>Usuarios</label>
					<div class="dmd-busqueda-odata-cabecera-cerrar">${SVGS["CLOSE"]}</div>
				</div>
				<div class="dmd-busqueda-odata-input">
					<div class="dmd-buscar " helper>
						<img
							class="dmd-busqueda-odata-input-lupa"
							tabindex="1"
							src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xNS41IDE0aC0uNzlsLS4yOC0uMjdDMTUuNDEgMTIuNTkgMTYgMTEuMTEgMTYgOS41IDE2IDUuOTEgMTMuMDkgMyA5LjUgM1MzIDUuOTEgMyA5LjUgNS45MSAxNiA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0eiIvPjwvc3ZnPg=="
						/>
						<label>Ingrese texto</label>
						<input class="dmd-busqueda-odata-input-input" type="text" id="cuatro" autocomplete="off" placeholder="Ej.: Buscapina" value="" />
						<div>Debe cargar Nombre</div>
						<span></span>
						${SVGS["INFO"]}
					</div>
					<div class="dmd-busqueda-odata-input-searchoff">${SVGS["SEARCHOFF"]}</div>
				</div>
				<div class="dmd-busqueda-odata-datos">
					<div class="dmd-busqueda-odata-datos-titulos">
						${this.config.map((item, index) => {
							return html`
								<div .campo=${item.nombre} .tipo=${item.tipo} class="dmd-busqueda-odata-datos-titulo" @click=${this._filtrarDmdBusqueda}>
									<label>${item.titulo}</label>
								</div>
							`;
						})}
					</div>
					${this.grid && this.grid.length > 0
						? this.grid.map((item, index) => {
								return html`
									<div class="dmd-busqueda-odata-datos-registros" @click=${this._seleccionarRegistroDmdBusqueda}>
										${this.config.map((campo, indexCampo) => {
											if (indexCampo == 0 && index == 0) {
												return html`<div class="dmd-busqueda-odata-datos-boton-top" grid-column-start="1" grid-column-end="4"></div>`;
											}
											return html` <div campo=${campo.nombre} class="dmd-busqueda-odata-datos-registro">${campo.tipo == "fecha" ? new Date(item[campo.nombre]).toLocaleDateString("fr-FR") : item[campo.nombre]}</div> `;
											if (indexCampo + 1 == this.config.length && index + 1 == this.grid.length && this.paginaActual * this.filasPorPagina < this.totalRegistros) {
												return html`<div class="dmd-busqueda-odata-datos-boton-bottom"></div>></div>`;
											}
										})}
									</div>
								`;
						  })
						: ""}
				</div>
			</div>
		`;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-busquedaOdata-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				if (!state.tableOdata.entities) {
					store.dispatch(getTableOdata());
				}

				//this.update();
			}
		}
		if (name == TABLE) {
			//this.dataSource = state.table.entities;
			this.grid = this.dataSource;
		}
		if (name == TABLE_ERROR) {
			store.dispatch(showWarning("Error", "No se pudo acceder a los datos, verifique su conexion", "fondoError", 4000));
		}
	}

	static get properties() {
		return {
			hidden: {
				type: Boolean,
				reflect: true,
				attribute: true,
			},
			estadoInicial: {
				type: Number,
				reflect: true,
				attribute: true,
			},
			config: {
				type: Object,
				reflect: true,
				attribute: true,
			},
			estilos: {
				type: Object,
				reflect: true,
				attribute: true,
			},
			grid: {
				type: Object,
				state: true,
			},
			dataSource: {
				type: Object,
				reflect: true,
				attribute: true,
			},
			mediaSize: {
				type: String,
				reflect: true,
				attribute: "media-size",
			},
			layout: {
				type: String,
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
window.customElements.define("dmd-busqueda-odata-component", dmdBusquedaOdataComponent);
