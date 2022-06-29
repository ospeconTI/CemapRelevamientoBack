import { SVGSNEW as SVGS } from "../../../../../assets/icons/svgs"; //"../../../../../../assets/icons/svgs";
import { store } from "../../../../redux/store";
import { showWarning } from "../../../../redux/ui/actions";
import { isValidDate } from "../../../../libs/funciones";

//import { getTable as getTable } from "../../../../redux/table/actions";

export const dmdTableBase = (baseElement) =>
    class extends baseElement {
        constructor() {
            super();
        }
        firstUpdated() {
            super.firstUpdated();
            let buscar = this.shadowRoot.querySelector(".dmd-table-cabecera-find-buscar");
            let paginaPrimera = this.shadowRoot.querySelector(".dmd-table-pie-pagina-primera");
            let paginaAnterior = this.shadowRoot.querySelector(".dmd-table-pie-pagina-anterior");
            let paginaPosterior = this.shadowRoot.querySelector(".dmd-table-pie-pagina-posterior");
            let paginaUltima = this.shadowRoot.querySelector(".dmd-table-pie-pagina-ultima");
            let filasPorPagina = this.shadowRoot.querySelector(".dmd-table-pie-filas-por-pagina");
            if (buscar) {
                buscar.addEventListener("click", this._buscarDmdTable.bind(this));
            }
            if (paginaPrimera) {
                paginaPrimera.addEventListener("click", this._buscarDmdTable.bind(this));
            }
            if (paginaAnterior) {
                paginaAnterior.addEventListener("click", this._buscarDmdTable.bind(this));
            }
            if (paginaPosterior) {
                paginaPosterior.addEventListener("click", this._buscarDmdTable.bind(this));
            }
            if (paginaUltima) {
                paginaUltima.addEventListener("click", this._buscarDmdTable.bind(this));
            }
            if (filasPorPagina) {
                filasPorPagina.addEventListener("change", this._filasPorPaginaDmdTable.bind(this));
            }

            [].forEach.call(this.shadowRoot.querySelectorAll("[dmd-table-orden]"), (element) => {
                element.addEventListener("click", this._buscarDmdTable.bind(this));
            });
        }
        _filasPorPaginaDmdTable(e) {
            this.filasPorPagina = this.shadowRoot.querySelector(".dmd-table-pie-filas-por-pagina").value;
            let input = this.shadowRoot.querySelector(".dmd-table-cabecera-find-input");
            if (input.value.length > 0) {
                this._buscarDmdTable(e);
            }
        }
        _paginaPrimeraDmdTable() {
            this._buscarDmdTable();
        }
        _buscarDmdTable(e) {
            let obj = e.currentTarget;
            var oData = "";
            var div = null;
            let input = this.shadowRoot.querySelector(".dmd-table-cabecera-find-input");
            if (input.value.length > 0) {
                var orden = " asc";
                if (obj.hasAttribute("dmd-table-orden") || obj.hasAttribute("dmd-table-orden-ascendente") || obj.hasAttribute("dmd-table-orden-descendente")) {
                    div = obj;
                    if (div.hasAttribute("dmd-table-orden-ascendente")) orden = " desc";
                } else {
                    if (this.shadowRoot.querySelectorAll("[dmd-table-orden-ascendente]")[0]) {
                        div = this.shadowRoot.querySelectorAll("[dmd-table-orden-ascendente]")[0];
                    } else if (this.shadowRoot.querySelectorAll("[dmd-table-orden-descendente]")[0]) {
                        div = this.shadowRoot.querySelectorAll("[dmd-table-orden-descendente]")[0];
                    } else if (this.shadowRoot.querySelectorAll("[dmd-table-orden]")[0]) {
                        div = this.shadowRoot.querySelectorAll("[dmd-table-orden]")[0];
                    }
                    if (div.hasAttribute("dmd-table-orden-descendente")) orden = " desc";
                }
                if (obj.className == "dmd-table-cabecera-find-buscar") {
                    this.page = 1;
                } else if (obj.className == "dmd-table-datos-titulo") {
                    this.page = 1;
                } else if (obj.className == "dmd-table-pie-filas-por-pagina") {
                    this.page = 1;
                } else if (obj.className == "dmd-table-pie-pagina-primera") {
                    this.page = 1;
                } else if (obj.className == "dmd-table-pie-pagina-anterior") {
                    this.page = this.page > 1 ? this.page - 1 : this.page;
                } else if (obj.className == "dmd-table-pie-pagina-posterior") {
                    this.page = this.page * this.filasPorPagina >= this.totalRegistros ? this.page : this.page + 1;
                } else if (obj.className == "dmd-table-pie-pagina-ultima") {
                    this.page = Math.ceil((this.totalRegistros / this.filasPorPagina) * Math.pow(10, 0)) / Math.pow(10, 0);
                }

                if (div) {
                    this.__desmarcarSeleccionDmdTable();
                    this.__tituloRefreshIconoDmdTable();
                    var options = {};
                    options.count = true;
                    oData = this.__selectFilterDmdTable();
                    options.filter = oData;
                    if (oData != "") {
                        let salto = this.page < 2 ? 0 : (this.page - 1) * this.filasPorPagina;
                        options.skip = salto;
                        let paginacion = "&$top=" + this.filasPorPagina + "&$skip=" + salto;
                        options.top = this.filasPorPagina;
                        if (div) {
                            div.removeAttribute("dmd-table-orden");
                            div.removeAttribute("dmd-table-orden-ascendente");
                            div.removeAttribute("dmd-table-orden-descendente");
                            div.setAttribute(orden == " asc" ? "dmd-table-orden-ascendente" : "dmd-table-orden-descendente", "");
                            options.orderby = div.getAttribute("campo");
                            this._traerDatos(options);
                            //store.dispatch(getTable(options));
                            //store.dispatch(getTable(oData + "&$orderby=" + div.getAttribute("campo") + orden + paginacion));
                        } else {
                            //store.dispatch(getTable(options));
                            this._traerDatos(options);
                            //store.dispatch(getTable(oData + paginacion));
                        }
                    }
                }
            }
            if (oData == "" || !div) {
                store.dispatch(showWarning("Atencion!", "No hay dato a buscar o el contenido no corresponde", "fondoError", 3000));
            }
        }
        _traerDatos(options) {}
        _menuOcultarDmdTable() {
            let menu = this.shadowRoot.querySelector(".dmd-table-cuerpo");
            if (menu.hasAttribute("anchocero")) {
                menu.removeAttribute("anchocero");
            } else {
                menu.setAttribute("anchocero", "");
            }
        }
        _menuAmpliarDmdTable() {
            let menu = this.shadowRoot.querySelector(".dmd-table-menu");
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
        _seleccionarRegistroDmdTable(e) {
            this.__desmarcarSeleccionDmdTable();
            e.currentTarget.setAttribute("seleccionado", "");
        }
        _registroFormDmdTable(e) {
            let seleccionado = this.shadowRoot.querySelector("[seleccionado]");
            if (seleccionado) {
                var divVelo = this.shadowRoot.querySelector(".dmd-table-velo");
                if (divVelo.firstChild) divVelo.removeChild(divVelo.firstChild);
                divVelo.removeAttribute("hidden");
                var divPrincial = document.createElement("div");
                divPrincial.classList.add("dmd-table-formulario");
                divVelo.appendChild(divPrincial);
                let titulo = this.shadowRoot.querySelectorAll(".dmd-table-datos-titulo");
                var indice = 0;
                [].forEach.call(titulo, (element) => {
                    var div = document.createElement("div");
                    var input = document.createElement("input");
                    var label = document.createElement("label");
                    div.classList.add("dmd-input");
                    input.value = seleccionado.querySelectorAll(".dmd-table-datos-registro")[indice].innerText;
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
        __desmarcarSeleccionDmdTable() {
            let seleccion = this.shadowRoot.querySelector("[seleccionado]");
            if (seleccion) {
                seleccion.removeAttribute("seleccionado");
            }
        }
        __selectFilterDmdTable() {
            var oData = "";
            let input = this.shadowRoot.querySelector(".dmd-table-cabecera-find-input");
            if (input.value.length > 0) {
                [].forEach.call(this.shadowRoot.querySelectorAll("[dmd-table-orden]"), (element) => {
                    var filtro = "";
                    if (element.getAttribute("tipo") == "numerico" && /^\-*\d*\,?\.?\d*$/.test(input.value) && !isValidDate(input.value)) {
                        filtro = "startswith(cast(" + element.getAttribute("campo") + ",'Edm.String'),'" + input.value.replace(",", ".") + "')";
                    } else if (element.getAttribute("tipo") == "texto" && typeof input.value == "string" && !isValidDate(input.value)) {
                        filtro = "contains(" + element.getAttribute("campo") + ",'" + input.value + "')";
                        let isFecha = new Date(input.value);
                    } else if (element.getAttribute("tipo") == "fecha" && isValidDate(input.value)) {
                        var dateParts = input.value.split("/");
                        if (dateParts.length == 3) {
                            filtro =
                                element.getAttribute("campo") +
                                " eq " +
                                dateParts[2] +
                                "-" +
                                ("0" + dateParts[1]).substring(("0" + dateParts[1]).length - 2) +
                                "-" +
                                ("0" + dateParts[0]).substring(("0" + dateParts[0]).length - 2);
                        }
                    }
                    if (filtro.length > 0) {
                        if (oData == "") {
                            oData = filtro;
                        } else {
                            oData = oData + " or " + filtro;
                        }
                    }
                });
            }
            return oData;
        }
        __tituloRefreshIconoDmdTable() {
            [].forEach.call(this.shadowRoot.querySelectorAll(".dmd-table-datos-titulo"), (element) => {
                if (element.hasAttribute("dmd-table-orden-ascendente") || element.hasAttribute("dmd-table-orden-descendente")) {
                    element.removeAttribute("dmd-table-orden-ascendente");
                    element.removeAttribute("dmd-table-orden-descendente");
                    element.setAttribute("dmd-table-orden", "");
                }
            });
        }
    };
