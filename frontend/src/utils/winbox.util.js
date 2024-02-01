export const $winbox = {
	create(args) {
		console.log("args:", args);
		console.log(args?.id);
		const winbox = new window.WinBox({
			root: document.getElementById("app"),
			id: args?.id ? args.id : "winbox-default",
			title: (args?.title) ? args.title : "Winbox!",
			class: (args?.class) ? args.class : "modern",
			html: (args?.html) ? args.html : "",

			oncreate: args.oncreate,
			onclose: args.onclose,
		});

		return winbox;
	}
} 