window.onload = function () {
	// MENU OPEN START
	let burger = document.querySelector('.hamburger');
	let menu = document.querySelector('.menu');

	burger.addEventListener('click', menuOpen);
	function menuOpen() {
		menu.classList.toggle('menu-open');
	}

	menu.addEventListener('click', menuClose);
	function menuClose(e) {
		let targetElem = e.target;
		let goalLink = targetElem.classList.contains('menu__link');
		if (goalLink) {
			targetElem.closest('nav.menu').classList.toggle('menu-open');
		}
	}

	document.addEventListener('click', (e) => {
		let targetElem = e.target;
		let goalLink1 = targetElem.classList.contains('hamburger');
		let goalLink2 = targetElem.classList.contains('hamburger__item');
		if (!goalLink1 && !goalLink2 && menu.classList.contains('menu-open')) {
			menu.classList.remove('menu-open');
		}
	})
	// MENU OPEN END

	// VALIDATION ORDER SERVICE START
	let formOrder = document.querySelector('#form');
	let inputName = formOrder.elements.input_name;
	let inputLink = formOrder.elements.input_link;
	let inputEmail = formOrder.elements.input_email;
	let btnOrder = formOrder.querySelector('button[type="submit"]');
	let regexName = /^[A-zА-яЁё, \n]+$/;
	let regexSite = /^[-A-zА-яЁё0-9+&@#\/%?=~_|!:,.;]\.*[-A-zА-яЁё0-9+&@#\/%?=~_|!:,.;]*\.[-A-zА-яЁё0-9+&@#\/%=~_|]/;
	let regexMail = /@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?)/;

	function valid(elem, target, reg) {
		let check = target.parentElement.querySelector('.icon-error');
		let succes = target.parentElement.querySelector('.icon-check');
		if (elem.value.match(reg) && elem.value.length > 0) {
			succes.style.visibility = 'visible';
			check.style.visibility = 'hidden';
		} else if (!elem.value.match(reg) && elem.value.length > 0) {
			succes.style.visibility = 'hidden';
			check.style.visibility = 'visible';
		} else {
			succes.style.visibility = 'hidden';
			check.style.visibility = 'hidden';
		}
	}

	function btnDisabled() {
		let iconCheck = formOrder.querySelectorAll('.icon-check');
		let arr = [];
		for (let i = 0; i < iconCheck.length; i++) {
			if (iconCheck[i].style.visibility == 'visible') {
				arr.push('1');
			}
		}
		if (arr.length >= 3) {
			btnOrder.removeAttribute('disabled');
		} else {
			btnOrder.setAttribute('disabled', 'disabled');
		}
	}

	inputName.oninput = (event) => {
		let target = event.target;
		valid(inputName, target, regexName);
		btnDisabled();
	}
	inputLink.oninput = (event) => {
		let target = event.target;
		valid(inputLink, target, regexSite);
		btnDisabled();
	}
	inputEmail.oninput = (event) => {
		let target = event.target;
		valid(inputEmail, target, regexMail);
		btnDisabled();
	}
	// VALIDATION ORDER SERVICE END

	// TELEGRAM SEND START
	const yourId = '';
	/* токен бота */
	const token = '';

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
	// TELEGRAM SEND END

	// PRICE OPEN START
	const workProduct = document.querySelectorAll('.workcost__product');
	workProduct.forEach(element => {
		element.addEventListener('click', (e) => {
			let target = e.target;
			let workInfo = element.querySelector('.workcost__info');
			if (target.classList.contains('workcost__title')) {
				element.classList.toggle('workcost__product-open');
				workInfo.classList.toggle('workcost__info-open');
			} else if (target.parentElement.classList.contains('workcost__title')) {
				element.classList.toggle('workcost__product-open');
				workInfo.classList.toggle('workcost__info-open');
			} else {
				return false;
			}
		})
	});
	// PRICE OPEN END


	// CAROUSEL WORKS START
	let carouselWork = document.querySelector('.portfolio__carousel');
	let listWork = carouselWork.querySelector('.portfolio__slider');
	let listElemsWork = carouselWork.querySelectorAll('.portfolio__item');
	let btnPrevWork = carouselWork.querySelector('.portfolio__arrow-prev');
	let btnNextWork = carouselWork.querySelector('.portfolio__arrow-next');
	let btnLoadWork = document.querySelector('.portfolio__btn-load');
	let positionWork = 0;
	let widthWork = 347;
	let countWork;

	function setCount() {
		if (window.innerWidth > 1240) {
			return 3;
		} else if (window.innerWidth <= 1240) {
			return 2;
		}
	}

	btnPrevWork.onclick = function () {
		countWork = setCount();
		positionWork += widthWork * countWork;
		if (positionWork == 0) {
			this.setAttribute('disabled', 'disabled');
			btnNextWork.removeAttribute('disabled');
		} else {
			this.removeAttribute('disabled');
			btnNextWork.removeAttribute('disabled');
		}
		positionWork = Math.min(positionWork, 0)
		listWork.style.marginLeft = positionWork + 'px';
	};

	btnNextWork.onclick = function () {
		countWork = setCount();
		positionWork -= widthWork * countWork;
		let disPointWork = (listElemsWork.length * widthWork);
		if (Math.abs(positionWork) >= disPointWork) {
			this.setAttribute('disabled', 'disabled');
			btnPrevWork.removeAttribute('disabled');
		} else {
			this.removeAttribute('disabled');
			btnPrevWork.removeAttribute('disabled');
		}
		positionWork = Math.max(positionWork, -widthWork * (listElemsWork.length - countWork));
		listWork.style.marginLeft = positionWork + 'px';
	};

	btnLoadWork.onclick = function () {

		let arrClass = [];
		listElemsWork.forEach((item, ind) => {
			if (item.classList.contains('portfolio__item-open')) {
				arrClass.push(ind);
			}
		});

		if (arrClass.length < listElemsWork.length) {
			let diffLength = listElemsWork.length - arrClass.length;
			if (diffLength > 3) {
				for (let i = arrClass.length; i < arrClass.length + 3; i++) {
					listElemsWork[i].classList.remove('portfolio__item-close');
					listElemsWork[i].classList.add('portfolio__item-open');
				}
			} else {
				for (let i = arrClass.length; i < arrClass.length + diffLength; i++) {
					listElemsWork[i].classList.remove('portfolio__item-close');
					listElemsWork[i].classList.add('portfolio__item-open');
				}
			}
		}
	}
	window.addEventListener('resize', function() {
		listWork.style.marginLeft = "0px";
	});
	// CAROUSEL WORKS END
}