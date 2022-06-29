import { css } from "lit";

export const dmdTableThemeNormal = css`
	*[hidden] {
		display: none;
	}
	.dmd-table {
		border: 1px solid var(--color-fondo);
		user-select: none; /* Chrome */
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
	}
	.dmd-table-cabecera {
		background: linear-gradient(180deg, var(--color-primario) 50%, hsl(var(--primario1), var(--primario2), calc(var(--primario3) + 15%)) 100%);
		color: var(--color-fondo);
		font-size: 0.8rem;
		-webkit-box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.27);
		box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.27);
		z-index: 3;
	}
	.dmd-table-cabecera svg {
		fill: var(--color-fondo);
		width: 1.8rem;
		height: 1.8rem;
	}
	.dmd-table-cuerpo[anchocero] {
		grid-template-columns: 0 1fr;
	}
	.dmd-table-cuerpo[anchocero] .dmd-table-menu {
		visibility: hidden;
	}

	.dmd-table-menu {
		background-color: var(--color-fondo-claro);
		border-right: 1px solid var(--color-fondo);
		color: var(--color-fondo-oscuro);
		width: 100%;
		font-size: 0.8rem;
		-webkit-box-shadow: 6px 0px 19px -4px rgba(0, 0, 0, 0.1);
		box-shadow: 6px 0px 19px -4px rgba(0, 0, 0, 0.1);
		z-index: 2;
	}
	.dmd-table-menu svg {
		fill: var(--color-fondo-oscuro);
		width: 1.5rem;
	}
	.dmd-table-menu div:hover {
		background-color: var(--color-primario-claro);
		color: var(--color-primario-oscuro);
	}
	.dmd-table-menu div:hover svg {
		fill: var(--color-primario-oscuro);
	}
	.dmd-table-datos {
		background-color: var(--color-fondo-claro);
	}
	.dmd-table-datos-titulos {
		background: linear-gradient(180deg, hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) + 10%)) 20%, hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 5%)) 100%);
		color: var(--color-fondo-oscuro);
	}
	.dmd-table-datos-titulo {
		font-size: 1rem;
	}
	.dmd-table-datos-titulo[dmd-table-orden],
	.dmd-table-datos-titulo[dmd-table-orden] label,
	.dmd-table-datos-titulo[dmd-table-orden-ascendente],
	.dmd-table-datos-titulo[dmd-table-orden-ascendente] label,
	.dmd-table-datos-titulo[dmd-table-orden-descendente],
	.dmd-table-datos-titulo[dmd-table-orden-descendente] label {
		cursor: pointer;
	}
	.dmd-table-datos-titulo[dmd-table-orden-ascendente],
	.dmd-table-datos-titulo[dmd-table-orden-ascendente] label,
	.dmd-table-datos-titulo[dmd-table-orden-descendente],
	.dmd-table-datos-titulo[dmd-table-orden-descendente] label {
		background: linear-gradient(180deg, hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 10%)) 20%, hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) + 5%)) 100%);
		color: hsl(var(--fondo-oscuro1), var(--fondo-oscuro2), calc(var(--fondo-oscuro3) - 20%));
	}

	.dmd-table-datos-registros {
		background-color: var(--color-fondo-claro);
		color: var(--color-fondo-oscuro);
		border-top: 1px solid var(--color-fondo);
		border-bottom: 1px solid var(--color-fondo);
		font-size: 0.9rem;
	}
	.dmd-table-datos-registros[seleccionado] {
		background: linear-gradient(180deg, hsl(var(--primario-claro1), var(--primario-claro2), calc(var(--primario-claro3) + 2%)) 20%, hsl(var(--primario-claro1), var(--primario-claro2), calc(var(--primario-claro3) + 20%)) 100%);
		color: var(--color-negro);
		border-top: 1px solid var(--color-primario-claro);
		border-bottom: 1px solid var(--color-primario-claro);
	}
	.dmd-table-datos-registros:hover {
		border-top: 1px solid var(--color-primario-claro);
		border-bottom: 1px solid var(--color-primario-claro);
		color: var(--color-negro);
	}
	.dmd-table-cabecera-find {
		display: grid;
		position: absolute;
		width: 55%;
		grid-template-columns: 1fr auto auto;
		grid-gap: 0.8rem;
		right: 0.3rem;
		justify-content: right;
		background-color: transparent;
	}
	.dmd-table-cabecera-find svg {
		background-color: transparent;
		border-radius: 0.4rem;
		width: 1.6rem;
		height: 1.6rem;
	}
	.dmd-table-cabecera-find input {
		width: 95%;
		border: 1px solid var(--color-fondo);
		border-radius: 0.4rem;
		font-size: 1rem;
		text-decoration: none;
		justify-self: right;
	}
	.dmd-table-cabecera-find-buscar {
		justify-self: right;
	}
	.dmd-table-formulario {
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
	.dmd-table-pie {
		background-color: var(--color-primario);
		color: var(--color-fondo);
		font-size: 0.8rem;
	}
	.dmd-table-pie select {
		background: var(--color-primario-oscuro);
		border-color: var(--color-primario-claro);
		border-radius: 0.3rem;
		height: 1.5rem;
		font-size: 1rem;
		color: var(--color-control-fondo);
		text-align: center;
	}
	.dmd-table-pie svg {
		fill: var(--color-control-fondo);
	}
	.dmd-table-pie-filas {
		padding: 0rem 1rem;
	}
`;
