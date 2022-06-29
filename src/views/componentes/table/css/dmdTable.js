import { css } from "lit";

export const dmdTable = css`
	.dmd-table {
		display: grid;
		position: relative;
		width: 100%;
		height: 10rem;
		grid-template-rows: 3rem auto 2.2rem;
		overflow: hidden;
	}
	.dmd-table-velo {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		justify-content: center;
		align-items: center;
		z-index: 20;
	}
	.dmd-table-cabecera {
		display: grid;
		position: relative;
		grid-template-columns: 2rem auto;
		align-items: center;
		padding-left: 0.4rem;
		grid-gap: 0.3rem;
	}
	.dmd-table-cabecera svg:hover {
		cursor: pointer;
	}
	.dmd-table-cuerpo {
		display: grid;
		position: relative;
		width: 100%;
		height: 100%;
		grid-template-columns: max-content 1fr;
		overflow: hidden;
	}
	.dmd-table-menu {
		display: grid;
		position: relative;
		grid-auto-flow: row;
		overflow-x: hidden;
		overflow-y: auto;
		align-content: flex-start;
		justify-content: left;
		padding: 0.2rem;
		grid-gap: 0rem;
	}
	.dmd-table-menu div {
		display: grid;
		grid-auto-flow: column;
		height: auto;
		align-items: center;
		justify-content: left;
		border-radius: 0.3rem;
		padding: 0.2rem 0.4rem;
		grid-gap: 0.2rem;
	}
	.dmd-table-menu svg:hover {
		cursor: pointer;
	}
	.dmd-table-menu div label {
		display: grid;
	}
	.dmd-table-datos {
		display: grid;
		position: relative;
		grid-template-rows: max-content;
		align-content: flex-start;
		grid-gap: 0;
		overflow-x: auto;
		overflow-y: auto;
	}
	.dmd-table-datos-titulos,
	.dmd-table-datos-registros {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr repeat(2, 2.5fr);
		min-width: max-content;
	}
	.dmd-table-datos-titulos {
		position: sticky;
		top: 0;
		z-index: 1;
		align-items: center;
		height: 2rem;
	}
	.dmd-table-datos-registros {
		display: grid;
		position: relative;
		height: max-content;
		overflow: hidden;
		padding: 0.4rem 0;
	}
	.dmd-table-datos-titulo {
		display: grid;
		position: relative;
		padding: 0rem 1rem;
		text-align: center;
		height: 100%;
		align-items: center;
	}
	.dmd-table-datos-titulo[dmd-table-orden]:after,
	.dmd-table-datos-titulo[dmd-table-orden-ascendente]:after {
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
	.dmd-table-datos-titulo[dmd-table-orden]:before,
	.dmd-table-datos-titulo[dmd-table-orden-descendente]:before {
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
	.dmd-table-datos-titulo[dmd-table-orden-ascendente]:after {
		margin-top: 0.3rem;
	}
	.dmd-table-datos-titulo[dmd-table-orden-descendente]:before {
		margin-bottom: 0.3rem;
	}
	.dmd-table-datos-registro {
		padding: 0rem 1rem;
	}
	.dmd-table-pie {
		display: grid;
		position: relative;
		grid-template-columns: min-content min-content max-content repeat(4, 1.4rem);
		align-items: center;
		justify-content: right;
		padding-left: 0.4rem;
		grid-gap: 0.3rem;
		text-align: right;
	}
	.dmd-table-pie svg {
		width: 1.4rem;
		height: 1.4rem;
		padding-left: 0.1rem;
	}
`;
