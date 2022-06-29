/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo, goHistoryPrev } from "../../../redux/routing/actions";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { showWarning } from "../../../redux/ui/actions";
import { SVGS } from "../../../../assets/icons/svgs";
import { IMAGES } from "../../../../assets/images/images";
import { dmdButton } from "../../css/dmdButton";
import { dmdButtonFloat } from "../../css/dmdButtonFloat";
import { dmdInput } from "../../css/dmdInput";
import { gridLayout } from "../../css/gridLayout";
import { recupero, renovacion } from "../../../redux/autorizacion/actions";
import { validaMail } from "../../../libs/funciones";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class claveCambioScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.idioma = store.getState().ui.idioma;
		this.idiomas = require("../../../../assets/idiomas/registracion/claveCambio.json");
	}
	static get styles() {
		return css`
			${gridLayout}
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
				grid-gap: 1rem;
				justify-content: center;
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
	get _idioma() {
		return this.idiomas[this.idioma];
	}
	get _email() {
		return this.shadowRoot.querySelector("#email");
	}
	get _password() {
		return this.shadowRoot.querySelector("#password");
	}
	get _password1() {
		return this.shadowRoot.querySelector("#password1");
	}

	render() {
		return html`
			<div id="titulo">${IMAGES["LOGO_GRANDE"]}</div>
			<hr />
			<div class="dmd-input" helper>
				<label>${this._idioma.usuario}</label>
				<input type="email" id="email" autocomplete="off" placeholder="${this._idioma.usuarioPlaceHolder}" value="" />
				<div>${this._idioma.usuarioError}</div>
				<span>${this._idioma.usuarioHelp}</span>
				${SVGS["INFO"]}
			</div>

			<div class="dmd-input" helper>
				<label>${this._idioma.password}</label>
				<input type="password" id="password" autocomplete="off" autocomplete="off" value="" />
				<div>${this._idioma.passwordError}</div>
				<span>${this._idioma.passwordHelp}</span>
				${SVGS["INFO"]}
			</div>

			<div class="dmd-input" helper>
				<label>${this._idioma.repitePassword}</label>
				<input type="password" id="password1" autocomplete="off" autocomplete="off" value="" />
				<div>${this._idioma.repitePasswordError}</div>
				<span>${this._idioma.repitePasswordHelp}</span>
				${SVGS["INFO"]}
			</div>
			<hr />
			<button class="dmd-button" conBorde bordeRedondo @click="${this.enviar}">${this._idioma.enviar}</button>
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
			const SeMuestraEnUnasDeEstasPantallas = "-claveCambio-claveCambioInicial-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				this.update();
			}
		}
	}

	volver() {
		store.dispatch(goHistoryPrev());
	}

	enviar() {
		//store.dispatch(goTo("claveCambioMensaje"));
		[].forEach.call(this.shadowRoot.querySelectorAll("[error]"), (element) => {
			element.removeAttribute("error");
		});

		let email = this._email;
		let pass = this._password;
		let pass1 = this._password1;
		var ok = true;

		if (email.value == "" || !validaMail(email.value)) {
			ok = false;
			email.setAttribute("error", "");
		}
		if (pass.value == "" || pass1.value == "" || pass.length < 4 || pass1.length < 4 || pass.value != pass1.value) {
			ok = false;
			pass.setAttribute("error", "");
			pass1.setAttribute("error", "");
		}
		if (ok) {
			//store.dispatch(recupero(email, pass));
			if (this.current == "claveCambioInicial") {
				store.dispatch(goTo("activacionInicial"));
			} else {
				store.dispatch(goTo("activacion"));
			}
		} else {
			store.dispatch(showWarning("Atencion!", "Error en los datos cargados.", "fondoError", 3000));
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
window.customElements.define("clavecambio-screen", claveCambioScreen);
