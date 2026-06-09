// Math.floor rounds to a lower value, Math.round rounds to either lower or higher depending on the number
let number = Math.floor(Math.random() * 100 + 1);

// initialize attempts variable
let attempts = 0;


// Creates a function called newGame() that basically resets the game so the user can guess the number again
function newGame()
{
    number = Math.floor(Math.random() * 100 + 1);
    document.getElementById("guess").focus();
    document.getElementById("guess").select();
    attempts = 0;
}


// Creates a function called checkGuess() that is the base code for the guessing game
function checkGuess()
{
    let guess = document.getElementById("guess").value;
    let msg = "";
    attempts++;
    if (guess > number)
        msg = guess + " was too high. Try again.";
    else if (guess < number)
        msg = guess +  " was too low. Try again.";
    else {
        const audio = document.getElementById("gamewin");
        audio.play();
        msg = guess + " was the number! You win!";
        msg = msg + " Try a new game :).";
        msg = msg + " You won in " + attempts + " tries.";

let scoreboard = document.getElementById("scoreboard");
        scoreboard.innerHTML = 
            "You guessed " + guess + " in " + attempts + " attempts. <br>" + scoreboard.innerHTML;
        newGame();
    }
    
    let output = document.getElementById("output");
        output.innerHTML = msg; // innerHTML property returns text content as instructed
        document.getElementById("guess").focus(); // makes this the active element of a webpage
        document.getElementById("guess").select(); // selects an element on a webpage
}

// I really liked when we did this in one of our other assignments so I decided to add it to this JS Challenge :)
// Creates a function named random which creates a random number to be used in the backgroundChange function
function random(number)
{
    return Math.floor(Math.random()*number);
}

// Creates a function to change the color of the background to a random color
function backgroundChange()
{
    let color = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
    document.body.style.backgroundColor = color;
}
