/*-----------------------------------DOM ELEMENTS TO GRAB-----------------------------------*/
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
//Making an array of the variables so I can call them out more easily
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
//Other elements on the DOM
const minionImage = document.querySelector('.minionImage');
const chancesLeftBoard = document.querySelector('.chancesLeft');
const flexDown = document.querySelector('.flex-down');
const levelEl = document.querySelector('.level');
const scoreEl = document.querySelector('.score');

//Creating 3 different minions for wrong guesses (one minion per level)
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
	'https://i.ibb.co/S3TcDvC/evil-Step1.png',
	'https://i.ibb.co/zPCF25v/evil-Step2.png',
	'https://i.ibb.co/NmBNybW/evil-Step3.png',
	'https://i.ibb.co/7W9Bx6C/evil-Step4.png',
	'https://i.ibb.co/s5qrYkK/evil-Step5.png',
	'https://i.ibb.co/Yyb9Hw7/evil-Step6.png',
	'https://i.ibb.co/F8F9kQv/evil-Step7.png',
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

// Phrases/words the computer can pick from- 3 levels
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
// which level the player is on
let level = 1;

let winArray = []; //We'll add an element to this array with every correct letter so I can see if they have won that word
//Will need to compare the winArray length and wordlength
let wordLength;
// The current phrase/word that has been selected
let currentWord;
// Will initialize an array with all of the words, then take every word off that is used
let unusedWordArray = words;

/*---------------------------------------FUNCTIONS-----------------------------------------*/
// Initialize function to set everything back to its initial values
function init() {
	score = 0;
	scoreEl.innerText = `Score: ${score}`;
	gameCount = 0;
	chancesLeft = 7;
	chancesLeftBoard.innerText = `Chances Left: 0${chancesLeft}`;
	level = 1;
	levelEl.innerText = `Level: 0${level}`;
	winArray = []; //empty out the winArray
	wordLength = 0;
	unusedWordArray = words;
	for (let i = 0; i < 12; i++) {
		progress[i].style.removeProperty('background-color'); //remove the background color for the progress boxes
	}
}

// Randomly choose a phrase/word AND make sure that word is not picked again
function pickNewWord() {
	currentWord =
		unusedWordArray[Math.ceil(Math.random() * unusedWordArray.length) - 1];
	let currentWordIndex = unusedWordArray.indexOf(currentWord);
	unusedWordArray.splice(currentWordIndex, 1);
	return currentWord;
}
pickNewWord(); //Need to call out the function to pick a new word
console.log(currentWord); //NEED to keep this in here to test out levels

// Display dashes on the screen//
function dashes(word) {
	//Split the word into its letters and put it into an array
	let array = word.split('');
	//Make a new array that counts how many spaces there are so we can remove that many characters from word length
	let howManySpaces = [];
	array.forEach((element, index) => {
		if (element === ' ') {
			//Remove any spaces and replace with an underscore (need to be able to use the spaces)
			array.splice(index, 1, '_');
			howManySpaces.push('1'); //Will add one number for each space
		} else return;
	});
	dashesLength = array.length; //How many dashes to display on the screen (the _ have a class to make their heights incredibly small)
	wordLength = array.length - howManySpaces.length; //how many actual letters -- need this to compare how many letters they guessed right
	// Create one dash per character in the array
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
		//CORRECT GUESS
		//Going to need a loop to check each letter and return it's index
		const emptyDash = document.querySelectorAll(`.${letter}`);
		for (let i = 0; i < emptyDash.length; i++) {
			emptyDash[i].innerText = letter;
			winArray.push('1'); //this means when winArray.length = emptyDash.length -> the player wins
		}
	} else {
		//INCORRECT GUESS
		clickedSquare.classList.add('wrong'); //Add class to turn letter a different color
		chancesLeft--;
		let steps = 6 - chancesLeft; //which step the image should be at
		//Different levels have different minions
		if (level === 1) {
			let image = minionStep[steps];
			minionImage.setAttribute('src', image);
		} else if (level === 2) {
			let image = stuartStep[steps];
			minionImage.setAttribute('src', image);
		} else if (level === 3) {
			let image = evilStep[steps];
			minionImage.setAttribute('src', image);
		}
		chancesLeftBoard.innerText = `Chances Left: 0${chancesLeft}`; //Update chances left on the scoreboard
	}
	return chancesLeft;
}

