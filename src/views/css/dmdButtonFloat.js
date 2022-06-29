import { css } from "lit";

export const dmdButtonFloat = css`
	.dmd-button-float {
		position: absolute;
		display: grid;
		right: 1rem;
		bottom: 1rem;
		height: 2.4rem;
		width: 2.4rem;
		background-color: var(--color-primario);
		border-radius: 50%;
		border: 0;
		align-items: center;
		justify-content: center;
		box-shadow: 8px 8px 16px -10px var(--color-control-texto);
		cursor: pointer;
		z-index: 20;
		-webkit-tap-highlight-color: transparent;
		transition-duration: 0.5s;
	}
	.dmd-button-float:active {
		transform: scale(1.2);
	}
	.dmd-button-float button:hover {
		opacity: 1;
		transition: opacity 2s ease-out;
	}
	.dmd-button-float svg {
		display: flex;
		fill: var(--color-control-fondo);
		fill-opacity: 0.8;
		height: 1.6rem;
		width: 1.6rem;
		transition-duration: 0.5s;
	}
	.dmd-button-float:active svg {
		transform: scale(0.6);
	}
`;
/*
	Como Usarlo 
	--Importarlo
	import { dmdButtonFloat } from "../css/dmdButtonFloat";
	---------------------------------------------------
	--Cargarlo
	${dmdButtonFloat}
	---------------------------------------------------
	--Atributos
	--HTML en el Render  
	<button id="b1" class="dmd-button-float" @click="${this.sacar}">${SVGS["TRASH"]}</button>
	---------------------------------------------------
	-- colores usados
		--color-primario
		--color-destacado
	---------------------------------------------------
	-- fuente
*/
