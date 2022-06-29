/** @format */

import { css } from "lit";

export const dmdCheckbox = css`
	.dmd-checkbox {
		display: grid;
		position: relative;
		grid-template-rows: 1fr auto 1fr;
		grid-gap: 0rem;
	}
	.dmd-checkbox .dmd-checkbox-titulo {
		color: var(--color-control-texto);
		font-size: 0.9rem;
		font-weight: 500;
		padding-left: 0.6rem;
		align-self: center;
		transition: all 0.3s ease-in-out;
	}
	.dmd-checkbox:focus-within .dmd-checkbox-titulo {
		color: var(--color-primario);
		font-weight: 900;
		transition: all 0.3s ease-in-out;
	}

	.dmd-checkbox .dmd-checkbox-checkbox {
		display: grid;
		background-color: var(--color-control-fondo);
		border: 1px solid var(--color-primario);
		color: var(--color-control-texto);
		font-size: 0.7rem;
		font-weight: var(--font-bajada-weight);
		outline: none;
		border-radius: 0.4rem;
		column-gap: 0.5rem;
		padding-left: 0.5rem;
		height: 2.1rem;
		transition: all 0.3s ease-in-out;
	}
	.dmd-checkbox .dmd-checkbox-check {
		padding: 0 !important;
		margin: 0.1rem 0;
	}

	.dmd-checkbox:focus-within .dmd-checkbox-checkbox {
		background-color: var(--color-control-fondo);
		border-color: var(--color-destacado);
		color: var(--color-control-texto);
		transition: all 0.3s ease-in-out;
	}

	.dmd-checkbox[error] .dmd-checkbox-checkbox {
		border: 1px solid var(--color-error);
	}

	.dmd-checkbox[horizontal] .dmd-checkbox-checkbox {
		grid-template-columns: auto auto;
		justify-content: left;
		align-items: center;
	}

	.dmd-checkbox .dmd-checkbox-error {
		color: var(--color-error);
		font-size: 0.7rem;
		font-weight: 300;
		display: none;
	}
	.dmd-checkbox[error] .dmd-checkbox-error {
		display: grid;
	}
	.dmd-checkbox .dmd-checkbox-help {
		margin-left: 0.5rem;
		font-size: 0.7rem;
		font-weight: 300;
		display: none;
	}
	.dmd-checkbox[helper] .dmd-checkbox-help {
		display: grid;
	}
	.dmd-checkbox[error] .dmd-checkbox-help {
		display: none;
	}
	.dmd-checkbox svg {
		display: none;
		position: absolute;
		top: 0.4rem;
		right: 0.1rem;
		height: 1.1rem;
		width: 1.1rem;
		transform: translateY(-50%) scale(0.9);
		fill: var(--color-error);
	}
	.dmd-checkbox[error] svg {
		display: grid;
	}
`;

/*
Como Usarlo 
--Importarlo
import { dmdCheckbox } from "../css/dmdCheckbox";
---------------------------------------------------
--Cargarlo
${dmdCheckbox}
---------------------------------------------------
--HTML 
<div class="dmd-checkbox" id="check" vertical>
	<label class="dmd-checkbox-titulo">Recordar mis datos?</label>
	<div class="dmd-checkbox-checkbox" tabindex="0">
		<label class="dmd-checkbox-label">Seleccione para recordar</label>
		<input class="dmd-checkbox-check" type="checkbox" checked />
	</div>
	<label class="dmd-checkbox-error">Debe chequear esta casilla para continuar</label>
	<label class="dmd-checkbox-help">Es obligatorio leerlo</label>
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

*/
