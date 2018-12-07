// Create Variables for the game 
var wordBank = ['mordicai' , 'rigby' , 'muscle man' , 'pops' , 'skips' , 'benson'];
var randomWord = "";
var lettersOfWord = [];
var blanks = 0;
var blanksAndCorrect = [];


// this varibales to win or lose
var win = 0;
var losses = 0;
var guessesLeft = 9;


function Game(){

    // it generate a random word from the word bank
    randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // variable that splits the random word in to the html tag 
    lettersOfWord = randomWord.split('');

    // keeps count of letterOfWord
    blanks = lettersOfWord.length;
    
    // for loop that displays a blanks spaces in the class
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect[i] = "_";
    } 

    // console log this variable
    console.log(randomWord);
    console.log(lettersOfWord);
    console.log(blanks);
    console.log(blanksAndCorrect);

    

};

// activate function 
Game();

// RESET FUNCTION
function reset() {
    guessesLeft = 9;
    wrongWord = [];
    blanksAndCorrect = [];

    Game()
}


// if letters selected match the random
function checkLetters(letter){

    var wrongGuess = [];

    var letterInWord = false;

    for( var i = 0; i < blanks; i++){
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }

    // if false 
    if (letterInWord) {

        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    
    // Otherwise push the incorrect letter to the guessed word section
    else{
        wrongGuess.push(letter);
        guessesLeft--;    
    }

    document.getElementById("string-guess").innerHTML = wrongGuess;  // pushing "_" in to the class

    console.log (blanksAndCorrect);

}

// What will happen if you win or lose 
function complete() {


    //if WON...then reset new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        win++;
        losses--;
        reset()

        //display wins on screen
        document.getElementById("wins").innerHTML = " " + win;
        
    
        //if LOST... reset new round
    } 
    
    else if (guessesLeft === 0) {
        guessesLeft++;
        losses++;
        reset()
        document.getElementById("losses").innerHTML = " " + losses;
    }

    else if (losses === 5){
        alert("What a loser! The computer won and you stink... REFRESH PAGE TO TRY AGAIN")
        reset()
    }

    else if (wins === 5){
        alert("Uhhh.. You beat the computer good job... REFRESH PAGE TO PLAY AGAIN")
        reset()

    }

    //display losses on screen && guesses remaining countdown
    document.getElementById("placeholder").innerHTML = " " + blanksAndCorrect.join(" ");
    document.getElementById("number-guess").innerHTML = guessesLeft;
}

// call function
Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();

    //check to see if guess entered matches value of random word
    checkLetters(guesses);

    //process wins/loss 
    complete();

    //store player guess in console for reference 
    console.log(guesses);

    //display incorrect letters on screen
    document.getElementById("string-guess").innerHTML = wrongGuess.push(guesses);   
    document.getElementById("placeholder").innerHTML = blanksAndCorrect;

}

