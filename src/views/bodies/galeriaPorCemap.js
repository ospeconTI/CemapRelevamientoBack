/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { SVGS } from "../../../assets/icons/svgs";
import { goHistoryPrev, goTo, goPrev } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { showWarning, showMsgBox } from "../../redux/ui/actions";
import { gridLayout } from "../css/gridLayout";
import { dmdButton } from "../css/dmdButton";
import { dmdInput } from "../css/dmdInput";
import { dmdSelect } from "../css/dmdSelect";
import { dmdBuscar } from "../css/dmdBuscar";

import { dmdBusquedaComponent } from "../componentes/busqueda/dmdBusqueda";

import { getXCemap as getImagensPorCemap, getXIdDetalle as getXIdDetalle } from "../../redux/detalleImagenes/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

const GALERIA_OK = "detalleImagenes.porCemap.timeStamp";
const GALERIA_ERROR = "detalleImagenes.porCemap.errorTimeStamp";

const GALERIA_IDDETALLE_OK = "detalleImagenes.porIdDetalle.timeStamp";
const GALERIA_IDDETALLE_ERROR = "detalleImagenes.porIdDetalle.errorTimeStamp";

const SELECCIONA_CEMAP_MSGBOX = "ui.msgbox.aceptarTimeStamp";

