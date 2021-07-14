	// VALIDATION ORDER SERVICE
	let formOrder = document.querySelector('#form');
	let inputName = formOrder.elements.input_name;
	let inputLink = formOrder.elements.input_link;
	let inputEmail = formOrder.elements.input_email;
	let btnOrder = formOrder.querySelector('button[type="submit"]');
	let regexName = /^[A-zА-яЁё, \n]+$/;
	let regexSite = /^[-a-z0-9+&@#\/%?=~_|!:,.;]\.*[-a-z0-9+&@#\/%?=~_|!:,.;]*\.[-a-z0-9+&@#\/%=~_|]/;
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