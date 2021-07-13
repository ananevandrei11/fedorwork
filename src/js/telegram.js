const yourId = '897078996';
/* токен бота */
const token = '1476474018:AAEE6lTN7EebIkistIy9rov4lDbcPLhMq1I';

const form = document.forms.mainForm
form.addEventListener('submit', e => {
	e.preventDefault();
	let name = form.input_name.value;
	let link = form.input_link.value;
	let email = form.input_email.value;
	let tarif = form.input_tarif.value;

	function validateEmail(email, link) {
		if (email.indexOf('@') > -1) {
			if (link.indexOf('.') > -1) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}

	}
	if (validateEmail(email, link) === true) {
		let msg = "Имя:%20" + name + "%0A" + "Ссылка на сайт:%20" + link + "%0A" + "Тариф:%20" + tarif + "%0A" + "Почта/телеграм:%20" + email;

		let xhttp = new XMLHttpRequest();

		let url = "https://api.telegram.org/bot" + token + "/sendMessage?chat_id=" + yourId + "&text=";

		xhttp.open('GET', url + msg);
		xhttp.send();
		form.input_name.value = '';
		form.input_link.value = '';
		form.input_email.value = '';
		form.input_tarif.value = '';

		const push = document.querySelector('.push-block');
		const pushClose = document.querySelector('.push__close');
		let body = document.body;
		xhttp.addEventListener('readystatechange', function () {
			if (this.readyState === 4 && this.status === 200) {
				let checks = document.querySelectorAll('.icon-error');
				let success = document.querySelectorAll('.icon-check');
				checks.forEach(item => item.style.visibility = 'hidden');
				success.forEach(item => item.style.visibility = 'hidden');
				
				disableScroll();
				push.classList.add('push-block-active');
				setTimeout(() => push.style.opacity = 1, 500);
				setTimeout(() => {
					push.style.opacity = 0;
					setTimeout(() => {
						push.classList.remove('push-block-active');
						enableScroll();
					}, 500)
				}, 5000)
			}
		})
		pushClose.addEventListener('click', () => {
			push.style.opacity = 0;
			setTimeout(() => {
				push.classList.remove('push-block-active');
				enableScroll();
			}, 500)
		})

		function disableScroll() {
			let pagePosition = window.scrollY;
			body.classList.add('scroll-hidden');
			body.dataset.position = pagePosition;
		}

		function enableScroll() {
			let pagePosition = parseInt(body.dataset.position, 10);
			body.style.top = 'auto';
			body.classList.remove('scroll-hidden');
			window.scroll({ top: pagePosition, left: 0 });
			body.removeAttribute('data-position');
		}
	}
})
