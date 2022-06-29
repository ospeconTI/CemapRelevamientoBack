/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { dmdButton } from "../css/dmdButton";

import { documentoScreen } from "./documento";

const COLOR_PINCEL = "black";
const COLOR_FONDO = "white";
const GROSOR = 3;

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class firmaScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.timeOut = 0;

		this.canvas = null;
		this.contexto = null;
		this.dibujando = false;
		this.xAnterior = 0;
		this.yAnterior = 0;
		this.xActual = 0;
		this.yActual = 0;
	}

	static get styles() {
		return css`
			${dmdButton}
			:host {
				display: grid;
				position: relative;
				width: 100vw;
				padding: 0 !important;
				justify-content: center;
				align-items: center;
				background-color: var(--color-fondo);
			}
			:host([hidden]) {
				display: none;
			}
			#cuerpo {
				display: grid;
				justify-items: center;
				align-items: center;
				background-color: var(--color-fondo);
				height: 100%;
				width: 100vw;
				box-shadow: var(--shadow-elevation-6-box);
				grid-template-rows: 4% 80% 16%;
				grid-gap: 0.1rem;
			}
			#firma {
				text-align: center;
				font-size: 1.4rem;
				align-self: center;
			}
			#canvas {
				border: solid 1px black;
				background-color: white;
				width: 95%;
				height: 98%;
				object-fit: cover;
			}
			#botones {
				display: grid;
				grid-template-columns: auto auto auto;
				justify-self: center;
				align-self: flex-start;
				grid-gap: 0.5rem;
			}
		`;
	}
	get _canvas() {
		return this.shadowRoot.querySelector("#canvas");
	}
	firstUpdated() {
		super.firstUpdated();
		this.canvas = this._canvas;
		this.contexto = this._canvas.getContext("2d");
		new ResizeObserver(this.cambioTamano.bind(this)).observe(this._canvas);
		this.limpiarCanvas();
	}

	render() {
		return html`
			<div id="cuerpo" @resize=${this.cambioTamano}>
				<div id="firma">Firmar</div>
				<canvas id="canvas" @touchstart=${this.mDown} @touchmove=${this.mMove} @touchcancel=${this.mOut} @touchend=${this.mOut} @mousedown=${this.mDown} @mousemove=${this.mMove} @mouseout=${this.mOut} @mouseup=${this.mUp}></canvas>
				<div id="botones">
					<button class="dmd-button" conBorde id="btnLimpiar" @click=${this.limpiarCanvas}>Limpiar</button>
					<button class="dmd-button" conBorde id="btnDescargar" @click="${this.download}">Descargar</button>
					<button class="dmd-button" conBorde id="btnGenerarDocumento" @click="${this.verDocumento}">Pasar a documento</button>
				</div>
				<a id="download" hidden></a>
			</div>
			<documento-screen id="documento"></documento-screen>
		`;
	}
	verDocumento() {
		let documento = this.shadowRoot.querySelector("#documento");
		documento.firma = this.removeImageBlanks();
		documento.hidden = false;
	}
	download() {
		let enlace = this.shadowRoot.querySelector("#download");
		enlace.download = "firma";
		enlace.href = this.removeImageBlanks();
		enlace.click();
	}
	obtenerXReal(clientX) {
		return clientX - this.canvas.getBoundingClientRect().left;
	}
	obtenerYReal(clientY) {
		return clientY - this.canvas.getBoundingClientRect().top;
	}
	limpiarCanvas() {
		this.contexto.fillStyle = COLOR_FONDO;
		this.contexto.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
	cambioTamano() {
		if (this.canvas?.clientWidth) {
			this.canvas.width = 0;
			this.canvas.height = 0;
			this.canvas.width = this.canvas.clientWidth;
			this.canvas.height = this.canvas.clientHeight;
			this.contexto.fillStyle = COLOR_FONDO;
			this.contexto.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
	mDown(evento) {
		this.xAnterior = this.xActual;
		this.yAnterior = this.yActual;
		if (evento.clientX) {
			this.xActual = this.obtenerXReal(evento.clientX);
			this.yActual = this.obtenerYReal(evento.clientY);
		} else {
			this.xActual = this.obtenerXReal(evento.touches[0].clientX);
			this.yActual = this.obtenerYReal(evento.touches[0].clientY);
		}
		this.contexto.beginPath();
		this.contexto.fillStyle = COLOR_PINCEL;
		this.contexto.fillRect(this.xActual, this.yActual, GROSOR, GROSOR);
		this.contexto.closePath();
		// Y establecemos la bandera
		this.dibujando = true;
	}
	mMove(evento) {
		if (!this.dibujando) {
			return;
		}
		// El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo
		this.xAnterior = this.xActual;
		this.yAnterior = this.yActual;
		if (evento.clientX) {
			this.xActual = this.obtenerXReal(evento.clientX);
			this.yActual = this.obtenerYReal(evento.clientY);
		} else {
			this.xActual = this.obtenerXReal(evento.touches[0].clientX);
			this.yActual = this.obtenerYReal(evento.touches[0].clientY);
		}
		this.contexto.beginPath();
		this.contexto.moveTo(this.xAnterior, this.yAnterior);
		this.contexto.lineTo(this.xActual, this.yActual);
		this.contexto.strokeStyle = COLOR_PINCEL;
		this.contexto.lineWidth = GROSOR;
		this.contexto.stroke();
		this.contexto.closePath();
	}
	mOut() {
		this.dibujando = false;
	}
	mUp() {
		this.dibujando = false;
	}

	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			this.hidden = true;

			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-firma-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
			}
		}
	}

	pasar() {
		clearTimeout(this.timeOut);
		store.dispatch(goTo("onBoarding"));
	}

	removeImageBlanks() {
		let imgWidth = this.canvas.width;
		let imgHeight = this.canvas.height;
		let canvas = document.createElement("canvas");
		canvas.setAttribute("width", imgWidth);
		canvas.setAttribute("height", imgHeight);
		let context = canvas.getContext("2d");
		context.putImageData(this.contexto.getImageData(0, 0, imgWidth, imgHeight), 0, 0);

		let imageData = context.getImageData(0, 0, imgWidth, imgHeight),
			data = imageData.data,
			getRBG = function (x, y) {
				let offset = imgWidth * y + x;
				return {
					red: data[offset * 4],
					green: data[offset * 4 + 1],
					blue: data[offset * 4 + 2],
					opacity: data[offset * 4 + 3],
				};
			},
			isWhite = function (rgb) {
				// many images contain noise, as the white is not a pure #fff white
				return rgb.red > 200 && rgb.green > 200 && rgb.blue > 200;
			},
			scanY = function (fromTop) {
				var offset = fromTop ? 1 : -1;

				// loop through each row
				for (let y = fromTop ? 0 : imgHeight - 1; fromTop ? y < imgHeight : y > -1; y += offset) {
					// loop through each column
					for (let x = 0; x < imgWidth; x++) {
						let rgb = getRBG(x, y);
						if (!isWhite(rgb)) {
							if (fromTop) {
								return y;
							} else {
								return Math.min(y + 1, imgHeight);
							}
						}
					}
				}
				return null; // all image is white
			},
			scanX = function (fromLeft) {
				let offset = fromLeft ? 1 : -1;

				// loop through each column
				for (let x = fromLeft ? 0 : imgWidth - 1; fromLeft ? x < imgWidth : x > -1; x += offset) {
					// loop through each row
					for (let y = 0; y < imgHeight; y++) {
						let rgb = getRBG(x, y);
						if (!isWhite(rgb)) {
							if (fromLeft) {
								return x;
							} else {
								return Math.min(x + 1, imgWidth);
							}
						}
					}
				}
				return null; // all image is white
			};

		let cropTop = scanY(true),
			cropBottom = scanY(false),
			cropLeft = scanX(true),
			cropRight = scanX(false),
			cropWidth = cropRight - cropLeft,
			cropHeight = cropBottom - cropTop;

		let returnData = this.contexto.getImageData(cropLeft, cropTop, cropRight - cropLeft, cropBottom - cropTop);
		context.canvas.width = cropRight - cropLeft;
		context.canvas.height = cropBottom - cropTop;
		context.clearRect(0, 0, cropWidth, cropHeight);
		context.putImageData(returnData, 0, 0);

		return canvas.toDataURL();
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
window.customElements.define("firma-screen", firmaScreen);
