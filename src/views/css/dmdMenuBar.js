import { css } from "lit";

export const dmdMenuBar = css`
	.dmd-menu-bar {
		display: grid;
		grid-gap: 0;
		grid-template-columns: 1fr 14fr 1fr;
		outline: none;
		z-index: 90;
	}
	.dmd-menu-bar-menu,
	.dmd-menu-bar-check-label,
	.dmd-menu-bar-mas-label {
		display: grid;
		position: relative;
		height: 100%;
		width: 100%;
		border-top: solid 1px var(--color-control-texto);
		background-color: var(--color-control-fondo);
	}
	.dmd-menu-bar-menu {
		grid-template-columns: repeat(auto-fit, minmax(4.5rem, 1fr));
		justify-items: center;
		text-align: center;
		outline: none;
		overflow: hidden;
	}
	.dmd-menu-bar-check-check {
		width: 0;
		height: 0;
		visibility: hidden;
		position: absolute;
	}
	.dmd-menu-bar-check-label {
		cursor: pointer;
	}
	.dmd-menu-bar-check-check:checked ~ .dmd-menu-bar-check-label {
		/*
		background: no-repeat center/60% url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAYAAAD+pA/bAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVQ4ja3QwQ2AIAxA0R8ncBjAzbyyl0OpG+ilRjAIFGjixZT3RXhnBQz9Y8SKxgMXsAO2A7diXGJG+PMcjRErZ0PLT4nFGdiUEStn5r+F7y00N0l9efSLShGXwV0t3hJR47nICSzBziLv1HhNpBsvRYbgucgwvCbSjeciw/BUZDgeRlT4DRa+bdVh2VkmAAAAAElFTkSuQmCC");
		*/
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAYAAAD+pA/bAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVQ4ja3QwQ2AIAxA0R8ncBjAzbyyl0OpG+ilRjAIFGjixZT3RXhnBQz9Y8SKxgMXsAO2A7diXGJG+PMcjRErZ0PLT4nFGdiUEStn5r+F7y00N0l9efSLShGXwV0t3hJR47nICSzBziLv1HhNpBsvRYbgucgwvCbSjeciw/BUZDgeRlT4DRa+bdVh2VkmAAAAAElFTkSuQmCC");
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 1.2rem 0.8rem;
		background-color: var(--color-control-fondo);
		transition-duration: 1s;
	}
	.dmd-menu-bar-check-check:not(:checked) ~ .dmd-menu-bar-check-label {
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAPCAYAAAD+pA/bAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAhElEQVQ4jbWR0Q2AIAwFL84kuoEj+cuA7KJsoD8lMaagtfiS90W5KwFsidJfEoFD2l1yhXeXaPBukhbcLdHgWeqW1OCz1CVpwUs+SzT4DkzK7CRnryUWuFlSg4cGvCQ8STzwR8mgDGdgAZJBkOROrg2UV2zYNr8nCEP9hxUYHfCSUVgAnE8icdcBo2j1AAAAAElFTkSuQmCC");
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 1.2rem 0.8rem;
		background-color: var(--color-control-fondo);
		border-right: solid 1px var(--color-control-texto);
		transition-duration: 1s;
	}

	.dmd-menu-bar-mas-check {
		width: 0;
		height: 0;
		visibility: hidden;
		position: absolute;
	}
	.dmd-menu-bar-mas-label {
		cursor: pointer;
	}
	.dmd-menu-bar-mas-label {
		background: no-repeat center/25% url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAgCAYAAAAv8DnQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAT0lEQVQ4jWNggABpBgaGpQwMDM+geClUDC75hoGB4T8afgNTtBSLJAwvZWBgYHiKR8FTJgYCgImBgeEAHvkDRDmSoDcHCxiNi8EDRnpcAAA1Cmmp4SMaoQAAAABJRU5ErkJggg==");
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.42rem 1.4rem;
		background-color: var(--color-control-fondo);
		cursor: pointer;
	}
	.dmd-menu-bar-check-check:not(:checked) ~ .dmd-menu-bar-menu,
	.dmd-menu-bar-check-check:not(:checked) ~ .dmd-menu-bar-mas-label {
		transform: translateY(3.7rem);
		transition-duration: 1s;
	}

	.dmd-menu-bar-check-check:checked ~ .dmd-menu-bar-menu,
	.dmd-menu-bar-check-check:checked ~ .dmd-menu-bar-mas-label {
		transform: translateY(0rem);
		transition-duration: 1s;
	}

	.dmd-menu-bar-item {
		display: grid;
		outline: none;
		color: var(--color-control-texto);
		width: 90%;
		border-radius: 1rem;
		font-size: 0.6rem;
		font-weight: 300;
		align-self: center;
		justify-items: center;
		grid-template-columns: 100%;
		grid-template-rows: 2.7rem 0.8rem;
		grid-gap: 0;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
	}
	.dmd-menu-bar-leyenda {
		height: 0.8rem;
		align-self: flex-start;
		-webkit-tap-highlight-color: transparent;
	}
	.dmd-menu-bar-item:focus-within {
		background-color: #dfdfdf;
	}

	.dmd-menu-bar-mas-check:checked ~ .dmd-menu-bar-submenu {
		transform: translateX(-12.2rem);
		transition-duration: 1s;
	}
	.dmd-menu-bar-mas-check:not(:checked) ~ .dmd-menu-bar-submenu {
		transform: translateX(12rem);
		transition-duration: 1s;
	}

	.dmd-menu-bar svg {
		width: 100%;
		height: 2rem;
		border-radius: 1rem;
		padding: 0.1rem;
		fill: var(--color-control-texto);
		align-self: center;
	}
	.dmd-menu-bar .dmd-menu-bar-item svg {
		fill-opacity: 0.7;
	}
	.dmd-menu-bar-item:focus-within svg {
		fill-opacity: 1;
	}
	.dmd-menu-bar-submenu {
		display: grid;
		position: absolute;
		outline: none;
		bottom: 3.7rem;
		right: -12rem;
		grid-gap: 0;
		grid-template-columns: auto;
		grid-template-rows: 1fr;
		background-color: var(--color-control-fondo);
		-webkit-tap-highlight-color: transparent;
		z-index: 99;
		/*max-height: 0;*/
		border: solid 1px var(--color-control-texto);
		border-radius: 4px;
		padding: 0.3rem;
		overflow: hidden;
	}
	.dmd-menu-bar-submenu-opcion {
		display: grid;
		position: relatie;
		outline: none;
		width: fit-content;
		align-items: center;
		grid-gap: 0.2rem;
		grid-template-columns: auto auto;
		grid-template-rows: auto;
		background-color: transparent;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
	}
	.dmd-menu-bar-submenu-opcion-label {
		-webkit-tap-highlight-color: transparent;
		text-decoration: none;
	}
	.dmd-menu-bar-submenu-opcion svg {
		width: auto;
		fill: var(--color-control-texto);
		fill-opacity: 0.7;
	}

	.dmd-menu-bar-velo-check {
		width: 0;
		height: 0;
		visibility: hidden;
		position: absolute;
	}

	/*----  Velo  ----*/
	.dmd-menu-bar-velo {
		position: absolute;
		display: none;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100vh;
		background-color: #c0c0c0;
		opacity: 0.3;
		z-index: 98;
	}
`;