// Check Win (needs to be called after each turn)
function checkWin() {
	if (winArray.length === wordLength) {
		gameCount++;
		progress[gameCount - 1].style.backgroundColor = 'teal'; //update the progress boxes to reflect how many words have been guessed correctly
		scoreChange(); //update the score
		setTimeout(winGame, 1000); //see if they have won the game
		setTimeout(resetBoard, 1000); //Wanted a delay after the last letter is selected before you reset the board
		return;
	} else {
		return;
	}
}
//Update score
function scoreChange() {
	// I want the score to reflect how many letters the player guessed right vs wrong
	let clickedLetters = document.querySelectorAll('.clicked');
	let wrongGuesses = document.querySelectorAll('.wrong');
	let rigthGuesses = clickedLetters.length - wrongGuesses.length;
	score += 2 * rigthGuesses; //2 points for each correct guess - 1 point for each incorrect guess
	score -= 1 * wrongGuesses.length;
	return score;
}

//Function to go up levels and eventually win!
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
		setTimeout(winGameModal, 1000);
	}
	return unusedWordArray;
}
//Check if the player lost, want a delay so they can see the full minion before the modal pops up
function checkLose() {
	if (chancesLeft === 0) {
		setTimeout(loseGameModal, 1000);
	}
}
// Will need to reset the board with every new word
function resetBoard() {
	let div = document.querySelectorAll('.dashes');
	for (let i = 0; i < dashesLength; i++) {
		flexDown.removeChild(div[i]); //remove the dashes on the screen
	}
	let clickedLetters = document.querySelectorAll('.clicked');
	for (let i = 0; i < clickedLetters.length; i++) {
		clickedLetters[i].classList.remove('clicked'); //remove the background change for the clicked letters
	}
	let wrongLetters = document.querySelectorAll('.wrong');
	for (let i = 0; i < wrongLetters.length; i++) {
		wrongLetters[i].classList.remove('wrong'); //remove the background change for incorrect letters
	}

	winArray = []; //empty win array
	minionImage.setAttribute('src', ''); //No image should be displayed
	chancesLeft = 7;
	chancesLeftBoard.innerText = `Chances Left: 0${chancesLeft}`; //reset scoreboard
	scoreEl.innerText = `Score: ${score}`;

	pickNewWord(); //pick a new word
	console.log(currentWord); //I like to cheat a lot while trying out the game
	dashes(currentWord); //put new dashes on the screen
}

//EVENT LISTENERS//
// Click on a letter
flex.addEventListener('click', (event) => {
	event.preventDefault();
	// Check if that letter has already been clicked
	if (event.target.classList.contains('clicked')) {
		//disables anything from happening if that letter has already been selected
		return;
	} else if (event.target.classList.contains('alpha')) {
		//makes it to where you can only click on a letter (not other parts of the div)
		let letter = event.target.innerText; //grab the innerText of the letter
		let clickedSquare = event.target;
		compareLetters(currentWord, letter, clickedSquare); //see if the letter clicked is in the word
		event.target.classList.add('clicked'); //add a class of clicked to the clicked letter- change colors
		checkWin(); //see if that word was guessed correctly
		checkLose(); //see if the player lost (chances =0)
	} else {
		return 1;
	}
	return 'complete';
});

/*-----------------------------------------------POP UP FUNCTIONALITY -------------------*/
// Function to show how to play modal
const openModal = () => {
	modal.style.display = 'block';
};
// Close the how to play modal
const startGameM = () => {
	startGameModal.style.display = 'none';
};
//Allow the how to play button to open the modal
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
//Allow the player to retry- will reset all of the board
retryButton.addEventListener('click', () => {
	loseModal.style.display = 'none';
	init();
	resetBoard();
});

/*-----------------------------------------------WIN GAME ---------------------------------*/
const winGameModal = () => {
	winModal.style.display = 'block';
};
replayButton.addEventListener('click', () => {
	winModal.style.display = 'none';
	init();
	resetBoard();
});

/*-----------------------------------------------WIN LEVEL ---------------------------------*/
const winLevelModalFunc = () => {
	winLevelModal.style.display = 'block';
	setTimeout(closeWinLevelModal, 5000); //want the level modal to automatically close
};
const closeWinLevelModal = () => {
	winLevelModal.style.display = 'none';
};
