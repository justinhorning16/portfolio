'use strict';

let cardsArray = [{
    'name': 'shell',
    'images': 'images/blueshell.png'
}, {
    'name': 'star',
    'images': 'images/star.png'
}, {
    'name': 'bobomb',
    'images': 'images/bobomb.png'
}, {
    'name': 'mario',
    'images': 'images/mario.png'
}, {
    'name': 'luigi',
    'images': 'images/luigi.png'
}, {
    'name': 'peach',
    'images': 'images/peach.png'
}, {
    'name': '1up',
    'images': 'images/1up.png'
}, {
    'name': 'mushroom',
    'images': 'images/mushroom.png'
}, {
    'name': 'thwomp',
    'images': 'images/thwomp.png'
}, {
    'name': 'bulletbill',
    'images': 'images/bulletbill.png'
}, {
    'name': 'coin',
    'images': 'images/coin.png'
}, {
    'name': 'goomba',
    'images': 'images/goomba.png'
}];
// Duplicate array to create a match for each card
// Randomize the cards
let gameGrid = cardsArray.concat(cardsArray).sort(function (){
    return 0.5 - Math.random();
});

//  variables
let count = 0;
let firstGuess = '';
let secondGuess = '';
let previousTarget = null;
let delay = 1200;
let matchCount = 0;
const totalPairs = cardsArray.length;

// capture the div with an id of game
const game = document.getElementById('game');
// create a section with a class of grid
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
// append the grid section to the game div
game.appendChild(grid);

gameGrid.forEach(function (item)
{
// Create a div
let card = document.createElement('div');
card.classList.add('card');
card.dataset.name = item.name;

let front = document.createElement('div');
front.classList.add('front');
let back = document.createElement('div');
back.classList.add('back');
back.style.backgroundImage = 'url(' + item.images + ')';
// Append the div to the grid section
grid.appendChild(card);
card.appendChild(front);
card.appendChild(back);
});

// Add event listener to grid
grid.addEventListener('click', function(event)
{
// The event target is our clicked item
let clicked = event.target

// Do not allow the grid section itself to be selected; only select divs inside the grid
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match'))
    {
        return;
    }
// Allow only 2 cards to be selected at a time
if (count < 2)
{
    count++;
    
    if (count === 1)
    {
        // Assign first guess
        firstGuess = clicked.parentNode.dataset.name;
        console.log(firstGuess);
        clicked.parentNode.classList.add('selected');
    }
    else
    {
        // Assign second guess
        secondGuess = clicked.parentNode.dataset.name;
        console.log(secondGuess);
        clicked.parentNode.classList.add('selected')
    }
    // If both guesses are not empty...
    if (firstGuess !== '' && secondGuess !== '')
    {
        // and the first guess matches the second guess...
        if (firstGuess === secondGuess){
        // run the match function
        setTimeout(match, delay);
        }
        setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
}
});
// Add match CSS
const match = () =>
{
    var selected = document.querySelectorAll('.selected')
    selected.forEach(card =>
                    {
        card.classList.add('match')
    });
    
    matchCount++;
    
        if (matchCount === totalPairs)
    {
        setTimeout(showNewGamePrompt, 500);
    }
};
// Add reset guesses
const resetGuesses = () =>
{
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;
    
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

function showNewGamePrompt() {
    const prompt = document.createElement('div');
    prompt.classList.add('new-game-prompt');
    prompt.innerHTML = 
        `<p>You won! Play again?</p>
        <button id="restart-btn">New Game</button>`;
    document.body.appendChild(prompt);

    document.getElementById('restart-btn').addEventListener('click', () => {
        location.reload();
    });
}