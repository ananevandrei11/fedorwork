window.onload = function () {
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
		console.log(targetElem);
		let goalLink1 = targetElem.classList.contains('hamburger');
		let goalLink2 = targetElem.classList.contains('hamburger__item');
		if (!goalLink1 && !goalLink2 && menu.classList.contains('menu-open')) {
				menu.classList.remove('menu-open');
		}
	})
}