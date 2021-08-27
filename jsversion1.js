//DOM ELEMENTS TO GRAB//
// I need to grab:
// Menu Button
const menuButton = document.querySelector('menuButton');
// Each letter in the alphabet
const flex = document.querySelector('.flex-container');
const minionImage = document.querySelector('.minionImage');
const chancesLeftBoard = document.querySelector('.chancesLeft');
const flexDown = document.querySelector('.flex-down');

const minionStep = [
	'https://i.ibb.co/PWKSXMD/Minion-Body-1.png',
	'https://i.ibb.co/G0HrXw6/Minion-Step2.png',
	'https://i.ibb.co/QcS4YL0/Minion-Step3.png',
	'https://i.ibb.co/4JvRrsw/Minion-Step4-1.png',
	'https://i.ibb.co/6NzzdWW/Minion-Step5.png',
	'https://i.ibb.co/pfTL05g/Minion-Step6.png',
	'https://i.ibb.co/RgtQ0cL/Minion-Step7.png',
];

//CONSTANT VARIABLES//
// Phrases/words the computer can pick from
const words = [
	'BOB',
	'KEVIN',
	'GRU',
	'BANANA',
	'LASER',
	'SHIP',
	'SPACE',
	'COOKIES',
	'YELLOW',
	'COOKIES',
];

// Player 1

//STATE VARIABLES//
// The current phrase/word that has been selected
//The dashes on the screen
//Which boxes light up/ grey out
// The letter box that the user selects
//
// The Score
// The Game Count
// How much of the minion is on the screen
let chancesLeft = 7;
//FUNCTIONS//
// Randomly choose a phrase/word
let currentWord = words[Math.ceil(Math.random() * 10) - 1];
console.log(currentWord);
// Take that phrase/word and display dashes on the screen
function dashes(word) {
	let array = word.split('');
	console.log(array);

	array.forEach((element) => {
		console.log(element);
		let div = document.createElement('div');
		div.classList.add('dashes', element);
		flexDown.appendChild(div);
	});
	// const emptyDashes = document.querySelectorAll('.dashes');
	// console.log(emptyDashes);
	return 1;
}
// console.log(div.dashes);
dashes(currentWord);

// Compare a selected letter with the correct letters
function compareLetters(word, letter, clickedSquare) {
	if (word.includes(letter)) {
		console.log('That letter is included');
		//Going to need a loop to check each letter and return it's index
		console.log(word.indexOf(letter));
		const emptyDash = document.querySelectorAll(`.${letter}`);
		for (let i = 0; i < emptyDash.length; i++) {
			console.log(emptyDash[i]);
			emptyDash[i].innerText = letter;
		}
	} else {
		clickedSquare.classList.add('wrong');
		chancesLeft--;
		let steps = 6 - chancesLeft;
		let image = minionStep[steps];
		minionImage.setAttribute('src', image);
		chancesLeftBoard.innerText = `Chances Left: ${chancesLeft}`;
	}
	return chancesLeft;
}

// Check Win (needs to be called after each turn)
//

//EVENT LISTENERS//
// Click on a letter
flex.addEventListener('click', (event) => {
	event.preventDefault();
	// Check if that letter has already been clicked
	if (event.target.classList.contains('clicked')) {
		alert('You already clicked that one');
		return 'done';
	} else if (event.target.classList.contains('alpha')) {
		let letter = event.target.innerText;
		let clickedSquare = event.target;
		compareLetters(currentWord, letter, clickedSquare);
		event.target.classList.add('clicked');
	} else {
		return 1;
	}
	return 'complete';
});
// Click on menu
