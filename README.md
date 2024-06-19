# Snake Game

This is a simple and fun Snake game built using HTML, CSS, and JavaScript. It features a classic gameplay experience with added options for different difficulty levels and high score tracking.

   ![2](https://github.com/anlbora/SnakeGame---JavaScript/assets/100442507/9f1aed03-7cd0-4c65-be1f-c4966df9b50d)

## How to Play

1. **Start the Game**: When you load the game, you will be prompted to select a difficulty level: Easy, Medium, or Hard.
   
   ![1](https://github.com/anlbora/SnakeGame---JavaScript/assets/100442507/08b70512-94b5-4013-b3d2-0198c1917c56)
   
3. **Control the Snake**: Use the arrow keys on your keyboard to control the snake's direction:
   - Arrow Up: Move Up
   - Arrow Down: Move Down
   - Arrow Right: Move Right
   - Arrow Left: Move Left
4. **Objective**: Eat the red food squares to grow the snake and increase your score.
5. **Avoid Collisions**: The game ends if the snake collides with the borders of the play area or with its own body.
6. **Game Over**: When the game is over, a modal will display your score and provide an option to replay the game.
   
   ![3](https://github.com/anlbora/SnakeGame---JavaScript/assets/100442507/bba6cbf4-185c-4b10-8342-62b15a7e2791)

## Features

- **Difficulty Levels**: Choose from Easy, Medium, and Hard, which affect the speed of the snake.
- **High Score Tracking**: Your highest score is saved using local storage and displayed during gameplay.
- **Responsive Design**: The game scales and adapts to different screen sizes for a consistent experience.

## Files

- **index.html**: Contains the HTML structure for the game.
  ```
       <!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Snake Game</title>
       <link rel="stylesheet" href="style.css">
       <script src="script.js" defer></script>
   </head>
   
   <body>
       <div class="wrapper">
           <div class="game-details">
               <span class="score">Score: 0</span>
               <span class="highscore">High Score: 0</span>
           </div>
           <div class="play-board"></div>
       </div>
   
       <!-- Game Over Modal -->
       <div class="game-over-modal" id="gameOverModal">
           <div class="game-over-content">
               <h2>Game Over!</h2>
               <p>Your Score: <span id="finalScore">0</span></p>
               <button onclick="restartGame()">Replay</button>
           </div>
       </div>
   
       <!-- Difficulty Selection Modal -->
       <div class="difficulty-modal" id="difficultyModal">
           <div class="difficulty-content">
               <h2>Select Difficulty</h2>
               <button onclick="startGame('easy')">Easy</button>
               <button onclick="startGame('medium')">Medium</button>
               <button onclick="startGame('hard')">Hard</button>
           </div>
       </div>
   </body>
   
   </html>
  ```
- **style.css**: Provides the styles and layout for the game interface.
  ```
     @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');
   
   * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
       font-family: 'Open Sans', sans-serif;
   }
   
   body {
       display: flex;
       align-items: center;
       justify-content: center;
       min-height: 100vh;
       background-color: #E3F2FD;
   }
   
   .wrapper {
       width: 65vmin;
       height: 70vmin;
       display: flex;
       flex-direction: column;
       border-radius: 5px;
       background-color: #193447;
   }
   
   .game-details {
       color: #B8C6DC;
       font-size: 1.2rem;
       font-weight: 500;
       padding: 20px 27px;
       display: flex;
       justify-content: space-between;
   }
   
   .play-board {
       width: 100%;
       height: 100%;
       display: grid;
       grid-template-rows: repeat(30, 1fr);
       grid-template-columns: repeat(30, 1fr);
       background-color: #212837;
   }
   
   .play-board .food {
       background-color: #ff003d;
   }
   
   .play-board .head {
       background-color: #B8C6DC;
   }
   
   .play-board .body {
       background-color: #4CAF50; /* Added color for body segments */
   }
   
   /* Game Over Modal Styles */
   .game-over-modal {
       display: none; /* Hidden by default */
       position: fixed; 
       z-index: 1; 
       left: 0;
       top: 0;
       width: 100%;
       height: 100%;
       overflow: auto;
       background-color: rgb(0,0,0); 
       background-color: rgba(0,0,0,0.4); 
       align-items: center;
       justify-content: center;
   }
   
   .game-over-content {
       background-color: #fefefe;
       margin: auto;
       padding: 20px;
       border: 1px solid #888;
       width: 80%;
       max-width: 300px;
       text-align: center;
       border-radius: 10px;
   }
   
   .game-over-content h2 {
       font-size: 2rem;
       margin-bottom: 1rem;
   }
   
   .game-over-content p {
       font-size: 1.2rem;
       margin-bottom: 1.5rem;
   }
   
   .game-over-content button {
       padding: 10px 20px;
       font-size: 1rem;
       background-color: #4CAF50;
       color: white;
       border: none;
       border-radius: 5px;
       cursor: pointer;
   }
   
   .game-over-content button:hover {
       background-color: #45a049;
   }
   
   /* Difficulty Selection Modal Styles */
   .difficulty-modal {
       display: flex; /* Show by default for initial selection */
       position: fixed; 
       z-index: 1; 
       left: 0;
       top: 0;
       width: 100%;
       height: 100%;
       overflow: auto;
       background-color: rgb(0,0,0); 
       background-color: rgba(0,0,0,0.4); 
       align-items: center;
       justify-content: center;
   }
   
   .difficulty-content {
       background-color: #fefefe;
       margin: auto;
       padding: 20px;
       border: 1px solid #888;
       width: 80%;
       max-width: 300px;
       text-align: center;
       border-radius: 10px;
   }
   
   .difficulty-content h2 {
       font-size: 2rem;
       margin-bottom: 1rem;
   }
   
   .difficulty-content button {
       padding: 10px 20px;
       font-size: 1rem;
       margin: 5px;
       background-color: #4CAF50;
       color: white;
       border: none;
       border-radius: 5px;
       cursor: pointer;
   }
   
   .difficulty-content button:hover {
       background-color: #45a049;
   } 
  ```
- **script.js**: Implements the game logic, including snake movement, collision detection, and scoring.
  ```
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
  ```
