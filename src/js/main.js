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
	// CAROUSEL WORKS END

	// MODAL GALLERY START
	let modalGlr = document.querySelector('.modal-slider');
	let imgGlr = modalGlr.querySelector('img');
	let arrGlr = document.querySelectorAll('.portfolio__img');
	let closeGlr = modalGlr.querySelector('.icon-error');
	let modalPrev = modalGlr.querySelector('.modal-slider__icon-prev');
	let modalNExt = modalGlr.querySelector('.modal-slider__icon-next');
	closeGlr.onclick = () => {
		modalGlr.classList.remove('modal-slider__open');
		modalGlr.classList.add('modal-slider__close');
	}
	listWork.onclick = function (e) {
		let target = e.target;
		if (target.tagName != 'IMG') return false;
		modalGlr.classList.remove('modal-slider__close');
		modalGlr.classList.add('modal-slider__open');
		imgGlr.setAttribute('src', target.getAttribute('src'));
	}

	let arrImg = [];
	arrGlr.forEach(item => {
		arrImg.push(item.getAttribute('src'));
	});

	modalPrev.onclick = function () {
		let imgCurrent = imgGlr.getAttribute('src');
		let imgIndex = arrImg.indexOf(imgCurrent);
		if (imgIndex == 0) {
			imgIndex = arrImg.length;
		}
		imgIndex--;
		imgGlr.setAttribute('src', arrImg[imgIndex]);
	}

	modalNExt.onclick = function () {
		let imgCurrent = imgGlr.getAttribute('src');
		let imgIndex = arrImg.indexOf(imgCurrent);
		imgIndex++;
		if (imgIndex == arrImg.length) {
			imgIndex = 0;
		}
		imgGlr.setAttribute('src', arrImg[imgIndex]);
	}
	// MODAL GALLERY END
}