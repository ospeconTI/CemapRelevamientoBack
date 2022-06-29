/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { goHistoryPrev, goTo } from "../../../redux/routing/actions";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { showWarning } from "../../../redux/ui/actions";
import { gridLayout } from "../../css/gridLayout";
import { usuario as setUsuario } from "../../../redux/usuarios/actions";
import { login, activar } from "../../../redux/autorizacion/actions";
import { SVGS } from "../../../../assets/icons/svgs";
import { IMAGES } from "../../../../assets/images/images";
import { dmdButton } from "../../css/dmdButton";
import { dmdButtonFloat } from "../../css/dmdButtonFloat";
import { dmdInput } from "../../css/dmdInput";
import { dmdCheckbox } from "../../css/dmdCheckbox";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const ACTIVAR = "autorizacion.activarTimeStamp";
const ACTIVAR_ERROR = "autorizacion.activarErrorTimeStamp";

export class activacionScreen extends connect(store, MEDIA_CHANGE, SCREEN, ACTIVAR, ACTIVAR_ERROR)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.idioma = store.getState().ui.idioma;
		this.idiomas = require("../../../../assets/idiomas/registracion/activacion.json");
	}

	static get styles() {
		return css`
			${dmdButton}
			${dmdButtonFloat}
			${dmdInput}
			${dmdCheckbox}

			:host {
				display: grid;
				position: relative;
				height: 100%;
				width: 100vw;
				background-color: var(--color-fondo);
				grid-auto-flow: row;
				grid-gap: 1rem;
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
			:host([media-size="large"]) {
				height: 80%;
				width: 30rem;
				place-self: center;
				border-radius: 2rem;
			}
			#titulo {
				padding-top: 1rem;
				height: 4rem;
				justify-self: center;
			}
			.cartel {
				display: grid;
				width: 90%;
				grid-auto-flow: row;
				color: var(--color-control-texto);
				text-align: center;
				font-size: 0.8rem;
				justify-self: center;
			}
			hr {
				border-top: 1px solid var(--color-watermarck);
				width: 100%;
			}
			.dmd-input {
				width: 80%;
				padding-bottom: 2rem;
			}
			.dmd-button {
				justify-self: center;
			}
			#buttonFloat {
				bottom: -2rem;
				right: 1rem;
				z-index: 0;
			}
		`;
	}
	get _codigo() {
		return this.shadowRoot.querySelector("#codigo");
	}
	get _idioma() {
		return this.idiomas[this.idioma];
	}

	render() {
		return html`
			<div id="titulo">${IMAGES["LOGO_GRANDE"]}</div>
			<div class="cartel">
				<hr />
				<label>${this._idioma.mensaje}</label>
				<hr />
			</div>

			<div class="dmd-input" helper>
				<label>${this._idioma.codigo}</label>
				<input type="text" id="codigo" autocomplete="off" placeholder="${this._idioma.codigoPlaceHolder}" value="" />
				<div>${this._idioma.codigoError}</div>
				<span>${this._idioma.codigoHelp}</span>
				${SVGS["INFO"]}
			</div>
			<button class="dmd-button" conBorde bordeRedondo @click="${this.activar}">${this._idioma.activar}</button>
			<div style="position:relative; width:100%">
				<button id="buttonFloat" class="dmd-button-float" @click="${this.volver}">${SVGS["ATRAS"]}</button>
			</div>
			<div style="padding-top:6rem"></div>
		`;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-activacion-activacionInicial-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				if (this._codigo) {
					this._codigo.value = "";
				}
				this.update();
			}
		}
		if (name == ACTIVAR) {
			store.dispatch(goTo("registroMensaje"));
		}
		if (name == ACTIVAR_ERROR) {
			store.dispatch(showWarning("Error", "No se pudo activar la cuenta, verifique su código de activación", "fondoAmarillo", 4000));
		}
	}

	activar() {
		[].forEach.call(this.shadowRoot.querySelectorAll("[error]"), (element) => {
			element.removeAttribute("error");
		});
		let codigo = this._codigo;
		var ok = true;
		if (codigo.value == "") {
			ok = false;
			codigo.setAttribute("error", "");
		}
		if (ok) {
			//store.dispatch(activar(codigo.value));
			store.dispatch(goTo("registroMensaje"));
		} else {
			store.dispatch(showWarning("Atención", "Codigo de activacion erroneo", "fondoError", 4000));
		}
	}
	volver(e) {
		store.dispatch(goHistoryPrev());
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
window.customElements.define("activacion-screen", activacionScreen);
