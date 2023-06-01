const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


// List of words for game

const words = [
    'cat', 'glizzy', 'dog', 'car', 'run', 'cup', 'bed', 'hat', 'pen', 'key', 'sit',
    'book', 'jump', 'tree', 'lamp', 'fish', 'ball', 'kite', 'bird', 'shoe', 'hand',
    'music', 'happy', 'beach', 'smile', 'apple', 'pizza', 'tiger', 'ocean', 'guitar', 'rabbit',
    'flower', 'monkey', 'coffee', 'camera', 'purple', 'dragon', 'flight', 'pillow', 'castle', 'autumn',
    'puzzle', 'sunset', 'popcorn', 'diamond', 'bicycle', 'rainbow', 'elephant', 'computer', 'butterfly', 'waterfall',
    'chocolate', 'hummingbird', 'universe', 'marshmallow', 'crocodile', 'helicopter', 'mermaid', 'firework', 'telescope', 'skateboard',
    'jellyfish', 'gingerbread', 'skyscraper', 'xylophone', 'chameleon', 'caterpillar', 'astronaut', 'rhinoceros', 'pomegranate', 'snowflake',
    'thunderstorm', 'watermelon', 'kangaroo', 'giraffe', 'pterodactyl', 'zucchini', 'cheetah', 'scorpion', 'platypus', 'chimpanzee',
    'bumblebee', 'seahorse', 'croissant', 'iguana', 'hummingbird', 'pineapple', 'triceratops', 'orangutan', 'quokka', 'peacock',
    'velociraptor', 'hippopotamus', 'anteater', 'narwhal', 'flamingo', 'armadillo', 'rhinoceros', 'kangaroo', 'toucan', 'porcupine'
];

// Init word
let randomWord;

//Init score
let score = 0;

// Init time

let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';


// Focus on text on start (put cursor in text box)
text.focus();

// Start couting down (Timer)
const timeInterval = setInterval(updateTime, 1000);


// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}


// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;

}

// Update Score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}


// Update Time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

// Game over, show end screen

function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

addWordToDOM();



// Event Listeners

// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        //Clear
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 4;
        }

        updateTime();
    }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);

});

