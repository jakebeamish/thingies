let cells = [];
let foods = [];
let foodDensity = 0.2;
let startCells = 1;
let margin;
let area;

function setup() {
  createCanvas(windowWidth, windowHeight);
  area = width * height;
  foodAmount = foodDensity * area * 0.01;
  background(0);
  margin = 0.1 * (windowWidth + windowHeight / 2);

  while (cells.length < startCells) {
    let x = Math.round(random(margin, width - margin));
    let y = Math.round(random(margin, height - margin));
    cells.push(new Cell(width / 2, height / 2));
  }
}

function draw() {
  background(0, 30);

  if (cells.length == 0) cells.push(new Cell(width / 2, height / 2));

  while (foods.length < foodAmount) {
    foods.push(new Food());
  }

  for (let i = 0; i < cells.length; i++) {
    cells[i].move();
    if (cells.length < 20) cells[i].edges();
    cells[i].show();
    cells[i].eat();
    cells[i].reproduce();
    cells[i].age++;
    cells[i].die();

  }

  for (let i = 0; i < foods.length; i++) {
    foods[i].degrade();
    foods[i].show();


  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    cells.push(new Cell(mouseX, mouseY));
  }
}

class Food {
  constructor(x, y, size) {
    if (x && y) this.position = createVector(x, y);
    else this.position = createVector(random(width), random(height));
    this.size = size || random(0.1, 5);
    this.radius = this.size * 0.5;
    this.colour = random(20, 100);
  }

  degrade() {
    if (this.size > 5) {
    this.size -= 0.0001;
    }
    if (this.size < 0.1) foods.splice(this, 1);
  }

  show() {
    fill(this.colour);
    circle(this.position.x, this.position.y, this.size);
  }
}

class Cell {
  constructor(x, y) {
    if (x && y) this.position = createVector(x, y);
    else this.position = createVector(random(margin, width - margin), random(margin, height - margin));
    // this.position = createVector(width / 2, height / 2);
    this.direction = p5.Vector.random2D();
    this.velocity = createVector(0, 0);
    // this.size = sqrt(random(1, 10));
    this.size = 3;
    this.radius = 0.5 * this.size;

    // this.margin = margin;
    // this.black = random(255);
    this.colour = 255;
    // this.black = 255;
    // this.black = dist(this.position.x, this.position.y, width/2, height/2) * 255 * 0.005;
    // this.alpha = random(50);
    this.alpha = 255;
    this.age = 0;
    this.lifespan = 1000;
  }

  die() {
    // this.size -= 0.01;
    // if (this.size < 2) this.age = this.lifespan - 255;
    // if (this.age > this.lifespan - 255) this.colour = (this.age - this.lifespan) - 255;
    if (this.age > this.lifespan) {
      cells.splice(this, 1);
      foods.push(new Food(this.position.x, this.position.y, this.size));
    }
  }

  eat() {
    for (let i = 0; i < foods.length; i++) {
      let distance = this.position.dist(foods[i].position);
      if (distance < ((this.size / 2 + foods[i].radius))) {
        this.size += foods[i].radius;
        foods.splice(i, 1);
      }
    }
  }

  reproduce() {
    if (this.size > 20) {
      cells.push(new Cell(this.position.x, this.position.y));
      // cells.push(new Cell(this.position.x, this.position.y));
      this.size = 10;
    }
  }

  move() {
    this.wiggle = createVector(random(-1, 1), random(-1, 1));
    // this.wiggle.setHeading(random(TWO_PI));
    this.wiggle.setMag(1);
    this.direction.add(this.wiggle);
    // this.direction.setHeading(random(PI));
    // this.direction.setMag(1);
    this.velocity.add(this.direction);
    this.velocity.setMag(random(2));
    this.position.add(this.velocity);
    this.velocity.mult(0);
  }

  edges() {
    if (
      this.position.x < 0 + margin ||
      this.position.x > width - margin
    ) {
      this.direction.x *= -1
    }
    if (
      this.position.y < 0 + margin ||
      this.position.y > height - margin
    ) {
      this.direction.y *= -1
    }
  }


  show() {
    noStroke();
    fill(this.colour, this.alpha);
    circle(this.position.x, this.position.y, this.size)
  }
}
