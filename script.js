// Define HTML elements
const board = document.getElementById('game-board');

// Define game variables
const gridSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction = 'right';

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
draw();

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
        case 'right':
            head.x++
            break;

        default:
            break;
    }
}
