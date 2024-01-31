export const $winbox = {
	create(html) {
		const winbox = new window.WinBox({
			title: "Theme: Modern",
			class: "modern",
			html: html,
		});
		return winbox;
	}
} 