/** @format */

import { css, unsafeCSS } from "lit";
import { ALL_BODY, HEADER_BODY_FOOT, BODY_FOOT, HEADER_BODY, SLIDER_HEADER_BODY } from "../../redux/screens/layouts";

export const layoutsCSS = css`
	:host([layout="${unsafeCSS(SLIDER_HEADER_BODY.name)}"]) {
		grid-template-areas:
			"foot  header"
			"foot    body";
		grid-template-rows: 1.8fr 8.2fr;
		grid-template-columns: 1.5fr 8.5fr;
		grid-gap: 0rem;
	}

	:host([layout="${unsafeCSS(HEADER_BODY.name)}"]) {
		grid-template-areas:
			"header"
			"body";
		grid-template-rows: 0.8fr 9.2fr;
		grid-template-columns: 1fr;
		grid-gap: 0rem;
	}
	:host([layout="${unsafeCSS(BODY_FOOT.name)}"]) {
		grid-template-areas:
			"body"
			"foot";
		grid-template-rows: 9fr 1fr;
		grid-gap: 0.3rem;
	}

	:host([layout="${unsafeCSS(HEADER_BODY_FOOT.name)}"]) {
		grid-template-areas:
			"header"
			"body"
			"foot";
		grid-template-rows: 0.8fr 8.4fr 0.8fr;
		grid-template-columns: 1fr;
	}
	:host([layout="${unsafeCSS(ALL_BODY.name)}"]) {
		grid-template-areas: "body";
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
	}

	.header {
		grid-area: header;
	}
	.body {
		grid-area: body;
	}
	.foot {
		grid-area: foot;
	}
`;
