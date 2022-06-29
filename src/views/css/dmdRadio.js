/** @format */

import { css } from "lit";

export const dmdRadio = css`
	.dmd-radio {
		display: grid;
		position: relative;
		grid-template-rows: 1fr auto 1fr;
		grid-gap: 0rem;
	}
	.dmd-radio .dmd-radio-titulo {
		color: var(--color-control-texto);
		font-size: 0.9rem;
		font-weight: 500;
		padding-left: 0.6rem;
		align-self: center;
		transition: all 0.3s ease-in-out;
	}
	.dmd-radio:focus-within .dmd-radio-titulo {
		color: var(--color-primario);
		font-weight: 900;
		transition: all 0.3s ease-in-out;
	}
	.dmd-radio .dmd-radio-radios {
		display: grid;
		background-color: var(--color-control-fondo);
		border: 1px solid var(--color-primario);
		color: var(--color-control-texto);
		font-size: var(--font-bajada-size);
		font-weight: var(--font-bajada-weight);
		outline: none;
		border-radius: 0.4rem;
		column-gap: 0.5rem;
		padding: 0.2rem 0.5rem;
		transition: all 0.3s ease-in-out;
	}
	.dmd-radio[radios-horizontal] .dmd-radio-radios {
		grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
		justify-items: center;
	}
	.dmd-radio:not([radios-horizontal]) .dmd-radio-radios {
		grid-auto-flow: row;
		grid-template-columns: inherit;
		justify-items: center;
	}
	.dmd-radio[radios-horizontal]:not([item-horizontal]) .dmd-radio-radios {
		grid-gap: 0.3rem;
	}

	.dmd-radio .dmd-radio-radio {
		display: grid;
		grid-gap: 0;
		height: fit-content;
		width: fit-content;
		align-items: center;
	}
	.dmd-radio[item-horizontal] .dmd-radio-radio {
		grid-template-columns: auto auto;
		justify-self: left;
	}
	.dmd-radio:not([item-horizontal]) .dmd-radio-radio {
		grid-template-rows: auto auto;
		justify-items: center;
	}

	.dmd-radio:focus-within .dmd-radio-radios {
		background-color: var(--color-control-fondo);
		border-color: var(--color-destacado);
		color: var(--color-control-texto);
		transition: all 0.3s ease-in-out;
	}

	.dmd-radio[error] .dmd-radio-radios {
		border: 1px solid var(--color-error);
	}

	.dmd-radio .dmd-radio-error {
		color: var(--color-error);
		font-size: 0.7rem;
		font-weight: 300;
		display: none;
	}
	.dmd-radio[error] .dmd-radio-error {
		display: grid;
	}

	.dmd-radio .dmd-radio-help {
		margin-left: 0.5rem;
		font-size: 0.7rem;
		font-weight: 300;
		display: none;
	}
	.dmd-radio[helper] .dmd-radio-help {
		display: grid;
	}
	.dmd-radio[error] .dmd-radio-help {
		display: none;
	}
	.dmd-radio svg {
		display: none;
		position: absolute;
		top: 0.4rem;
		right: 0.1rem;
		height: 1.1rem;
		width: 1.1rem;
		transform: translateY(-50%) scale(0.9);
		fill: var(--color-error);
	}
	.dmd-radio[error] svg {
		display: grid;
	}
`;

/*
Como Usarlo 
--Importarlo
import { dmdRadio } from "../css/dmdRadio";
---------------------------------------------------
--Cargarlo
${dmdRadio}
---------------------------------------------------
--HTML en el Render ( Tiene que tener el svg INFO )
<div id="cinco" class="dmd-radio" helper radios-horizontal item-horizontal>
	<label class="dmd-radio-titulo">Que color le gusta mas?</label>
	<div class="dmd-radio-radios" tabindex="0">
		<div class="dmd-radio-radio">
			<input class="dmd-radio-check" type="radio" id="Blanco" name="dmd" value="1" checked />
			<label class="dmd-radio-label">Blanco</label>
		</div>
		<div class="divRadio">
			<input class="divInput" type="radio" id="Rojo" name="dmd" value="2" />
			<label class="divLabel">Rojo</label>
		</div>
		<div class="divRadio">
			<input class="divInput" type="radio" id="Verde" name="dmd" value="3" />
			<label class="divLabel">Verde</label>
		</div>
		<div class="divRadio">
			<input class="divInput" type="radio" id="Azul" name="dmd" value="4" />
			<label class="divLabel">Azul</label>
		</div>

		<div class="divRadio">
			<input class="divInput" type="radio" id="Negro" name="dmd" value="5" />
			<label class="divLabel">Negro</label>
		</div>
	</div>
	<label class="dmd-radio-error">Error, debe cargar una opcion</label>
	<label class="dmd-radio-help">Seleccione una opcion</label>
	${SVGS["INFO"]}
</div>
---------------------------------------------------
-- colores usados
	--color-control-texto
	--color-control-fondo
	--color-error
	--color-primario
	--color-destacado
---------------------------------------------------
-- fuente
	--font-bajada-size
*/
