/*-----------------------------------DOM ELEMENTS TO GRAB-----------------------------------*/
// I need to grab:
// Menu Button
const menuButton = document.querySelector('.menuButton'); //grabbing menu button
const modal = document.getElementById('modal'); //grabbing modal
const close = document.getElementById('close'); // grabbing close button
// Start modal
const startModal = document.getElementById('startGameModal'); //grabbing start game modal
const howToPlay = document.getElementById('how-to-play'); //grabbing how to play button
const startGame = document.getElementById('startGame'); // grabbing start game button
// Lose Game Modal
const loseModal = document.getElementById('loseGameModal'); //grabbing lose game modal
const retryButton = document.getElementById('retry'); // grabbing retry button
// Win Game Modal
const winModal = document.getElementById('winGameModal'); // grabbing win game modal
const replayButton = document.getElementById('replay'); // grabbing replay button
// Win Level Modal
const winLevelModal = document.getElementById('winLevelModal'); // grabbing win game modal
let levelWin = document.getElementById('levelWin'); // grabbing the h1 in the modal
let levelWinScore = document.getElementById('levelWinScore'); //grabbing the <p> in the modal
//Progress bars- I want to have a box filled in for each word they get right
const oneOne = document.getElementById('1_1');
const oneTwo = document.getElementById('1_2');
const oneThree = document.getElementById('1_3');
const oneFour = document.getElementById('1_4');
const oneFive = document.getElementById('1_5');
const twoOne = document.getElementById('2_1');
const twoTwo = document.getElementById('2_2');
const twoThree = document.getElementById('2_3');
const twoFour = document.getElementById('2_4');
const threeOne = document.getElementById('3_1');
const threeTwo = document.getElementById('3_2');
const threeThree = document.getElementById('3_3');
//Making an array of the variables so I can call them out easier
const progress = [
	oneOne,
	oneTwo,
	oneThree,
	oneFour,
	oneFive,
	twoOne,
	twoTwo,
	twoThree,
	twoFour,
	threeOne,
	threeTwo,
	threeThree,
];

// Each letter in the alphabet
const flex = document.querySelector('.flex-container');
const minionImage = document.querySelector('.minionImage');
const chancesLeftBoard = document.querySelector('.chancesLeft');
const flexDown = document.querySelector('.flex-down');
const levelEl = document.querySelector('.level');
const scoreEl = document.querySelector('.score');

const minionStep = [
	'https://i.ibb.co/d29tjBV/tomStep1.png',
	'https://i.ibb.co/qF84hLq/TomStep2.png',
	'https://i.ibb.co/Rynvwr1/TomStep3.png',
	'https://i.ibb.co/BCM0xp4/TomStep4.png',
	'https://i.ibb.co/jZQSmhr/TomStep5.png',
	'https://i.ibb.co/p1tcyT7/TomStep6.png',
	'https://i.ibb.co/12N2RRJ/TomStep7.png',
];
const evilStep = [
	'https://i.ibb.co/Lny58PB/evil-Step1-1.png',
	'https://i.ibb.co/9ws1SyB/evil2.png',
	'https://i.ibb.co/yPpb7gM/evil3.png',
	'https://i.ibb.co/nL0fNBm/evil4.png',
	'https://i.ibb.co/fDX4yrg/evil5.png',
	'https://i.ibb.co/LJXDfYp/evil6.png',
	'https://i.ibb.co/z8NPdNH/evil7.png',
];
const stuartStep = [
	'https://i.ibb.co/j8DQ8PZ/Stuart-Step1.png',
	'https://i.ibb.co/QbL0tkp/Stuart-Step2.png',
	'https://i.ibb.co/w7xzMgS/Stuart-Step3.png',
	'https://i.ibb.co/3km0trv/Stuart-Step4.png',
	'https://i.ibb.co/L1zj5Rw/Stuart-Step5.png',
	'https://i.ibb.co/swCbGZH/Stuart-Step6.png',
	'https://i.ibb.co/MD8X8jB/Stuart-Step7.png',
];
/*-----------------------------------CONSTANT VARIABLES------------------------------------*/

// Phrases/words the computer can pick from
const words = [
	'BOB',
	'KEVIN',
	'GRU',
	'BANANA',
	'LUCY',
	'LASER',
	'SHIP',
	'SPACE',
	'VECTOR',
	'PYRAMID',
	'MOON',
	'AGNES',
];
const secondLevelWords = [
	'ME WANT BANANA',
	'SHRINK RAY',
	'SHRINK THE MOON',
	'FREEZE RAY',
	'LIPSTICK TASER',
	'COOKIE ROBOTS',
	'PIRANHA GUN',
	'SQUID LAUNCHER',
	'SLEEPY KITTENS',
];
const thirdLevelWords = [
	'ITS SO FLUFFY',
	'STATUE OF LIBERTY',
	'MINIONS ASSEMBLE',
	'DUMONT DIAMOND',
	'EL MACHO',
	'ANTI VILLIAN LEAGUE',
];

