/** @format */

import { css } from "lit";

export const dmdButton = css`
	.dmd-button {
		display: grid;
		align-items: center;
		cursor: pointer;
		width: fit-content;
		border: none;
		outline: none;
		padding: 0.5rem 1rem;
		transition-duration: 0.3s;
		font: inherit;
	}
	.dmd-button div {
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 0.3rem;
		font-size: var(--font-bajada-size);
		font-weight: var(--font-bajada-weight);
	}
	.dmd-button[sombra] {
		box-shadow: 0 3px 6px 0 var(--color-primario);
	}
	.dmd-button[bordeRedondo] {
		border-radius: 0.4rem;
	}
	.dmd-button label {
		align-self: center;
		transition-duration: 0.3s;
	}
	.dmd-button svg {
		width: var(--font-bajada-size);
		height: var(--font-bajada-size);
		align-self: center;
		transition-duration: 0.3s;
	}
	/* ------ Boton normal ------ */
	.dmd-button[normal] {
		background-color: var(--color-primario);
		color: var(--color-destacado);
	}
	.dmd-button[normal]:hover {
		background-color: var(--color-destacado);
		color: var(--color-primario);
	}
	.dmd-button[normal]:active {
		background-color: var(--color-destacado);
		transform: scale(1.2);
	}
	.dmd-button[normal][apagado] {
		opacity: 0.8;
		background-color: var(--color-watermarck);
		cursor: not-allowed;
		pointer-events: none;
	}
	.dmd-button[normal] svg {
		fill: var(--color-destacado);
	}
	.dmd-button[normal]:hover svg {
		fill: var(--color-primario);
	}

	/* ------ Boton soloTexto ------ */
	.dmd-button[soloTexto] {
		background-color: transparent;
		color: var(--color-primario);
	}
	.dmd-button[soloTexto]:hover {
		color: var(--color-destacado);
	}
	.dmd-button[soloTexto]:active {
		color: var(--color-primario);
		transform: scale(1.2);
	}
	.dmd-button[soloTexto][apagado] {
		opacity: 0.8;
		color: var(--color-watermarck);
		cursor: not-allowed;
		pointer-events: none;
	}
	.dmd-button[soloTexto] svg {
		fill: var(--color-primario);
	}
	.dmd-button[soloTexto]:hover svg {
		fill: var(--color-destacado);
	}
	/* ------ Boton conBorde ------ */
	.dmd-button[conBorde] {
		color: var(--color-primario);
		background-color: transparent;
		border: 1px solid var(--color-primario);
	}
	.dmd-button[conBorde]:hover {
		background-color: var(--color-destacado);
	}
	.dmd-button[conBorde]:active {
		background-color: transparent;
		transform: scale(1.2);
	}
	.dmd-button[conBorde][apagado] {
		opacity: 0.8;
		background-color: var(--color-watermarck);
		cursor: not-allowed;
		pointer-events: none;
	}
	.dmd-button[conBorde] svg {
		fill: var(--color-primario);
	}
	.dmd-button[disabled] {
		border: 1px solid hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 6%));
		background-color: hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 6%));
		color: hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 20%));
	}
	.dmd-button[disabled]:active {
		transform: scale(1);
	}
	.dmd-button[disabled]:hover {
		background-color: hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 6%));
		color: hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 20%));
	}
`;

/*
	Como Usarlo 
	--Importarlo
	import { dmdButton } from "../css/dmdButton";
	---------------------------------------------------
	--Cargarlo
	${dmdButton}
	---------------------------------------------------
	--Atributos
	sombra: Agregfa sombra a los botones.
	bordeRedondo: Redondea los bordes
	--HTML en el Render  
	<button normal sombra bordeRedondo @click="${this.poner}">Mostrar Error</button>
	<button soloTexto @click="${this.sacar}">Sacar Error</button>
	<button conBorde bordeRedondo @click="${this.poner}">Presionar</button>
	---------------------------------------------------
	-- colores usados
		--color-primario
		--color-destacado
	---------------------------------------------------
	-- fuente
		--font-bajada-size
*/
