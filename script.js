// Define HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');

// Define game variables
const gridSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw snake, game map, and food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
}

// Draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement)
    });
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set position of snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// Testing draw function
// draw();

// Draw a food piece on the board
function drawFood() {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

// Randomly generate food, different position each game load
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

// Move the snake, starting at the head and allowing one block of space between the head and the tail
function move() {
    const head = { ... snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    snake.unshift(head);

    // snake.pop();

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(); // Clear past interval
        gameInterval = setInterval(() => {
            move();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

// // Test motion of snake after adding all 'move' functionality
// setInterval(() => {
//     move(); // Move first
//     draw(); // Then draw the new position again
// }, 200);

// Starts a new game with randomized food and standard snake position
function startGame()  {
    gameStarted = true; // Keep track of a running game
    instructionText.style.display = 'none'; // Hides instructions after start of game
    logo.style.display = 'none'; // Hides logo after start of game
    gameInterval = setInterval(() => {
        move();
        // checkCollision();
        draw();
    }, gameSpeedDelay);
}

// Keypress event listener to start game
function handleKeyPress(event) {
    if (
        (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === ' ')
    )   {
        startGame();
    } else {
        switch(event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}

document.addEventListener('keydown', handleKeyPress);
