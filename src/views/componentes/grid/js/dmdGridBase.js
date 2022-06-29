import { SVGS } from "../../../../../assets/icons/svgs";
import { store } from "../../../../redux/store";
import { showWarning } from "../../../../redux/ui/actions";
import { isValidDateUS } from "../../../../libs/funciones";

var camposOrden = {};

export const dmdGridBase = (baseElement) =>
	class extends baseElement {
		constructor() {
			super();
		}
		firstUpdated() {
			super.firstUpdated();
			let buscar = this.shadowRoot.querySelector(".dmd-grid-cabecera-find-buscar");
			let cerrar = this.shadowRoot.querySelector(".dmd-grid-cabecera-find-cerrar");
			if (buscar) {
				buscar.addEventListener("click", this.__findMostarDmdGrid.bind(this));
			}
			if (cerrar) {
				cerrar.addEventListener("click", this.__findCerrarDmdGrid.bind(this));
			}
			this.camposOrden = {};
			[].forEach.call(this.shadowRoot.querySelectorAll("[dmd-grid-orden]"), (element) => {
				if (element.campo) {
					this.camposOrden[element.campo] = true;
				}
				element.addEventListener("click", this._buscarDmdGrid.bind(this));
			});
		}
		_buscarDmdGrid(e) {
			var obj = null;
			var accion = "";
			var obj = null;
			if (e) {
				obj = e.currentTarget;
			}
			var div = null;
			let input = this.shadowRoot.querySelector(".dmd-grid-cabecera-find-input");
			var ordenActual = " asc";
			var ordenSiguiente = " asc";
			if (obj && (obj.hasAttribute("dmd-grid-orden") || obj.hasAttribute("dmd-grid-orden-ascendente") || obj.hasAttribute("dmd-grid-orden-descendente"))) {
				accion = "ordenar";
				div = obj;
				if (div.hasAttribute("dmd-grid-orden-descendente") || div.hasAttribute("dmd-grid-orden")) ordenActual = " desc";
			} else {
				if (!e) {
					accion = "cargaInicial";
				} else {
					if (obj.className == "dmd-grid-cabecera-find-buscar") {
						accion = "buscar";
					} else {
						accion = "cerrar";
					}
				}
				if (this.shadowRoot.querySelectorAll("[dmd-grid-orden-ascendente]")[0]) {
					div = this.shadowRoot.querySelectorAll("[dmd-grid-orden-ascendente]")[0];
				} else if (this.shadowRoot.querySelectorAll("[dmd-grid-orden-descendente]")[0]) {
					div = this.shadowRoot.querySelectorAll("[dmd-grid-orden-descendente]")[0];
				} else if (this.shadowRoot.querySelectorAll("[dmd-grid-orden]")[0]) {
					div = this.shadowRoot.querySelectorAll("[dmd-grid-orden]")[0];
				}
				if (div.hasAttribute("dmd-grid-orden-descendente")) ordenActual = " desc";
			}
			switch (accion) {
				case "ordenar":
					ordenSiguiente = ordenActual == " asc" ? " desc" : " asc";
					break;
				case "cargaInicial":
					ordenSiguiente = " asc";
					break;
				case "buscar":
					ordenSiguiente = ordenActual;
					break;
				case "cerrar":
					ordenSiguiente = ordenActual;
					break;
			}
			if (div) {
				var x = 1,
					y = -1;
				if (ordenSiguiente == " desc") {
					x = -1;
					y = 1;
				}
				this.__desmarcarSeleccionDmdGrid();
				this.__tituloRefreshIconoDmdTable();
				div.removeAttribute("dmd-grid-orden");
				div.removeAttribute("dmd-grid-orden-ascendente");
				div.removeAttribute("dmd-grid-orden-descendente");
				div.setAttribute(ordenSiguiente == " desc" ? "dmd-grid-orden-descendente" : "dmd-grid-orden-ascendente", "");

				var salida = [];
				if (input.value.length > 0) {
					if (this.dataSource.length > 0) {
						let aBuscar = this.camposOrden;
						salida = this.dataSource.filter(function (dato) {
							var ok = false;
							for (var key in dato) {
								if (dato[key]) {
									var value = dato[key].toString();
									if (typeof dato[key] === "object" && dato[key] !== null) {
										value = dato[key][Object.keys(dato[key])[0]];
									}
									if (aBuscar[key]) {
										if (isValidDateUS(value)) {
											value = new Date(value).toLocaleDateString("fr-FR").toString();
										}
										if (value.toUpperCase().indexOf(input.value.toUpperCase(), 0) > -1) {
											ok = true;
											break;
										}
									}
								}
							}
							if (ok) {
								return dato;
							}
						});
					}
				} else {
					salida = this.dataSource;
				}
				this.grid = salida.sort(function (a, b) {
					if (a[div.campo] == null) {
						return x;
					}
					if (b[div.campo] == null) {
						return y;
					}
					if (typeof a[div.campo] === "object" && a[div.campo] !== null) {
						return a[div.campo][Object.keys(a[div.campo])[0]] > b[div.campo][Object.keys(b[div.campo])[0]] ? x : y;
					} else {
						return a[div.campo] > b[div.campo] ? x : y;
					}
				});
				this._finalLista();
				this.update();
			} else {
				store.dispatch(showWarning("Atencion!", "Error, intentelo nuevamente.", "fondoError", 3000));
			}
		}

		_menuOcultarDmdGrid() {
			let menu = this.shadowRoot.querySelector(".dmd-grid-cuerpo");
			if (menu.hasAttribute("anchocero")) {
				menu.removeAttribute("anchocero");
			} else {
				menu.setAttribute("anchocero", "");
			}
		}
		_menuAmpliarDmdGrid() {
			let menu = this.shadowRoot.querySelector(".dmd-grid-menu");
			if (menu.querySelectorAll("label")[0].style.display == "none") {
				menu.querySelectorAll("div")[0].children[0].outerHTML = SVGS["FLECHALEFT"].strings[0];
			} else {
				menu.querySelectorAll("div")[0].children[0].outerHTML = SVGS["FLECHARIGTH"].strings[0];
			}
			[].forEach.call(menu.querySelectorAll("label"), (element) => {
				if (element.style.display == "none") {
					element.style.display = "grid";
				} else {
					element.style.display = "none";
				}
			});
		}
		_seleccionarRegistroDmdGrid(e) {
			this.__desmarcarSeleccionDmdGrid();
			e.currentTarget.setAttribute("seleccionado", "");
			this._itemSeleccionado(e);
		}
		__findMostarDmdGrid(e) {
			let input = this.shadowRoot.querySelector(".dmd-grid-cabecera-find-input");
			let cerrar = this.shadowRoot.querySelector(".dmd-grid-cabecera-find-cerrar");
			if (cerrar.hasAttribute("hidden")) {
				input.removeAttribute("hidden");
				cerrar.removeAttribute("hidden");
			} else {
				this._buscarDmdGrid(e);
			}
		}
		_registroFormDmdGrid(e) {
			let seleccionado = this.shadowRoot.querySelector("[seleccionado]");
			if (seleccionado) {
				var divVelo = this.shadowRoot.querySelector(".dmd-grid-velo");
				if (divVelo.firstChild) divVelo.removeChild(divVelo.firstChild);
				divVelo.removeAttribute("hidden");
				var divPrincial = document.createElement("div");
				divPrincial.classList.add("dmd-grid-formulario");
				divVelo.appendChild(divPrincial);
				let titulo = this.shadowRoot.querySelectorAll(".dmd-grid-datos-titulo");
				var indice = 0;
				[].forEach.call(titulo, (element) => {
					var div = document.createElement("div");
					var input = document.createElement("input");
					var label = document.createElement("label");
					div.classList.add("dmd-input");
					if (seleccionado.querySelectorAll(".dmd-grid-datos-registro")[indice]) {
						input.value = seleccionado.querySelectorAll(".dmd-grid-datos-registro")[indice].innerText;
						label.innerHTML = element.firstElementChild.textContent;
						input.setAttribute("disabled", "");
						div.appendChild(label);
						div.appendChild(input);
						divPrincial.appendChild(div);
					}
					indice++;
				});
				var divClose = document.createElement("div");
				divClose.textContent = "X";
				divClose.style.position = "absolute";
				divClose.style.top = "0rem";
				divClose.style.right = "0rem";
				divClose.style.fontSize = "1.2rem";
				divClose.style.padding = "0.3rem 0.5rem";
				divClose.style.cursor = "pointer";
				divClose.onclick = function () {
					divVelo.setAttribute("hidden", "");
				};
				divPrincial.appendChild(divClose);

				if (e.currentTarget.hasAttribute("delete")) {
					var boton = document.createElement("button");
					boton.classList.add("dmd-button");
					boton.setAttribute("normal", "");
					boton.setAttribute("bordeRedondo", "");
					boton.textContent = "Eliminar";
					boton.style.justifySelf = "center";
					boton.style.marginTop = "1rem";
					boton.addEventListener("click", this._eliminar.bind(this));
					//boton.onclick = function () {
					//	this._eliminar(e);
					//};
					divPrincial.appendChild(boton);
				}
			} else {
				store.dispatch(showWarning("Atencion!", "No selecciono registro.", "fondoError", 3000));
			}
		}
		__desmarcarSeleccionDmdGrid() {
			let seleccion = this.shadowRoot.querySelector("[seleccionado]");
			if (seleccion) {
				seleccion.removeAttribute("seleccionado");
			}
		}
		__findCerrarDmdGrid(e) {
			let input = this.shadowRoot.querySelector(".dmd-grid-cabecera-find-input");
			let cerrar = this.shadowRoot.querySelector(".dmd-grid-cabecera-find-cerrar");
			input.value = "";
			input.setAttribute("hidden", "");
			cerrar.setAttribute("hidden", "");
			this._buscarDmdGrid(e);
		}
		__tituloRefreshIconoDmdTable() {
			[].forEach.call(this.shadowRoot.querySelectorAll(".dmd-grid-datos-titulo"), (element) => {
				if (element.hasAttribute("dmd-grid-orden-ascendente") || element.hasAttribute("dmd-grid-orden-descendente")) {
					element.removeAttribute("dmd-grid-orden-ascendente");
					element.removeAttribute("dmd-grid-orden-descendente");
					element.setAttribute("dmd-grid-orden", "");
				}
			});
		}
		_eliminar() {}
		_finalLista() {}
	};
