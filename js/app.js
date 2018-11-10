const qwerty 					= document.getElementById('qwerty');
const visbilePhrase 	= document.querySelector('#phrase ul');

let button_startGame 	= document.querySelector(".btn__reset");
let overlay 					= document.getElementById('overlay');
let phrase_container 	= document.querySelector('#phrase ul');
let get_button 				= document.querySelector('button');
let get_hearts 				= document.querySelectorAll('.tries');
let get_title 				= document.querySelector('.title');
let titleText 				= document.querySelector('#overlay .title');
let btn_star 					= document.querySelector('.btn__reset');
let missed 						= 0;


// =============
// STARTGAME
// =============
button_startGame.addEventListener('click', startGame);

function startGame() {
    overlay.className += ' showGame';

    setTimeout(function() {
        overlay.style.display = 'none';
    }, 550);;
}


// =============
// SET PHRASES
// =============
let phrases = [
    "copycat",
    "roger that",
    "throw caution to the wind",
    "goose bumps",
    "call it a day"

];

// ========================
// GENERATE RANDOM PHRASES
// ========================
function getRandomPhraseAsArray(arr) {
    let randomPhrase = Math.floor(Math.random() * arr.length);
    return arr[randomPhrase].split("");
}

const phraseArray = getRandomPhraseAsArray(phrases);

//Print random phrases on html
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {

        let letter = arr[i];
        let li = document.createElement('li');

        li.textContent = letter;
        phrase_container.appendChild(li);

        if (li.textContent !== " ") {
            li.className = "letter";
        } else {
            li.className = "space";
        }
    }
}

console.log(phraseArray);

addPhraseToDisplay(phraseArray);


// ========================
// CHECK FOR LETTER
// ========================
function checkLetter(event) {
    let char = document.querySelectorAll('.letter');
    let result = null;

    for (let i = 0; i < char.length; i++) {
        if (char[i].textContent == event.textContent) {

            char[i].classList.add("show");
          	char[i].style.boxShadow = '5px 4px 10px 0px #9e9e9e';
          	char[i].style.transition = 'ease 0.5s';

            result = event;
        }
    }
    return result;
}



// ========================
// SET EVENT CLICK
// ========================
qwerty.addEventListener('click', function(event) {

    let target_tagName = 'BUTTON';
    let get_tagName = event.target.tagName;

    if (target_tagName == get_tagName) {

        event.target.className = "chosen";
        event.target.disabled = true;

        let letterFound = checkLetter(event.target);

        if (letterFound === null) {

            missed++;

            let lost_heart = document.querySelector('.tries');
            lost_heart.remove();

        }
        checkWin();
    }

});



// ========================
// ADDONS FOR CHECKWIN
// ========================
function set_flex(e){
	e.style.display = 'flex';
};

function reset_game(event){
	event.addEventListener('click', function() {
	    window.location.reload(true);
	});
};


// ========================
// CHECK IF YOU WON!!!
// ========================
function checkWin() {

		//get_hearts.length = 5

    if (missed === get_hearts.length) {

    		console.log(get_hearts.length);
        overlay.className = "lose";
        titleText.textContent = "Oh no!! ... You Lost!";
        btn_star.textContent = "Try Again!";
        set_flex(overlay);
        reset_game(button_startGame);

    }
    
    let get_letters = document.querySelectorAll('.letter');
    let get_shows 	= document.querySelectorAll('.show');
    
    if (get_shows.length == get_letters.length) {
        
        overlay.className = "win";
        titleText.textContent = "Hey! You Won!!!";
        btn_star.textContent = "Play Again!"
        set_flex(overlay);
        reset_game(button_startGame);

    }
}