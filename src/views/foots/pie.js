/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { SVGS } from "../../../assets/icons/svgs";
import { goTo, goPrev, goHistoryPrev } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { showWarning } from "../../redux/ui/actions";
import { dmdMenuBar } from "../css/dmdMenuBar";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
export class pieComponente extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "foot";
		this.idioma = store.getState().ui.idioma;
		this.menuJSON = require("../../../assets/idiomas/controles/menuBar.json");
	}

	static get styles() {
		return css`
			${dmdMenuBar}
			:host {
				display: grid;
				position: relative;
			}
			:host([hidden]) {
				display: none;
			}
			:host([area="body"]:not([media-size="large"])) .dmd-menu-bar {
				position: fixed !important;
				display: grid !important;
				bottom: 0 !important;
				left: 0 !important;
				width: 100%;
				height: inherit;
			}
			:host([area="body"][media-size="large"]) .dmd-menu-bar {
				display: none;
			}
		`;
	}
	get _menuBar() {
		return this.menuJSON[this.idioma];
	}
	render() {
		return html`
			<div class="dmd-menu-bar" tabindex="0">
				<div id="mbVelo" class="dmd-menu-bar-velo" tabindex="0" @click=${this.veloSacar}></div>
				<input class="dmd-menu-bar-check-check" name="dmd-menu-bar-check1" id="dmd-menu-bar-check1" type="checkbox" checked />
				<label class="dmd-menu-bar-check-label" for="dmd-menu-bar-check1"></label>
				<div class="dmd-menu-bar-menu" tabindex="1">
					${this._menuBar.opciones.map((item, index) => {
						return html` <div class="dmd-menu-bar-item" tabindex="2" .accion=${item.accion} @click=${this.menu}>${SVGS[item.svg]}<lable class="dmd-menu-bar-leyenda">${item.opcion}</lable></div> `;
					})}
				</div>
				<input class="dmd-menu-bar-mas-check" name="dmd-menu-bar-mas1" id="dmd-menu-bar-mas1" type="checkbox" />
				<label class="dmd-menu-bar-mas-label" for="dmd-menu-bar-mas1" @click=${this.velo}></label>
				<div class="dmd-menu-bar-submenu" tabindex="0">
					${this._menuBar.mas.map((item, index) => {
						return html`<div class="dmd-menu-bar-submenu-opcion" tabindex="0" .accion=${item.accion} @click=${this.mas}>${SVGS[item.svg]}<lable class="dmd-menu-bar-submenu-opcion-label">${item.opcion}</lable></div>`;
					})}
				</div>
			</div>
		`;
	}
	velo() {
		let velo = this.shadowRoot.querySelector("#mbVelo");
		velo.style.display = "grid";
	}
	veloSacar() {
		let velo = this.shadowRoot.querySelector("#mbVelo");
		velo.style.display = "none";
		let submenu = this.shadowRoot.querySelector("#dmd-menu-bar-mas1");
		submenu.checked = false;
	}
	volver() {
		if ("-main-".indexOf("-" + store.getState().screen.name + "-") == -1) {
			store.dispatch(goHistoryPrev());
		}
	}
	menu(e) {
		let accion = e.currentTarget.accion;
		this.veloSacar();
		store.dispatch(goTo(accion));
	}
	mas(e) {
		let accion = e.currentTarget.accion;
		this.veloSacar();
		store.dispatch(goTo(accion));
	}

	perfil() {
		var usu = store.getState().autorizacion.usuario;
		if (usu) {
			store.dispatch(goTo("registroUpdate"));
		} else {
			store.dispatch(showWarning("ATENCION", "Debe estar logueado para modificar su perfil", "fondoError", 2000));
		}
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE || name == FOOTHER_TAPA) {
			this.footherMuestraTapa = state.ui.media.footherMuestraTapa;
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			const haveFootArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-inicial-login-registro-registroUpdate-claveCambio-activacion-grid-table-tableCard-gridCard-menuDrop-prueba-pruebaOdata-".indexOf("-" + state.screen.name + "-") != -1;
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
				reflect: true,
			},
			footherMuestraTapa: {
				type: Boolean,
				reflect: true,
				attribute: "foother-muestra-tapa",
			},
		};
	}
}

window.customElements.define("pie-componente", pieComponente);