// Player 1
/*------------------------------------STATE VARIABLES-------------------------------------*/
// The Score
let score = 0;
// The Game Count
let gameCount = 0;
// How many guesses left until the minion is built
let chancesLeft = 7;
let level = 1;

let winArray = []; //We'll add an element to this array with every correct letter
let wordLength;
// The current phrase/word that has been selected
let currentWord;

/*---------------------------------------FUNCTIONS-----------------------------------------*/
let unusedWordArray = words;
function init() {
	score = 0;
	scoreEl.innerText = `Score: ${score}`;
	gameCount = 0;
	chancesLeft = 7;
	chancesLeftBoard.innerText = `Chances Left: 0${chancesLeft}`;
	level = 1;
	levelEl.innerText = `Level: 0${level}`;
	winArray = [];
	wordLength = 0;
	unusedWordArray = words;
	for (let i = 0; i < 12; i++) {
		progress[i].style.removeProperty("background-color");
	}
}
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
	array.forEach((element, index) => {
		if (element === ' ') {
			array.splice(index, 1, '_');
			howManySpaces.push('1'); //Will add one number for each space
		} else return;
	});
	dashesLength = array.length;
	wordLength = array.length - howManySpaces.length;
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
		} else if (level === 3) {
			let image = stuartStep[steps];
			minionImage.setAttribute('src', image);
		}
		chancesLeftBoard.innerText = `Chances Left: 0${chancesLeft}`;
	}
	return chancesLeft;
}

// Check Win (needs to be called after each turn)
function checkWin() {
	if (winArray.length === wordLength) {
		gameCount++;
		console.log(gameCount);
		progress[gameCount - 1].style.backgroundColor = 'teal';
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
	if (gameCount === 5) {
		levelWin.innerText = `YOU WON LEVEL 1!!`;
		levelWinScore.innerText = `Your score was ${score}`;
		winLevelModalFunc();
		level = 2;
		levelEl.innerText = `Level: 0${level}`;
		unusedWordArray = secondLevelWords; //---------------------------ADD A SECOND LEVEL
		return unusedWordArray;
	} else if (gameCount === 9) {
		levelWin.innerText = `YOU WON LEVEL 2!!`;
		levelWinScore.innerText = `Your score was ${score}`;
		winLevelModalFunc();
		level = 3;
		levelEl.innerText = `Level: 0${level}`;
		unusedWordArray = thirdLevelWords; //---------------------------ADD A SECOND LEVEL
		return unusedWordArray;
	} else if (gameCount === 12) {
		winGameModal();
	}
	return unusedWordArray;
}

function checkLose() {
	if (chancesLeft === 0) {
		setTimeout(loseGameModal, 1000);
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
	chancesLeftBoard.innerText = `Chances Left: 0${chancesLeft}`;
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

/*-----------------------------------------------POP UP FUNCTIONALITY -------------------*/
// Function to change modal display to 'block'
const openModal = () => {
	modal.style.display = 'block';
};
// Event handler to close the modal
const startGameM = () => {
	startGameModal.style.display = 'none';
};
//Add event listener to About the Game button
howToPlay.addEventListener('click', openModal);
//Add event listener to Close button
startGame.addEventListener('click', startGameM);

/*-------------------------------------------------MENU FUNCTIONALITY -------------------*/

// Event handler to close the modal
const closeModal = () => {
	modal.style.display = 'none';
	startGameModal.style.display = 'none';
};
//Add event listener to About the Game button
menuButton.addEventListener('click', openModal);
//Add event listener to Close button
close.addEventListener('click', closeModal);

/*-----------------------------------------------LOSE GAME ---------------------------------*/
const loseGameModal = () => {
	loseModal.style.display = 'block';
};
retryButton.addEventListener('click', () => {
	// location.reload();
	loseModal.style.display = 'none';
	init();
	resetBoard();
});

/*-----------------------------------------------WIN GAME ---------------------------------*/
const winGameModal = () => {
	winModal.style.display = 'block';
};
replayButton.addEventListener('click', () => {
	// location.reload();
	winModal.style.display = 'none';
	init();
	resetBoard();
});

/*-----------------------------------------------WIN LEVEL ---------------------------------*/
const winLevelModalFunc = () => {
	winLevelModal.style.display = 'block';
	setTimeout(closeWinLevelModal, 5000);
};
const closeWinLevelModal = () => {
	winLevelModal.style.display = 'none';
};
