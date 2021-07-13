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
	let galleriBlockWork = carouselWork.querySelector('.portfolio__gallery');
	let btnPrevWork = carouselWork.querySelector('.portfolio__arrow-prev');
	let btnNextWork = carouselWork.querySelector('.portfolio__arrow-next');
	let btnLoadWork = document.querySelector('.portfolio__btn-load');
	let positionWork = 0;
	let widthWork = 347;
	let countWork;

	let modalGlr = document.querySelector('.modal-slider');
	let closeGlr = modalGlr.querySelector('.icon-error');
	closeGlr.onclick = () => {
		modalGlr.classList.remove('modal-slider__open');
		modalGlr.classList.add('modal-slider__close');
	}
	listWork.onclick = function(e) {
		let target = e.target;
		if (target.tagName != 'IMG') return false;
		
		let imgGlr = modalGlr.querySelector('img');
		modalGlr.classList.remove('modal-slider__close');
		modalGlr.classList.add('modal-slider__open');
		imgGlr.setAttribute('src', target.getAttribute('src'));
	}

	btnPrevWork.onclick = function () {
		if (window.innerWidth > 1240) {
			countWork = 3;
		} else if (window.innerWidth <= 1240) {
			countWork = 2;
		}
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
		if (window.innerWidth > 1240) {
			countWork = 3;
		} else if (window.innerWidth <= 1240) {
			countWork = 2;
		}
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
			};
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


	// CAROUSEL REVIEW START
	/*
	let carouselReview = document.querySelector('.reviews__carusel');
	let listReview = carouselReview.querySelector('.reviews__slider');
	let listElemsReview = carouselReview.querySelectorAll('.reviews__item');
	let galleriBlockReview = carouselReview.querySelector('.reviews__gallery');
	let btnPrevReview = carouselReview.querySelector('.reviews__arrow-prev');
	let btnNextReview = carouselReview.querySelector('.reviews__arrow-next');
	let btnLoadReview = document.querySelector('.reviews__btn-load');
	let positionReview = 0;
	let heightReview = 149;
	let countReview = 2;

	btnPrevReview.onclick = function () {
		positionReview += heightReview * countReview;
		if (positionReview == 0) {
			this.setAttribute('disabled', 'disabled');
			btnNextReview.removeAttribute('disabled');
		} else {
			this.removeAttribute('disabled');
			btnNextReview.removeAttribute('disabled');
		}
		positionReview = Math.min(positionReview, 0)
		listReview.style.marginTop = positionReview + 'px';
	};

	btnNextReview.onclick = function () {
		positionReview -= heightReview * countReview;
		let disPointReview = (listElemsReview.length * heightReview);
		if (Math.abs(positionReview) >= disPointReview) {
			this.setAttribute('disabled', 'disabled');
			btnPrevReview.removeAttribute('disabled');
		} else {
			this.removeAttribute('disabled');
			btnPrevReview.removeAttribute('disabled');
		}
		positionReview = Math.max(positionReview, -heightReview * (listElemsReview.length - countReview));
		listReview.style.marginTop = positionReview + 'px';
	};

	btnLoadReview.onclick = function () {
		let arrClass = [];
		listElemsReview.forEach((item, ind) => {
			if (item.classList.contains('reviews__item-open')) {
				arrClass.push(ind);
			};
		});

		if (arrClass.length < listElemsReview.length) {
			let diffLength = listElemsReview.length - arrClass.length;
			if (diffLength > 3) {
				for (let i = arrClass.length; i < arrClass.length + 3; i++) {
					listElemsReview[i].classList.remove('reviews__item-close');
					listElemsReview[i].classList.add('reviews__item-open');
				}
			} else {
				for (let i = arrClass.length; i < arrClass.length + diffLength; i++) {
					listElemsReview[i].classList.remove('reviews__item-close');
					listElemsReview[i].classList.add('reviews__item-open');
				}
			}

		}
	}
	*/
	// CAROUSEL REVIEW END
}