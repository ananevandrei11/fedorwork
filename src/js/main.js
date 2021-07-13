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


	// CAROUSEL START
	let carousel = document.querySelector('.portfolio__carusel');
	let list = carousel.querySelector('.portfolio__slider');
	let listElems = carousel.querySelectorAll('.portfolio__item');
	let galleriBlock = carousel.querySelector('.portfolio__gallery');
	let btnPrev = carousel.querySelector('.portfolio__arrow-prev');
	let btnNext = carousel.querySelector('.portfolio__arrow-next');
	let btnLoad = document.querySelector('.portfolio__btn-load');
	let position = 0;
	let width = 347;
	let count;

	if (window.innerWidth > 1240) {
		count = 3;
	} else if (window.innerWidth <= 1240) {
		count = 2;
	}

	btnPrev.onclick = function () {
		if (window.innerWidth > 1240) {
			count = 3;
		} else if (window.innerWidth <= 1240) {
			count = 2;
		}
		position += width * count;
		if (position == 0) {
			this.setAttribute('disabled', 'disabled');
			btnNext.removeAttribute('disabled');
		} else {
			this.removeAttribute('disabled');
			btnNext.removeAttribute('disabled');
		}
		position = Math.min(position, 0)
		list.style.marginLeft = position + 'px';
	};

	btnNext.onclick = function () {
		if (window.innerWidth > 1240) {
			count = 3;
		} else if (window.innerWidth <= 1240) {
			count = 2;
		}
		position -= width * count;
		let disPoint = (listElems.length * width);
		if (Math.abs(position) >= disPoint) {
			this.setAttribute('disabled', 'disabled');
			btnPrev.removeAttribute('disabled');
		} else {
			this.removeAttribute('disabled');
			btnPrev.removeAttribute('disabled');
		}
		position = Math.max(position, -width * (listElems.length - count));
		list.style.marginLeft = position + 'px';
	};

	btnLoad.onclick = function () {
		let arrClass = [];
		listElems.forEach((item, ind) => {
			if (item.classList.contains('portfolio__item-open')) {
				arrClass.push(ind);
			};
		});

		if (arrClass.length < listElems.length) {
			let diffLength = listElems.length - arrClass.length;
			if (diffLength > 3) {
				for (let i = arrClass.length; i < arrClass.length + 3; i++) {
					listElems[i].classList.remove('portfolio__item-close');
					listElems[i].classList.add('portfolio__item-open');
				}
			} else {
				for (let i = arrClass.length; i < arrClass.length + diffLength; i++) {
					listElems[i].classList.remove('portfolio__item-close');
					listElems[i].classList.add('portfolio__item-open');
				}
			}

		}
	}
	// CAROUSEL END
}