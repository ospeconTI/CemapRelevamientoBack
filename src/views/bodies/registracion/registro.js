/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { goHistoryPrev, goTo } from "../../../redux/routing/actions";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { showWarning } from "../../../redux/ui/actions";
import { SVGS } from "../../../../assets/icons/svgs";
import { IMAGES } from "../../../../assets/images/images";
import { dmdButton } from "../../css/dmdButton";
import { dmdButtonFloat } from "../../css/dmdButtonFloat";
import { dmdInput } from "../../css/dmdInput";
import { dmdSelect } from "../../css/dmdSelect";

import { logon } from "../../../redux/autorizacion/actions";
import { validaMail } from "../../../libs/funciones";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class registroScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.idioma = store.getState().ui.idioma;
		this.idiomas = require("../../../../assets/idiomas/registracion/registro.json");
	}
	static get styles() {
		return css`
			${dmdButton}
			${dmdButtonFloat}
			${dmdInput}
			${dmdSelect}

			:host {
				display: grid;
				position: relative;
				height: 100%;
				width: 100%;
				background-color: var(--color-fondo);
				grid-template-columns: 80%;
				grid-gap: 0rem;
				justify-content: center;
				align-content: flex-start;
				overflow-y: auto;
			}
			:host([hidden]) {
				display: none;
			}
			:host([media-size="large"]) {
				height: 90%;
				width: 30rem;
				place-self: center;
				border-radius: 2rem;
			}
			:host([current="registroUpdate"]) #divNombre {
				margin-top: 2rem;
			}
			:host([current="registro"]) .hiddenAdd {
				display: none;
			}
			:host([current="registroUpdate"]) .hiddenUpdate {
				display: none;
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
			#datos {
				display: grid;
				position: relative;
				width: 90%;
				height: 100%;
				grid-auto-flow: row;
				grid-gap: 1rem;
				overflow-y: auto;
				overflow-x: hidden;
				justify-self: center;
			}
			#datos::-webkit-scrollbar {
				display: none;
			}
			.leyenda {
				justify-self: center;
				align-self: center;
				width: 80%;
				font-size: 2.2vh !important;
				font-weight: var(--font-label-weight);
				text-align: center;
				color: var(--color-control-texto);
			}
			#ultimoPassword {
				padding-bottom: 1.5rem;
			}
			.dmd-button {
				justify-self: center;
			}
			#buttonFloat {
				bottom: 6rem;
				right: 0rem;
				z-index: 0;
			}
		`;
	}
	get _mail() {
		return this.shadowRoot.querySelector("#mail");
	}
	get _nombre() {
		return this.shadowRoot.querySelector("#nombre");
	}
	get _apellido() {
		return this.shadowRoot.querySelector("#apellido");
	}
	get _documento() {
		return this.shadowRoot.querySelector("#documento");
	}
	get _tipoDocumento() {
		return this.shadowRoot.querySelector("#txtTipoDocumento");
	}
	get _telefono() {
		return this.shadowRoot.querySelector("#telefono");
	}
	get _password1() {
		return this.shadowRoot.querySelector("#password1");
	}
	get _password2() {
		return this.shadowRoot.querySelector("#password2");
	}
	get _idioma() {
		return this.idiomas[this.idioma];
	}
	render() {
		return html`
			<div id="titulo" class="">${IMAGES["LOGO_GRANDE"]}</div>
			<hr class="" />
			<label class="leyenda hiddenUpdate">${this._idioma.titulo}</label>
			<label class="leyenda hiddenAdd">${this._idioma.titulo1}</label>
			<hr class="" />
			<div id="datos">
				<div class="dmd-input hiddenUpdate" helper>
					<label>${this._idioma.usuario}</label>
					<input type="email" id="mail" autocomplete="off" placeholder="${this._idioma.usuarioPlaceHolder}" value="" />
					<div>${this._idioma.usuarioError}</div>
					<span>${this._idioma.usuarioHelp}</span>
					${SVGS["INFO"]}
				</div>

				<div id="divNombre" class="dmd-input" helper>
					<label>${this._idioma.nombre}</label>
					<input type="text" id="nombre" autocomplete="off" autocomplete="off" placeholder="${this._idioma.nombrePlaceHolder}" value="" />
					<div>${this._idioma.nombreError}</div>
					<span>${this._idioma.nombreHelp}</span>
					${SVGS["INFO"]}
				</div>

				<div class="dmd-input" helper>
					<label>${this._idioma.apellido}</label>
					<input type="text" id="apellido" autocomplete="off" autocomplete="off" placeholder="${this._idioma.apellidoPlaceHolder}" value="" />
					<div>${this._idioma.apellidoError}</div>
					<span>${this._idioma.apellidoHelp}</span>
					${SVGS["INFO"]}
				</div>

				<div id="selectTipoDocumento" class="dmd-select" helper>
					<label>${this._idioma.tipoDocumento}</label>
					<select id="txtTipoDocumento" @change="${this.obraSocialAtendio}">
						<option value="" disabled selected hidden>${this._idioma.tipoDocumentoPlaceHolder}</option>
						<option value="DN">D. N. I.</option>
						<option value="CI">Cedula de identidad</option>
						<option value="LC">Libreta cívica</option>
						<option value="LE">Libreta de enrolamiento</option>
					</select>
					<div>${this._idioma.tipoDocumentoError}</div>
					<span>${this._idioma.tipoDocumentoHelp}</span>
					${SVGS["INFO"]}
				</div>

				<div class="dmd-input" helper>
					<label>${this._idioma.documento}</label>
					<input type="number" id="documento" autocomplete="off" autocomplete="off" placeholder="${this._idioma.documentoPlaceHolder}" value="" />
					<div>${this._idioma.documentoError}</div>
					<span>${this._idioma.documentoHelp}</span>
					${SVGS["INFO"]}
				</div>

				<div class="dmd-input" helper>
					<label>${this._idioma.telefono}</label>
					<input type="number" id="telefono" autocomplete="off" autocomplete="off" placeholder="${this._idioma.telefonoPlaceHolder}" value="" />
					<div>${this._idioma.telefonoError}</div>
					<span>${this._idioma.telefonoHelp}</span>
					${SVGS["INFO"]}
				</div>

				<div class="dmd-input hiddenUpdate" helper>
					<label>${this._idioma.password}</label>
					<input type="password" id="password1" autocomplete="off" autocomplete="off" value="" />
					<div>${this._idioma.passwordError}</div>
					<span>${this._idioma.passwordHelp}</span>
					${SVGS["INFO"]}
				</div>

				<div id="ultimoPassword" class="dmd-input hiddenUpdate" helper>
					<label>${this._idioma.repitePassword}</label>
					<input type="password" id="password2" autocomplete="off" autocomplete="off" value="" />
					<div>${this._idioma.repitePasswordError}</div>
					<span>${this._idioma.repitePasswordHelp}</span>
					${SVGS["INFO"]}
				</div>

				<button class="dmd-button" conBorde bordeRedondo @click="${this.grabar}">${this._idioma.enviar}</button>

				<div style="position:relative;height:9rem">
					<button id="buttonFloat" class="dmd-button-float" @click="${this.volver}">${SVGS["ATRAS"]}</button>
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
			const SeMuestraEnUnasDeEstasPantallas = "-registro-registroInicial-registroUpdate-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				this.update();
			}
		}
	}

	volver() {
		store.dispatch(goHistoryPrev());
	}
	grabar() {
		[].forEach.call(this.shadowRoot.querySelectorAll("[error]"), (element) => {
			element.removeAttribute("error");
		});
		//		let mail = this.shadowRoot.querySelector("#mail");
		let mail = this._mail;
		let nombre = this._nombre;
		let apellido = this._apellido;
		let documento = this._documento;
		let tipoDocumento = this._tipoDocumento;
		let telefono = this._telefono;
		let password1 = this._password1;
		let password2 = this._password2;
		var ok = true;

		if (password1.value.length < 4) {
			ok = false;
			password1.setAttribute("error", "");
		}
		if (password2.value != password1.value || password2.value.length < 4) {
			ok = false;
			password2.setAttribute("error", "");
		}
		if (mail.value == "" || !validaMail(mail.value)) {
			ok = false;
			mail.setAttribute("error", "");
		}
		if (nombre.value == "") {
			ok = false;
			nombre.setAttribute("error", "");
		}
		if (apellido.value == "") {
			ok = false;
			apellido.setAttribute("error", "");
		}
		if (tipoDocumento.value == "") {
			ok = false;
			tipoDocumento.setAttribute("error", "");
		}
		if (documento.value == "" || parseInt(documento.value, 10) == null || parseInt(documento.value) < 99999 || parseInt(documento.value) > 99999999) {
			ok = false;
			documento.setAttribute("error", "");
		}
		if (telefono.value == "" || parseInt(telefono.value, 10) == null || parseInt(telefono.value) < 99999999) {
			ok = false;
			telefono.setAttribute("error", "");
		}
		if (ok) {
			//store.dispatch(logon(nombre.value, apellido.value, mail.value, documento.value, tipoDocumento.value, telefono.value, password1.value));
			store.dispatch(goTo("activacion"));
		} else {
			store.dispatch(showWarning("Atencion!", "Falta cargar campos.", "fondoError", 3000));
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
window.customElements.define("registro-screen", registroScreen);
