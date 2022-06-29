import { SVGS } from "../../../../../assets/icons/svgs";
import { store } from "../../../../redux/store";
import { showWarning } from "../../../../redux/ui/actions";
import { isValidDate } from "../../../../libs/funciones";

import { getTable as getTable } from "../../../../redux/table/actions";

export const dmdTableCardBase = (baseElement) =>
	class extends baseElement {
		constructor() {
			super();
		}
		firstUpdated() {
			super.firstUpdated();
			let buscar = this.shadowRoot.querySelector(".dmd-table-card-cabecera-find-buscar");
			let ordenar = this.shadowRoot.querySelector(".dmd-table-card-cabecera-find-sort");
			let paginaPrimera = this.shadowRoot.querySelector(".dmd-table-card-pie-pagina-primera");
			let paginaAnterior = this.shadowRoot.querySelector(".dmd-table-card-pie-pagina-anterior");
			let paginaPosterior = this.shadowRoot.querySelector(".dmd-table-card-pie-pagina-posterior");
			let paginaUltima = this.shadowRoot.querySelector(".dmd-table-card-pie-pagina-ultima");
			let filasPorPagina = this.shadowRoot.querySelector(".dmd-table-card-pie-filas-por-pagina");
			if (buscar) {
				buscar.addEventListener("click", this._buscardmdTableCard.bind(this));
			}
			if (ordenar) {
				ordenar.addEventListener("click", this._ordenardmdTableCard.bind(this));
			}
			if (paginaPrimera) {
				paginaPrimera.addEventListener("click", this._buscardmdTableCard.bind(this));
			}
			if (paginaAnterior) {
				paginaAnterior.addEventListener("click", this._buscardmdTableCard.bind(this));
			}
			if (paginaPosterior) {
				paginaPosterior.addEventListener("click", this._buscardmdTableCard.bind(this));
			}
			if (paginaUltima) {
				paginaUltima.addEventListener("click", this._buscardmdTableCard.bind(this));
			}
			if (filasPorPagina) {
				filasPorPagina.addEventListener("change", this._filasPorPaginadmdTableCard.bind(this));
			}

			[].forEach.call(this.shadowRoot.querySelectorAll(".dmd-table-card-cabecera-find-sort-menu-item"), (element) => {
				if (element.campo) {
					element.addEventListener("click", this._buscardmdTableCard.bind(this));
					element.setAttribute("orden", "");
				}
			});
		}
		_filasPorPaginadmdTableCard(e) {
			this.filasPorPagina = this.shadowRoot.querySelector(".dmd-table-card-pie-filas-por-pagina").value;
			let input = this.shadowRoot.querySelector(".dmd-table-card-cabecera-find-input");
			if (input.value.length > 0) {
				this._buscardmdTableCard(e);
			}
		}
		_paginaPrimeradmdTableCard() {
			this._buscardmdTableCard();
		}
		_ordenardmdTableCard(e) {
			var menu = this.shadowRoot.querySelector(".dmd-table-card-cabecera-find-sort-menu");
			if (menu.style.display == "grid") {
				menu.style.display = "none";
			} else {
				menu.style.display = "grid";
			}
		}
		_buscardmdTableCard(e) {
			let obj = e.currentTarget;
			var oData = "";
			var div = null;
			var orden = " asc";
			let input = this.shadowRoot.querySelector(".dmd-table-card-cabecera-find-input");
			if (input.value.length > 0) {
				if (obj.className == "dmd-table-card-cabecera-find-sort-menu-item") {
					div = obj;
					if (div.hasAttribute("ascendente")) orden = " desc";
				} else {
					[].forEach.call(this.shadowRoot.querySelectorAll(".dmd-table-card-cabecera-find-sort-menu-item"), (element) => {
						if (element.hasAttribute("ascendente") || element.hasAttribute("descendente")) {
							div = element;
						}
					});
					if (!div) {
						div = this.shadowRoot.querySelector(".dmd-table-card-cabecera-find-sort-menu-item");
					}
					if (div.hasAttribute("descendente")) orden = " desc";
				}
				if (obj.className == "dmd-table-card-cabecera-find-buscar") {
					this.page = 1;
				} else if (obj.className == "dmd-table-card-cabecera-find-sort-menu-item") {
					this.page = 1;
				} else if (obj.className == "dmd-table-card-pie-filas-por-pagina") {
					this.page = 1;
				} else if (obj.className == "dmd-table-card-pie-pagina-primera") {
					this.page = 1;
				} else if (obj.className == "dmd-table-card-pie-pagina-anterior") {
					this.page = this.page > 1 ? this.page - 1 : this.page;
				} else if (obj.className == "dmd-table-card-pie-pagina-posterior") {
					this.page = this.page * this.filasPorPagina >= this.totalRegistros ? this.page : this.page + 1;
				} else if (obj.className == "dmd-table-card-pie-pagina-ultima") {
					this.page = Math.ceil((this.totalRegistros / this.filasPorPagina) * Math.pow(10, 0)) / Math.pow(10, 0);
				}

				if (div) {
					this.__desmarcarSelecciondmdTableCard();
					this.__tituloRefreshIconodmdTableCard();
					oData = this.__selectFilterdmdTableCard();
					if (oData != "") {
						let salto = this.page < 2 ? 0 : (this.page - 1) * this.filasPorPagina;
						let paginacion = "&$top=" + this.filasPorPagina + "&$skip=" + salto;
						if (div) {
							div.removeAttribute("orden");
							div.removeAttribute("ascendente");
							div.removeAttribute("descendente");
							div.setAttribute(orden == " asc" ? "ascendente" : "descendente", "");
							store.dispatch(getTable(oData + "&$orderby=" + div.campo + orden + paginacion));
						} else {
							store.dispatch(getTable(oData + paginacion));
						}
					}
				}
			}
			if (oData == "" || !div) {
				store.dispatch(showWarning("Atencion!", "No hay dato a buscar o el contenido no corresponde", "fondoError", 3000));
			}
		}
		_menuOcultardmdTableCard() {
			let menu = this.shadowRoot.querySelector(".dmd-table-card-cuerpo");
			if (menu.hasAttribute("anchocero")) {
				menu.removeAttribute("anchocero");
			} else {
				menu.setAttribute("anchocero", "");
			}
		}
		_menuAmpliardmdTableCard() {
			let menu = this.shadowRoot.querySelector(".dmd-table-card-menu");
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
		_seleccionarRegistrodmdTableCard(e) {
			this.__desmarcarSelecciondmdTableCard();
			e.currentTarget.setAttribute("seleccionado", "");
		}
		_registroFormdmdTableCard(e) {
			let seleccionado = this.shadowRoot.querySelector("[seleccionado]");
			if (seleccionado) {
				var divVelo = this.shadowRoot.querySelector(".dmd-table-card-velo");
				if (divVelo.firstChild) divVelo.removeChild(divVelo.firstChild);
				divVelo.removeAttribute("hidden");
				var divPrincial = document.createElement("div");
				divPrincial.classList.add("dmd-table-card-formulario");
				divVelo.appendChild(divPrincial);
				let titulo = this.shadowRoot.querySelectorAll(".dmd-table-card-datos-titulo");
				var indice = 0;
				for (var key in this.form) {
					var div = document.createElement("div");
					var input = document.createElement("input");
					var label = document.createElement("label");
					div.classList.add("dmd-input");
					input.value = this.table[seleccionado.index][key];
					label.innerHTML = this.form[key];
					input.setAttribute("disabled", "");
					div.appendChild(label);
					div.appendChild(input);
					divPrincial.appendChild(div);
					indice++;
				}
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
		__desmarcarSelecciondmdTableCard() {
			let seleccion = this.shadowRoot.querySelector("[seleccionado]");
			if (seleccion) {
				seleccion.removeAttribute("seleccionado");
			}
		}
		__selectFilterdmdTableCard() {
			var oData = "";
			let input = this.shadowRoot.querySelector(".dmd-table-card-cabecera-find-input");
			if (input.value.length > 0) {
				[].forEach.call(this.shadowRoot.querySelectorAll(".dmd-table-card-cabecera-find-sort-menu-item"), (element) => {
					var filtro = "";
					if (element.tipo == "numerico" && /^\-*\d*\,?\.?\d*$/.test(input.value) && !isValidDate(input.value)) {
						filtro = "startswith(cast(" + element.campo + ",'Edm.String'),'" + input.value.replace(",", ".") + "')";
					} else if (element.tipo == "texto" && typeof input.value == "string" && !isValidDate(input.value)) {
						filtro = "contains(" + element.campo + ",'" + input.value + "')";
						let isFecha = new Date(input.value);
					} else if (element.tipo == "fecha" && isValidDate(input.value)) {
						var dateParts = input.value.split("/");
						if (dateParts.length == 3) {
							filtro = element.campo + " eq " + dateParts[2] + "-" + ("0" + dateParts[1]).substring(("0" + dateParts[1]).length - 2) + "-" + ("0" + dateParts[0]).substring(("0" + dateParts[0]).length - 2);
						}
					}
					if (filtro.length > 0) {
						if (oData == "") {
							oData = "$filter=" + filtro;
						} else {
							oData = oData + " or " + filtro;
						}
					}
				});
			}
			return oData;
		}
		__tituloRefreshIconodmdTableCard() {
			[].forEach.call(this.shadowRoot.querySelectorAll(".dmd-table-card-cabecera-find-sort-menu-item"), (element) => {
				if (element.hasAttribute("ascendente") || element.hasAttribute("descendente")) {
					element.removeAttribute("ascendente");
					element.removeAttribute("descendente");
					element.setAttribute("orden", "");
				}
			});
		}
	};
