/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { SVGS } from "../../../assets/icons/svgs";
import { IMAGES } from "../../../assets/images/images";
import { goTo, goPrev, goHistoryPrev } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { showWarning } from "../../redux/ui/actions";
import { dmdTitulo } from "../css/dmdTitulo";
import { dmdLeftBar } from "../css/dmdLeftBar";

import { dmdMenuDropComponent } from "../componentes/menuDrop/dmdMenuDrop";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
export class menuComponente extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "header";
		this.idioma = store.getState().ui.idioma;
		this.menuJSON = require("../../../assets/idiomas/controles/titulo.json");
		this.leftBarJSON = require("../../../assets/idiomas/controles/leftBar.json");
	}

	static get styles() {
		return css`
			${dmdTitulo}
			${dmdLeftBar}
			:host {
				display: grid;
				position: relative;
			}
			:host([hidden]) {
				display: none;
			}
			.dmd-titulo-col-uno svg {
				min-width: 1rem !important;
				min-width: 1rem !important;
				max-width: 1.4rem !important;
				min-height: 1.4rem !important;
			}
		`;
	}
	get _menu() {
		var reto = [];
		[].forEach.call(this.menuJSON[this.idioma].opciones, (element) => {
			if (element.rol.find((element) => element == "TODOS") || (store.getState().autorizacion?.usuario?.Roles && element.rol.find((element) => element == store.getState().autorizacion.usuario.Roles[0]))) {
				reto.push(element);
			}
		});
		return reto;
		//return this.menuJSON[this.idioma];
	}
	get _leftBar() {
		var reto = [];
		[].forEach.call(this.leftBarJSON[this.idioma].opciones, (element) => {
			if (element.rol.find((element) => element == "TODOS") || (store.getState().autorizacion?.usuario?.Roles && element.rol.find((element) => element == store.getState().autorizacion.usuario.Roles[0]))) {
				reto.push(element);
			}
		});
		return reto;
		//return this.leftBarJSON[this.idioma];
	}
	render() {
		return html`
			<div class="dmd-titulo">
				<div class="dmd-titulo-col-uno">${IMAGES["LOGO_CHICO_01"]}</div>
				<div class="dmd-titulo-col-dos">
					<lable class="dmd-titulo-label-movil">${this._menu.titulo}</lable>
					${this._menu.map((item, index) => {
						return html` <lable class="dmd-titulo-label-pc" .accion=${item.accion} @click=${this.menu}>${item.opcion}</lable> `;
					})}
				</div>
				<div class="dmd-titulo-col-tres" @click=${this.mostrarLeftMenu}>${SVGS["MENU"]}</div>
			</div>

			<input id="leftBarCheck" class="dmd-left-bar-check" type="checkbox" />
			<div class="dmd-left-bar" tabindex="0">
				<div class="dmd-left-bar-velo" tabindex="0" @click=${this.ocultarLeftMenu}></div>
				<div class="dmd-left-bar-titulo">
					<label class="dmd-left-bar-titulo-label"></label>
					<div @click=${this.ocultarLeftMenu}>${SVGS["FORWARD"]}</div>
				</div>
				<div class="dmd-left-bar-opciones">
					${this._leftBar.map((item, index) => {
						return html` <div class="dmd-left-bar-opcion" .accion=${item.accion} @click=${this.leftBar}>${item.opcion}</div> `;
					})}
				</div>
			</div>
		`;
	}
	mostrarLeftMenu() {
		let velo = this.shadowRoot.querySelector("#leftBarCheck");
		velo.checked = true;
	}
	ocultarLeftMenu() {
		let velo = this.shadowRoot.querySelector("#leftBarCheck");
		velo.checked = false;
	}

	menu(e) {
		let accion = e.currentTarget.accion;
		this.ocultarLeftMenu();
		if (accion != "verMenu") {
			store.dispatch(goTo(accion));
		}
	}

	leftBar(e) {
		let accion = e.currentTarget.accion;
		this.ocultarLeftMenu();
		store.dispatch(goTo(accion));
	}

	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE || name == FOOTHER_TAPA) {
			this.footherMuestraTapa = state.ui.media.footherMuestraTapa;
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			const haveFootArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-inicial--claveCambio-activacion-estadoCemap-galeria-galeriaPorCemap-firma-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveFootArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				this.update();
			}
		}
	}
	static get properties() {
		return {
			opcion: {
				type: String,
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
			footherMuestraTapa: {
				type: Boolean,
				reflect: true,
				attribute: "header-muestra-tapa",
			},
		};
	}
}

window.customElements.define("menu-componente", menuComponente);
