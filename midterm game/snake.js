let currentUser = null;
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const highScoreElement = document.getElementById('high-score');
const gameOverElement = document.getElementById('game-over');
const loginContainer = document.getElementById('login-container');
const gameContainer = document.getElementById('game-container');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');

// Game settings
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let score = 0;
let level = 1;
let speed = 150;
let gameInterval;
let isPaused = false;

// Snake properties
let snake = [{x: 10, y: 10}];
let dx = 1;
let dy = 0;

// Food properties
let food = getRandomFood();

// Handle user login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        loginContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        loadHighScore();
        startGame();
    }
});

// Load high score for the current user
function loadHighScore() {
    const userHighScore = localStorage.getItem(currentUser) || 0;
    highScoreElement.textContent = `High Score: ${userHighScore}`;
}

// Save high score for the current user
function saveHighScore() {
    if (score > getHighScore()) {
        localStorage.setItem(currentUser, score);
        highScoreElement.textContent = `High Score: ${score}`;
    }
}

// Get high score for the current user
function getHighScore() {
    return parseInt(localStorage.getItem(currentUser) || 0);
}

// Game loop
function startGame() {
    gameInterval = setInterval(gameLoop, speed);
}

function gameLoop() {
    if (isPaused) return;

    if (isGameOver()) {
        clearInterval(gameInterval);
        gameOverElement.style.display = 'block';
        saveHighScore();
        return;
    }

    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    checkFoodCollision();
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        food = getRandomFood();

        if (score % 50 === 0) {
            level++;
            levelElement.textContent = `Level: ${level}`;
            clearInterval(gameInterval);
            speed -= 10;
            startGame();
        }
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function getRandomFood() {
    let foodPosition;
    do {
        foodPosition = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y));

    return foodPosition;
}

function isGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function clearCanvas() {
    ctx.fillStyle = '#ecf0f1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp': 
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown': 
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft': 
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight': 
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
        case ' ': // Pause/Resume
            isPaused = !isPaused;
            break;
    }
});
