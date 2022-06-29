/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../../redux/routing/actions";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { showWarning } from "../../../redux/ui/actions";
import { SVGS } from "../../../../assets/icons/svgs";
import { IMAGES } from "../../../../assets/images/images";
import { dmdButton } from "../../css/dmdButton";
import { dmdButtonFloat } from "../../css/dmdButtonFloat";
import { dmdInput } from "../../css/dmdInput";
import { recupero } from "../../../redux/autorizacion/actions";
import { validaMail } from "../../../libs/funciones";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class claveRecuperarScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.idioma = store.getState().ui.idioma;
		this.idiomas = require("../../../../assets/idiomas/registracion/claveRecuperar.json");
	}

	static get styles() {
		return css`
			${dmdButton}
			${dmdButtonFloat}
			${dmdInput}

			:host {
				display: grid;
				position: relative;
				height: 100%;
				width: 100vw;
				background-color: var(--color-fondo);
				grid-template-columns: 80%;
				grid-gap: 2rem;
				justify-content: center;
				align-content: flex-start;
				overflow-y: auto;
			}
			:host([hidden]) {
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
			hr {
				border-top: 1px solid var(--color-watermarck);
				width: 100%;
			}
			.dmd-button {
				justify-self: center;
			}
			#buttonFloat {
				bottom: -2rem;
				right: 0rem;
				z-index: 0;
			}
		`;
	}
	get _mail() {
		return this.shadowRoot.querySelector("#mail");
	}
	get _idioma() {
		return this.idiomas[this.idioma];
	}
	render() {
		return html`
			<div id="titulo">${IMAGES["LOGO_GRANDE"]}</div>
			<hr />
			<div class="dmd-input" helper>
				<label>${this._idioma.usuario}</label>
				<input type="email" id="mail" autocomplete="off" placeholder="${this._idioma.usuarioPlaceHolder}" value="" />
				<div>${this._idioma.usuarioError}</div>
				<span>${this._idioma.usuarioHelp}</span>
				${SVGS["INFO"]}
			</div>
			<button class="dmd-button" conBorde bordeRedondo @click="${this.enviar}">${this._idioma.enviar}</button>
			<label class="textoMsj">${this._idioma.mensaje}</label>
			<hr />
			<div style="position:relative;">
				<button id="buttonFloat" class="dmd-button-float" @click="${this.volver}">${SVGS["ATRAS"]}</button>
			</div>
		`;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-claveRecuperar-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				this.update();
			}
		}
	}

	enviar() {
		[].forEach.call(this.shadowRoot.querySelectorAll("[error]"), (element) => {
			element.removeAttribute("error");
		});
		let mail = this._mail;
		var ok = true;
		if (mail.value == "" || !validaMail(mail.value)) {
			ok = false;
			mail.setAttribute("error", "");
		}
		if (ok) {
			store.dispatch(recupero(mail.value));
		} else {
			store.dispatch(showWarning("Datos erroneos", "Email mal cargado, intente nuevamente", "fondoError", 4000));
		}
		//store.dispatch(goTo("claveRecuperarMensaje"));
	}
	volver() {
		store.dispatch(goTo("login"));
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
window.customElements.define("claverecuperar-screen", claveRecuperarScreen);
