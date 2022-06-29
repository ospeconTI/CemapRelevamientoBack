import { SVGS } from "../../../../../assets/icons/svgs";
import { store } from "../../../../redux/store";
import { showWarning } from "../../../../redux/ui/actions";
import { isValidDateUS } from "../../../../libs/funciones";

var camposOrden = {};

export const dmdBusquedaBase = (baseElement) =>
	class extends baseElement {
		constructor() {
			super();
			this.selector = null;
		}
		firstUpdated() {
			super.firstUpdated();
			let cerrar = this.shadowRoot.querySelector(".dmd-busqueda-cabecera-cerrar");
			let buscar = this.shadowRoot.querySelector(".dmd-busqueda-input-lupa");
			let resetFiltro = this.shadowRoot.querySelector(".dmd-busqueda-input-searchoff");
			let inputBusqueda = this.shadowRoot.querySelector(".dmd-busqueda-input-input");
			if (cerrar) {
				cerrar.addEventListener("click", this._cerrarDmdBusqueda.bind(this));
			}
			if (buscar) {
				buscar.addEventListener("click", this._filtrarDmdBusqueda.bind(this));
			}
			if (resetFiltro) {
				resetFiltro.addEventListener("click", this._filtrarDmdBusqueda.bind(this));
			}
			if (inputBusqueda) {
				inputBusqueda.addEventListener("input", this._filtrarDmdBusqueda.bind(this));
			}

			[].forEach.call(this.shadowRoot.querySelectorAll(".dmd-busqueda-datos-titulo"), (element) => {
				if (element.campo) {
					element.setAttribute("orden", "");
				}
			});
			//this.addEventListener("transitionend", this.transitionEnd.bind(this));
			//this.addEventListener("transitionstart", this.transitionStart.bind(this));
			this._filtrarDmdBusqueda(null);
		}
		_estadoInicial() {
			this.shadowRoot.querySelector(".dmd-busqueda-input-input").value = "";
			this._filtrarDmdBusqueda(null);
		}
		_cerrarDmdBusqueda(e) {
			//this.setAttribute("hidden", true);
			this.hidden = true;
		}
		_itemSeleccionado(e) {}
		_filtrarDmdBusqueda(e) {
			let obj = e ? e.currentTarget : null;
			// buscar;ordenar
			let accion = this._accion(e);
			// "",nombre del campo - Campo que actualmente tiene el orden
			let campoActual = this._campoActual();
			// "",ascendente,descendente - Como esta el orden
			let ordenActual = this._ordenActual();
			// "",nombre del campo - Sobre que campo se hizo el click
			let campoClick = this._campoClick(e);
			if (accion == "ordenar") {
				var ordenSiguiente = "ascendente";
				if (campoActual == campoClick && ordenActual == "ascendente") {
					ordenSiguiente = "descendente";
				}
				this._desmarcarSeleccionDmdBusqueda();
				this._tituloRefreshIconoDmdBusqueda();
				if (obj) {
					obj.removeAttribute("ascendente");
					obj.removeAttribute("descendente");
					obj.removeAttribute("orden");
					obj.setAttribute(ordenSiguiente, "");
				}
				this.grid = this._ordenarArray(this.grid, campoClick, ordenSiguiente);
				this.update();
			} else if (accion == "buscar") {
				let input = this.shadowRoot.querySelector(".dmd-busqueda-input-input");
				this.grid = this._filtrarArray(this.dataSource, campoActual, input.value);
			} else if (accion == "cargaInicial" || accion == "resetFiltro") {
				this.shadowRoot.querySelector(".dmd-busqueda-input-input").value = "";
				let campoCargainicial = this.shadowRoot.querySelectorAll(".dmd-busqueda-datos-titulo")[0];
				this._desmarcarSeleccionDmdBusqueda();
				this._tituloRefreshIconoDmdBusqueda();
				if (campoCargainicial) {
					campoCargainicial.removeAttribute("ascendente");
					campoCargainicial.removeAttribute("descendente");
					campoCargainicial.removeAttribute("orden");
					campoCargainicial.setAttribute("ascendente", "");
				}
				this.grid = this._ordenarArray(this.dataSource, campoCargainicial.campo, "ascendente");
			}
		}
		_seleccionarRegistroDmdBusqueda(e) {
			this._desmarcarSeleccionDmdBusqueda();
			e.currentTarget.setAttribute("seleccionado", "");
			this._itemSeleccionado(e);
		}
		_desmarcarSeleccionDmdBusqueda() {
			let seleccion = this.shadowRoot.querySelector("[seleccionado]");
			if (seleccion) {
				seleccion.removeAttribute("seleccionado");
			}
		}
		_tituloRefreshIconoDmdBusqueda() {
			[].forEach.call(this.shadowRoot.querySelectorAll(".dmd-busqueda-datos-titulo"), (element) => {
				element.removeAttribute("ascendente");
				element.removeAttribute("descendente");
				element.removeAttribute("orden");
				element.setAttribute("orden", "");
			});
		}
		_accion(e) {
			var accion = "";
			let obj = e ? e.currentTarget : null;
			if (obj) {
				if (obj.className == "dmd-busqueda-datos-titulo") {
					accion = "ordenar";
				} else if (obj.className == "dmd-busqueda-input-lupa") {
					accion = "buscar";
				} else if (obj.className == "dmd-busqueda-input-searchoff") {
					accion = "resetFiltro";
				} else if (obj.className == "dmd-busqueda-input-input") {
					accion = "buscar";
				}
			} else {
				accion = "cargaInicial";
			}
			return accion;
		}
		_campoActual() {
			var campoActual = "";
			let titulo = this.shadowRoot.querySelectorAll(".dmd-busqueda-datos-titulo");
			[].forEach.call(titulo, (element) => {
				if (element.hasAttribute("ascendente") || element.hasAttribute("descendente")) {
					campoActual = element.campo;
				}
			});
			return campoActual;
		}
		_ordenActual() {
			var ordenActual = "";
			let titulo = this.shadowRoot.querySelectorAll(".dmd-busqueda-datos-titulo");
			[].forEach.call(titulo, (element) => {
				if (element.hasAttribute("ascendente")) {
					ordenActual = "ascendente";
				} else if (element.hasAttribute("descendente")) {
					ordenActual = "descendente";
				}
			});
			return ordenActual;
		}
		_campoClick(e) {
			var campoClick = "";
			let obj = e ? e.currentTarget : null;
			if (obj) {
				if (obj.className == "dmd-busqueda-datos-titulo") {
					campoClick = obj.campo;
				}
			}
			return campoClick;
		}
		_estaElCampo(_campo, _array) {
			var reto = false;
			[].forEach.call(_array, (element) => {
				if (element.nombre == _campo) {
					reto = true;
				}
			});
			return reto;
		}
		_ordenarArray(_array, _campo, _orden) {
			var ret = null;
			if (_array && _array.length > 0) {
				var x = 1,
					y = -1;
				if (_orden == "descendente") {
					x = -1;
					y = 1;
				}
				ret = _array.sort(function (a, b) {
					return a[_campo] > b[_campo] ? x : y;
				});
			}
			return ret;
		}
		_filtrarArray(_array, _campo, _filtro) {
			var ret = null;
			if (_filtro && _filtro.length > 0) {
				if (_array && _array.length > 0) {
					let config = this.config;
					let input = _filtro.toString();
					var estaElCampo = this._estaElCampo;
					var salida = _array.filter(function (dato) {
						var ok = false;
						for (var key in dato) {
							if (dato[key]) {
								var value = dato[key].toString();
								if (estaElCampo(key, config)) {
									if (isValidDateUS(value)) {
										value = new Date(value).toLocaleDateString("fr-FR").toString();
									}
									if (value.toUpperCase().indexOf(input.toUpperCase(), 0) > -1) {
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
					ret = salida;
				}
			} else {
				ret = this.dataSource;
			}
			return ret;
		}
	};
