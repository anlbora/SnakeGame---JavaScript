const playBoard = document.querySelector(".play-board");
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameInterval;
let GameOver = false;
let gameSpeed = 125; // Default game speed

// Function to change the food position to a random location
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Function to change the direction of the snake based on arrow keys
const changeDirection = (e) => {
    // Prevent the snake from reversing direction
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
}

// Function to display game over message and stop the game
const gameOver = () => {
    clearInterval(gameInterval);
    GameOver = true;
    document.getElementById("finalScore").textContent = score;
    document.getElementById("gameOverModal").style.display = "flex";
}

// Function to restart the game
const restartGame = () => {
    // Reset game state
    snakeX = 5;
    snakeY = 10;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    score = 0;
    GameOver = false;

    // Update the score display
    document.querySelector(".score").textContent = `Score: ${score}`;
    document.querySelector(".highscore").textContent = `High Score: ${highScore}`;

    // Hide the game over modal
    document.getElementById("gameOverModal").style.display = "none";

    // Show difficulty selection modal
    document.getElementById("difficultyModal").style.display = "flex";
}

// Function to start the game based on selected difficulty
const startGame = (difficulty) => {
    switch (difficulty) {
        case 'easy':
            gameSpeed = 200; // Slower speed for easy
            break;
        case 'medium':
            gameSpeed = 125; // Medium speed
            break;
        case 'hard':
            gameSpeed = 75; // Faster speed for hard
            break;
    }

    // Hide the difficulty modal
    document.getElementById("difficultyModal").style.display = "none";

    // Initialize the food position
    changeFoodPosition();

    // Start the game with the selected speed
    gameInterval = setInterval(initGame, gameSpeed);
}

// Main function to update the game state
const initGame = () => {
    // Save the current tail position
    let tailX = snakeBody.length ? snakeBody[snakeBody.length - 1][0] : snakeX;
    let tailY = snakeBody.length ? snakeBody[snakeBody.length - 1][1] : snakeY;

    // Update snake's head position based on current velocity
    snakeX += velocityX;
    snakeY += velocityY;

    // Check for border collision (game over condition)
    if (snakeX < 1 || snakeX > 30 || snakeY < 1 || snakeY > 30) {
        gameOver();
        return;
    }

    // Check for self-collision (game over condition)
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver();
            return;
        }
    }

    // Check if the snake has reached the food
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition(); // Move the food to a new position
        // Add a new segment to the snake's body at the tail's previous position
        snakeBody.push([tailX, tailY]);
        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        document.querySelector(".score").textContent = `Score: ${score}`;
        document.querySelector(".highscore").textContent = `High Score: ${highScore}`;
    }

    // Move each part of the snake's body to follow the segment in front of it
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    // Update the first segment of the snake's body to the previous head position
    if (snakeBody.length > 0) {
        snakeBody[0] = [snakeX - velocityX, snakeY - velocityY];
    }

    // Render the food and the snake's head on the grid
    let htmlMarkup = `<div class="food" style='grid-area: ${foodY} / ${foodX}'></div>`;
    htmlMarkup += `<div class="head" style='grid-area: ${snakeY} / ${snakeX}'></div>`;

    // Render the snake's body on the grid
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="body" style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;
    }

    // Update the play board with the new positions
    playBoard.innerHTML = htmlMarkup;
}

// Show the difficulty selection modal on page load
document.getElementById("difficultyModal").style.display = "flex";

// Add event listener for keypress to change the snake's direction
document.addEventListener('keydown', changeDirection);
