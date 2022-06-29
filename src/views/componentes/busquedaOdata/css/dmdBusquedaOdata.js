import { css } from "lit";

export const dmdBusquedaOdata = css`
	.dmd-busqueda-odata {
		position: relative;
		display: grid;
		align-content: flex-start;
		background-color: var(--color-fondo);
		grid-auto-flow: row;
		overflow: hidden;
	}
	.dmd-busqueda-odata-cabecera {
		display: grid;
		position: relative;
		grid-template-columns: 1fr auto;
		align-items: center;
		padding: 0.2rem 0.2rem 0.2rem 0.6rem;
		grid-gap: 0.3rem;
	}
	.dmd-busqueda-odata-cabecera div {
		width: fit-content;
		height: fit-content;
		display: grid;
	}
	.dmd-busqueda-odata-input {
		display: grid;
		position: relative;
		grid-template-columns: 1fr auto;
		grid-gap: 0.8rem;
		padding: 1rem 1.6rem 1.6rem 2rem;
	}
	.dmd-busqueda-odata-input-searchoff {
		display: grid;
		position: relative;
		margin-top: 1.05rem;
		width: 2.1rem;
		height: 2.05rem;
		border: 1px solid var(--color-primario-oscuro);
		border-radius: 0.5rem;
		align-items: center;
		justify-items: center;
	}
	.dmd-busqueda-odata-input-searchoff svg {
		fill: var(--color-negro);
		width: 1.5rem;
		height: 1.5rem;
		cursor: pointer;
	}
	.dmd-busqueda-odata-datos {
		display: grid;
		position: relative;
		grid-template-rows: max-content;
		align-content: flex-start;
		grid-gap: 0;
		overflow-x: auto;
		overflow-y: auto;
	}
	.dmd-busqueda-odata-datos-titulos,
	.dmd-busqueda-odata-datos-registros {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		min-width: max-content;
	}
	.dmd-busqueda-odata-datos-titulos {
		position: sticky;
		top: 0;
		z-index: 1;
		align-items: center;
		height: 2rem;
	}
	.dmd-busqueda-odata-datos-registros {
		display: grid;
		position: relative;
		height: max-content;
		overflow: hidden;
		padding: 0.4rem 0;
	}
	.dmd-busqueda-odata-datos-titulo {
		display: grid;
		position: relative;
		padding: 0rem 1rem;
		text-align: center;
		height: 100%;
		align-items: center;
	}
	.dmd-busqueda-odata-datos-registro {
		display: grid;
		height: 1.6rem;
		padding: 0rem 1rem;
		align-items: center;
		white-space: nowrap;
	}
	.dmd-busqueda-odata-datos-boton-top {
		display: grid;
		width: 100%;
		height: 1.6rem;
		background-color: red;
		padding: 0rem 1rem;
		align-items: center;
	}
	.dmd-busqueda-odata-datos-titulo[orden]:after,
	.dmd-busqueda-odata-datos-titulo[ascendente]:after {
		content: "";
		position: absolute;
		height: 0;
		width: 0;
		top: 0.1rem;
		right: 0;
		border-width: 0.4rem;
		border-style: solid;
		border-color: transparent;
		margin-right: 0.1rem;
		margin-left: 0.5rem;
		border-bottom-color: var(--color-fondo-oscuro);
	}
	.dmd-busqueda-odata-datos-titulo[orden]:before,
	.dmd-busqueda-odata-datos-titulo[descendente]:before {
		content: "";
		position: absolute;
		height: 0;
		width: 0;
		bottom: 0.1rem;
		right: 0;
		border-width: 0.4rem;
		border-style: solid;
		border-color: transparent;
		margin-right: 0.1rem;
		margin-left: 0.5rem;
		border-top-color: var(--color-fondo-oscuro);
	}
	.dmd-busqueda-odata-datos-titulo[ascendente]:after {
		margin-top: 0.3rem;
	}
	.dmd-busqueda-odata-datos-titulo[descendente]:before {
		margin-bottom: 0.3rem;
	}
`;
