window.onload = function () {
	// MENU OPEN START
	const burger = document.querySelector('.hamburger');
	const menu = document.querySelector('.menu');

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
}