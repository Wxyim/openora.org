import type { Config } from "tailwindcss";

export default {
	plugins: [require("@tailwindcss/typography")],
	theme: {
		fontFamily: {
			defined: ["Noto Sans", "Noto Sans SC", "Noto Sans KR"],
			mono: ["IBM Plex Mono", "Fira Code", "Noto Serif SC"],
			toc: ["Noto Serif SC"],
		},
		extend: {
			typography: () => ({
				DEFAULT: {
					css: {
						maxWidth: "100%",
						a: {
							textUnderlineOffset: "2px",
							"&:hover": {
								"@media (hover: hover)": {
									textDecorationColor: "var(--color-link)",
									textDecorationThickness: "2px",
								},
							},
						},
						blockquote: {
							borderLeftWidth: "0",
						},
						code: {
							fontSize: "0.875rem",
							border: "1px dotted #666",
							borderRadius: "2px",
							padding: "0.125em 0.25em",
							color: "#d56da1",
							backgroundColor: "rgba(128, 128, 128, 0.1)",
							"&::before": {
								content: '""',
							},
							"&::after": {
								content: '""',
							},
						},
						kbd: {
							"&:where([data-theme='dark'], [data-theme='dark'] *)": {
								background: "var(--color-global-text)",
							},
						},
						hr: {
							borderTopStyle: "dashed",
						},
						strong: {
							fontWeight: "700",
						},
						sup: {
							marginInlineStart: "calc(var(--spacing) * 0.5)",
							a: {
								"&:after": {
									content: "']'",
								},
								"&:before": {
									content: "'['",
								},
								"&:hover": {
									"@media (hover: hover)": {
										color: "var(--color-link)",
									},
								},
							},
						},
						/* Table */
						"tbody tr": {
							borderBottomWidth: "none",
						},
						tfoot: {
							borderTop: "1px dashed #666",
						},
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							borderBottom: "1px dashed #666",
							fontWeight: "700",
						},
						'th[align="center"], td[align="center"]': {
							"text-align": "center",
						},
						'th[align="right"], td[align="right"]': {
							"text-align": "right",
						},
						'th[align="left"], td[align="left"]': {
							"text-align": "left",
						},
						".expressive-code, .admonition, .github-card": {
							marginTop: "calc(var(--spacing)*4)",
							marginBottom: "calc(var(--spacing)*4)",
						},
            ".expressive-code code": {
							fontVariantLigatures: "none",
            },
					},
				},
				sm: {
					css: {
						code: {
							fontSize: "var(--text-sm)",
							fontWeight: "400",
						},
					},
				},
				xs: {
					css: {
						p: {
							fontSize: '0.875rem',
						},
					},
				},
			}),
			colors: {
				darktoc: "#31373fff",
				lighttoc: "#e6eef4ff",
			},
		},
	},
} satisfies Config;
