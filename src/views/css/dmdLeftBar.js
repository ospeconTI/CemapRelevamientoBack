/** @format */

import { css } from "lit";

export const dmdLeftBar = css`
	.dmd-left-bar {
		position: fixed;
		display: grid;
		top: 0;
		right: 0;
		width: 60vw;
		grid-auto-flow: row;
		padding: 0;
		grid-gap: 0;
		align-items: flex-start;
		height: 100%;
		font-size: 0.9rem;
		color: var(--color-control-fondo);
		font-weight: var(--font-bajada-weight);
		background-color: var(--color-primario);
		align-content: flex-start;
		border-left: 1px solid var(--color-watermarck);
		border-top-left-radius: 0.8rem;
		z-index: 1001;
		transition-duration: 1s;
	}
	.dmd-left-bar-titulo {
		position: relative;
		display: grid;
		grid-template-columns: 1fr auto;
		height: 1rem;
		width: 100%;
		padding: 0rem;
		padding-top: 0.6rem;
		padding-bottom: 0.4rem;
		border-bottom: 1px solid var(--color-watermarck);
	}
	.dmd-left-bar-titulo-label {
		position: relative;
		font-size: 0.6rem;
		color: var(--color-control-fondo);
		padding-left: 0.5rem;
		align-self: center;
	}
	.dmd-left-bar-titulo svg {
		position: relative;
		margin-right: 0.2rem;
		fill: var(--color-blanco);
		height: 1rem;
		height: 1rem;
	}
	.dmd-left-bar-opciones {
		display: grid;
		grid-auto-flow: row;
		height: 1.2rem;
		width: 100%;
		padding-top: 0.8rem;
		grid-gap: 0.1rem;
	}
	.dmd-left-bar-opcion {
		font-size: 1rem;
		color: var(--color-control-fondo);
		cursor: pointer;
		padding: 0.3rem 0.2rem;
		border-radius: 0.4rem;
		height: 1.5rem;
		overflow-y: hidden;
		white-space: nowrap;
		padding-left: 1rem;
		padding-right: 0.5rem;
	}
	.dmd-left-bar-opcion:hover {
		background-color: var(--color-destacado);
		color: var(--color-primario);
	}
	/*---- check  ----*/
	.dmd-left-bar-check {
		width: 0;
		height: 0;
		visibility: hidden;
		position: absolute;
	}
	.dmd-left-bar-check:not(:checked) ~ .dmd-left-bar {
		width: 0;
		transition-duration: 1s;
	}
	.dmd-left-bar-check:not(:checked) ~ .dmd-left-bar > .dmd-left-bar-velo {
		width: 0;
		transition-duration: 1s;
	}
	/*----  Velo  ----*/
	.dmd-left-bar-velo {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 40vw;
		height: 100vh;
		background-color: #c0c0c0;
		opacity: 0.3;
		z-index: 98;
		transition-duration: 1s;
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
	<input id="leftBarCheck" class="dmd-left-bar-check" type="checkbox" checked />
	<div class="dmd-left-bar" tabindex="0">
		<div class="dmd-left-bar-velo" tabindex="0" @click=${this.ocultarLeftMenu}></div>
		<div class="dmd-left-bar-titulo">
			<label class="dmd-left-bar-titulo-label">Daniel@gmail.com</label>
			<div @click=${this.ocultarLeftMenu}>${SVGS["BACK"]}</div>
		</div>
		<div class="dmd-left-bar-opciones">
			<div class="dmd-left-bar-opcion">Opcion uno</div>
			<div class="dmd-left-bar-opcion">Opcion dos</div>
			<div class="dmd-left-bar-opcion">Opcion tres</div>
			<div class="dmd-left-bar-opcion">Opcion cuatro</div>
			<div class="dmd-left-bar-opcion">Opcion cinco</div>
		</div>
	</div>
	---------------------------------------------------
	-- colores usados
	--color-destacado
	--color-control-fondo
	--color-negro
	---------------------------------------------------
	-- fuente
		--font-bajada-size
	-- Java Script
	mostrarLeftMenu() {
		let velo = this.shadowRoot.querySelector("#leftBarCheck");
		velo.checked = true;
	}
	ocultarLeftMenu() {
		let velo = this.shadowRoot.querySelector("#leftBarCheck");
		velo.checked = false;
	}

*/
