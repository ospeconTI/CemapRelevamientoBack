import { css } from "lit";

export const dmdGridCardThemeNormal = css`
	*[hidden] {
		display: none;
	}
	.dmd-grid-card {
		border: 1px solid var(--color-fondo);
		user-select: none; /* Chrome */
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
	}
	.dmd-grid-card-cabecera {
		background: linear-gradient(180deg, var(--color-primario) 50%, hsl(var(--primario1), var(--primario2), calc(var(--primario3) + 15%)) 100%);
		color: var(--color-fondo);
		font-size: 0.8rem;
		-webkit-box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.27);
		box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.27);
		z-index: 3;
	}
	.dmd-grid-card-cabecera svg {
		fill: var(--color-fondo);
		width: 1.8rem;
		height: 1.8rem;
	}
	.dmd-grid-card-cuerpo[anchocero] {
		grid-template-columns: 0 1fr;
	}
	.dmd-grid-card-cuerpo[anchocero] .dmd-grid-card-menu {
		visibility: hidden;
	}

	.dmd-grid-card-menu {
		background-color: var(--color-fondo-claro);
		border-right: 1px solid var(--color-fondo);
		color: var(--color-fondo-oscuro);
		width: 100%;
		font-size: 0.8rem;
		-webkit-box-shadow: 6px 0px 19px -4px rgba(0, 0, 0, 0.1);
		box-shadow: 6px 0px 19px -4px rgba(0, 0, 0, 0.1);
		z-index: 2;
	}
	.dmd-grid-card-menu svg {
		fill: var(--color-fondo-oscuro);
		width: 1.5rem;
	}
	.dmd-grid-card-menu div:hover {
		background-color: var(--color-primario-claro);
		color: var(--color-primario-oscuro);
	}
	.dmd-grid-card-menu div:hover svg {
		fill: var(--color-primario-oscuro);
	}
	.dmd-grid-card-datos {
		background-color: var(--color-fondo-claro);
		grid-gap: 0.5rem;
	}
	.dmd-grid-card-datos-registros {
		-webkit-box-shadow: 10px 1px 11px 1px rgba(0, 0, 0, 0.27);
		box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.2);
		background-color: var(--color-fondo-claro);
		color: var(--color-fondo-oscuro);
		border-top: 1px solid var(--color-fondo);
		border: 1px solid var(--color-fondo);
		font-size: 0.9rem;
	}
	.dmd-grid-card-datos-registros[seleccionado] {
		background: linear-gradient(180deg, hsl(var(--primario-claro1), var(--primario-claro2), calc(var(--primario-claro3) + 2%)) 20%, hsl(var(--primario-claro1), var(--primario-claro2), calc(var(--primario-claro3) + 20%)) 100%) !important;
		color: var(--color-negro);
		border-top: 1px solid var(--color-primario-claro);
		border-bottom: 1px solid var(--color-primario-claro);
	}
	.dmd-grid-card-datos-registros:hover {
		background: linear-gradient(180deg, hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) + 2%)) 20%, hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) + 20%)) 100%);
		border: 1px solid var(--color-primario-claro);
		color: var(--color-negro);
	}
	.dmd-grid-card-cabecera-find {
		display: grid;
		position: absolute;
		width: 50%;
		grid-template-columns: 1fr auto auto auto;
		grid-gap: 0.3rem;
		right: 0.3rem;
		justify-content: right;
		background-color: transparent;
	}
	.dmd-grid-card-cabecera-find svg {
		background-color: transparent;
		border-radius: 0.4rem;
		width: 1.6rem;
		height: 1.6rem;
	}
	.dmd-grid-card-cabecera-find input {
		width: 95%;
		border: 1px solid var(--color-fondo);
		border-radius: 0.4rem;
		font-size: 1rem;
		text-decoration: none;
		justify-self: right;
	}
	.dmd-grid-card-cabecera-find-sort,
	.dmd-grid-card-cabecera-find-buscar {
		justify-self: right;
	}
	.dmd-grid-card-cabecera-find-sort-menu {
		background-color: var(--color-fondo);
		color: var(--color-fondo-oscuro);
		border: var(--color-fondo-oscuro);
		font-size: 0.9rem;
		-webkit-box-shadow: 10px 1px 11px 1px rgba(0, 0, 0, 0.27);
		box-shadow: 0px 3px 3px 1px rgba(0, 0, 0, 0.2);
	}
	.dmd-grid-card-cabecera-find-sort-menu-item:hover {
		background: linear-gradient(180deg, var(--color-primario-claro) 50%, hsl(var(--primario1), var(--primario2), calc(var(--primario3) + 15%)) 100%);
		color: var(--color-negro);
		cursor: pointer;
	}

	.dmd-grid-card-formulario {
		display: grid;
		position: relative;
		padding: 1.5rem 2rem;
		margin-top: 2rem;
		grid-gap: 0.4rem;
		background-color: var(--color-fondo-claro);
		border-radius: 0.4rem;
		overflow: auto;
		height: fit-content;
		width: fit-content;
		-webkit-box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.27);
		box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.27);
	}
`;
