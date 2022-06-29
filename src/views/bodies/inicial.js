/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { showWarning } from "../../redux/ui/actions";
import { SVGS } from "../../../assets/icons/svgs";
import { IMAGES } from "../../../assets/images/images";
import { dmdButton } from "../css/dmdButton";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class inicialScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.idioma = store.getState().ui.idioma;
		this.idiomas = require("../../../assets/idiomas/inicial.json");
		this.puntos = [];
		this.puntos[0] = [0, 0, "Yo", "Mi Ubicacion", "S"];
	}
	static get styles() {
		return css`
			${dmdButton}
			:host {
				display: grid;
				position: relative;
				height: 100%;
				width: 100%;
				background-color: var(--color-fondo);
				grid-template-columns: 80%;
				grid-gap: 2rem;
				justify-content: center;
				justify-items: center;
				align-content: flex-start;
				overflow-y: auto;
			}
			:host([hidden]) {
				display: none;
			}
			:host::-webkit-scrollbar {
				display: none;
			}
			#divVersion {
				position: absolute;
				top: 2px;
				right: 4px;
				font-size: 2vh;
				color: var(--color-control-texto);
			}
			#titulo {
				padding-top: 8vh;
				height: 8rem;
			}
			label {
				padding-top: 5vh;
				font-size: var(--font-header-h1-size);
				font-weight: var(--font-header-h1-weight);
				color: var(--color-control-texto);
				text-align: center;
			}
		`;
	}
	get _idioma() {
		return this.idiomas[this.idioma];
	}
	render() {
		return html`
			<div id="divVersion">v.:${__VERSION__}</div>
			<label>Sistema relevamiento de CEMAPS</label>
			<div id="titulo">${IMAGES["LOGO_GRANDE"]}</div>
			<div></div>
		`;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-inicial-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				this.update();
			}
		}
	}
	sesion() {
		store.dispatch(goTo("login"));
	}
	registro() {
		store.dispatch(goTo("registro"));
	}
	registroUpdate() {
		store.dispatch(goTo("registroUpdate"));
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
window.customElements.define("inicial-screen", inicialScreen);
