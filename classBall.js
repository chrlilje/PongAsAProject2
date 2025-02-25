/**
 * This example show how doing physics with a slow frame rate can lead to errors
 * Showing that we can have our physics "engine" run at a different frame rate than the draw loop
 * This is done by using requestAnimationFrame to call the physics loop
 */
class Ball {
    /**
     * Class to represent a ball object
     * 
     * @param {*} x X-coordinate of the ball
     * @param {*} y Y-coordinate of the ball
     * @param {*} diameter  Diameter of the ball
     * @param {*} v   Speed of the  ball in pixels per second
     * @param {*} direction   Direction of the ball (in radians)
     */
    constructor(x, y, diameter, v, direction) {
      this.x = x;
      this.y = y;
      this.diameter = diameter;
      this.v = v;
      this.direction = direction;
      this.vx = this.v * Math.cos(this.direction); // Math.cos is the javascript way. 
      this.vy = this.v * Math.sin(this.direction);
    }
    show() {
      // Some color changes to show the difference between fast and slow physics
      if (useFastPhysics) {
        stroke("red");
      } else {
        stroke("black");
      }
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }
    move(dT) {
      // Move the ball a step in the direction of the velocity
      // We use dT to make the movement independent of the frame rate
      this.x += this.vx * dT / 1000;
      this.y += this.vy * dT / 1000;
    }
  
  }
  
  /**
   * Ball Object extending the Ball class with an acceleration property
   */
  class GravityBall extends Ball {
    /**
     * 
     * @param {*} x X-coordinate of the ball
     * @param {*} y Y-coordinate of the ball
     * @param {*} diameter Diameter of the ball
     * @param {*} v Velocity of the ball
     * @param {*} direction Direction of the ball in radians
     * @param {*} acc Acceleration of the ball (downwards only in this case)
     */
    constructor(x, y, diameter, v, direction, acc) {
      super(x, y, diameter, v, direction); // Call the constructor of the parent class
      this.acc = acc;
    }
    move(dT) {
      // Add the acceleration to the velocity 
      // velocity is pixels/second. Acceleration is pixels/second^2
      this.vy += this.acc * dT / 1000;
      super.move(dT); // Call the move method of the parent class
    }
  
  }