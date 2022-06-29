/** @format */

import { css } from "lit";

export const dmdTitulo = css`
	.dmd-titulo {
		position: relative;
		display: grid;
		grid-template-columns: auto 6fr 1fr;
		padding: 0;
		grid-gap: 0;
		align-items: center;
		height: 100%;
		font-size: 0.9rem;
		background-color: var(--color-primario);
		color: var(--color-control-fondo);
		font-weight: var(--font-bajada-weight);
		border-bottom: 1px solid var(--color-primario-oscuro);
	}
	.dmd-titulo-col-uno {
		justify-self: center;
		align-self: center;
		padding: 0.2rem 0;
	}

	.dmd-titulo-col-dos {
		display: grid;
		justify-self: center;
		text-align: center;
	}
	:host([media-size="large"]) .dmd-titulo-col-dos {
		grid-auto-flow: column;
		grid-gap: 0.5rem;
		justify-self: flex-end;
	}
	:host([media-size="large"]) .dmd-titulo-label-movil {
		display: none;
	}
	.dmd-titulo-label-pc {
		padding: 0.3rem 0.6rem;
		border-radius: 0.6rem;
		cursor: pointer;
	}
	.dmd-titulo-label-pc:hover {
		color: var(--color-negro);
		font-style: italic;
		background-color: var(--color-destacado);
	}

	:host(:not([media-size="large"])) .dmd-titulo-label-pc {
		display: none;
	}
	.dmd-titulo-col-tres {
		justify-self: right;
		padding-right: 0.5rem;
	}

	.dmd-titulo-col-uno svg {
		min-width: 2.5rem;
		min-height: 2.5rem;
		max-width: 2.6rem;
		max-height: 2.6rem;
		padding-left: 0.5rem;
	}

	.dmd-titulo-col-tres svg {
		height: 1.5rem;
		width: 1.5rem;
		fill: var(--color-control-fondo);
		cursor: pointer;
	}
`;
/*
	Como Usarlo 
	--Importarlo
	import { dmdTitulo } from "../css/dmdTitulo";
	---------------------------------------------------
	--Cargarlo
	${dmdTitulo}
	---------------------------------------------------
	--HTML en el Render  
	<div class="dmd-titulo">
		<div class="dmd-titulo-col-uno"><img src="https://www.uocra.net/dmdLayout/image/dimodo.png" style="max-width: 3rem;" /></div>
		<div class="dmd-titulo-col-dos">
			<lable class="dmd-titulo-label-movil">FUNDACION UOCRA</lable>
			<lable class="dmd-titulo-label-pc">CURSOS</lable>
			<lable class="dmd-titulo-label-pc">ALUMNOS</lable>
			<lable class="dmd-titulo-label-pc">PREFESORES</lable>
			<lable class="dmd-titulo-label-pc">CONFIGURACION</lable>
		</div>
		<div class="dmd-titulo-col-tres">${SVGS["MENU"]}</div>
	</div>
	---------------------------------------------------
	-- colores usados
	--color-destacado
	--color-control-fondo
	--color-negro
	---------------------------------------------------
	-- fuente
		--font-bajada-size
*/
