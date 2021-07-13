// CAROUSEL REVIEW START
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
	// CAROUSEL REVIEW END