

/**
 * Check for collision with the walls and change the direction of the ball if it collides with the wall
 * @param {} ball Ball object to check for collision with the walls
 */
function wallCollision(ball) {
  // left wall
  if (ball.x < 0) {
    ball.vx = abs(ball.vx); // Make sure we are always moving to the right
    ball.x = 2 * 0 - ball.x; // Mirror the position of the ball around the wall, to minimize error
  }
  // right wall
  if (ball.x > width) {
    ball.vx = -abs(ball.vx); // Make sure we are always moving to the left
    ball.x = 2 * width - ball.x;
  }
  // top wall
  if (ball.y < 0) {
    ball.vy = abs(ball.vy); // Make sure we are always moving down
    ball.y = 2 * 0 - ball.y;
  }
  // bottom wall
  if (ball.y > height) {
    ball.vy = -abs(ball.vy); // Make sure we are always moving up
    ball.y = 2 * height - ball.y;
  }

}

let ball = new GravityBall(200, 200, 2, 100, Math.PI / 2.1, 60); // Create a gravity ball object

// GUI elements to control the physics mode and clear the canvas
let checkboxPhysicsMode;
let buttonClearCanvas;
let useFastPhysics = false; // Global variable to store the physics mode (using requestAnimationFrame or not)
let dT = 0; // GLobal variable to store the time between requestanimationframe calls so we can easily show it on the screen

function setup() {
  createCanvas(400, 400);
  background(220);
  frameRate(6); // Set the frame rate to x frames per second

  // Create the GUI elements
  checkboxPhysicsMode = createCheckbox('Physics Mode', false);
  checkboxPhysicsMode.changed(changePhysicsMode);

  buttonClearCanvas = createButton('Clear Canvas');
  buttonClearCanvas.mousePressed(() => {
    // This is called a lambda function, it is a way to define a function in a single line
    // We use it here to define a function that clears the canvas when the button is pressed
    background(220);
  });

}

// This is the draw Loop, that p5.js calls every frame (as set by the frameRate function)
function draw() {
  //  background(220);
  ball.show(); // Show the ball (draw it on the screen)
  if (!useFastPhysics) {
    ball.move(deltaTime);
    wallCollision(ball);
  }
  rect(0, 0, 200, 40); // Clear the area where we will draw the text
  text("deltaTime: " + deltaTime.toFixed(2), 10, 10); // deltaTime is the time between frames set by the frameRate function
  text("dT: " + dT.toFixed(2), 10, 30); // dT is the time between requestAnimationFrame calls

}

/**
 * 
 * @param {*} timestamp This is a timestamp set by requestAnimationFrame
 */
function animateBall(timestamp) {
  if (ball.timestamp === undefined) {
    ball.timestamp = timestamp;
    // We add the timestamp to the ball object so we can calculate the time between frames
  }
  dT = timestamp - ball.timestamp; // Calculate the time between frames

  ball.timestamp = timestamp; // Update the timestamp for the next frame
  ball.move(dT); // Move the ball using the time between frames to keep constant pixel per second speed
  wallCollision(ball); // Check for collision with the walls
  if (useFastPhysics) {
    // We always need to call requestAnimationFrame to keep the animation going
    // If useFastPhysics has been disabled (the checkbox has been unchecked) we will stop calling requestAnimationFrame
    requestAnimationFrame(animateBall);
  }
}

/**
 * Function to change the physics mode when the checkbox is clicked
 */
function changePhysicsMode() {
  if (checkboxPhysicsMode.checked()) {
    useFastPhysics = true;
    // We need to call requestAnimationFrame to start the animation repeating again
    requestAnimationFrame(animateBall);
  } else {
    useFastPhysics = false;
  }
}