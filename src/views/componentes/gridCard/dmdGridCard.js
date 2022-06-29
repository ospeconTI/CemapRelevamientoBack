/** @format */
import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { SVGS } from "../../../../assets/icons/svgs";
import { showWarning } from "../../../redux/ui/actions";

import { dmdGridCardBase } from "./js/dmdGridCardBase";
import { dmdGridCard } from "./css/dmdGridCard";
import { dmdGridCardThemeNormal } from "./css/dmdGridCardThemeNormal";

import { dmdInput } from "../../css/dmdInput";
import { dmdButton } from "../../css/dmdButton";

import { get as getTable } from "../../../redux/table/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const TABLE = "table.timeStamp";
const TABLE_ERROR = "table.errorTimeStamp";

export class dmdGridCardComponent extends dmdGridCardBase(connect(store, TABLE, TABLE_ERROR, MEDIA_CHANGE, SCREEN)(LitElement)) {
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
			${dmdGridCard}
			${dmdGridCardThemeNormal}
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
			.dmd-grid-card {
				height: 95%;
				min-height: 20rem;
				width: 95%;
				padding-top: 1rem;
			}
			:host([media-size="small"]) .dmd-grid-card-datos {
				grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
			}
			.dmd-grid-card-datos {
				grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
			}
			.dmd-table-card-datos-registros-linea1 {
				display: grid;
				grid-template-columns: 1fr auto;
			}
		`;
	}
	render() {
		return html`
			<div class="dmd-grid-card dmd-grid-card-theme-normal">
				<div class="dmd-grid-card-velo" hidden></div>
				<div class="dmd-grid-card-cabecera">
					<div @click=${this._menuOcultarDmdGrid}>${SVGS["MENU"]}</div>
					<label>Exploradores</label>
					<div class="dmd-grid-card-cabecera-find">
						<input class="dmd-grid-card-cabecera-find-input" hidden type="text" autocomplete="off" value="" />
						<div class="dmd-grid-card-cabecera-find-buscar">${SVGS["SEARCH"]}</div>
						<div class="dmd-grid-card-cabecera-find-cerrar" hidden>${SVGS["CLOSE"]}</div>
						<div class="dmd-grid-card-cabecera-find-sort">${SVGS["SORT"]}</div>
						<div class="dmd-grid-card-cabecera-find-sort-menu">
							<div .campo=${"Documento"} .tipo=${"numerico"} class="dmd-grid-card-cabecera-find-sort-menu-item">Documento</div>
							<div .campo=${"Nombre"} .tipo=${"texto"} class="dmd-grid-card-cabecera-find-sort-menu-item">Nombre</div>
							<div .campo=${"Fecha"} .tipo=${"fecha"} class="dmd-grid-card-cabecera-find-sort-menu-item">Fecha</div>
							<div .campo=${"Latitud"} .tipo=${"numerico"} class="dmd-grid-card-cabecera-find-sort-menu-item">Latitud</div>
							<div .campo=${"Longitud"} .tipo=${"numerico"} class="dmd-grid-card-cabecera-find-sort-menu-item">Longitud</div>
						</div>
					</div>
				</div>

				<div class="dmd-grid-card-cuerpo">
					<div class="dmd-grid-card-menu">
						<div @click=${this._menuAmpliarDmdGrid}>${SVGS["FLECHARIGTH"]}<label style="display:none"></label></div>
						<div add>${SVGS["MAS"]}<label style="display:none">Agregar</label></div>
						<div edit>${SVGS["EDIT"]}<label style="display:none">Editar</label></div>
						<div delete @click=${this._registroFormDmdGrid}>${SVGS["TRASH"]}<label style="display:none">Eliminar</label></div>
						<div view @click=${this._registroFormDmdGrid}>${SVGS["VER"]}<label style="display:none">Visualizar</label></div>
					</div>
					<div class="dmd-grid-card-datos">
						${this.grid.map((item, index) => {
							return html`
								<div class="dmd-grid-card-datos-registros" .index=${index} @click=${this._seleccionarRegistroDmdGrid}>
									<div class="dmd-grid-card-datos-registros-linea1">
										<div class="dmd-grid-card-datos-registro" style="text-align:left">${"Id: " + item.Id}</div>
										<div class="dmd-grid-card-datos-registro" style="text-align:rigth">${new Date(item.Fecha).toLocaleDateString("fr-FR")}</div>
									</div>
									<div class="dmd-grid-card-datos-registro" style="text-align:left">${"Documento: " + item.Documento}</div>
									<div class="dmd-grid-card-datos-registro" style="text-align:left">${"Nombre: " + item.Nombre}</div>
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
			const SeMuestraEnUnasDeEstasPantallas = "-gridCard-".indexOf("-" + state.screen.name + "-") != -1;
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
window.customElements.define("dmd-grid-card-component", dmdGridCardComponent);
