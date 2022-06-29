/** @format */
import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { SVGS } from "../../../../assets/icons/svgs";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class dmdMenuDropComponent extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.json = [];
		this.top = "";
		this.bottom = "";
		this.left = "";
		this.right = "";
		this.width = "";
		this.height = "";
		this.accion = "";
		this.menuPpal = "";
		this.tagRaiz = null;
	}
	firstUpdated() {
		if (this.top != "") this.shadowRoot.host.style.top = this.top;
		if (this.bottom != "") this.shadowRoot.host.style.bottom = this.bottom;
		if (this.left != "") this.shadowRoot.host.style.left = this.left;
		if (this.right != "") this.shadowRoot.host.style.right = this.right;
		if (this.width != "") this.shadowRoot.host.style.width = this.width;
		if (this.height != "") this.shadowRoot.host.style.height = this.height;
	}
	updated() {
		if (this.top != "") this.shadowRoot.host.style.top = this.top;
		if (this.bottom != "") this.shadowRoot.host.style.bottom = this.bottom;
		if (this.left != "") this.shadowRoot.host.style.left = this.left;
		if (this.right != "") this.shadowRoot.host.style.right = this.right;
		if (this.width != "") this.shadowRoot.host.style.width = this.width;
		if (this.height != "") this.shadowRoot.host.style.height = this.height;
	}

	static get styles() {
		return css`
			:host {
				display: grid;
				position: absolute;
				flex-direction: column;
				height: 40%;
				top: 0rem;
				left: 0rem;
				grid-auto-flow: row;
				border-radius: 5px;
				padding: 0.2rem 0;
				overflow-y: auto;
				background-color: var(--color-control-fondo);
				border: 1px solid hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 10%));
				-webkit-box-shadow: 10px 1px 11px 1px rgba(0, 0, 0, 0.27);
				box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.2);
				z-index: 100;
			}
			.dmd-menu-drop-item {
				display: grid;
				position: relative;
				height: 1.2rem;
				grid-template-columns: auto 1fr auto;
				grid-gap: 0.5rem;
				font-size: 0.8rem;
				background-color: var(--color-control-fondo);
				color: var(--color-control-texto);
				text-align: left;
				padding: 0.3rem 0.5rem 0.3rem 0.3rem;
				align-items: center;
			}
			.dmd-menu-drop-item[seleccionado] {
				background-color: var(--color-control-texto);
				color: white;
			}
			.dmd-menu-drop-item[dmd-menu-drop-item-linea] {
				height: 1px;
				grid-gap: 0rem;
				border: 0;
				margin: 0;
				padding: 0;
				background-color: var(--color-control-texto);
			}
			.dmd-menu-drop-item:not([dmd-menu-drop-item-linea]):hover {
				background-color: hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 10%));
				cursor: pointer;
			}
			.dmd-menu-drop-item-svg {
				width: fit-content;
			}
			.dmd-menu-drop-item-svg svg {
				width: 1rem;
				height: 1rem;
				fill: var(--color-control-texto);
			}
			.dmd-menu-drop-velo {
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				background-color: rgba(0, 0, 0, 0.15);
			}

			*[hidden] {
				display: none;
			}
		`;
	}
	render() {
		return html`
			<div class="dmd-menu-drop-velo" @click=${this.cerrar}></div>
			${this.json
				.filter((item) => {
					return item.menu == this.menuPpal;
				})
				.map((item, index) => {
					return html`
						<div class="dmd-menu-drop-item" .item=${item} @click=${this.nuevoMenu} ?dmd-menu-drop-item-linea="${item.accion.indexOf("linea-", 0) == 0}">
							<div class="dmd-menu-drop-item-svg" ?hidden="${item.svg == "" || item.accion.indexOf("linea-", 0) == 0}">${SVGS[item.svg]}</div>
							<div class="dmd-menu-drop-item-label" ?hidden="${item.accion.indexOf("linea-", 0) == 0}">${item.label}</div>
							<div class="dmd-menu-drop-item-svg" ?hidden="${item.accion.indexOf("menu-", 0) != 0 || item.accion.indexOf("linea-", 0) == 0}">${SVGS["POSTERIOR"]}</div>
						</div>
					`;
				})}
		`;
	}
	cerrar(e) {
		this.tagRaiz;
		this.parentNode.removeChild(this);
		if (this.tagRaiz) {
			this.tagRaiz.removeAttribute("seleccionado");
		}
	}
	nuevoMenu(e) {
		let obj = e.currentTarget;
		let item = obj.item;
		if (item.accion.indexOf("menu-") == 0) {
			obj.setAttribute("seleccionado", "");
			//Crea Sub Menu
			var newMenu = document.createElement("dmd-menu-drop-component");
			newMenu.top = "1rem";
			newMenu.left = "1rem";
			newMenu.menuPpal = "prov";
			newMenu.height = "auto";
			newMenu.width = "fit-content";
			newMenu.json = this.json;
			newMenu.tagRaiz = obj;
			let rect = obj.getBoundingClientRect();
			let padreLeft = this.parentNode.getBoundingClientRect().left;
			let padreTop = this.parentNode.getBoundingClientRect().top;
			let indice = parseFloat(getComputedStyle(document.documentElement).fontSize.replace("px", ""));
			let top = ((1 / indice) * (rect.bottom - 0)).toFixed(1);
			let left = ((1 / indice) * (rect.left - 0)).toFixed(1);
			newMenu.top = top + "rem";
			newMenu.left = left + "rem";
			this.parentNode.appendChild(newMenu);
		} else if (item.accion.indexOf("linea-") != 0) {
		}
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			//	this.updated();
		}
	}
	static get properties() {
		return {
			json: {
				type: Object,
				reflect: true,
			},
			top: {
				type: String,
			},
			bottom: {
				type: String,
				reflect: true,
			},
			left: {
				type: String,
				reflect: true,
			},
			right: {
				type: String,
				reflect: true,
			},
			width: {
				type: String,
				reflect: true,
			},
			height: {
				type: String,
				reflect: true,
			},

			accion: {
				type: String,
				reflect: true,
			},
			menuPpal: {
				type: String,
				reflect: true,
			},
			tagRaiz: {
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
			current: {
				type: String,
				reflect: true,
			},
		};
	}
}
window.customElements.define("dmd-menu-drop-component", dmdMenuDropComponent);
