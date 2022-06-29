/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { goHistoryPrev, goTo } from "../../../redux/routing/actions";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { SVGS } from "../../../../assets/icons/svgs";
import { showWarning } from "../../../redux/ui/actions";
import { gridLayout } from "../../css/gridLayout";
import { IMAGES } from "../../../../assets/images/images";
import { dmdButton } from "../../css/dmdButton";
import { dmdButtonFloat } from "../../css/dmdButtonFloat";
import { dmdInput } from "../../css/dmdInput";
import { dmdCheckbox } from "../../css/dmdCheckbox";
import { validaMail } from "../../../libs/funciones";

//import { usuario as setUsuario } from "../../redux/usuarios/actions";
import { usuarioEsta as getUsuario, usuario as setUsuario } from "../../../redux/usuarios/actions";
import { login } from "../../../redux/autorizacion/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const USUARIOS_DATO = "usuarios.usuarioEstaTimeStamp";
const USUARIOS_ERROR = "usuarios.usuarioEstaErrorTimeStamp";

export class sesionScreen extends connect(store, USUARIOS_DATO, USUARIOS_ERROR, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.idioma = store.getState().ui.idioma;
		this.idiomas = require("../../../../assets/idiomas/registracion/login.json");
		this.clave = "";
	}

	static get styles() {
		return css`
			${gridLayout}
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
			.btnfont {
				font-size: 0.8rem !important;
				padding: 0;
				justify-self: flex-start;
			}

			#buttonFloat {
				bottom: 1rem;
				right: 0rem;
				z-index: 0;
			}
			#buttonFloat svg {
				fill: var(--color-destacado);
			}
		`;
	}
	get _usuario() {
		return this.shadowRoot.querySelector("#usuario");
	}
	get _clave() {
		return this.shadowRoot.querySelector("#clave");
	}
	get _idioma() {
		return this.idiomas[this.idioma];
	}

	render() {
		return html`
			<div id="titulo">${IMAGES["LOGO_GRANDE"]}</div>
			<hr />
			<div class="dmd-input">
				<label>${this._idioma.usuario}</label>
				<input type="email" id="usuario" placeholder="${this._idioma.usuarioPlaceHolder}" value="" />
				<div>${this._idioma.usuarioError}</div>
				<span>${this._idioma.usuarioHelp}</span>
				${SVGS["INFO"]}
			</div>

			<div class="dmd-input" helper>
				<label>${this._idioma.password}</label>
				<input type="password" id="clave" value="" />
				<div>${this._idioma.passwordError}</div>
				<span>${this._idioma.passwordHelp}</span>
				${SVGS["INFO"]}
			</div>
			<div class="dmd-checkbox" id="check" horizontal>
				<label class="dmd-checkbox-titulo">${this._idioma.recordar}</label>
				<div class="dmd-checkbox-checkbox" tabindex="0">
					<input class="dmd-checkbox-check" type="checkbox" checked />
					<label class="dmd-checkbox-label">${this._idioma.recordarLabel}</label>
				</div>
				<label class="dmd-checkbox-error">${this._idioma.recordarError}</label>
				<label class="dmd-checkbox-help">${this._idioma.recordarHelp}</label>
				${SVGS["INFO"]}
			</div>

			<button class="dmd-button" normal bordeRedondo @click="${this.iniciar}">${this._idioma.inicio}</button>
			<div style="padding-top:2rem"></div>
			<!-- 
			<button class="dmd-button btnfont" soloTexto bordeRedondo @click="${this.claveRecuperar}">${this._idioma.recupero}</button>
			<div style="padding-top:6rem"></div> 
			-->
		`;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-sesion-sesionInicial-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				if (this.shadowRoot.querySelector("#usuario") && window.localStorage.getItem("user") && this.shadowRoot.querySelector("#usuario").value == "") {
					this.shadowRoot.querySelector("#usuario").value = window.localStorage.getItem("user");
				}
				if (this.shadowRoot.querySelector("#clave") && this.shadowRoot.querySelector("#clave").value == "") {
					if (window.localStorage.getItem("clave") && this.shadowRoot.querySelector("#clave").value == "") {
						this.shadowRoot.querySelector("#clave").value = window.localStorage.getItem("clave");
					} else {
						this.shadowRoot.querySelector("#clave").value = "";
					}
				}
				this.update();
			}
		}
		if (name == USUARIOS_DATO && state.screen.name == "sesion") {
			var dato = store.getState().usuarios.entityUsuarioEsta;
			if (dato && dato.length == 1) {
				window.localStorage.setItem("user", dato[0].Usuario);
				window.localStorage.setItem("clave", this.clave);

				store.dispatch(setUsuario(dato[0].Usuario));
				store.dispatch(goTo("inicial"));
			} else {
				store.dispatch(showWarning("Datos erroneos", "Usuario o Password inexistente, intente nuevamente", "fondoAmarillo", 4000));
			}
			this.update();
		}
		if (name == USUARIOS_ERROR && state.screen.name == "sesion") {
			store.dispatch(setUsuario(""));
			store.dispatch(showWarning("Datos erroneos", "Usuario o Password inexistente, intente nuevamente", "fondoAmarillo", 4000));
			this.update();
		}
	}

	crear() {
		if (this.current == "loginInicial") {
			store.dispatch(goTo("registroInicial"));
		} else {
			store.dispatch(goTo("registro"));
		}
	}

	claveRecuperar() {
		if (this.current == "loginInicial") {
			store.dispatch(goTo("claveCambioInicial"));
		} else {
			store.dispatch(goTo("claveCambio"));
		}
	}
	iniciar() {
		[].forEach.call(this.shadowRoot.querySelectorAll("[error]"), (element) => {
			element.removeAttribute("error");
		});
		let usuario = this._usuario;
		let clave = this._clave;
		var ok = true;
		if (usuario.value == "") {
			ok = false;
			usuario.setAttribute("error", "");
		}
		if (clave.value == "") {
			ok = false;
			clave.setAttribute("error", "");
		}
		if (ok) {
			this.clave = clave.value;
			store.dispatch(getUsuario(usuario.value, clave.value));
			//store.dispatch(login(usuario.value, clave.value));
		} else {
			store.dispatch(showWarning("Datos erroneos", "Usuario o Password inexistente, intente nuevamente", "fondoError", 4000));
		}
	}
	volver(e) {
		store.dispatch(goHistoryPrev());
		//		store.dispatch(goTo("onBoarding"));
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
window.customElements.define("sesion-screen", sesionScreen);
