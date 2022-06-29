import { html, LitElement, css } from "lit";

import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { showMsgBox, aceptarMsgBox } from "../../redux/ui/actions";

const MSGBOX = "ui.msgbox.timeStamp";
const SCREEN = "screen.timeStamp";
const MEDIA_CHANGE = "ui.media.timeStamp";
export class msgBoxComponente extends connect(store, MSGBOX, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
	}

	static get styles() {
		return css`
			:host {
				height: max-content;
			}
			.dmd-msg-box-dialog {
				background-color: hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 10%));
				border-radius: 0.5rem;
				box-shadow: var(--shadow-elevation-3-box);
				border: 0;
			}
			.dmd-msg-box-frame {
				display: grid;
				grid-template-rows: 1fr 1fr auto;
				grid-gap: 0.5rem;
			}
			.dmd-msg-box-botonera {
				display: grid;
				grid-auto-flow: column;
				grid-gap: 0.5rem;
				justify-self: right;
			}
			.dmd-msg-box-boton {
				font-size: 0.75rem;
				color: var(--color-destacado-oscuro);
				background-color: transparent;
				width: fit-content;
				height: fit-content;
				border: none;
				outline: none;
			}
			.dmd-msg-box-titulo {
				font-size: 1.2rem;
				font-weight: 300;
				color: var(--color-primario-oscuro);
			}
			.dmd-msg-box-leyenda {
				font-size: 0.7rem;
				font-weight: 200;
			}
			dialog::backdrop {
				background-color: rgba(0, 0, 0, 0.4);
			}
		`;
	}
	render() {
		return html`
			<dialog class="dmd-msg-box-dialog">
				<div class="dmd-msg-box-frame">
					<label class="dmd-msg-box-titulo">Atencion!!</label>
					<label class="dmd-msg-box-leyenda" id="msgBoxLeyenda"></label>
					<div class="dmd-msg-box-botonera">
						<button id="aceptar" class="dmd-msg-box-boton" @click="${this.msgboxAceptar}">Aceptar</button>
						<button id="cancelar" class="dmd-msg-box-boton" @click="${this.msgboxCancelar}">Cancelar</button>
					</div>
				</div>
			</dialog>
		`;
	}
	stateChanged(state, name) {
		if (name == MSGBOX) {
			let dialogo = this.shadowRoot.querySelector(".dmd-msg-box-dialog");
			if (state.ui.msgbox.visible) {
				let frame = this.shadowRoot.querySelector(".dmd-msg-box-frame");
				let titulo = this.shadowRoot.querySelector(".dmd-msg-box-titulo");
				let leyenda = this.shadowRoot.querySelector(".dmd-msg-box-leyenda");
				let aceptar = this.shadowRoot.querySelector("#aceptar");
				let cancelar = this.shadowRoot.querySelector("#cancelar");
				frame.style.backgroundColor = state.ui.msgbox.fondoColor;
				dialogo.style.backgroundColor = state.ui.msgbox.fondoColor;
				titulo.innerHTML = state.ui.msgbox.titulo;
				titulo.style.color = state.ui.msgbox.tituloColor;
				leyenda.innerHTML = state.ui.msgbox.leyenda;
				leyenda.style.color = state.ui.msgbox.leyendaColor;
				aceptar.innerHTML = state.ui.msgbox.botonTextoAceptar;
				aceptar.style.color = state.ui.msgbox.botonColor;
				cancelar.innerHTML = state.ui.msgbox.botonTextoCancelar;
				cancelar.style.color = state.ui.msgbox.botonColor;
				dialogo.showModal();
			} else {
				dialogo.close();
			}
		}
	}
	msgboxCancelar() {
		store.dispatch(showMsgBox());
	}
	msgboxAceptar() {
		store.dispatch(showMsgBox());
		store.dispatch(aceptarMsgBox());
	}

	firstUpdated() {}

	static get properties() {
		return {
			mediaSize: {
				type: String,
				reflect: true,
				attribute: "media-size",
			},
		};
	}
}

window.customElements.define("msg-box-componente", msgBoxComponente);
