/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../../redux/routing/actions";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { showWarning } from "../../../redux/ui/actions";
import { gridLayout } from "../../css/gridLayout";
import { updateProfile } from "../../../redux/autorizacion/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class registroUpdateScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.idioma = store.getState().ui.idioma;
		this.registroUpdate = require("../../../../assets/idiomas/registracion/registroUpdate.json");
	}

	static get styles() {
		return css`
			${gridLayout}

			:host {
				display: grid;
				position: relative;
				background-image: linear-gradient(var(--color-azul-oscuro), var(--color-primario));
				overflow: hidden;
				padding: 0 !important;
			}
			:host([hidden]) {
				display: none;
			}
			#cuerpo {
				display: grid;
				height: 100%;
				width: 100%;
				grid-gap: 0rem;
				grid-template-rows: 12% 2% 86%;
				background-color: transparent;
				align-self: center;
			}
			#titulo {
				height: 100%;
				width: 100%;
				background-image: url("https://app.uocra.org/images/titulo_red_social.png");
				background-repeat: no-repeat;
				background-position: center;
				background-size: auto 10vh;
			}
			#linea {
				color: var(--color-blanco);
				width: 80%;
			}
			.texto {
				font-size: 3vh !important;
				font-weight: var(--font-label-weight);
				text-align: center;
				font-style: italic;
			}
			.txt {
				height: 2vh !important;
			}
			:host([media-size="large"]) .texto {
				font-size: 1.5vw;
			}
			.miBoton {
				background-color: var(--color-amarillo) !important;
				height: 7vh;
				align-self: center;
			}
			.myImput {
				grid-template-rows: 1fr auto 0.4fr !important;
			}
			#datos {
				padding: 0 2vh 0 2vh;
				width: 90%;
				overflow-y: auto;
				overflow-x: hidden;
				justify-self: center;
			}
			:host(:not([media-size="small"])) #datos {
				width: 50%;
			}
			.leyenda {
				justify-self: center;
				align-self: center;
				width: 80%;
				font-size: 2.2vh !important;
				font-weight: var(--font-label-weight);
				text-align: center;
				color: var(--color-blanco);
			}
			.miselect {
				height: 4.5rem;
				width: 100%;
				justify-self: center;
				grid-gap: 0 !important;
				padding: 0 !important;
				align-content: flex-start;
			}
			.elselect {
				height: 2.7rem;
			}
			.lblSelect {
				font-size: var(--font-label-size);
			}
		`;
	}
	render() {
		if (true) {
			return html`
				<div id="cuerpo">
					<label class="leyenda">${this.registroUpdate[this.idioma].titulo}</label>
					<div>
						<hr id="linea" />
					</div>
					<div id="datos" class="grid row">
						<div class="grid row" style="align-self: stretch;">
							<div class="input myImput">
								<label class="texto" style="color:var(--color-blanco)">${this.registroUpdate[this.idioma].nombre}</label>
								<input id="nombre" class="txt" type="text" autocomplete="off" placeholder="${this.registroUpdate[this.idioma].nombre_ph}" />
								<div>Debe cargar nombre</div>
							</div>
							<div class="input myImput">
								<label class="texto" style="color:var(--color-blanco)">${this.registroUpdate[this.idioma].apellido}</label>
								<input class="txt" type="text" id="apellido" autocomplete="off" placeholder="${this.registroUpdate[this.idioma].apellido_ph}" />
								<div>Debe cargar apellido</div>
							</div>
							<div id="selecTipoDocumento" class="grid row miselect">
								<label class="texto" style="color:var(--color-blanco)">${this.registroUpdate[this.idioma].tipoDocumento}</label>
								<select id="txtTipoDocumento" class="elselect">
									<option value="DN">D. N. I.</option>
									<option value="CI">Cedula de identidad</option>
									<option value="LC">Libreta cívica</option>
									<option value="LE">Libreta de enrolamiento</option>
								</select>
							</div>
							<div class="input myImput">
								<label class="texto" style="color:var(--color-blanco)">${this.registroUpdate[this.idioma].documento}</label>
								<input id="documento" class="txt" type="number" autocomplete="off" />
								<div>Debe cargar documento</div>
							</div>
							<div class="input myImput">
								<label class="texto" style="color:var(--color-blanco)">${this.registroUpdate[this.idioma].telefono}</label>
								<input id="telefono" class="txt" type="number" autocomplete="off" placeholder="${this.registroUpdate[this.idioma].telefono_ph}" />
								<div>Debe cargar telefono</div>
							</div>
						</div>
						<div class="grid row" style="align-self: stretch;">
							<button btn1 class="miBoton" @click="${this.grabar}">${this.registroUpdate[this.idioma].enviar}</button>
						</div>
					</div>
				</div>
			`;
		}
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-registroUpdate1-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				let nombre = this.shadowRoot.querySelector("#nombre");
				let apellido = this.shadowRoot.querySelector("#apellido");
				let documento = this.shadowRoot.querySelector("#documento");
				let tipoDocumento = this.shadowRoot.querySelector("#txtTipoDocumento");
				let telefono = this.shadowRoot.querySelector("#telefono");
				nombre.value = state.autorizacion.usuario.nombre;
				apellido.value = state.autorizacion.usuario.apellido;
				documento.value = state.autorizacion.usuario.documento;
				tipoDocumento.value = state.autorizacion.usuario.tipoDocumento;
				telefono.value = state.autorizacion.usuario.telefono;
				this.update();
			}
		}
	}

	volver() {
		store.dispatch(goTo("login"));
	}
	grabar() {
		[].forEach.call(this.shadowRoot.querySelectorAll("[error]"), (element) => {
			element.removeAttribute("error");
		});
		let nombre = this.shadowRoot.querySelector("#nombre");
		let apellido = this.shadowRoot.querySelector("#apellido");
		let documento = this.shadowRoot.querySelector("#documento");
		let tipoDocumento = this.shadowRoot.querySelector("#txtTipoDocumento");
		let telefono = this.shadowRoot.querySelector("#telefono");
		var ok = true;
		if (nombre.value == "") {
			ok = false;
			nombre.setAttribute("error", "");
		}
		if (apellido.value == "") {
			ok = false;
			apellido.setAttribute("error", "");
		}
		if (documento.value == "" || !typeof documento.value == "number" || parseInt(documento.value) < 99999 || parseInt(documento.value) > 99999999) {
			ok = false;
			documento.setAttribute("error", "");
		}
		if (telefono.value == "" || !typeof telefono.value == "number" || parseInt(telefono.value) < 99999999) {
			ok = false;
			documento.setAttribute("error", "");
		}
		if (ok) {
			store.dispatch(updateProfile(nombre.value, apellido.value, documento.value, tipoDocumento.value, telefono.value, null, null, null, null, store.getState().autorizacion.usuario.token));
		} else {
			store.dispatch(showWarning("Atencion!", "Falta cargar campos.", "fondoError", 3000));
		}
	}
	sesion() {
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
window.customElements.define("registroupdate-screen", registroUpdateScreen);
