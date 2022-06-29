import { css } from "lit";

export const dmdToogle = css`
	.dmd-toogle {
		display: grid;
		position: relative;
		grid-template-rows: 1fr auto 1fr;
		grid-gap: 0rem;
		-webkit-tap-highlight-color: transparent;
		outline: none;
	}
	.dmd-toogle .dmd-toogle-titulo {
		color: var(--color-control-texto);
		font-size: 0.9rem;
		font-weight: 500;
		padding-left: 0.6rem;
		align-self: center;
		transition: all 0.3s ease-in-out;
	}
	.dmd-toogle:focus-within .dmd-toogle-titulo {
		color: var(--color-primario);
		font-weight: 900;
		transition: all 0.3s ease-in-out;
	}
	.dmd-toogle .dmd-toogle-borde {
		display: grid;
		background-color: var(--color-control-fondo);
		border: 1px solid var(--color-primario);
		color: var(--color-control-texto);
		font-size: 0.7rem;
		font-weight: var(--font-bajada-weight);
		outline: none;
		border-radius: 0.4rem;
		padding-left: 0.5rem;
		height: 2.1rem;
		align-items: center;
		transition: all 0.3s ease-in-out;
	}
	.dmd-toogle:focus-within .dmd-toogle-borde {
		border-color: var(--color-destacado);
		transition: all 0.3s ease-in-out;
	}
	.dmd-toogle[error] .dmd-toogle-borde {
		border-color: var(--color-destacado);
		transition: all 0.3s ease-in-out;
	}

	.dmd-toogle .dmd-toogle-toogle {
		width: fit-content;
		height: fit-content;
		display: grid;
	}
	.dmd-toogle .dmd-toogle-check[type="checkbox"] {
		width: 0;
		height: 0;
		visibility: hidden;
		position: absolute;
	}
	.dmd-toogle .dmd-toogle-label {
		width: 3.5rem;
		height: 1.5rem;
		display: block;
		background-color: var(--color-watermarck);
		border-radius: 1rem;
		position: relative;
		cursor: pointer;
		transition: 0.5s;
	}
	.dmd-toogle .dmd-toogle-label::after {
		content: "";
		width: 1.2rem;
		height: 1.2rem;
		background-color: var(--color-destacado);
		position: absolute;
		border-radius: 0.7rem;
		top: 0.15rem;
		left: 0.15rem;
		transition: 0.5s;
	}

	.dmd-toogle .dmd-toogle-check:checked + .dmd-toogle-label:after {
		left: calc(100% - 0.2rem);
		transform: translateX(-100%);
		transition: 0.5s;
	}

	.dmd-toogle .dmd-toogle-check:checked + .dmd-toogle-label {
		background-color: var(--color-primario);
	}

	.dmd-toogle .dmd-toogle-label:active:after {
		width: 1.6rem;
	}

	/*  Help y Error  */
	.dmd-toogle .dmd-toogle-error {
		color: var(--color-error);
		font-size: 0.7rem;
		font-weight: 300;
		display: none;
	}
	.dmd-toogle[error] .dmd-toogle-error {
		display: grid;
	}
	.dmd-toogle .dmd-toogle-help {
		margin-left: 0.5rem;
		font-size: 0.7rem;
		font-weight: 300;
		display: none;
	}
	.dmd-toogle[helper] .dmd-toogle-help {
		display: grid;
	}
	.dmd-toogle[error] .dmd-toogle-help {
		display: none;
	}
	.dmd-toogle svg {
		display: none;
		position: absolute;
		top: 0.4rem;
		right: 0.1rem;
		height: 1.1rem;
		width: 1.1rem;
		transform: translateY(-50%) scale(0.9);
		fill: var(--color-error);
	}
	.dmd-toogle[error] svg {
		display: grid;
	}
`;

/*
	Como Usarlo 
	--Importarlo
	import { dmdToogle } from "../css/dmdToogle";
	---------------------------------------------------
	--Cargarlo
	${dmdToogle}
	---------------------------------------------------
	bordeRedondo: Redondea los bordes
	--HTML en el Render  
	<div id="uno" class="dmd-toogle" tabindex="0" helper>
		<label class="dmd-toogle-titulo">Opcion default</label>
		<div class="dmd-toogle-borde">
			<div class="dmd-toogle-toogle">
				<input class="dmd-toogle-check" type="checkbox" name="toogle1" id="toogle1" />
				<label class="dmd-toogle-label" id="lbl1" for="toogle1"></label>
			</div>
		</div>
		<label class="dmd-toogle-error">Debe seleccionar la opcion</label>
		<label class="dmd-toogle-help">Esta opcion le permite el brillo automatico</label>
		${SVGS["INFO"]}
	</div>
	---------------------------------------------------
	-- colores usados
		--color-primario
		--color-destacado
		--color-error
		--color-watermarck
		--color-control-texto
		--color-control-fondo
	---------------------------------------------------
	-- fuente
		--font-bajada-size
*/
