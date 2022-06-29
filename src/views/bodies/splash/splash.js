/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../../redux/routing/actions";
import { isInLayout } from "../../../redux/screens/screenLayouts";
import { IMAGES } from "../../../../assets/images/images";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class splashScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.timeOut = 0;
	}

	static get styles() {
		return css`
			:host {
				display: grid;
				position: relative;
				height: 100vh;
				width: 100vw;
				justify-content: center;
				align-items: center;
				background-color: var(--color-fondo);
				padding: 0 !important;
			}
			:host([hidden]) {
				display: none;
			}
			:host([media-size="large"]) {
				border-radius: 2rem;
			}
			#cuerpo {
				display: grid;
				justify-items: center;
				background-color: var(--color-fondo);
				height: fit-content;
				justify-self: center;
				padding: 1.4rem 2rem;
				border-radius: 2rem;
				box-shadow: var(--shadow-elevation-6-box);
			}
			#imagen {
				width: 10rem;
				height: 10rem;
			}
			#version {
				display: grid;
				position: absolute;
				top: 3vh;
				left: 3vw;
				color: var(--color-control-texto);
				font-size: 0.85rem;
				font-weight: 400;
			}
		`;
	}
	render() {
		return html`
			<div id="cuerpo" @click=${this.pasar}>
				<div id="imagen">${IMAGES["LOGO_CHICO"]}</div>
				<div id="version">v.:${__VERSION__}</div>
			</div>
		`;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;

			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-splash-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;

				this.timeOut = setTimeout(() => {
					store.dispatch(goTo("onBoarding"));
				}, 4000);
				this.update();
			}
		}
	}

	pasar() {
		clearTimeout(this.timeOut);
		store.dispatch(goTo("onBoarding"));
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
window.customElements.define("splash-screen", splashScreen);
