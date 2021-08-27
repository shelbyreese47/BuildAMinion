/*-----------------------------------DOM ELEMENTS TO GRAB-----------------------------------*/
// I need to grab:
// Menu Button
const menuButton = document.querySelector('menuButton');
// Each letter in the alphabet
const flex = document.querySelector('.flex-container');
const minionImage = document.querySelector('.minionImage');
const chancesLeftBoard = document.querySelector('.chancesLeft');
const flexDown = document.querySelector('.flex-down');
const gameCountEl = document.querySelector('.gameCount');
const scoreEl = document.querySelector('.score');

const minionStep = [
	'https://i.ibb.co/PWKSXMD/Minion-Body-1.png',
	'https://i.ibb.co/G0HrXw6/Minion-Step2.png',
	'https://i.ibb.co/QcS4YL0/Minion-Step3.png',
	'https://i.ibb.co/4JvRrsw/Minion-Step4-1.png',
	'https://i.ibb.co/6NzzdWW/Minion-Step5.png',
	'https://i.ibb.co/pfTL05g/Minion-Step6.png',
	'https://i.ibb.co/RgtQ0cL/Minion-Step7.png',
];

/*-----------------------------------CONSTANT VARIABLES------------------------------------*/

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
/*------------------------------------STATE VARIABLES-------------------------------------*/
// The Score
let score = 0;
// The Game Count
let gameCount = 0;
// How much of the minion is on the screen
let chancesLeft = 7;

let winArray = []; //We'll add an element to this array with every correct letter
let wordLength;
// The current phrase/word that has been selected
// Randomly choose a phrase/word
// let currentWord = words[Math.ceil(Math.random() * 10) - 1];
let currentWord = words[Math.ceil(Math.random() * 10) - 1];
console.log(currentWord);

/*---------------------------------------FUNCTIONS-----------------------------------------*/

// Randomly choose a phrase/word
function pickNewWord() {
	currentWord = words[Math.ceil(Math.random() * 10) - 1];
	return currentWord;
}

// Display dashes on the screen
function dashes(word) {
	let array = word.split('');
	// console.log(array);
	wordLength = array.length;
	// console.log(wordLength);
	// Create one dash per letter in the array
	array.forEach((element) => {
		console.log(element);
		let div = document.createElement('div');
		div.classList.add('dashes', element);
		flexDown.appendChild(div);
	});
}

dashes(currentWord); //Need to call the function --------------------**/

// Compare a selected letter with the correct letters
function compareLetters(word, letter, clickedSquare) {
	if (word.includes(letter)) {
		//Going to need a loop to check each letter and return it's index
		// console.log(word.indexOf(letter));
		const emptyDash = document.querySelectorAll(`.${letter}`);
		console.log(emptyDash);
		for (let i = 0; i < emptyDash.length; i++) {
			emptyDash[i].innerText = letter;
			winArray.push('1'); //this means when winArray.length = emptyDash.length - the player wins
			console.log(winArray.length);
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
function checkWin() {
	if (winArray.length === wordLength) {
		console.log('WINNER');
		gameCount++;
		score += 10;
		console.log(gameCount);
		console.log(score);
		winner();
		pickNewWord();
		console.log(currentWord);
		dashes(currentWord);
		return;
	} else {
		return;
	}
}

function winner() {
	let div = document.querySelectorAll('.dashes');
	for (let i = 0; i < wordLength; i++) {
		flexDown.removeChild(div[i]);
	}
	let clickedLetters = document.querySelectorAll('.clicked');
	console.log(clickedLetters);
	for (let i = 0; i < clickedLetters.length; i++) {
		clickedLetters[i].classList.remove('clicked');
	}
    let wrongLetters = document.querySelectorAll('.wrong');
		console.log(clickedLetters);
		for (let i = 0; i < clickedLetters.length; i++) {
			clickedLetters[i].classList.remove('clicked');
		}
	scoreEl.innerText = `Score: ${score}`;
	gameCountEl.innerText = `Game Count: ${gameCount}`;
}
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
		checkWin();
	} else {
		return 1;
	}
	return 'complete';
});
// Click on menu
