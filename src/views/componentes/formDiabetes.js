/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";

const DIABETES = "diabetes.formularioTimeStamp";
const ALTA = "diabetes.guardadoTimeStamp";
const MODIFICADO = "diabetes.modificadoTimeStamp";
const ELIMINADO = "diabetes.eliminadoTimeStamp";
const AFILIADO = "afiliados.actual";
export class formDiabetes extends connect(store, DIABETES, ALTA, MODIFICADO, ELIMINADO, AFILIADO)(LitElement) {
	constructor() {
		super();
		this.first = true;
		this.alta = true;
		this.benef = {};
		this.formDia = {};
		this.nombre = "bruno";
		this.item = { apellido: "Monfrinotti", edad: "50", sexo: "H" };
	}

	static get styles() {
		return css``;
	}

	render() {
		let form = html`
			<div class="bloque">
				<div class="subtitulo">
					<div class="subtitulo1 s1bold">COMORBILIDADES</div>
					<div class="subtitulo2"></div>
				</div>
				<div class="grupo">
					<div class="fila doscolumnas">
						<input type="checkbox" .data=${"txtHTA"} label="HTA" />
						<input type="date" .data=${"txtHTAFecha"} label="Fecha" />
					</div>
					<div class="fila doscolumnas">
						<input type="checkbox" .data=${"txtObesidad"} label="Obesidad" />
						<input type="date" .data=${"txtObesidadFecha"} label="Fecha" />
					</div>
					<div class="fila doscolumnas">
						<input type="checkbox" .data=${"txtDislipemia"} label="Dislipemia" />
						<input type="date" .data=${"txtDislipemiaFecha"} label="Fecha" />
					</div>
					<div class="fila doscolumnas">
						<input type="checkbox" .data=${"txtTabaquismo"} label="Tabaquismo" />
						<input type="date" .data=${"txtTabaquismoFecha"} label="Fecha" />
					</div>
				</div>
			</div>

			<div class="bloque">
				<div class="subtitulo">
					<div class="subtitulo1 s1bold">EXAMEN FISICO</div>
					<div class="subtitulo2"></div>
				</div>
				<div class="grupo examenfisico">
					<div class="fila doscolumnas">
						<div class="label">Fecha de examen fisico:</div>
						<input class="obligatorio" type="date" .data=${"txtExamenFisicoFecha"} label="Fecha de examen fisico" />
					</div>
					<div class="fila">
						<div class="label">Peso:</div>
						<input class="obligatorio" type="text" .data=${"txtPeso"} label="Kilogramos" @change="${this.calculaIMC}" max="300" @blur="${this.minMax}" />
						<div class="label">Altura:</div>
						<input class="obligatorio" type="text" .data=${"txtAltura"} label="Centímetros" @change="${this.calculaIMC}" max="200" @blur="${this.minMax}" />
						<div class="label">Circunferencia abdominal:</div>
						<input class="obligatorio" type="text" .data=${"txtAbdomen"} label="Centímetros" max="300" @blur="${this.minMax}" />
						<div class="label">IMC:</div>
						<input type="text" .data=${"txtIMC"} label="IMC" disabled />
					</div>
				</div>
			</div>

			<input type="text" .data=${"apellido"} />
			<input type="number" .data=${"edad"} />
			<select type="text" .data=${"sexo"}>
				<option value="H">Hombre</option>
				<option value="M">Mujer</option>
			</select>

			<div>${this.item.apellido}</div>
			<div>${this.item.edad}</div>
			<div>${this.item.sexo}</div>
		`;

		return form;
	}
	minMax(e) {
		let value = Number(e.currentTarget.value);
		let min = Number(e.currentTarget.min);
		let max = Number(e.currentTarget.max);
		if (value == 0) return;
		if (value > max) e.currentTarget.value = max;
		if (value < min) e.currentTarget.value = min;
	}
	calculaIMC() {
		if (this.shadowRoot.querySelector("#txtPeso") != null && this.shadowRoot.querySelector("#txtAltura") != null) {
			var peso = this.shadowRoot.querySelector("#txtPeso").value;
			var altura = this.shadowRoot.querySelector("#txtAltura").value;
			var txtIMC = this.shadowRoot.querySelector("#txtIMC");
			var label = "";
			var color = "";
			var imc = 0;

			if (peso != "" && altura != "") {
				if (peso >= 1 && peso <= 500 && altura >= 1 && altura <= 250) {
					imc = (peso / ((altura * altura) / 100)) * 100;

					if (imc < 18.5) {
						label = "Bajo peso";
						color = "#33FFDA";
					} else if (imc >= 18.5 && imc <= 24.99) {
						label = "Peso normal";
						color = "#33FF49";
					} else if (imc >= 25 && imc <= 29.9) {
						label = "Sobrepeso";
						color = "#FFFF33";
					} else if (imc > 30) {
						label = "Obesidad";
						color = "FF3933";
					}

					if (altura > 50) {
						txtIMC.label = label;
						txtIMC.value = imc.toPrecision(4);
						txtIMC.style.backgroundColor = color;
					} else {
						txtIMC.label = "";
						txtIMC.value = "";
						txtIMC.style.color = "#e8e8e8";
					}
				}
			}
		}
	}
	firstUpdated(changedProperties) {
		let controles = this.shadowRoot.querySelectorAll("*");
		controles.forEach((c) => {
			if (c.data) {
				c.value = this.item[c.data];
				c.addEventListener("change", (e) => {
					this.updateProp(e, c.data);
				});
			}
		});
	}

	updateProp(e, prop) {
		this.item[prop] = e.currentTarget.value;
		if (e.currentTarget.type == "checkbox") this.item[prop] = e.currentTarget.checked;
		this.update();
	}

	stateChanged(state, name) {
		this.update();
	}

	static get properties() {
		return {
			mediaSize: {
				type: String,
				reflect: true,
				attribute: "media-size",
			},
			orientation: {
				type: String,
				reflect: true,
			},
			item: {
				type: Object,
				state: true,
			},
			nombre: {
				type: String,
				state: true,
			},
		};
	}
}
window.customElements.define("form-diabetes", formDiabetes);
