class Ball {
  /**
   * 
   * @param {*} x X-coordinate of the ball
   * @param {*} y Y-coordinate of the ball
   * @param {*} diameter  Diameter of the ball
   * @param {*} v   Speed of the  ball in pixels per second
   * @param {*} direction   Direction of the ball (in degrees)
   */
  constructor(x, y, diameter, v, direction) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.v = v;
    this.direction = direction;
    this.vx = this.v * Math.cos(this.direction);
    this.vy = this.v * Math.sin(this.direction);
  }
  show() {
    if(useFastPhysics){
      stroke("red");
    } else {
      stroke("black");
    }
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
  move(dT) {
    this.x += this.vx*dT/1000;
    this.y += this.vy*dT/1000;
  }

}

class GravityBall extends Ball {
  constructor(x, y, diameter, v, direction, acc) {
    super(x, y, diameter, v, direction);
    this.acc = acc;
  }
  move(dT) {
    this.vy += this.acc*dT/1000;
    super.move(dT);
  }

}

function wallCollision(ball) {
  if (ball.x  < 0 ) {
    ball.vx = abs(ball.vx);
    ball.x = 2*0 - ball.x;
  }
  if (ball.x  > width) {
    ball.vx = -abs(ball.vx);
    ball.x = 2*width - ball.x;
  }
  if (ball.y  < 0) {
    ball.vy = abs(ball.vy);
    ball.y = 2*0 - ball.y;
  }
  if (ball.y  > height) {
    ball.vy = -abs(ball.vy);
    ball.y = 2*height - ball.y;
  }

}

let ball = new GravityBall(200, 200, 2, 100, Math.PI/2.1,60);

let checkboxPhysicsMode;
let buttonClearCanvas;
let useFastPhysics = false;
let dT = 0; // GLobal variable to store the time between requestanimationframe calls so we can easily show it on the screen

function setup() {
  createCanvas(400, 400);
  background(220);
  frameRate(6);

//  requestAnimationFrame(animateBall);
  checkboxPhysicsMode = createCheckbox('Physics Mode', false);
  checkboxPhysicsMode.changed(changePhysicsMode);

  buttonClearCanvas = createButton('Clear Canvas');
  buttonClearCanvas.mousePressed(() => {
    background(220);
  });

}

function draw() {
//  background(220);
  ball.show();
  if (!useFastPhysics) {
  ball.move(deltaTime);
  wallCollision(ball);
}
  rect(0, 0, 200, 40);
  text("deltaTime: " + deltaTime.toFixed(2), 10, 10);
  text("dT: " + dT.toFixed(2), 10, 30);

}


function animateBall(timestamp) {
  if (ball.timestamp === undefined) {
    ball.timestamp = timestamp;
  }
  dT = timestamp - ball.timestamp;

  ball.timestamp = timestamp;
  ball.move(dT);
  wallCollision(ball);
  if(useFastPhysics){
    requestAnimationFrame(animateBall);
  }
}

function changePhysicsMode() {
  if (checkboxPhysicsMode.checked()) {
    useFastPhysics = true;
    requestAnimationFrame(animateBall);
  } else {
    useFastPhysics = false;
  }
}