export class galeriaPorCemapScreen extends connect(store, GALERIA_IDDETALLE_OK, GALERIA_IDDETALLE_ERROR, GALERIA_OK, GALERIA_ERROR, SELECCIONA_CEMAP_MSGBOX, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
		this.current = "";
		this.data = null;

		this.config = [
			{ nombre: "Nombre", titulo: "Cemap", tipo: "texto", valorTodos: "" },
			{ nombre: "Codigo", titulo: "Codigo", tipo: "texto", valorTodos: "" },
		];
		this.cemapSeleccionado = {};
		this.estilosDmdBusqueda = css`
			.dmd-busqueda {
				width: 90%;
				height: 80%;
			}
			:host([media-size="large"]) .dmd-busqueda {
				width: 40%;
				height: 80%;
			}
			.dmd-busqueda-datos-titulos,
			.dmd-busqueda-datos-registros {
				grid-template-columns: 16rem 6rem !important;
				justify-content: center;
			}
			.dmd-busqueda-cabecera label:before {
				content: "Cemaps";
			}
			.dmd-busqueda-datos-registro[campo="Documento"] {
				text-align: right;
			}
			.dmd-busqueda-datos-registro[campo="Fecha"] {
				text-align: center;
			}
		`;
	}

	static get styles() {
		return css`
			${dmdButton}
			${dmdInput}
			${dmdSelect}
			${gridLayout}
			${dmdBuscar}
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
			#volver {
				display: grid;
				position: absolute;
				left: 1rem;
				top: 0.5rem;
			}
			#titulogeleria {
				align-self: flex-end;
			}
			#titulodes {
				display: none;
				font-size: 0.8rem;
				font-weight: 300;
				color: var(--color-control-texto);
			}
			#seleccion {
				display: grid;
				background-color: white;
				width: 90%;
				height: max-content;
				justify-self: center;
				margin-top: 3rem;
				align-items: center;
				justify-items: center;
				border-radius: 1rem;
			}
			#seleccioncemap {
				padding: 2rem 0;
				width: 90%;
				height: max-content;
			}
			#cuerpo {
				display: none;
				background-color: transparent;
				width: 85%;
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
	get _volver() {
		return this.shadowRoot.querySelector("#volver");
	}
	get _cemap() {
		return this.shadowRoot.querySelector("#cemap");
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
		this.shadowRoot.getElementById("cemapBusqueda")._itemSeleccionado = this.itemSeleccionado.bind(this);
	}

	willUpdate(changedProperties) {
		if (changedProperties.has("hidden")) {
			if (this.hidden && this.shadowRoot.getElementById("seleccion")) {
				this.shadowRoot.getElementById("seleccion").style.display = "grid";
				this.shadowRoot.getElementById("cuerpo").style.display = "none";
			}
		}
	}
	render() {
		if (true) {
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
					<div id="volver" @click="${this.volver}">${SVGS["BACK"]}</div>
					<div id="titulogeleria">GALERIA</div>
					<div id="titulodes">Toque la foto para ampliar</div>
				</div>
				<div id="seleccion">
					<div id="seleccioncemap">
						<div class="dmd-buscar" helper>
							<img
								@click="${this.cemapsVer}"
								tabindex="1"
								src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xNS41IDE0aC0uNzlsLS4yOC0uMjdDMTUuNDEgMTIuNTkgMTYgMTEuMTEgMTYgOS41IDE2IDUuOTEgMTMuMDkgMyA5LjUgM1MzIDUuOTEgMyA5LjUgNS45MSAxNiA5LjUgMTZjMS42MSAwIDMuMDktLjU5IDQuMjMtMS41N2wuMjcuMjh2Ljc5bDUgNC45OUwyMC40OSAxOWwtNC45OS01em0tNiAwQzcuMDEgMTQgNSAxMS45OSA1IDkuNVM3LjAxIDUgOS41IDUgMTQgNy4wMSAxNCA5LjUgMTEuOTkgMTQgOS41IDE0eiIvPjwvc3ZnPg=="
							/>
							<label>Cemap</label>
							<input type="text" id="cemap" @click="${this.cemapsVer}" autocomplete="off" placeholder="Seleccione Opcion" value="" readonly />
							<div>Debe seleccionar un Cemap</div>
							<span>Seleccione un cemap</span>
							${SVGS["INFO"]}
						</div>
						<div class="grid column" style="padding-top:2vh;">
							<button class="dmd-button miBoton" normal bordeRedondo @click="${this.cancelar}">Cancelar</button>
							<button class="dmd-button miBoton" normal bordeRedondo @click="${this.seleccionarCemap}">Aceptar</button>
						</div>
					</div>
				</div>
				<div id="cuerpo" class="row">
					<div id="cuerpoDatos">
						${this.data
							? this.data.map((item, index) => {
									return html`
										<div id="img-cuerpo">
											<div id="img-titulo">${item.Opcion.substring(0, 26)}</div>
											<div id="img-subtitulo">${item.Valoracion}</div>
											<img class="img-galeria" src="${item.Foto}" .item="${item}" @click="${this.fullAbrir}" />
										</div>
									`;
							  })
							: ""}
						<div style="padding:4rem;"></div>
					</div>
				</div>
				<dmd-busqueda-component hidden .dataSource=${store.getState().cemaps.entities} .estilos=${this.estilosDmdBusqueda} .config=${this.config} id="cemapBusqueda"> </dmd-busqueda-component>
			`;
		} else {
			if (this.current == "lista") {
				return html`<msgnoconeccion-component @click="${this.atras}" texto="Haga click volver" style="cursor:pointer"></msgnoconeccion-component>; `;
			}
		}
	}
	volver(e) {
		if (this.shadowRoot.getElementById("seleccion").style.display == "grid") {
			store.dispatch(goHistoryPrev());
		} else {
			this.shadowRoot.getElementById("seleccion").style.display = "grid";
			this.shadowRoot.getElementById("cuerpo").style.display = "none";
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
	itemSeleccionado(e) {
		if (e.currentTarget.item && e.currentTarget.item.Nombre) {
			this._cemap.value = e.currentTarget.item.Nombre;
		} else {
			this._cemap.value = e.currentTarget.item;
		}
		this.shadowRoot.getElementById("cemapBusqueda").hidden = true;
		this.cemapSeleccionado = e.currentTarget.item;
	}

	seleccionarCemap() {
		if (this.shadowRoot.getElementById("cemap").value != "") {
			//store.dispatch(showMsgBox("CONFIRMACEMAPGALERIA", "Selecciono el CEMAP <b>" + this.cemapSeleccionado.Nombre + ".</b><br>Es el correcto?"));
			this._titulodes.style.display = "grid";
			store.dispatch(getImagensPorCemap(Number(this.cemapSeleccionado.Id)));
		}
	}
	cemapsVer() {
		var cemapBusqueda = this.shadowRoot.getElementById("cemapBusqueda");
		if (this._cemap.value == "") {
			cemapBusqueda._estadoInicial();
		}
		cemapBusqueda.hidden = false;
	}

	atras() {
		store.dispatch(goHistoryPrev());
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
			const SeMuestraEnUnasDeEstasPantallas = "-galeriaPorCemap-".indexOf("-" + state.screen.name + "-") != -1;
			if (haveBodyArea && SeMuestraEnUnasDeEstasPantallas) {
				this.hidden = false;
				if (hiddenAntrior != this.hidden) {
				} else if (name == SCREEN) {
					this.shadowRoot.getElementById("seleccion").style.display = "grid";
					this.shadowRoot.getElementById("cuerpo").style.display = "none";
					this._titulodes.style.display = "none";
				}
			}
		}
		if ((name == GALERIA_OK || name == GALERIA_IDDETALLE_OK) && state.screen.name == "galeriaPorCemap") {
			this.shadowRoot.getElementById("seleccion").style.display = "none";
			this.shadowRoot.getElementById("cuerpo").style.display = "grid";
			this.data = [];
			state.detalleImagenes.porCemap.entities.map((item, index) => {
				let rr = {};
				rr.IdDetalle = item.IdDetalle;
				rr.Foto = item.Foto;
				rr.Opcion = item.Detalle.Combo.Label;
				rr.Valoracion = item.Detalle.Opciones.Caption;
				rr.index = index;
				rr.total = state.detalleImagenes.porCemap.entities.length - 1;
				this.data.push(rr);
			});
			this.update();
		}
		if ((name == GALERIA_ERROR || name == GALERIA_IDDETALLE_ERROR) && state.screen.name == "galeriaPorCemap") {
			alert("No Hay");
		}
		//if (name == SELECCIONA_CEMAP_MSGBOX && state.ui.msgbox.aceptarAccion == "CONFIRMACEMAPGALERIA") {
		// this._titulodes.style.display = "grid";
		// store.dispatch(getImagensPorCemap(Number(this.cemapSeleccionado.Id)));
		//}
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
window.customElements.define("galeria-por-cemap-screen", galeriaPorCemapScreen);
