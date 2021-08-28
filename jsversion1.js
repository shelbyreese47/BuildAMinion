/*-----------------------------------DOM ELEMENTS TO GRAB-----------------------------------*/
// I need to grab:
// Menu Button
const menuButton = document.querySelector('menuButton');
// Each letter in the alphabet
const flex = document.querySelector('.flex-container');
const minionImage = document.querySelector('.minionImage');
const chancesLeftBoard = document.querySelector('.chancesLeft');
const flexDown = document.querySelector('.flex-down');
const levelEl = document.querySelector('.level');
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
const evilStep = [
	'https://i.ibb.co/S3TcDvC/evil-Step1.png',
	'https://i.ibb.co/zPCF25v/evil-Step2.png',
	'https://i.ibb.co/NmBNybW/evil-Step3.png',
	'https://i.ibb.co/7W9Bx6C/evil-Step4.png',
	'https://i.ibb.co/s5qrYkK/evil-Step5.png',
	'https://i.ibb.co/Yyb9Hw7/evil-Step6.png',
	'https://i.ibb.co/F8F9kQv/evil-Step7.png',
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
	'CHEETO',
	'MOON',
];
const secondLevelWords = ['ME WANT BANANA', 'SHRINK RAY', ''];
const thirdLevelWords = ['ITS SO FLUFFY IM GONNA DIE'];

// Player 1
/*------------------------------------STATE VARIABLES-------------------------------------*/
// The Score
let score = 0;
// The Game Count
let gameCount = 0;
// How much of the minion is on the screen
let chancesLeft = 7;
let level = 1;

let winArray = []; //We'll add an element to this array with every correct letter
let wordLength;
// The current phrase/word that has been selected
// Randomly choose a phrase/word
// let currentWord = words[Math.ceil(Math.random() * 10) - 1];
// let currentWord = words[Math.ceil(Math.random() * 10) - 1];
let currentWord;
// let currentWord = pickNewWord();

/*---------------------------------------FUNCTIONS-----------------------------------------*/
let unusedWordArray = words;
pickNewWord();

console.log(currentWord);

// Randomly choose a phrase/word AND make sure that word is not picked again
function pickNewWord() {
	currentWord =
		unusedWordArray[Math.ceil(Math.random() * unusedWordArray.length) - 1];
	let currentWordIndex = unusedWordArray.indexOf(currentWord);
	unusedWordArray.splice(currentWordIndex, 1);
	return currentWord;
}

// Display dashes on the screen
function dashes(word) {
	let array = word.split('');
	let howManySpaces = [];
	console.log(array);
	array.forEach((element, index) => {
		if (element === ' ') {
			array.splice(index, 1, '_');
			howManySpaces.push('1'); //Will add one number for each space
		} else return;
	});
	console.log(howManySpaces);
	dashesLength = array.length;
	wordLength = array.length - howManySpaces.length;
	console.log(wordLength);
	// Create one dash per letter in the array
	array.forEach((element) => {
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
		for (let i = 0; i < emptyDash.length; i++) {
			emptyDash[i].innerText = letter;
			winArray.push('1'); //this means when winArray.length = emptyDash.length - the player wins
		}
	} else {
		clickedSquare.classList.add('wrong');
		chancesLeft--;
		let steps = 6 - chancesLeft;
		if (level === 1) {
			let image = minionStep[steps];
			minionImage.setAttribute('src', image);
		} else if (level === 2) {
			let image = evilStep[steps];
			minionImage.setAttribute('src', image);
		}
		chancesLeftBoard.innerText = `Chances Left: ${chancesLeft}`;
	}
	return chancesLeft;
}

// Check Win (needs to be called after each turn)
function checkWin() {
	if (winArray.length === wordLength) {
		gameCount++;
		scoreChange();
		setTimeout(winGame, 1000);
		setTimeout(resetBoard, 1000); //Wanted a delay after the last letter is selected
		return;
	} else {
		return;
	}
}
function scoreChange() {
	// I want the score to reflect how many letters the player guessed right vs wrong
	let clickedLetters = document.querySelectorAll('.clicked');
	let wrongGuesses = document.querySelectorAll('.wrong');
	let rigthGuesses = clickedLetters.length - wrongGuesses.length;
	score += 2 * rigthGuesses;
	score -= 1 * wrongGuesses.length;
	return score;
}
function winGame() {
	if (gameCount >= 1) {
		level = 2;
		levelEl.innerText = `Level: 0${level}`;
		// alert('SECOND LEVEL'); //--------------------------ADD A SECOND LEVEL
		unusedWordArray = secondLevelWords;
		return unusedWordArray;
	}
	console.log(unusedWordArray);
	return unusedWordArray;
}

function checkLose() {
	if (chancesLeft === 0) {
		console.log('lose');
		resetBoard();
	}
}

function resetBoard() {
	let div = document.querySelectorAll('.dashes');
	for (let i = 0; i < dashesLength; i++) {
		flexDown.removeChild(div[i]);
	}
	let clickedLetters = document.querySelectorAll('.clicked');
	for (let i = 0; i < clickedLetters.length; i++) {
		clickedLetters[i].classList.remove('clicked');
	}
	let wrongLetters = document.querySelectorAll('.wrong');
	for (let i = 0; i < wrongLetters.length; i++) {
		wrongLetters[i].classList.remove('wrong');
	}
	winArray = [];
	minionImage.setAttribute('src', '');
	chancesLeft = 7;
	scoreEl.innerText = `Score: ${score}`;

	pickNewWord();
	console.log(currentWord);
	dashes(currentWord);
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
		checkLose();
	} else {
		return 1;
	}
	return 'complete';
});
// Click on menu
