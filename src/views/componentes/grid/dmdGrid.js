/** @format */
import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { SVGS } from "../../../../assets/icons/svgs";
import { showWarning } from "../../../redux/ui/actions";

import { dmdGridBase } from "./js/dmdGridBase";
import { dmdGrid } from "./css/dmdGrid";
import { dmdGridThemeNormal } from "./css/dmdGridThemeNormal";

import { dmdInput } from "../../css/dmdInput";
import { dmdButton } from "../../css/dmdButton";

import { get as getTable } from "../../../redux/table/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const TABLE = "table.timeStamp";
const TABLE_ERROR = "table.errorTimeStamp";

export class dmdGridComponent extends dmdGridBase(connect(store, TABLE, TABLE_ERROR, MEDIA_CHANGE, SCREEN)(LitElement)) {
	constructor() {
		super();
		this.area = "body";
		this.current = "";
		this.hidden = true;
		this.dataSource = [];
		this.grid = [];
	}
	firstUpdated() {
		super.firstUpdated();
		this.grid = this.dataSource;
	}
	static get styles() {
		return css`
			${dmdGrid}
			${dmdGridThemeNormal}
			${dmdInput}
			${dmdButton}
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
			}

			:host([hidden]) {
				display: none;
			}
			.dmd-grid {
				height: 95%;
				min-height: 20rem;
				width: 95%;
				padding-top: 1rem;
			}
			.dmd-grid-datos-titulos,
			.dmd-grid-datos-registros {
				grid-template-columns: 1fr 2fr 1fr repeat(3, 2.5fr) 2fr 2fr;
			}
		`;
	}
	render() {
		return html`
			<div class="dmd-grid dmd-grid-theme-normal">
				<div class="dmd-grid-velo" hidden></div>
				<div class="dmd-grid-cabecera">
					<div @click=${this._menuOcultarDmdGrid}>${SVGS["MENU"]}</div>
					<label>Exploradores</label>
					<div class="dmd-grid-cabecera-find">
						<input class="dmd-grid-cabecera-find-input" hidden type="text" autocomplete="off" value="" />
						<buscar class="dmd-grid-cabecera-find-buscar">${SVGS["SEARCH"]}</buscar>
						<cerrar class="dmd-grid-cabecera-find-cerrar" hidden>${SVGS["CLOSE"]}</cerrar>
					</div>
				</div>

				<div class="dmd-grid-cuerpo">
					<div class="dmd-grid-menu">
						<div @click=${this._menuAmpliarDmdGrid}>${SVGS["FLECHARIGTH"]}<label style="display:none"></label></div>
						<div add>${SVGS["MAS"]}<label style="display:none">Agregar</label></div>
						<div edit>${SVGS["EDIT"]}<label style="display:none">Editar</label></div>
						<div delete @click=${this._registroFormDmdGrid}>${SVGS["TRASH"]}<label style="display:none">Eliminar</label></div>
						<div view @click=${this._registroFormDmdGrid}>${SVGS["VER"]}<label style="display:none">Visualizar</label></div>
					</div>
					<div class="dmd-grid-datos">
						<div class="dmd-grid-datos-titulos">
							<div .campo=${"Id"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Id</label></div>
							<div .campo=${"Documento"} class="dmd-grid-datos-titulo"><label>Documento</label></div>
							<div .campo=${"Celular"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Celular</label></div>
							<div .campo=${"Nombre"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Nombre release</label></div>
							<div .campo=${"Latitud"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Latitud</label></div>
							<div .campo=${"Longitud"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Longitud</label></div>
							<div .campo=${"Usuario"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Usuario</label></div>
							<div .campo=${"Fecha"} dmd-grid-orden class="dmd-grid-datos-titulo"><label>Fecha</label></div>
						</div>
						${this.grid.map((item, index) => {
							return html`
								<div class="dmd-grid-datos-registros" .index=${index} @click=${this._seleccionarRegistroDmdGrid}>
									<div class="dmd-grid-datos-registro" style="text-align:right">${item.Id}</div>
									<div class="dmd-grid-datos-registro">${item.Documento}</div>
									<div class="dmd-grid-datos-registro" style="text-align:right">${item.Celular}</div>
									<div class="dmd-grid-datos-registro">${item.Nombre}</div>
									<div class="dmd-grid-datos-registro" style="text-align:right">${item.Latitud}</div>
									<div class="dmd-grid-datos-registro" style="text-align:right">${item.Longitud}</div>
									<div class="dmd-grid-datos-registro" style="text-align:right">${item.Usuario}</div>
									<div class="dmd-grid-datos-registro" tipo="fecha" style="text-align:right">${new Date(item.Fecha).toLocaleDateString("fr-FR")}</div>
								</div>
							`;
						})}
					</div>
				</div>
			</div>
		`;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-grid-".indexOf("-" + state.screen.name + "-") != -1;
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
			this._buscarDmdGrid();
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
window.customElements.define("dmd-grid-component", dmdGridComponent);