/*
	Como Usarlo 
	--Importarlo
	import { dmdMenuBar } from "../css/dmdMenuBar";
	---------------------------------------------------
	--Cargarlo
	${dmdMenuBar}
	---------------------------------------------------
	--Atributos
	--HTML en el Render  
	<div class="dmd-menu-bar" tabindex="0">
		<div id="mbVelo" class="dmd-menu-bar-velo" tabindex="0" @click=${this.veloSacar}></div>
		<input class="dmd-menu-bar-check-check" name="dmd-menu-bar-check1" id="dmd-menu-bar-check1" type="checkbox" checked />
		<label class="dmd-menu-bar-check-label" for="dmd-menu-bar-check1"></label>
		<div class="dmd-menu-bar-menu" tabindex="1">
			<div class="dmd-menu-bar-item" tabindex="2">${SVGS["HOMEOUTLINE"]}<lable class="dmd-menu-bar-leyenda">PRODUCTOS</lable></div>
			<div class="dmd-menu-bar-item" tabindex="3">${SVGS["LISTADOOUTLINE"]}<lable class="dmd-menu-bar-leyenda">LISTADOS</lable></div>
			<div class="dmd-menu-bar-item" tabindex="4">${SVGS["TICKETOUTLINE"]}<lable class="dmd-menu-bar-leyenda">FACTURAS</lable></div>
			<div class="dmd-menu-bar-item" tabindex="5">${SVGS["CAJAOUTLINE"]}<lable class="dmd-menu-bar-leyenda">CAJA</lable></div>
		</div>
		<input class="dmd-menu-bar-mas-check" name="dmd-menu-bar-mas1" id="dmd-menu-bar-mas1" type="checkbox" />
		<label class="dmd-menu-bar-mas-label" for="dmd-menu-bar-mas1" @click=${this.velo}></label>
		<div class="dmd-menu-bar-submenu" tabindex="0">
			<div class="dmd-menu-bar-submenu-opcion" tabindex="0" @click=${this.ir}>${SVGS["HOMEOUTLINE"]}<lable class="dmd-menu-bar-submenu-opcion-label">MIS DATOS</lable></div>
			<div class="dmd-menu-bar-submenu-opcion" tabindex="0" @click=${this.ir}>${SVGS["HOMEOUTLINE"]}<lable class="dmd-menu-bar-submenu-opcion-label">LOS GRUPOS</lable></div>
			<div class="dmd-menu-bar-submenu-opcion" tabindex="0" @click=${this.ir}>${SVGS["HOMEOUTLINE"]}<lable class="dmd-menu-bar-submenu-opcion-label">CONFIGURACION</lable></div>
			<div class="dmd-menu-bar-submenu-opcion" tabindex="0" @click=${this.ir}>${SVGS["HOMEOUTLINE"]}<lable class="dmd-menu-bar-submenu-opcion-label">VOLVER</lable></div>
		</div>
	</div>
	---------------------------------------------------
	-- colores usados
		--color-control-fondo
		--color-control-texto
	---------------------------------------------------
	-- fuente
		--font-bajada-size
	-- Java Script
	velo() {
		let velo = this.shadowRoot.querySelector("#mbVelo");
		velo.style.display = "grid";
	}
	veloSacar() {
		let velo = this.shadowRoot.querySelector("#mbVelo");
		velo.style.display = "none";
		let submenu = this.shadowRoot.querySelector("#dmd-menu-bar-mas1");
		submenu.checked = false;
	}

*/
