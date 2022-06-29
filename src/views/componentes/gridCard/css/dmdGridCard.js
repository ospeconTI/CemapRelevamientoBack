import { css } from "lit";

export const dmdGridCard = css`
	.dmd-grid-card {
		display: grid;
		position: relative;
		width: 100%;
		height: 10rem;
		grid-template-rows: 3rem auto;
		overflow: hidden;
	}
	.dmd-grid-card-velo {
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
	.dmd-grid-card-cabecera {
		display: grid;
		position: relative;
		grid-template-columns: 2rem auto;
		align-items: center;
		padding-left: 0.4rem;
		grid-gap: 0.3rem;
	}
	.dmd-grid-card-cabecera svg:hover {
		cursor: pointer;
	}
	.dmd-grid-card-cabecera-find-sort-menu {
		display: none;
		position: absolute;
		width: max-content;
		top: 2.5rem;
		right: 0rem;
		grid-auto-flow: row;
		grid-gap: 0rem;
		padding: 0rem 0rem;
		border-radius: 4px;
	}
	.dmd-grid-card-cabecera-find-sort-menu-item {
		position: relative;
		display: grid;
		height: 1.5rem;
		padding: 0.2rem 1.2rem;
		align-items: center;
	}
	.dmd-grid-card-cabecera-find-sort-menu-item[orden]:after,
	.dmd-grid-card-cabecera-find-sort-menu-item[ascendente]:after {
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
	.dmd-grid-card-cabecera-find-sort-menu-item[orden]:before,
	.dmd-grid-card-cabecera-find-sort-menu-item[descendente]:before {
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
	.dmd-grid-card-cabecera-find-sort-menu-item[ascendente]:after {
		margin-top: 0.3rem;
	}
	.dmd-grid-card-cabecera-find-sort-menu-item[descendente]:before {
		margin-bottom: 0.3rem;
	}

	.dmd-grid-card-cuerpo {
		display: grid;
		position: relative;
		width: 100%;
		height: 100%;
		grid-template-columns: max-content 1fr;
		overflow: hidden;
	}
	.dmd-grid-card-menu {
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
	.dmd-grid-card-menu div {
		display: grid;
		grid-auto-flow: column;
		height: auto;
		align-items: center;
		justify-content: left;
		border-radius: 0.3rem;
		padding: 0.2rem 0.4rem;
		grid-gap: 0.2rem;
	}
	.dmd-grid-card-menu svg:hover {
		cursor: pointer;
	}
	.dmd-grid-card-menu div label {
		display: grid;
	}
	:host([media-size="small"]) .dmd-table-card-datos {
		grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
	}
	.dmd-grid-card-datos {
		display: grid;
		position: relative;
		grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
		grid-auto-rows: 5rem;
		align-content: flex-start;
		grid-gap: 0;
		overflow-x: hidden;
		overflow-y: auto;
		padding: 1rem;
	}
	.dmd-grid-card-datos-registros {
		display: grid;
		position: relative;
		grid-template-rows: repeat(3, 2fr);
		overflow: hidden;
		padding: 0.4rem 0rem;
	}
	.dmd-grid-card-datos-registro {
		padding: 0rem 1rem;
		white-space: nowrap;
	}
`;
