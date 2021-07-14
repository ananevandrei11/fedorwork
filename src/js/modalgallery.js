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