import { css } from "lit";

export const dmdBusquedaOdataThemeNormal = css`
	.dmd-busqueda-odata {
		border: 1px solid var(--color-fondo-oscuro);
		border-radius: 0.3rem;
		user-select: none; /* Chrome */
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-webkit-box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.27);
		box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.27);
	}
	.dmd-busqueda-odata-cabecera {
		background: linear-gradient(180deg, var(--color-primario) 50%, hsl(var(--primario1), var(--primario2), calc(var(--primario3) + 15%)) 100%);
		color: var(--color-fondo);
		font-size: 0.8rem;
		-webkit-box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.27);
		box-shadow: 1px 1px 11px 1px rgba(0, 0, 0, 0.27);
		z-index: 3;
	}
	.dmd-busqueda-odata-cabecera-cerrar svg {
		fill: var(--color-fondo);
		width: 1.2rem;
		height: 1.2rem;
		cursor: pointer;
	}
	.dmd-busqueda-odata-datos {
		background-color: var(--color-fondo-claro);
	}
	.dmd-busqueda-odata-datos-titulos {
		background-color: var(--color-fondo);
		background: linear-gradient(180deg, hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) + 10%)) 20%, hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 5%)) 100%);
		color: var(--color-fondo-oscuro);
		font-size: 0.9rem;
	}
	.dmd-busqueda-odata-datos-titulo,
	.dmd-busqueda-odata-datos-titulo label {
		cursor: pointer;
	}
	.dmd-busqueda-odata-datos-titulo[ascendente],
	.dmd-busqueda-odata-datos-titulo[ascendente] label,
	.dmd-busqueda-odata-datos-titulo[descendente],
	.dmd-busqueda-odata-datos-titulo[descendente] label {
		background: linear-gradient(180deg, hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) - 10%)) 20%, hsl(var(--fondo1), var(--fondo2), calc(var(--fondo3) + 5%)) 100%);
		color: hsl(var(--fondo-oscuro1), var(--fondo-oscuro2), calc(var(--fondo-oscuro3) - 20%));
	}

	.dmd-busqueda-odata-datos-registros {
		background-color: var(--color-fondo-claro);
		color: var(--color-fondo-oscuro);
		border-top: 1px solid var(--color-fondo);
		border-bottom: 1px solid var(--color-fondo);
		font-size: 0.9rem;
	}
	.dmd-busqueda-odata-datos-registros[seleccionado] {
		background-color: var(--color-primario-claro);
		background: linear-gradient(180deg, hsl(var(--primario-claro1), var(--primario-claro2), calc(var(--primario-claro3) + 2%)) 20%, hsl(var(--primario-claro1), var(--primario-claro2), calc(var(--primario-claro3) + 20%)) 100%);
		color: var(--color-negro);
		border-top: 1px solid var(--color-primario-claro);
		border-bottom: 1px solid var(--color-primario-claro);
	}
	.dmd-busqueda-odata-datos-registros:hover {
		border-top: 1px solid var(--color-primario-claro);
		border-bottom: 1px solid var(--color-primario-claro);
		color: var(--color-negro);
	}
`;
