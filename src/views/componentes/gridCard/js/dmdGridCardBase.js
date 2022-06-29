import { SVGS } from "../../../../../assets/icons/svgs";
import { store } from "../../../../redux/store";
import { showWarning } from "../../../../redux/ui/actions";
import { isValidDateUS } from "../../../../libs/funciones";

var camposOrden = {};

export const dmdGridCardBase = (baseElement) =>
	class extends baseElement {
		constructor() {
			super();
		}
		firstUpdated() {
			super.firstUpdated();
			let buscar = this.shadowRoot.querySelector(".dmd-grid-card-cabecera-find-buscar");
			let cerrar = this.shadowRoot.querySelector(".dmd-grid-card-cabecera-find-cerrar");
			let ordenar = this.shadowRoot.querySelector(".dmd-grid-card-cabecera-find-sort");
			if (buscar) {
				buscar.addEventListener("click", this.__findMostarDmdGrid.bind(this));
			}
			if (cerrar) {
				cerrar.addEventListener("click", this.__findCerrarDmdGrid.bind(this));
			}
			if (ordenar) {
				ordenar.addEventListener("click", this._ordenardmdGridCard.bind(this));
			}
			this.camposOrden = {};
			[].forEach.call(this.shadowRoot.querySelectorAll(".dmd-grid-card-cabecera-find-sort-menu-item"), (element) => {
				if (element.campo) {
					this.camposOrden[element.campo] = true;
					element.addEventListener("click", this._buscarDmdGrid.bind(this));
					element.setAttribute("orden", "");
				}
			});
		}
		_ordenardmdGridCard(e) {
			var menu = this.shadowRoot.querySelector(".dmd-grid-card-cabecera-find-sort-menu");
			if (menu.style.display == "grid") {
				menu.style.display = "none";
			} else {
				menu.style.display = "grid";
			}
		}
		_buscarDmdGrid(e) {
			var obj = null;
			var accion = "";
			var obj = null;
			if (e) {
				obj = e.currentTarget;
			}
			var div = null;
			let input = this.shadowRoot.querySelector(".dmd-grid-card-cabecera-find-input");
			var ordenActual = " asc";
			var ordenSiguiente = " desc";
			if (obj && obj.className == "dmd-grid-card-cabecera-find-sort-menu-item") {
				accion = "ordenar";
				div = obj;
				if (div.hasAttribute("descendente")) {
					ordenActual = " desc";
				}
			} else {
				if (!e) {
					accion = "cargaInicial";
				} else {
					if (obj.className == "dmd-grid-card-cabecera-find-buscar") {
						accion = "buscar";
					} else {
						accion = "cerrar";
					}
				}
				[].forEach.call(this.shadowRoot.querySelectorAll(".dmd-grid-card-cabecera-find-sort-menu-item"), (element) => {
					if (element.hasAttribute("ascendente") || element.hasAttribute("descendente")) {
						div = element;
					}
				});
				if (!div) {
					div = this.shadowRoot.querySelector(".dmd-grid-card-cabecera-find-sort-menu-item");
				}
				if (div.hasAttribute("descendente")) {
					ordenActual = " desc";
				}
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
				div.removeAttribute("orden");
				div.removeAttribute("ascendente");
				div.removeAttribute("descendente");
				div.setAttribute(ordenSiguiente == " desc" ? "descendente" : "ascendente", "");

				var salida = [];
				if (input.value.length > 0) {
					if (this.dataSource.length > 0) {
						let aBuscar = this.camposOrden;
						salida = this.dataSource.filter(function (dato) {
							var ok = false;
							for (var key in dato) {
								if (dato[key]) {
									var value = dato[key].toString();
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
					return a[div.campo] > b[div.campo] ? x : y;
				});
				this.update();
			} else {
				store.dispatch(showWarning("Atencion!", "Error, intentelo nuevamente.", "fondoError", 3000));
			}
		}

		_menuOcultarDmdGrid() {
			let menu = this.shadowRoot.querySelector(".dmd-grid-card-cuerpo");
			if (menu.hasAttribute("anchocero")) {
				menu.removeAttribute("anchocero");
			} else {
				menu.setAttribute("anchocero", "");
			}
		}
		_menuAmpliarDmdGrid() {
			let menu = this.shadowRoot.querySelector(".dmd-grid-card-menu");
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
		}
		__findMostarDmdGrid(e) {
			let input = this.shadowRoot.querySelector(".dmd-grid-card-cabecera-find-input");
			let cerrar = this.shadowRoot.querySelector(".dmd-grid-card-cabecera-find-cerrar");
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
				var divVelo = this.shadowRoot.querySelector(".dmd-grid-card-velo");
				if (divVelo.firstChild) divVelo.removeChild(divVelo.firstChild);
				divVelo.removeAttribute("hidden");
				var divPrincial = document.createElement("div");
				divPrincial.classList.add("dmd-grid-card-formulario");
				divVelo.appendChild(divPrincial);
				let titulo = this.shadowRoot.querySelectorAll(".dmd-grid-card-datos-titulo");
				var indice = 0;
				[].forEach.call(titulo, (element) => {
					var div = document.createElement("div");
					var input = document.createElement("input");
					var label = document.createElement("label");
					div.classList.add("dmd-input");
					input.value = seleccionado.querySelectorAll(".dmd-grid-card-datos-registro")[indice].innerText;
					label.innerHTML = element.firstElementChild.textContent;
					input.setAttribute("disabled", "");
					div.appendChild(label);
					div.appendChild(input);
					divPrincial.appendChild(div);
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
					boton.onclick = function () {
						this.eliminar;
					};
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
			let input = this.shadowRoot.querySelector(".dmd-grid-card-cabecera-find-input");
			let cerrar = this.shadowRoot.querySelector(".dmd-grid-card-cabecera-find-cerrar");
			input.value = "";
			input.setAttribute("hidden", "");
			cerrar.setAttribute("hidden", "");
			this._buscarDmdGrid(e);
		}
		__tituloRefreshIconoDmdTable() {
			[].forEach.call(this.shadowRoot.querySelectorAll(".dmd-grid-card-cabecera-find-sort-menu-item"), (element) => {
				if (element.hasAttribute("ascendente") || element.hasAttribute("descendente")) {
					element.removeAttribute("ascendente");
					element.removeAttribute("descendente");
					element.setAttribute("orden", "");
				}
			});
		}
	};
