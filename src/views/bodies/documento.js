/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { connect } from "@brunomon/helpers";
import { goTo } from "../../redux/routing/actions";
import { isInLayout } from "../../redux/screens/screenLayouts";
import { dmdButton } from "../css/dmdButton";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";

export class documentoScreen extends connect(store, MEDIA_CHANGE, SCREEN)(LitElement) {
	constructor() {
		super();
		this.hidden = true;
		this.area = "body";
	}

	static get styles() {
		return css`
			${dmdButton}
			:host {
				display: grid;
				position: fixed;
				top: 0;
				left: 0;
				padding: 0 !important;
				height: 100vh;
				width: 100vw;
				background-color: rgba(0, 0, 0, 0.5);
				z-index: 999;
				place-content: center;
			}
			:host([hidden]) {
				display: none;
			}
			#cuerpo {
				display: grid;
				position: relative;
				width: 90vw;
				height: 90vh;
				background-color: white;
				margin: 1rem;
				overflow: auto;
			}
			h2 {
				margin: 0;
			}
			#x {
				display: grid;
				position: fixed;
				font-size: 1.2rem;
				right: 0.5rem;
				top: 1rem;
				width: 1.6rem;
				height: 1.6rem;
				background-color: white;
				color: black;
				border-radius: 50%;
				text-align: center;
				align-content: center;
			}
			#dato {
				display: grid;
				overflow: auto;
				width: 100%;
				height: 100%;
				padding: 1rem;
			}
			#firma {
				display: block;
				margin-left: auto;
				margin-right: auto;
				width: 8rem;
				height: auto;
				object-fit: contain;
			}
			#final {
				padding-top: 1rem;
				width: 12rem;
				height: max-content;
				place-items: center;
				text-align: center;
			}
		`;
	}
	get _canvas() {
		return;
	}
	willUpdate(changedProperties) {
		if (changedProperties.has("hidden")) {
		}
		if (changedProperties.has("firma")) {
			this.shadowRoot.querySelector("#firma").src = this.firma;
		}
	}
	firstUpdated() {
		super.firstUpdated();
	}

	render() {
		return html`
			<div id="cuerpo">
				<div id="x" @click="${this.x}">X</div>
				<div id="dato">
					<h1>Título del documento</h1>
					<strong>Simple documento para demostrar cómo se puede colocar una firma del usuario</strong>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et magnam eius reprehenderit repudiandae, veritatis aliquid a iste! Eos necessitatibus omnis maiores doloremque? Ipsam rem omnis saepe architecto quam molestias asperiores.</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam unde veritatis, aut exercitationem in voluptatum aliquid rem deleniti non quas dignissimos asperiores laborum omnis similique esse, neque autem sit possimus.</p>
					<p>Quos veniam incidunt animi distinctio, itaque voluptate laudantium voluptates doloribus ipsa praesentium qui veritatis perferendis rerum dicta a, non esse cupiditate nemo mollitia exercitationem nesciunt explicabo, debitis dolores. Mollitia, similique.</p>
					<p>Deleniti sapiente rem beatae officia libero similique iste, vitae aut? Voluptatum aperiam fugit placeat adipisci, consequatur reiciendis voluptatem eius dolore qui. Cumque delectus iste earum, explicabo error quas rerum nam!</p>
					<p>Porro tempore ipsa enim a dolore explicabo totam. Quos veniam repellendus quo excepturi voluptatibus eum provident corrupti debitis nesciunt neque ipsa, consequatur qui illo perferendis mollitia omnis sit cum sunt.</p>
					<p>Aliquid saepe quod recusandae at adipisci veniam quasi delectus maiores magni fuga accusamus ex, facere, vero voluptatem temporibus odit maxime. Fuga assumenda suscipit repellat sapiente, porro sit repudiandae doloremque officiis.</p>
					<h2>firma</h2>
					<div id="final">
						<img id="firma" src="${this.firma}" alt="Firma del usuario" />
						<p style="margin:0;">..........................</p>
						<p style="margin:0;">Jose Perez</p>
					</div>
				</div>
			</div>
		`;
	}
	x() {
		this.hidden = true;
	}
	stateChanged(state, name) {
		if (name == SCREEN || name == MEDIA_CHANGE) {
			this.mediaSize = state.ui.media.size;
		}
	}

	static get properties() {
		return {
			firma: {
				type: Object,
				reflect: true,
			},
			hidden: {
				type: Boolean,
				reflect: true,
			},
			mediaSize: {
				type: String,
				reflect: true,
				attribute: "media-size",
			},
			layout: {
				type: String,
				reflect: true,
			},
			hidden: {
				type: Boolean,
				reflect: true,
			},
			area: {
				type: String,
			},
		};
	}
}
window.customElements.define("documento-screen", documentoScreen);
