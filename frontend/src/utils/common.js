import { Notify, Dialog } from 'quasar'
import dayjs from "dayjs"
export const $c = {
	form: {
		clearError(errors) {
			for (var k in errors) {
				if (typeof (errors[k]) === 'object') {
					this.clearError(errors[k]);
				} else {
					errors[k] = "";
				}
			}
		},
		setError(form, errors) {
			errors.map((err) => {
				let location = err?.location;
				let msg = err?.msg;
				let path = err?.path;
				let type = err?.type;

				let p_list = path.split('.');

				let keys = form;
				for (let i = 0; i < p_list.length; i++) {
					if (i == p_list.length - 1) {
						if (Object.prototype.hasOwnProperty.call(keys, p_list[i])) {
							keys[p_list[i]] = msg;
						} else {
							keys[p_list[i]] = msg;
						}
					} else {
						keys[p_list[i]] = new Object();
					}
				}
			});
		},
	},


	formatDate(date, format) {
		return dayjs(date, "YYYY-MM-DD HH:mm:ss").format(format);
	},

	tempObj(obj) {
		return JSON.parse(JSON.stringify(obj));
	},

	getCookie: function (name) {
		let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		return value ? value[2] : null;
	},
	response_notify(icon, color, message) {
		const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
		if (isMobile) {
			alert(message);
		} else {
			Notify.create({
				icon,
				color,
				message,
				position: 'top',
			});
		}
	},
	UNAUTHORIZED_CONFIRM() {
		Dialog.create({
			title: "인증 만료된 토큰입니다.",
			message: "<div style='color: red;'>재로그인 후 다시 이용해주세요.</div>",
			html: true,
			ok: "확인",
		}).onOk(() => {
			window.location.href = "/login";
		});
	}
}