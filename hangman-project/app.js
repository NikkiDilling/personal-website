
////////////////////////Variables

//appending new letter elements here (to guess)
const wordContainer = document.querySelector(".word-container"); 
//Array with words to guess
const words = ["APPLE", "COMPUTER", "BLANKET", "SHOWERCURTAIN", "WEBSITE", "HANGMAN", "FLOWER", "CARDS", "PUPPY"];
//Container for alphabet letters to use with event listener onclick
const alphabet = document.querySelectorAll('.alphabet-letter');
//variable for saving letter elements that are placed in the word-container to an array
let lettersToGuess;
//Variable for displaying number of mistakes to the player
let mistakeCountDisplay = document.querySelector('.mistakes-count-num');
const btnNewWord = document.querySelector('#btn');
let gameStatusContainer = document.querySelector('.game-win-lose');
let gameStatusInfo = document.querySelector('.game-status');
let guessedCounter = 0;
let mistakeCount = 0;

//Generating random number to use as indexes to words[]
let randomNumber = Math.floor((Math.random() * (8 - 0 + 1)) + 0);
//Picking the word for the user to guess
let wordToGuess = words[randomNumber];
//Array to save the indexes of all occurrences of a letter in a word
let letterArrayIndexes = [];


function setWord(){

    for(i=0; i < wordToGuess.length; i++){
        
        
        let letter = document.createElement('div');
        letter.classList.add('letter');
        letter.innerText = "X";
        wordContainer.appendChild(letter);
        
        //console.log(i +"th letter created");

    }

}


//Function that makes the hangman drawing element visible based on the mistake count
function showHangman(){

    switch(mistakeCount){
        case 1: 
                document.querySelector('.bottom-line').style.display = 'block';
                break;
        case 2: 
                document.querySelector('.horizontal-line').style.display = 'block';
                break;
        case 3:
                document.querySelector('.vertical-line').style.display = 'block';
                break;
        case 4:
                document.querySelector('.binding-line').style.display = 'block';
                break;
        case 5:
                document.querySelector('.rope').style.display = 'block';
                break;         
        case 6:
                document.querySelector('.head').style.display = 'block';
                break;
        case 7:
                document.querySelector('.body').style.display = 'block';
                break;
        case 8:
                document.querySelector('.left-arm').style.display = 'block';
                break; 
        case 9:
                document.querySelector('.right-arm').style.display = 'block';
                break;
        case 10:
                document.querySelector('.left-leg').style.display = 'block';
                break;
        case 11:
                document.querySelector('.right-leg').style.display = 'block';

                
    }

    //For debugging
    //console.log("(f)mistake count: " + mistakeCount);

}

//adding event listener to all alphabet letters individually
alphabet.forEach(e => {
    e.addEventListener('click',function guessLetter(e){

        //For debugging
        //console.log(e.target.innerText + " is pressed");
    
        if(wordToGuess.includes(`${e.target.innerText}`)){
    
            /* For Debugging
            console.log(`letter ${e.target.innerText} exists`);
            console.log("index of letter: " + wordToGuess.indexOf(`${e.target.innerText}`));
            */
    
            //saving indexes of all occurences of the letter that is clicked into an array
            for(let i = 0; i < wordToGuess.length; i++){
    
                if(wordToGuess[i] === `${e.target.innerText}`){
                    letterArrayIndexes.push(i);
                }
            }
            
            //saving letter elements that are placed in the word-container to an array
            lettersToGuess = document.querySelectorAll(".letter");

            //Checking indexes of letters and revealing letters of the word to the player
            //outer loop going through indexes
            for(let i=0; i < letterArrayIndexes.length; i++){
    
                //inner loop going through the letter elements in the word-container
                for(let j = 0; j < lettersToGuess.length; j++){
    
                    if(j === letterArrayIndexes[i]){
                        lettersToGuess[j].innerText = e.target.innerText;
                        lettersToGuess[j].style.color = "#161616";
                        console.log('letter is placed at: ' + j);
                        //increasing guessed counter
                        guessedCounter++;

                        if(guessedCounter === wordToGuess.length){
                            gameStatusInfo.innerText = "You've Won!"
                            gameStatusInfo.style.backgroundColor= "rgb(" + 13 + "," + 188 + "," + 100 + ")";
                        }
                    }
                }
    
            }
    
            letterArrayIndexes = []; //emptying the index array 
    
        }else{
            console.log(`letter ${e.target.innerText} does not exist`);
    
            //updating mistake count
            mistakeCount++;
   
            //function that displays the hangman drawing when a mistake is made
            showHangman();
                                    
            //Updating mistake count visually 
            if(mistakeCount <= 11){
               
                mistakeCountDisplay.innerText = `${11-mistakeCount}`;
                
                //checking mistake count to display "Game Over" element
                if(mistakeCount === 11){
                    gameStatusInfo.innerText = "Game Over!"
                    gameStatusInfo.style.backgroundColor ="rgb(" + 188 + "," + 13 + "," + 13 + ")";
                }
            }

        }
        
        //visibly setting the element to be inactive
        e.target.classList.add('inactive');
         //removing event listener
         e.target.removeEventListener('click',guessLetter);
        
    })
});


btnNewWord.addEventListener('click', function(){
    //resetting variables
    mistakeCount = 0;
    guessedCounter = 0;
    randomNumber = Math.floor((Math.random() * (8 - 0 + 1)) + 0);
    wordToGuess = words[randomNumber];
    letterArrayIndexes = [];
    lettersToGuess = document.querySelectorAll(".letter");
    mistakeCountDisplay.innerText = ` 11`;
    gameStatusInfo.style.backgroundColor= "white";

    //resseting inactive class on alphabet
    for(let i=0; i< alphabet.length; i++){
        alphabet[i].classList.remove('inactive');
    }

    //resetting the hangman drawing
    let hangmanArray = document.querySelectorAll('.drawing');
    for(let i = 0; i < hangmanArray.length; i++){
        console.log("deleted");
        hangmanArray[i].style.display = "none";
    }

    //deleting all previous nodes
    for(let i = 0; i < lettersToGuess.length; i++){
        console.log("deleted");
        wordContainer.removeChild(wordContainer.firstChild);
    }
    
    //displaying new word
    setWord();
});


//Calling function that creates letter elements
setWord();




