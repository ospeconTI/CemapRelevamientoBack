/** @format */
import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { SVGS } from "../../../../assets/icons/svgs";

import { dmdTableBase } from "./js/dmdTableBase";
import { dmdTable } from "./css/dmdTable";
import { dmdTableThemeNormal } from "./css/dmdTableThemeNormal";

import { dmdInput } from "../../css/dmdInput";
import { dmdButton } from "../../css/dmdButton";

import { getTable as getTable } from "../../../redux/table/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const TABLE = "table.table.timeStamp";
const TABLE_ERROR = "table.table.errorTimeStamp";

export class dmdTableComponent extends dmdTableBase(connect(store, TABLE, TABLE_ERROR, MEDIA_CHANGE, SCREEN)(LitElement)) {
	constructor() {
		super();
		this.area = "body";
		this.current = "";
		this.hidden = true;
		this.table = [];
		this.page = 0;
		this.filasPorPagina = 0;
		this.totalRegistros = 0;
	}
	firstUpdated() {
		super.firstUpdated();
		this.filasPorPagina = this.shadowRoot.querySelector(".dmd-table-pie-filas-por-pagina").value;
		this.shadowRoot.querySelector(".dmd-table-pie-filas").innerHTML = "0" + "-" + "0" + " de " + "0";
	}
	static get styles() {
		return css`
			${dmdTable}
			${dmdTableThemeNormal}
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
			.dmd-table {
				height: 90%;
				min-height: 20rem;
				width: 95%;
				padding-top: 1rem;
			}
			.dmd-table-datos-titulos,
			.dmd-table-datos-registros {
				grid-template-columns: 5rem 8rem 5rem 8rem 18rem 8rem 8rem 8rem 16rem;
			}
		`;
	}
	render() {
		return html`
			<div class="dmd-table dmd-table-theme-normal">
				<div class="dmd-table-velo" hidden></div>
				<div class="dmd-table-cabecera">
					<div @click=${this._menuOcultarDmdTable}>${SVGS["MENU"]}</div>
					<label style="width:fit-content">Table</label>
					<div class="dmd-table-cabecera-find">
						<input class="dmd-table-cabecera-find-input" type="text" autocomplete="off" value="" />
						<buscar class="dmd-table-cabecera-find-buscar">${SVGS["SEARCH"]}</buscar>
					</div>
				</div>
				<div class="dmd-table-cuerpo">
					<div class="dmd-table-menu">
						<div @click=${this._menuAmpliarDmdTable}>${SVGS["FLECHARIGTH"]}<label style="display:none"></label></div>
						<div add>${SVGS["MAS"]}<label style="display:none">Agregar</label></div>
						<div edit>${SVGS["EDIT"]}<label style="display:none">Editar</label></div>
						<div delete @click=${this._registroFormDmdTable}>${SVGS["TRASH"]}<label style="display:none">Eliminar</label></div>
						<div view @click=${this._registroFormDmdTable}>${SVGS["VER"]}<label style="display:none">Visualizar</label></div>
					</div>
					<div class="dmd-table-datos">
						<div class="dmd-table-datos-titulos">
							<div campo="Id" tipo="numerico" class="dmd-table-datos-titulo"><label>Id</label></div>
							<div campo="Documento" tipo="numerico" dmd-table-orden class="dmd-table-datos-titulo"><label>Documento</label></div>
							<div campo="Prefijo" tipo="numerico" class="dmd-table-datos-titulo"><label>Prefijo</label></div>
							<div campo="Celular" tipo="numerico" dmd-table-orden class="dmd-table-datos-titulo"><label>Celular</label></div>
							<div campo="Nombre" tipo="texto" dmd-table-orden class="dmd-table-datos-titulo"><label>Nombre</label></div>
							<div campo="Latitud" tipo="numerico" dmd-table-orden class="dmd-table-datos-titulo"><label>Latitud</label></div>
							<div campo="Longitud" tipo="numerico" dmd-table-orden class="dmd-table-datos-titulo"><label>Longitud</label></div>
							<div campo="Usuario" tipo="texto" dmd-table-orden class="dmd-table-datos-titulo"><label>Usuario</label></div>
							<div campo="Fecha" tipo="fecha" dmd-table-orden class="dmd-table-datos-titulo"><label>Fecha</label></div>
						</div>
						${this.table.map((item, index) => {
							return html`
								<div class="dmd-table-datos-registros" .index=${index} @click=${this._seleccionarRegistroDmdTable}>
									<div class="dmd-table-datos-registro" style="text-align:right">${item.Id}</div>
									<div class="dmd-table-datos-registro" style="text-align:right">${item.Documento}</div>
									<div class="dmd-table-datos-registro" style="text-align:right">${item.Prefijo}</div>
									<div class="dmd-table-datos-registro" style="text-align:right">${item.Celular}</div>
									<div class="dmd-table-datos-registro" style="text-align:left">${item.Nombre}</div>
									<div class="dmd-table-datos-registro" style="text-align:center">${item.Latitud}</div>
									<div class="dmd-table-datos-registro" style="text-align:center">${item.Longitud}</div>
									<div class="dmd-table-datos-registro" style="text-align:left">${item.Usuario}</div>
									<div class="dmd-table-datos-registro" style="text-align:left">${new Date(item.Fecha).toLocaleDateString("fr-FR")}</div>
								</div>
							`;
						})}
					</div>
				</div>
				<div class="dmd-table-pie">
					<label>Filas</label>
					<select class="dmd-table-pie-filas-por-pagina">
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
					<label class="dmd-table-pie-filas">1-10 de 1000</label>
					<div dmd-table-pie-pagina class="dmd-table-pie-pagina-primera">${SVGS["FIRSTPAGE"]}</div>
					<div dmd-table-pie-pagina class="dmd-table-pie-pagina-anterior">${SVGS["ANTERIOR"]}</div>
					<div dmd-table-pie-pagina class="dmd-table-pie-pagina-posterior">${SVGS["POSTERIOR"]}</div>
					<div dmd-table-pie-pagina class="dmd-table-pie-pagina-ultima">${SVGS["LASTPAGE"]}</div>
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
			const SeMuestraEnUnasDeEstasPantallas = "-table-".indexOf("-" + state.screen.name + "-") != -1;
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
			this.shadowRoot.querySelector(".dmd-table-pie-filas").innerHTML = numRegDesde + "-" + numRegHasta + " de " + this.totalRegistros;
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
window.customElements.define("dmd-table-component", dmdTableComponent);
