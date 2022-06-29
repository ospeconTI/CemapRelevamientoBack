/** @format */

import { css } from "lit";

export const dmdInput = css`
	.dmd-input {
		display: grid;
		position: relative;
		grid-template-rows: auto auto auto;
		grid-gap: 0rem;
	}
	.dmd-input input,
	.dmd-input textarea {
		/*padding: 0.15rem 0.6rem;*/
		padding: 0rem 0.6rem;
		background-color: var(--color-control-fondo);
		border: 1px solid var(--color-primario);
		color: var(--color-control-texto);
		font-size: var(--font-bajada-size);
		font-weight: var(--font-bajada-weight);
		outline: none;
		border-radius: 0.4rem;
		transition: all 0.3s ease-in-out;
	}
	.dmd-input input {
		height: 2.1rem;
	}
	.dmd-input input:focus,
	.dmd-input textarea:focus {
		background-color: var(--color-control-fondo);
		border-color: var(--color-destacado);
		color: var(--color-control-texto);
		transition: all 0.3s ease-in-out;
	}
	.dmd-input input[type="date"] {
		/* width: 100%; */
	}

	.dmd-input input[error],
	.dmd-input textarea[error] {
		border: 1px solid var(--color-error);
	}
	.dmd-input label {
		color: var(--color-control-texto);
		font-size: 0.9rem;
		font-weight: 500;
		padding-left: 0.6rem;
		transition: all 0.3s ease-in-out;
	}
	.dmd-input:focus-within label {
		color: var(--color-primario);
		font-weight: 900;
		transition: all 0.3s ease-in-out;
	}
	.dmd-input div {
		color: var(--color-error);
		font-size: 0.7rem;
		font-weight: 300;
		display: none;
	}
	.dmd-input input[error] + div,
	.dmd-input textarea[error] + div {
		display: grid;
	}
	::placeholder {
		/* Firefox, Chrome, Opera */
		color: var(--color-watermarck);
	}
	.dmd-input span {
		margin-left: 0.5rem;
		font-size: 0.7rem;
		font-weight: 300;
		display: none;
	}
	.dmd-input[helper] span {
		display: grid;
	}
	.dmd-input[helper] input[error] ~ span,
	.dmd-input[helper] textarea[error] ~ span {
		display: none;
	}
	.dmd-input svg {
		display: none;
		position: absolute;
		top: 0.4rem;
		right: 0.1rem;
		height: 1.1rem;
		width: 1.1rem;
		transform: translateY(-50%) scale(0.9);
		fill: var(--color-error);
	}
	.dmd-input input[error] ~ svg,
	.dmd-input textarea[error] ~ svg {
		display: grid;
	}
`;

/*
Como Usarlo 
--Importarlo
import { dmdInput } from "../css/dmdInput";
---------------------------------------------------
--Cargarlo
${dmdInput}
---------------------------------------------------
--HTML en el Render ( Tiene que tener el svg INFO )
--INPUT
<div class="dmd-input" helper>
	<label>Apellido y Nombre</label>
	<input type="text" id="cuatro" autocomplete="off" placeholder="Jose Perez" value="" />
	<div>Debe cargar Nombre</div>
	<span>En centimetros</span>
	${SVGS["INFO"]}
</div>
--TEXTAREA
<div class="dmd-input" helper>
	<label>Apellido y Nombre</label>
	<textarea type="text" id="cinco" placeholder="Jose Perez" value=""></textarea>
	<div>Debe cargar Nombre</div>
	<span>En metros</span>
	${SVGS["INFO"]}
</div>
---------------------------------------------------
-- colores usados
	--color-control-texto
	--color-control-fondo
	--color-error
	--color-primario
---------------------------------------------------
-- fuente
	--font-bajada-size
Como recorrer todos estos input
	[].forEach.call(this.shadowRoot.querySelectorAll("Input"), (element) => {
		element.value="";
	});

Como recorrer todos estos input que estan con error
	[].forEach.call(this.shadowRoot.querySelectorAll("[error]"), (element) => {
		element.removeAttribute("error");
	});

*/
