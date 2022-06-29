/** @format */
import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { SVGS } from "../../../../assets/icons/svgs";
import { showWarning } from "../../../redux/ui/actions";

import { get as getTable } from "../../../redux/table/actions";

import { dmdBusquedaComponent } from "./dmdBusqueda";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

import { dmdSelect } from "../../css/dmdSelect";
import { dmdButton } from "../../css/dmdButton";
import { dmdInput } from "../../css/dmdInput";
import { dmdBuscar } from "../../css/dmdBuscar";

const TABLE = "table.timeStamp";
const TABLE_ERROR = "table.errorTimeStamp";

export class pruebaScreen extends connect(store, TABLE, TABLE_ERROR, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.dataSource = [];
		this.grid = [];
		this.config = [
			{ nombre: "Documento", titulo: "Documento", tipo: "numerico", align: "right" },
			{ nombre: "Nombre", titulo: "Nombre", tipo: "texto", align: "left" },
			{ nombre: "Usuario", titulo: "Usuario", tipo: "texto", align: "left" },
			{ nombre: "Fecha", titulo: "Fecha", tipo: "fecha", align: "center" },
		];
		this.estilosDmdBusqueda = css`
			.dmd-busqueda {
				width: 80%;
				height: 60%;
			}
			.dmd-busqueda-datos-titulos,
			.dmd-busqueda-datos-registros {
				grid-template-columns: 7.5rem 18rem 7rem 7rem !important;
				justify-content: center;
			}
			.dmd-busqueda-datos-registro[campo="Documento"] {
				text-align: right;
			}
			.dmd-busqueda-datos-registro[campo="Fecha"] {
				text-align: center;
			}
		`;
	}
	firstUpdated() {
		super.firstUpdated();
	}
	static get styles() {
		return css`
			${dmdInput}
			${dmdButton}
			${dmdSelect}
			${dmdBuscar}
			:host {
				display: grid;
				position: relative;
				height: 100%;
				width: 100%;
				background-color: var(--color-fondo);
				grid-gap: 1rem;
				justify-items: center;
				align-content: flex-start;
				overflow-y: auto;
				padding-top: 5rem;
			}

			:host([hidden]) {
				display: none;
			}
			.dmd-buscar,
			.dmd-select,
			.dmd-input {
				width: 20rem;
			}
		`;
	}
	render() {
		return html`
			<div class="dmd-input" helper>
				<label>Apellido y Nombre</label>
				<input type="text" id="cuatro" autocomplete="off" placeholder="Jose Perez" value="" />
				<div>Debe cargar Nombre</div>
				<span>En centimetros</span>
				${SVGS["INFO"]}
			</div>

			<div class="dmd-select" helper>
				<label>Seleccione</label>
				<select id="siete">
					<option value="0" disabled selected hidden>Selecciones opcion</option>
					<option value="1">Si</option>
					<option value="2">No</option>
				</select>
				<div>Debe cargar una opcion</div>
				<span>Si esta de acuerdo</span>
				${SVGS["INFO"]}
			</div>

			<div class="dmd-select" helper>
				<label>Seleccione</label>
				<select id="siete" multiple>
					<option value="1">Si</option>
					<option value="2">No</option>
				</select>
				<div>Debe cargar una opcion</div>
				<span>Si esta de acuerdo</span>
				${SVGS["INFO"]}
			</div>

			<div class="dmd-buscar" helper>
				<img
					@click="${this.mostrar}"
					tabindex="1"
					src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xNS41IDE0aC0uNzlsLS4yOC0uMjdDMTUuNDEgMTIuNTkgMTYgMTEuMTEgMTYgOS41IDE2IDUuOTEgMTMuMDkgMyA5LjUgM1MzIDUuOTEgMyA5LjUgNS45MSAxNiA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0eiIvPjwvc3ZnPg=="
				/>
				<label>Busqueda</label>
				<input type="text" id="cuatro" @click="${this.mostrar}" autocomplete="off" placeholder="Seleccione Opcion dsdsds sd dsd sds ds" value="" readonly />
				<div>Debe cargar Nombre</div>
				<span>En centimetros</span>
				${SVGS["INFO"]}
			</div>

			<div class="dmd-select" helper @click="${this.mostrar}">
				<label>Seleccione</label>
				<select id="nuevo">
					<option value="0" disabled selected hidden>Selecciones opcion</option>
				</select>
				<div>Debe cargar una opcion</div>
				<span>Si esta de acuerdo</span>
				${SVGS["INFO"]}
			</div>
			<dmd-busqueda-component hidden .dataSource=${this.dataSource} .estilos=${this.estilosDmdBusqueda} .config=${this.config} id="cBusqueda"> </dmd-busqueda-component>
		`;
	}
	mostrar(e) {
		var bus = this.shadowRoot.getElementById("cBusqueda");
		bus.dataSource = store.getState().table.entities;
		bus.estadoInicial = new Date().getTime();
		bus.hidden = false;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-prueba-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				if (!state.table.entities) {
					store.dispatch(getTable());
				}

				//this.update();
			}
		}
		if (name == TABLE) {
			this.dataSource = state.table.entities;
		}
		if (name == TABLE_ERROR) {
			store.dispatch(showWarning("Error", "No se pudo acceder a los datos, verifique su conexion", "fondoError", 4000));
		}
	}

	static get properties() {
		return {
			grid: {
				type: Object,
				state: true,
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
window.customElements.define("prueba-screen", pruebaScreen);
