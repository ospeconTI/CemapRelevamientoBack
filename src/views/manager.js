/** @format */

import { html, LitElement, css } from "lit";
import { connect } from "@brunomon/helpers";
import { store } from "../redux/store";
import { layoutsCSS } from "../views/ui/layouts";
import { getLayout } from "../redux/screens/screenLayouts";
import { pantallaWarning } from "./componentes/warning";
import { msgBoxComponente } from "./componentes/msgbox";
import { SpinnerLoading } from "./componentes/spinner";
import { goTo } from "../redux/routing/actions";
import { menuComponente } from "./headers/menu";
import { pieComponente } from "./foots/pie";

import { splashScreen } from "./bodies/splash/splash";
import { onBoarding } from "./bodies/publicidad/onBoarding";
import { inicialScreen } from "./bodies/inicial";
import { estadoCemapScreen } from "./bodies/estadoCemap";
import { galeriaScreen } from "./bodies/galeria";
import { galeriaPorCemapScreen } from "./bodies/galeriaPorCemap";
import { firmaScreen } from "./bodies/firma";

import { loginScreen } from "./bodies/registracion/login";
import { sesionScreen } from "./bodies/registracion/sesion";
import { activacionScreen } from "./bodies/registracion/activacion";
import { registroMensajeScreen } from "./bodies/registracion/registroMensaje";
import { claveCambioScreen } from "./bodies/registracion/claveCambio";
import { claveCambioMensajeScreen } from "./bodies/registracion/claveCambioMensaje";
import { claveRecuperarScreen } from "./bodies/registracion/claveRecuperar";
import { claveRecuperarMensajeScreen } from "./bodies/registracion/claveRecuperarMensaje";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const SELECTION = "ui.menu.timeStamp";

export class viewManager extends connect(store, MEDIA_CHANGE, SCREEN, SELECTION)(LitElement) {
	constructor() {
		super();
		window.onpopstate = (event) => {
			if (event.state) {
				store.dispatch(goTo(event.state.option, true));
			} else {
				window.history.back();
			}
		};
	}

	static get styles() {
		return css`
			${layoutsCSS}
			:host {
				display: grid;
				position: relative;
				height: 100vh;
				width: 100vw;
				padding: 0;
				overflow: hidden;
			}
			:host([media-size="small"]) {
				background-color: var(--color-fondo);
			}
			:host(:not([media-size="small"])) {
				background-color: var(--color-primario-oscuro);
			}
			:host::-webkit-scrollbar {
				width: 0.5vw;
				cursor: pointer;
			}
			:host::-webkit-scrollbar([media-size="small"]) {
				display: none;
			}
			:host::-webkit-scrollbar-thumb {
				background: var(--secondary-color);
				border-radius: 5px;
			}
		`;
	}
	firstUpdated() {
		super.firstUpdated();
	}

	render() {
		return html`
			<menu-componente id="menu"></menu-componente>
			<pantalla-warning id="warning"></pantalla-warning>
			<!-- <msg-box-componente id="msgbox"></msg-box-componente> -->

			<splash-screen id="splash"></splash-screen>
			<onboarding-screen id="onboarding" class="body"></onboarding-screen>
			<inicial-screen id="inicial" class="body"></inicial-screen>
			<estado-cemap-screen id="estadoCemap" class="body"></estado-cemap-screen>
			<galeria-screen id="galeria" class="body"></galeria-screen>
			<galeria-por-cemap-screen id="galeriaPorCemap" class="body"></galeria-por-cemap-screen>
			<firma-screen id="firma" class="body"></firma-screen>

			<login-screen id="login" class="body"></login-screen>
			<sesion-screen id="sesion" class="body"></sesion-screen>
			<activacion-screen id="activacion" class="body"></activacion-screen>
			<registromensaje-screen id="registroMensaje" class="body"></registromensaje-screen>
			<clavecambio-screen id="clavecambio" class="body"></clavecambio-screen>
			<clavecambiomensaje-screen id="clavecambiomensaje" class="body"></clavecambiomensaje-screen>
			<claveRecuperar-screen id="claveRecuperar" class="body"></claveRecuperar-screen>
			<claveRecuperarmensaje-screen id="claveRecuperarMensaje" class="body"></claveRecuperarmensaje-screen>

			<pie-componente id="pie"></pie-componente>
			<spinner-loading type="spinner2"></spinner-loading>
		`;
	}

	stateChanged(state, name) {
		if (name == MEDIA_CHANGE || name == SCREEN) {
			this.mediaSize = state.ui.media.size;
			this.orientation = state.ui.media.orientation;
			this.layout = getLayout(state).name;
			if (!window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
				if ("standalone" in window.navigator && window.navigator.standalone) {
					this.style.height = document.documentElement.offsetHeight ? document.documentElement.offsetHeight : window.innerHeight + "px";
				} else {
					if (state.ui.media.orientation == "portrait") {
						this.style.height = window.innerHeight < window.innerWidth ? window.innerWidth : window.innerHeight + "px";
					} else {
						this.style.height = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight + "px";
					}
				}
			}
		}
		this.update();
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
			orientation: {
				type: String,
				reflect: true,
			},
		};
	}
}

window.customElements.define("view-manager", viewManager);
