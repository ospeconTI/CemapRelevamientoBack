import { css } from "lit";

export const dmdSelect = css`
	.dmd-select {
		display: grid;
		position: relative;
		grid-template-rows: 1fr auto 1fr;
		grid-gap: 0rem;
	}
	.dmd-select label {
		color: var(--color-control-texto);
		font-size: 0.9rem;
		font-weight: 500;
		padding-left: 0.6rem;
		color: var(--color-control-texto);
	}

	.dmd-select select {
		padding: 0rem 0.6rem;
		border: 1px solid var(--color-primario);
		color: var(--color-control-texto);
		font-size: var(--font-bajada-size);
		font-weight: var(--font-bajada-weight);
		outline: none;
		border-radius: 0.4rem;
		background-color: var(--color-control-fondo);
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		transition: all 0.3s ease-in-out;
	}

	select:not([multiple]) {
		height: 2.1rem;
		padding: 0rem 2rem 0rem 0.6rem;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAuklEQVRYhe2XsRGDMBAEN2NIgG7oDRDURQUaqIYO5MAzlmXLELyecfAbEe1m+gMM424WFl19IDDr6tUSUR8IOF198UTUHxyv70lD39OXTqR6IEmM5fWfiUGir9kz+jThqSSJji2jjwlPI9EDtKwZ/TOxyvWGYRj/QXP62LVyvT99rjc6ib7CXx6cnVqSGC5PpnhKjqdHv8hSnX7OlmJD+D2hoAdwX9Ox+Ix3unqAWVcfE8r/OKp6w8jxAAS9rp+ekk9nAAAAAElFTkSuQmCC) no-repeat 99% 50%;
		background-size: contain;
		background-color: var(--color-control-fondo);
	}
	:host([dispositivo="MOVIL"]) select {
		height: 2.1rem;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAuklEQVRYhe2XsRGDMBAEN2NIgG7oDRDURQUaqIYO5MAzlmXLELyecfAbEe1m+gMM424WFl19IDDr6tUSUR8IOF198UTUHxyv70lD39OXTqR6IEmM5fWfiUGir9kz+jThqSSJji2jjwlPI9EDtKwZ/TOxyvWGYRj/QXP62LVyvT99rjc6ib7CXx6cnVqSGC5PpnhKjqdHv8hSnX7OlmJD+D2hoAdwX9Ox+Ix3unqAWVcfE8r/OKp6w8jxAAS9rp+ekk9nAAAAAElFTkSuQmCC) no-repeat 99% 50%;
		background-size: contain;
		background-color: var(--color-control-fondo);
	}

	.dmd-select select::-ms-expand {
		display: none;
	}
	.dmd-select select:focus {
		border-color: var(--color-destacado);
	}
	.dmd-select select[error] {
		border: 1px solid var(--color-error);
	}

	.dmd-select:focus-within label {
		color: var(--color-primario);
		font-weight: 900;
		transition: all 0.3s ease-in-out;
	}
	.dmd-select div {
		color: var(--color-error);
		font-size: 0.7rem;
		font-weight: 300;
		display: none;
	}
	.dmd-select select[error] + div {
		display: grid;
	}
	.dmd-select span {
		margin-left: 0.5rem;
		font-size: 0.7rem;
		font-weight: 300;
		display: none;
	}
	.dmd-select[helper] span {
		display: grid;
	}
	.dmd-select[helper] select[error] ~ span {
		display: none;
	}
	.dmd-select svg {
		display: none;
		position: absolute;
		top: 0.4rem;
		right: 0.1rem;
		height: 1.1rem;
		width: 1.1rem;
		transform: translateY(-50%) scale(0.9);
		fill: var(--color-error);
	}
	.dmd-select select[error] ~ svg {
		display: grid;
	}
`;
/*
	Como Usarlo 
	--Importarlo
	import { dmdSelect } from "../css/dmdSelect";
	---------------------------------------------------
	--Cargarlo
	${dmdSelect}
	---------------------------------------------------
	--Atributos
	--HTML en el Render  
	<div class="dmd-select" helper>
		<label>Seleccione</label>
		<select id="siete" @change="${this.obraSocialAtendio}">
			<option value="0" disabled selected hidden>Selecciones opcion</option>
			<option value="1">Si</option>
			<option value="2">No</option>
		</select>
		<div>Debe cargar una opcion</div>
		<span>Si esta de acuerdo</span>
		${SVGS["INFO"]}
	</div>
	---------------------------------------------------
	-- colores usados
		--color-control-texto
		--color-control-fondo
		--color-primario
		--color-destacado
	---------------------------------------------------
	-- fuente
		--font-bajada-size
*/
