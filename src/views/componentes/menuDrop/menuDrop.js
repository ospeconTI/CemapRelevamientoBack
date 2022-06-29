/** @format */
import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { SVGS } from "../../../../assets/icons/svgs";
import { showWarning } from "../../../redux/ui/actions";

import { dmdMenuDropComponent } from "./dmdMenuDrop";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class menuDropScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.area = "body";
		this.current = "";
		this.hidden = true;
		this.menu = [
			{ id: 1, menu: "ppal", label: "Proovedores", svg: "SEARCH", accion: "1" },
			{ id: 2, menu: "ppal", label: "Generar factura", svg: "VER", accion: "2" },
			{ id: 2, menu: "ppal", label: "Ver nuevos proveedores", svg: "OK", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "", svg: "", accion: "linea-" },
			{ id: 2, menu: "ppal", label: "Nuevos movimientos", svg: "", accion: "4" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "LOGOUT", accion: "5" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "NUEVACLAVE", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "ACTIVAR", accion: "6" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "LOGIN", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "TIME", accion: "menu-prov" },
			{ id: 2, menu: "prov", label: "Prov uno", svg: "INFO", accion: "menu-prov" },
			{ id: 2, menu: "prov", label: "Prov dos", svg: "HOMEOUTLINE", accion: "menu-prov" },
			{ id: 2, menu: "prov", label: "Prov tres", svg: "LISTADOOUTLINE", accion: "menu-prov" },
			{ id: 2, menu: "prov", label: "Prov cuatro", svg: "TICKETOUTLINE", accion: "menu-prov" },
			{ id: 2, menu: "prov", label: "Prov cinco", svg: "CAJAOUTLINE", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "REFRESH", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "MAS", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "SEARCH", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "VER", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "LOGOUT", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "NUEVACLAVE", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "ACTIVAR", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "LOGIN", accion: "1" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "TIME", accion: "2" },
			{ id: 2, menu: "ppal", label: "Dos", svg: "TICKETOUTLINE", accion: "3" },
			{ id: 2, menu: "ppal", label: "DosXX", svg: "INFO", accion: "menu-prov" },
			{ id: 2, menu: "ppal", label: "DosYY", svg: "HOMEOUTLINE", accion: "4" },
			{ id: 2, menu: "ppal", label: "DosZZ", svg: "LISTADOOUTLINE", accion: "5" },
		];
	}
	firstUpdated() {}
	static get styles() {
		return css`
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
			.cuerpo {
				display: grid;
				position: relative;
				grid-template-columns: 1fr 1fr;
				align-items: center;
				height: 40rem;
			}
			.datos {
				display: grid;
				position: relative;
				grid-template-columns: 1fr 1fr;
				align-items: center;
				align-self: flex-start;
			}

			#menu {
				display: none;
			}
		`;
	}
	render() {
		return html`
			<div class="cuerpo" }>
				<div class="datos" @click=${this.verMenu}>
					<label menu="ppal" class="menuPP">Menu</label>
					<div>${SVGS["ABAJO"]}</div>
				</div>
			</div>
		`;
	}
	verMenu(e) {
		var newMenu = document.createElement("dmd-menu-drop-component");
		newMenu.top = "0rem";
		newMenu.left = "1rem";
		newMenu.menuPpal = "ppal";
		newMenu.height = "20%";
		newMenu.width = "max-content";
		newMenu.json = this.menu;

		let yo = e.currentTarget;
		let rect = yo.getBoundingClientRect();
		let padreLeft = yo.parentNode.getBoundingClientRect().left;
		let padreTop = yo.parentNode.getBoundingClientRect().top;
		//resultado getBoundingClientRect() en px se deberia convertir en rem
		let indice = parseFloat(getComputedStyle(document.documentElement).fontSize.replace("px", ""));
		let top = (1 / indice) * (rect.bottom - padreTop);
		let left = (1 / indice) * (rect.left - padreLeft);
		newMenu.top = top + "rem";
		newMenu.left = left + "rem";
		yo.parentNode.appendChild(newMenu);
	}

	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-menuDrop-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
			}
		}
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
window.customElements.define("menu-drop-screen", menuDropScreen);
