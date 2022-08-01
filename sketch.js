let cells = [];
let startCells = 100;

function setup() {
  createCanvas(500, 700);

  for (let i = 0; i < startCells; i++) {
    cells.push(new Cell());
  }

}

function draw() {
  background(0, 1);


  for (let i = 0; i < cells.length; i++) {
    cells[i].edges();

    cells[i].move();

    cells[i].show();
  }
}

class Cell {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.size = 2;
  }

  move() {
    this.position.add(this.velocity);
  }

  edges() {
    if (
      this.position.x < 0 ||
      this.position.x > width
    ) { this.velocity.x *= -1 }
    if (
      this.position.y < 0 ||
      this.position.y > height
    ) { this.velocity.y *= -1 }
  }

  show() {
    circle(this.position.x, this.position.y, this.size)
  }
}
