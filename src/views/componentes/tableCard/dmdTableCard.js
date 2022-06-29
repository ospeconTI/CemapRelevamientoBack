/** @format */
import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { SVGS } from "../../../../assets/icons/svgs";

import { dmdTableCardBase } from "./js/dmdTableCardBase";
import { dmdTableCard } from "./css/dmdTableCard";
import { dmdTableCardThemeNormal } from "./css/dmdTableCardThemeNormal";

import { dmdInput } from "../../css/dmdInput";
import { dmdButton } from "../../css/dmdButton";

import { getTable as getTable } from "../../../redux/table/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const TABLE = "table.table.timeStamp";
const TABLE_ERROR = "table.table.errorTimeStamp";

export class dmdTableCardComponent extends dmdTableCardBase(connect(store, TABLE, TABLE_ERROR, MEDIA_CHANGE, SCREEN)(LitElement)) {
	constructor() {
		super();
		this.area = "body";
		this.current = "";
		this.hidden = true;
		this.table = [];
		this.page = 0;
		this.filasPorPagina = 0;
		this.totalRegistros = 0;
		this.form = { Id: "Id.", Documento: "Documento.", Prefijo: "Prefijo.", Celular: "Celular.", Nombre: "Nombre.", Latitud: "Latitud.", Longitud: "Longitud.", Fecha: "Fecha." };
	}
	firstUpdated() {
		super.firstUpdated();
		this.filasPorPagina = this.shadowRoot.querySelector(".dmd-table-card-pie-filas-por-pagina").value;
		this.shadowRoot.querySelector(".dmd-table-card-pie-filas").innerHTML = "0" + "-" + "0" + " de " + "0";
	}
	static get styles() {
		return css`
			${dmdTableCard}
			${dmdTableCardThemeNormal}
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
			.dmd-table-card {
				height: 90%;
				min-height: 20rem;
				width: 95%;
				padding-top: 1rem;
			}
			:host([media-size="small"]) .dmd-table-card-datos {
				grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
			}
			.dmd-table-card-datos {
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
			<div class="dmd-table-card dmd-table-card-theme-normal">
				<div class="dmd-table-card-velo" hidden></div>
				<div class="dmd-table-card-cabecera">
					<div @click=${this._menuOcultardmdTableCard}>${SVGS["MENU"]}</div>
					<label style="width:fit-content">Table</label>
					<div class="dmd-table-card-cabecera-find">
						<input class="dmd-table-card-cabecera-find-input" type="text" autocomplete="off" value="" />
						<div class="dmd-table-card-cabecera-find-buscar">${SVGS["SEARCH"]}</div>
						<div class="dmd-table-card-cabecera-find-sort">${SVGS["SORT"]}</div>
						<div class="dmd-table-card-cabecera-find-sort-menu">
							<div .campo=${"Documento"} .tipo=${"numerico"} class="dmd-table-card-cabecera-find-sort-menu-item">Documento</div>
							<div .campo=${"Nombre"} .tipo=${"texto"} class="dmd-table-card-cabecera-find-sort-menu-item">Nombre</div>
							<div .campo=${"Fecha"} .tipo=${"fecha"} class="dmd-table-card-cabecera-find-sort-menu-item">Fecha</div>
							<div .campo=${"Latitud"} .tipo=${"numerico"} class="dmd-table-card-cabecera-find-sort-menu-item">Latitud</div>
							<div .campo=${"Longitud"} .tipo=${"numerico"} class="dmd-table-card-cabecera-find-sort-menu-item">Longitud</div>
						</div>
					</div>
				</div>
				<div class="dmd-table-card-cuerpo">
					<div class="dmd-table-card-menu">
						<div @click=${this._menuAmpliardmdTableCard}>${SVGS["FLECHARIGTH"]}<label style="display:none"></label></div>
						<div add>${SVGS["MAS"]}<label style="display:none">Agregar</label></div>
						<div edit>${SVGS["EDIT"]}<label style="display:none">Editar</label></div>
						<div delete @click=${this._registroFormdmdTableCard}>${SVGS["TRASH"]}<label style="display:none">Eliminar</label></div>
						<div view @click=${this._registroFormdmdTableCard}>${SVGS["VER"]}<label style="display:none">Visualizar</label></div>
					</div>
					<div class="dmd-table-card-datos">
						${this.table.map((item, index) => {
							return html`
								<div .index=${index} class="dmd-table-card-datos-registros" @click=${this._seleccionarRegistrodmdTableCard}>
									<div class="dmd-table-card-datos-registros-linea1">
										<div class="dmd-table-card-datos-registro" style="text-align:left">${"Id: " + item.Id}</div>
										<div class="dmd-table-card-datos-registro" style="text-align:rigth">${new Date(item.Fecha).toLocaleDateString("fr-FR")}</div>
									</div>
									<div class="dmd-table-card-datos-registro" style="text-align:left">${"Documento: " + item.Documento}</div>
									<div class="dmd-table-card-datos-registro" style="text-align:left">${"Nombre: " + item.Nombre}</div>
								</div>
							`;
						})}
					</div>
				</div>
				<div class="dmd-table-card-pie">
					<label>Filas</label>
					<select class="dmd-table-card-pie-filas-por-pagina">
						<option>2</option>
						<option>4</option>
						<option>6</option>
						<option>10</option>
						<option>50</option>
						<option>60</option>
						<option>70</option>
						<option>80</option>
						<option>90</option>
					</select>
					<label class="dmd-table-card-pie-filas">1-10 de 1000</label>
					<div dmd-table-card-pie-pagina class="dmd-table-card-pie-pagina-primera">${SVGS["FIRSTPAGE"]}</div>
					<div dmd-table-card-pie-pagina class="dmd-table-card-pie-pagina-anterior">${SVGS["ANTERIOR"]}</div>
					<div dmd-table-card-pie-pagina class="dmd-table-card-pie-pagina-posterior">${SVGS["POSTERIOR"]}</div>
					<div dmd-table-card-pie-pagina class="dmd-table-card-pie-pagina-ultima">${SVGS["LASTPAGE"]}</div>
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
			const SeMuestraEnUnasDeEstasPantallas = "-tableCard-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				//store.dispatch(getTable());
			}
		}
		if (name == TABLE) {
			this.table = state.table.table.entities;
			this.totalRegistros = state.table.table.count;
			let pageDesde = this.page > 0 ? this.page - 1 : 0;
			let numRegDesde = pageDesde * this.filasPorPagina > this.totalRegistros ? this.totalRegistros : pageDesde * this.filasPorPagina + 1;
			let numRegHasta = this.page * this.filasPorPagina > this.totalRegistros ? this.totalRegistros : this.page * this.filasPorPagina;
			this.shadowRoot.querySelector(".dmd-table-card-pie-filas").innerHTML = numRegDesde + "-" + numRegHasta + " de " + this.totalRegistros;
		}
		if (name == TABLE_ERROR) {
			store.dispatch(showWarning("Error", "No se pudo acceder a los datos, verifique su conexion", "fondoError", 4000));
		}
	}

	static get properties() {
		return {
			table: {
				type: Object,
				reflect: true,
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
window.customElements.define("dmd-table-card-component", dmdTableCardComponent);
