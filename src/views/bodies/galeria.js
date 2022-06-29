/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { SVGS } from "../../../assets/icons/svgs";
import { goTo, goPrev } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { showWarning, showMsgBox } from "../../redux/ui/actions";
import { gridLayout } from "../css/gridLayout";

import { getXIdDetalle as getXIdDetalle } from "../../redux/detalleImagenes/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const GALERIA_IDDETALLE_OK = "detalleImagenes.porIdDetalle.timeStamp";
const GALERIA_IDDETALLE_ERROR = "detalleImagenes.porIdDetalle.errorTimeStamp";

export class galeriaScreen extends connect(store, GALERIA_IDDETALLE_OK, GALERIA_IDDETALLE_ERROR, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.opcion = null;
		this.data = null;
	}

	static get styles() {
		return css`
			:host {
				display: grid;
				position: relative;
				overflow-y: auto;
				padding: 0 !important;
				align-content: flex-start;
				background-color: var(--color-fondo);
			}
			:host([hidden]) {
				display: none;
			}
			::-webkit-scrollbar {
				width: 0;
				background: transparent;
			}
			#titulo {
				display: grid;
				position: relative;
				background-color: var(--color-gris);
				color: var(--color-negro);
				grid-template-rows: 60% 40%;
				width: 100vw;
				height: 8vh;
				font-size: 3vh;
				font-weight: bolder;
				justify-content: center;
				align-content: center;
				z-index: 5;
				text-align: center;
			}
			#titulogeleriaimg {
				position: absolute;
				left: 1rem;
				height: max-content;
				vertical-align: middle;
				margin-top: 0.4rem;
			}
			#titulogeleriaimg svg {
				width: 1.5rem;
				height: 1.5rem;
			}
			#titulogeleria {
				font-size: 1.2rem;
				align-self: flex-end;
			}
			#titulodes {
				display: none;
				font-size: 0.8rem;
				font-weight: 300;
				color: var(--color-control-texto);
			}
			#cuerpo {
				display: grid;
				background-color: transparent;
				width: 95%;
				justify-self: center;
				overflow-y: auto;
				height: 100%;
				align-content: flex-start;
				padding: 0.1rem 1rem 4rem 1rem;
			}
			#cuerpoDatos {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
				grid-gap: 0.6rem;
			}
			#img-cuerpo {
				display: grid;
				grid-template-rows: 0.9rem 0.8rem auto;
				box-shadow: 0px 0px 6px 1px #969696;
			}
			#img-titulo {
				font-size: 0.7rem;
				font-weight: 600;
				color: black;
				padding-left: 0.5rem;
			}
			#img-subtitulo {
				font-size: 0.6rem;
				font-weight: 300;
				color: var(--color-control-texto);
				padding-left: 0.5rem;
			}
			.img-galeria {
				width: 100%;
				height: auto;
				object-fit: cover;
			}
			.miBoton {
				align-self: center;
				width: 100%;
			}
			.texto {
				font-size: 2vh !important;
				font-weight: var(--font-label-weight);
				font-style: italic;
			}
			.divLinea {
				width: 100%;
				height: 1px;
				background-color: var(--ColorPrimario);
				margin: 2vh 0 1.5vh 0;
			}
			*[apagado] {
				display: none;
			}
			#velofull {
				display: none;
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				z-index: 99;
			}
			#full {
				display: grid;
				position: absolute;
				grid-template-rows: repeat(4, auto-fill);
				grid-gap: 0.2rem;
				width: 90vmin;
				place-self: center;
				background-color: var(--color-fondo);
				object-fit: cover;
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center center;
				z-index: 99;
				padding: 1vmin;
			}
			#xcerrar {
				display: grid;
				width: 1.5rem;
				height: 1.5rem;
				background-color: black;
				color: white;
				font-size: 1rem;
				z-index: 100;
				text-align: center;
				align-items: center;
				justify-self: self-end;
				border-radius: 50%;
				cursor: pointer;
			}
			#full-titulo {
				font-size: 1.1rem;
				font-weight: 600;
				overflow: overlay;
				color: black;
				align-self: flex-end;
			}
			#full-calificacion {
				font-size: 0.8rem;
				font-weight: 300;
				color: var(--color-control-texto);
			}
			#full-mostrar {
				display: grid;
				grid-template-columns: auto 1fr auto;
				align-items: center;
				justify-items: center;
			}
			#imgfull {
				width: 100%;
				height: auto;
				object-fit: contain;
				justify-self: center;
			}
			#full-mostrar-atras {
				justify-self: center;
			}
			#full-mostrar-adelante {
				justify-self: center;
			}
		`;
	}
	get _velofull() {
		return this.shadowRoot.querySelector("#velofull");
	}
	get _full() {
		return this.shadowRoot.querySelector("#full");
	}
	get _xcerrar() {
		return this.shadowRoot.querySelector("#xcerrar");
	}
	get _titulodes() {
		return this.shadowRoot.querySelector("#titulodes");
	}
	get _imgfull() {
		return this.shadowRoot.querySelector("#imgfull");
	}
	get _full_titulo() {
		return this.shadowRoot.querySelector("#full-titulo");
	}
	get _full_calificacion() {
		return this.shadowRoot.querySelector("#full-calificacion");
	}
	get _full_mostrar_atras() {
		return this.shadowRoot.querySelector("#full-mostrar-atras");
	}
	get _full_mostrar_adelante() {
		return this.shadowRoot.querySelector("#full-mostrar-adelante");
	}

	firstUpdated() {
		super.firstUpdated();
	}

	willUpdate(changedProperties) {
		if (changedProperties.has("hidden")) {
		}
	}
	render() {
		if (this.data) {
			return html`
				<div id="velofull">
					<div id="full">
						<div id="xcerrar" @click="${this.fullCerrar}">X</div>
						<div id="full-titulo">Vereda</div>
						<div id="full-calificacion">Calificacion: 2/5</div>
						<div id="full-mostrar">
							<div id="full-mostrar-atras" @click="${this.fotoAtras}">${SVGS["BACK"]}</div>
							<img id="imgfull" />
							<div id="full-mostrar-adelante" @click="${this.fotoAdelante}">${SVGS["FORWARD"]}</div>
						</div>
					</div>
				</div>
				<div id="titulo">
					<div id="titulogeleriaimg" @click=${this.atras}>${SVGS["BACK"]}</div>
					<div id="titulogeleria">GALERIA</div>
					<div id="titulodes">Toque la foto para ampliar</div>
				</div>
				<div id="cuerpo" class="row">
					<div id="cuerpoDatos">
						${this.data.map((item, index) => {
							return html`
								<div id="img-cuerpo">
									<div id="img-titulo">${item.Opcion.substring(0, 26)}</div>
									<div id="img-subtitulo">${item.Valoracion}</div>
									<img class="img-galeria" src="${item.Foto}" .item="${item}" @click="${this.fullAbrir}" />
								</div>
							`;
						})}
						<div style="padding:4rem;"></div>
					</div>
				</div>
			`;
		} else {
		}
	}
	fotoAtras(e) {
		let indice = e.currentTarget.indice;
		if (indice > 0) {
			this._full_mostrar_atras.indice = indice - 1;
			this._full_mostrar_adelante.indice = indice - 1;
			this._full_titulo.innerHTML = this.data[indice - 1].Opcion;
			this._full_calificacion.innerHTML = "Calificacion: " + this.data[indice - 1].Valoracion;
			this._imgfull.src = this.data[indice - 1].Foto;
			this._full_mostrar_adelante.style.visibility = "visible";
			if (indice - 1 == 0) this._full_mostrar_atras.style.visibility = "hidden";
		}
	}
	fotoAdelante(e) {
		let indice = e.currentTarget.indice;
		if (indice < this.data.length - 1) {
			this._full_mostrar_atras.indice = indice + 1;
			this._full_mostrar_adelante.indice = indice + 1;
			this._full_titulo.innerHTML = this.data[indice + 1].Opcion;
			this._full_calificacion.innerHTML = "Calificacion: " + this.data[indice + 1].Valoracion;
			this._imgfull.src = this.data[indice + 1].Foto;
			this._full_mostrar_atras.style.visibility = "visible";
			if (indice + 1 == this.data.length - 1) this._full_mostrar_adelante.style.visibility = "hidden";
		}
	}

	fullCerrar() {
		this._velofull.style.display = "none";
	}
	fullAbrir(e) {
		let item = e.currentTarget.item;
		this._velofull.style.display = "grid";
		this._imgfull.src = e.currentTarget.src;
		this._full_titulo.innerHTML = item.Opcion;
		this._full_calificacion.innerHTML = "Calificacion: " + item.Valoracion;
		this._full_mostrar_atras.indice = item.index;
		this._full_mostrar_adelante.indice = item.index;
		if (item.index == item.total) {
			this._full_mostrar_adelante.style.visibility = "hidden";
		} else {
			this._full_mostrar_adelante.style.visibility = "visible";
		}
		if (item.index == 0) {
			this._full_mostrar_atras.style.visibility = "hidden";
		} else {
			this._full_mostrar_atras.style.visibility = "visible";
		}
	}

	atras() {
		store.dispatch(goPrev());
	}
	cancelar() {
		store.dispatch(goTo("inicial"));
	}

	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
			let hiddenAntrior = this.hidden;
			this.hidden = true;
			this.current = state.screen.name;
			const haveBodyArea = isInLayout(state, this.area);
			const SeMuestraEnUnasDeEstasPantallas = "-galeria-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				if (hiddenAntrior != this.hidden) {
					if (this._titulodes) this._titulodes.style.display = "none";
					if (this.opcion.tipo == "IdDetalle") {
						store.dispatch(getXIdDetalle(this.opcion.variable));
					}
				} else if (name == SCREEN) {
					if (this._titulodes) this._titulodes.style.display = "grid";
				}
			}
		}
		if (name == GALERIA_IDDETALLE_OK && state.screen.name == "galeria") {
			this.data = [];
			state.detalleImagenes.porIdDetalle.entities.map((item, index) => {
				let rr = {};
				rr.IdDetalle = item.IdDetalle;
				rr.Foto = item.Foto;
				rr.Opcion = item.Detalle.Combo.Label;
				rr.Valoracion = item.Detalle.Opciones.Caption;
				rr.index = index;
				rr.total = state.detalleImagenes.porIdDetalle.entities.length - 1;
				this.data.push(rr);
			});
			this.update();
		}
		if (name == GALERIA_IDDETALLE_ERROR && state.screen.name == "galeria") {
			alert("No Hay");
		}
	}

	static get properties() {
		return {
			opcion: {
				type: Object,
				reflect: true,
				//{tipo: "IdDetalle", variable: 60}
			},
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
window.customElements.define("galeria-screen", galeriaScreen);
