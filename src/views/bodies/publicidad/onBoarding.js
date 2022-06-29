/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { goHistoryPrev, goNext, goTo } from "../../../redux/routing/actions";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { gridLayout } from "../../css/gridLayout";
import { IMAGES } from "../../../../assets/images/images";
import { dmdButton } from "../../css/dmdButton";

import { get as getOnBoarding } from "../../../redux/onBoarding/actions";
import { get as getCombos } from "../../../redux/combos/actions";
import { get as getCemap } from "../../../redux/cemaps/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const ONBOARDING_DATO = "onBoarding.timeStamp";
const ONBOARDING_ERROR = "onBoarding.errorTimeStamp";
const CEMAP_DATO = "cemaps.timeStamp";
const CEMAP_ERROR = "cemaps.errorTimeStamp";
const COMBOS_DATO = "combos.timeStamp";
const COMBOS_ERROR = "combos.errorTimeStamp";

export class onBoardingScreen extends connect(store, ONBOARDING_DATO, ONBOARDING_ERROR, CEMAP_DATO, CEMAP_ERROR, COMBOS_DATO, COMBOS_ERROR, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.timeOut = 0;
		this.item = [{ titulo: "AGUARDE!!!!", leyenda: "Cargando datos!!" }];
		//this.item = null;
		this.numero = 0;
		this.tablas = 0;
		this.mostrarBoton = false;
	}

	static get styles() {
		return css`
			${gridLayout}
			${dmdButton}
			:host {
				display: grid;
				position: relative;
				height: 100%;
				width: 100vw;
				background-color: var(--color-fondo);
				grid-template-rows: 4fr 1fr 4fr 3fr;
				justify-items: center;
				grid-gap: 1rem;
				overflow-y: auto;
			}
			:host([hidden]) {
				display: none;
			}
			:host([media-size="large"]) {
				height: 80%;
				width: 30rem;
				border-radius: 2rem;
				place-self: center;
			}
			#imagen {
				align-self: center;
			}
			#imagen svg {
				height: 12vh;
			}

			#titulo {
				color: var(--color-control-texto);
				font-size: 2.5rem;
				font-weight: 400;
				width: 90%;
				text-align: center;
				align-self: self-end;
			}
			#leyenda {
				padding-top: 1rem;
				align-self: flex-start;
				color: var(--color-negro);
				font-size: 1.5rem;
				font-weight: 300;
				width: 80%;
				text-align: center;
			}
			#botonera {
				align-content: flex-start;
				justify-self: center;
				grid-gap: 2rem;
				z-index: 10;
			}
			*[hidden] {
				display: none;
			}
		`;
	}
	render() {
		if (this.item) {
			return html`
				<div id="imagen">${IMAGES["LOGO_GRANDE"]}</div>
				<div id="titulo">${this.item[this.numero].titulo}</div>
				<div id="leyenda">${this.item[this.numero].leyenda}</div>
				<div id="botonera" class="grid column">
					<button ?hidden=${!this.mostrarBoton} class="dmd-button" conBorde bordeRedondo @click="${this.pasar}">Siguiente</button>
				</div>
			`;
		} else {
			if (this.current == "onBoarding" && this.item == 0) {
				return html`<msgnoconeccion-component @click="${this.atras}" texto="Haga click volver" style="cursor:pointer"></msgnoconeccion-component>; `;
			}
		}
	}
	atras() {
		store.dispatch(goHistoryPrev());
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;

			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-onBoarding-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				store.dispatch(getOnBoarding());
				store.dispatch(getCombos());
				store.dispatch(getCemap());
			}
		}
		if (name == ONBOARDING_DATO || name == CEMAP_DATO || name == COMBOS_DATO) {
			this.tablas++;
			if (this.tablas == 3) {
				this.mostrarBoton = true;
				const aux = state.onBoarding.entities
					.filter(function (x) {
						return x.activo == true;
					})
					.sort(function (a, b) {
						return a["orden"] > b["orden"] ? 1 : -1;
					});
				if (!state.onBoarding.entities || !state.combos.entities || !state.cemaps.entities) {
					this.item = [{ titulo: "ERROR!!", leyenda: "Presiones SIGUIENTE. Si el mensaje vuelve a salir, verifique su conexion de datos.", orden: 1, activo: false, id: 0 }];
				} else {
					if (aux.length == 0) {
						this.item = 0;
					} else {
						this.item = aux;
					}
				}
				this.update();
			}
		}
		if (name == ONBOARDING_ERROR || name == CEMAP_ERROR || name == COMBOS_ERROR) {
			this.item = [{ titulo: "ERROR!!", leyenda: "Presiones SIGUIENTE. Si el mensaje vuelve a salir, verifique su conexion de datos.", orden: 1, activo: false, id: 0 }];
			this.tablas = 0;
			this.update();
		}
	}

	pasar() {
		this.numero++;
		if (this.numero < this.item.length) {
			this.update();
		} else {
			this.numero = 0;
			store.dispatch(goTo("firma"));
			//store.dispatch(goTo("sesion"));
		}
	}

	cuenta() {
		store.dispatch(goTo("firma"));
		//store.dispatch(goTo("sesion"));
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
		};
	}
}
window.customElements.define("onboarding-screen", onBoardingScreen);
